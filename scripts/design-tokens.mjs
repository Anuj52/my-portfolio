#!/usr/bin/env node
/**
 * Design-token exporter and WCAG contrast checker. No dependencies.
 *
 *   npm run tokens         parse src/styles/tokens.css, verify contrast, (re)write everything in design/
 *   npm run tokens:check   verify only. Exits 1 on a missing token, a failing colour pair or a stale export.
 *
 * src/styles/tokens.css is the source of truth. Nothing in design/ is edited by hand.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = resolve(ROOT, 'src/styles/tokens.css');
const OUT_DIR = resolve(ROOT, 'design');
const CHECK_ONLY = process.argv.includes('--check');

const DEFAULT_PALETTE = 'slate-indigo';
// Display names only. Colour values always come from the CSS. An unknown id falls back to its own name.
const PALETTE_INFO = {
  'slate-indigo': {
    name: 'Slate & Muted Indigo',
    summary: 'Deep charcoal surfaces, indigo identity accent, cyan actions. Site default.',
  },
  'carbon-amber': {
    name: 'Warm Carbon & Amber',
    summary: 'Coffee-brown carbon base, archival amber highlights, parchment text.',
  },
  'nordic-zinc': {
    name: 'Nordic Zinc & Arctic Ice',
    summary: 'Near-black zinc, monochrome apart from a single crisp cyan accent.',
  },
};

/* ==========================================================================
   Contrast policy (WCAG 2.2): text 4.5:1 (AA) / 7:1 (AAA), UI parts and large text 3:1.
   ========================================================================== */
const TEXT = 4.5;
const UI = 3;
const SURFACES = ['canvas', 'surface', 'surface-raised'];

/** [foreground, background, required ratio, what it is used for] */
const CHECKS = [
  ...SURFACES.flatMap((bg) => [
    ['text-primary', bg, TEXT, 'Headings and body copy'],
    ['text-secondary', bg, TEXT, 'Descriptions and supporting copy'],
    ['text-tertiary', bg, TEXT, 'Labels, placeholders, footer'],
    ['accent-primary-text', bg, TEXT, 'Small accent text: numbers, years, tags'],
    ['accent-secondary', bg, TEXT, 'Links and hover text in the action colour'],
    ['accent-primary', bg, UI, 'Icons, dots, borders, large display type'],
    ['border-strong', bg, UI, 'Outlines that identify form inputs'],
  ]),
  ['success', 'canvas', TEXT, 'Status text and dot'],
  ['success', 'surface', TEXT, 'Status text and dot on cards'],
  ['alert', 'canvas', TEXT, 'Error text'],
  ['alert', 'surface', TEXT, 'Error text on cards'],
  ['on-accent', 'accent-secondary', TEXT, 'Label on primary buttons and the logo badge'],
  ['on-accent', 'success', TEXT, 'Label on the "sent" button state'],
  ['on-accent', 'alert', TEXT, 'Label on the "error" button state'],
];

/** Shown for reference only. No threshold, the verdict is computed. */
const REFERENCE = [
  ['border', 'canvas', 'Decorative card and divider lines. Content is identified by text, so no ratio is required.'],
  ['border', 'surface', 'Decorative card and divider lines.'],
  ['on-accent', 'accent-primary', 'Dark label on an accent-primary fill.'],
  ['text-primary', 'accent-primary', 'Light label on an accent-primary fill.'],
];

/* ==========================================================================
   Colour maths
   ========================================================================== */
const HEX = /^#[0-9A-Fa-f]{6}$/;
const toRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const linear = (v) => {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const luminance = (hex) => {
  const [r, g, b] = toRgb(hex).map(linear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
// Truncate (never round up) so a 4.496 does not display as a passing 4.50.
const fmt = (ratio) => (Math.floor(ratio * 100) / 100).toFixed(2);

/* ==========================================================================
   Parse src/styles/tokens.css
   ========================================================================== */
function parseDeclarations(body) {
  const decls = [];
  for (const line of body.split(/\r?\n/)) {
    const m = line.match(/^\s*(--[\w-]+)\s*:\s*(.+?)\s*;\s*(?:\/\*\s*(.*?)\s*\*\/)?\s*$/);
    if (m) decls.push({ name: m[1], value: m[2], note: m[3] ?? '' });
  }
  return decls;
}

function parseBlocks(css) {
  const re = /(@theme(?:\s+(?:static|inline))?|\[data-theme="([^"]+)"\])\s*\{([^{}]*)\}/g;
  const blocks = [];
  for (let m; (m = re.exec(css)); ) {
    blocks.push({ header: m[1].replace(/\s+/g, ' '), theme: m[2] ?? null, decls: parseDeclarations(m[3]) });
  }
  return blocks;
}

const problems = [];
const fail = (msg) => problems.push(msg);

const css = readFileSync(SOURCE, 'utf8');
const blocks = parseBlocks(css);
const raw = blocks.find((b) => b.header === '@theme static');
const scale = blocks.find((b) => b.header === '@theme');
const aliasBlock = blocks.find((b) => b.header === '@theme inline');
if (!raw) throw new Error('tokens.css: missing "@theme static { ... }" block');
if (!scale) throw new Error('tokens.css: missing "@theme { ... }" block');

const pick = (decls, prefix) =>
  Object.fromEntries(
    decls.filter((d) => d.name.startsWith(prefix)).map((d) => [d.name.slice(prefix.length), d]),
  );

const palettes = { [DEFAULT_PALETTE]: pick(raw.decls, '--color-') };
const defaultKeys = Object.keys(palettes[DEFAULT_PALETTE]);
for (const block of blocks.filter((b) => b.theme)) {
  palettes[block.theme] = pick(block.decls, '--color-');
}

// Every palette must define exactly the same tokens, otherwise a theme would silently inherit the default's colours.
for (const [id, colors] of Object.entries(palettes)) {
  for (const key of defaultKeys) if (!colors[key]) fail(`[${id}] is missing --color-${key}`);
  for (const key of Object.keys(colors)) if (!defaultKeys.includes(key)) fail(`[${id}] defines unknown --color-${key}`);
  for (const [key, d] of Object.entries(colors)) {
    if (!HEX.test(d.value)) fail(`[${id}] --color-${key} must be a 6-digit hex value, got "${d.value}"`);
  }
}

// Aliases must point at tokens that exist.
for (const d of aliasBlock?.decls ?? []) {
  const target = d.value.match(/^var\(--color-([\w-]+)\)$/)?.[1];
  if (!target || !defaultKeys.includes(target)) fail(`alias ${d.name} points at "${d.value}", which is not a colour token`);
}

/* ==========================================================================
   Evaluate contrast
   ========================================================================== */
function evaluate(id) {
  const c = Object.fromEntries(Object.entries(palettes[id]).map(([k, d]) => [k, d.value.toUpperCase()]));
  const checks = CHECKS.map(([fg, bg, need, use]) => {
    const ratio = contrast(c[fg], c[bg]);
    const level = need === TEXT ? (ratio >= 7 ? 'AAA' : ratio >= TEXT ? 'AA' : 'FAIL') : ratio >= UI ? 'AA' : 'FAIL';
    return { fg, bg, need, use, ratio, level, pass: ratio >= need };
  });
  const reference = REFERENCE.map(([fg, bg, use]) => {
    const ratio = contrast(c[fg], c[bg]);
    return { fg, bg, use, ratio };
  });
  return { colors: c, checks, reference };
}

const results = {};
if (problems.length === 0) {
  for (const id of Object.keys(palettes)) {
    results[id] = evaluate(id);
    for (const r of results[id].checks) {
      if (!r.pass) fail(`[${id}] ${r.fg} on ${r.bg} is ${fmt(r.ratio)}:1, needs ${r.need}:1 (${r.use})`);
    }
  }
}

/* ==========================================================================
   Exports
   ========================================================================== */
const info = (id) => PALETTE_INFO[id] ?? { name: id, summary: '' };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const remToPx = (value) => {
  const m = value.match(/^([\d.]+)rem$/);
  return m ? `${parseFloat((parseFloat(m[1]) * 16).toFixed(2))}px` : value;
};
const splitFonts = (value) =>
  value
    .split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
    .map((s) => s.trim().replace(/^"|"$/g, ''))
    .filter(Boolean);

function buildTokensJson() {
  const tokens = {
    $description:
      'Design tokens exported from src/styles/tokens.css by scripts/design-tokens.mjs (W3C design-tokens format). Do not edit by hand.',
    defaultPalette: DEFAULT_PALETTE,
    palette: {},
    space: {},
    radius: {},
    font: {},
    text: {},
    tailwindAliases: Object.fromEntries(
      (aliasBlock?.decls ?? []).map((d) => [d.name.replace('--color-', ''), d.value.match(/--color-([\w-]+)/)[1]]),
    ),
  };

  for (const id of Object.keys(palettes)) {
    tokens.palette[id] = {
      $description: `${info(id).name}. ${info(id).summary}`.trim(),
      color: Object.fromEntries(
        Object.entries(palettes[id]).map(([key, d]) => [
          key,
          { $type: 'color', $value: d.value.toUpperCase(), $description: d.note },
        ]),
      ),
    };
  }
  for (const d of raw.decls) {
    if (d.name.startsWith('--space-'))
      tokens.space[d.name.slice(8)] = { $type: 'dimension', $value: remToPx(d.value), $description: d.note };
    if (d.name.startsWith('--radius-'))
      tokens.radius[d.name.slice(9)] = { $type: 'dimension', $value: remToPx(d.value), $description: d.note };
  }
  for (const d of scale.decls) {
    if (d.name.startsWith('--font-'))
      tokens.font[d.name.slice(7)] = { $type: 'fontFamily', $value: splitFonts(d.value) };
    const t = d.name.match(/^--text-([\w]+)(?:--([\w-]+))?$/);
    if (t) {
      const [, name, prop] = t;
      tokens.text[name] ??= { $type: 'typography', $value: {} };
      tokens.text[name].$value[prop ? prop.replace(/-(\w)/g, (_, ch) => ch.toUpperCase()) : 'fontSize'] = d.value;
    }
  }
  return JSON.stringify(tokens, null, 2) + '\n';
}

function buildReport() {
  const out = [];
  out.push('# Colour contrast report', '');
  out.push(
    'Generated by `npm run tokens` from `src/styles/tokens.css`. Do not edit by hand. `npm run tokens:check` fails the build when a pair drops below its threshold.',
    '',
  );
  out.push(
    'WCAG 2.2 thresholds: normal text 4.5:1 (AA) and 7:1 (AAA); large text and UI parts (icons, outlines, focus rings) 3:1. Ratios are truncated, never rounded up.',
    '',
  );
  out.push('| Palette | Pairs checked | Passing | Failing |', '| --- | ---: | ---: | ---: |');
  for (const id of Object.keys(results)) {
    const total = results[id].checks.length;
    const ok = results[id].checks.filter((r) => r.pass).length;
    out.push(`| ${info(id).name} (\`${id}\`) | ${total} | ${ok} | ${total - ok} |`);
  }
  out.push('');

  for (const id of Object.keys(results)) {
    const { colors, checks, reference } = results[id];
    out.push(`## ${info(id).name}`, '');
    out.push(`\`${id === DEFAULT_PALETTE ? ':root (default)' : `data-theme="${id}"`}\`. ${info(id).summary}`, '');
    out.push('### Tokens', '', '| Token | Hex | Role |', '| --- | --- | --- |');
    for (const [key, d] of Object.entries(palettes[id])) out.push(`| \`--color-${key}\` | \`${colors[key]}\` | ${d.note} |`);
    out.push('', '### Required pairs', '', '| Foreground | Background | Ratio | Needs | Result | Used for |', '| --- | --- | ---: | ---: | --- | --- |');
    for (const r of checks) {
      out.push(`| \`${r.fg}\` ${colors[r.fg]} | \`${r.bg}\` ${colors[r.bg]} | ${fmt(r.ratio)}:1 | ${r.need}:1 | ${r.pass ? r.level : '**FAIL**'} | ${r.use} |`);
    }
    out.push('', '### Reference pairs (no threshold)', '', '| Foreground | Background | Ratio | Note |', '| --- | --- | ---: | --- |');
    for (const r of reference) {
      const textOk = r.fg === 'border' ? '' : r.ratio >= TEXT ? ' Passes 4.5:1, usable for small text.' : ' Below 4.5:1, avoid small text here.';
      out.push(`| \`${r.fg}\` ${colors[r.fg]} | \`${r.bg}\` ${colors[r.bg]} | ${fmt(r.ratio)}:1 | ${r.use}${textOk} |`);
    }
    out.push('');
  }
  return out.join('\n');
}

function buildSwatch(id) {
  const { colors, checks } = results[id];
  const ratioOn = (fg, bg = 'canvas') => contrast(colors[fg], colors[bg]);
  const PAD = 32;
  const GAP = 16;
  const COLS = 6;
  const W = 960;
  const TILE_W = (W - PAD * 2 - GAP * (COLS - 1)) / COLS;
  const TILE_H = 88;
  const SANS = "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
  const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  const parts = [];
  let y = PAD;

  const text = (x, yy, s, { size = 12, fill = colors['text-secondary'], weight = 400, mono = false, anchor = 'start' } = {}) =>
    `<text x="${x}" y="${yy}" font-family="${mono ? MONO : SANS}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(s)}</text>`;

  parts.push(text(PAD, y + 28, info(id).name, { size: 28, weight: 700, fill: colors['text-primary'] }));
  parts.push(
    text(W - PAD, y + 28, id === DEFAULT_PALETTE ? 'default' : `data-theme="${id}"`, { size: 12, mono: true, fill: colors['text-tertiary'], anchor: 'end' }),
  );
  parts.push(text(PAD, y + 52, info(id).summary, { size: 14, fill: colors['text-secondary'] }));
  y += 88;

  const sectionTitle = (label) => {
    parts.push(text(PAD, y + 12, label.toUpperCase(), { size: 11, mono: true, fill: colors['text-tertiary'] }));
    parts.push(`<line x1="${PAD}" y1="${y + 24}" x2="${W - PAD}" y2="${y + 24}" stroke="${colors.border}"/>`);
    y += 40;
  };

  const caption = (x, key, extra) => {
    parts.push(text(x, y + TILE_H + 20, key, { size: 12, fill: colors['text-primary'], weight: 500 }));
    parts.push(text(x, y + TILE_H + 36, colors[key], { size: 11, mono: true }));
    if (extra) parts.push(text(x, y + TILE_H + 52, extra, { size: 11, mono: true, fill: colors['text-tertiary'] }));
  };
  const xAt = (i) => PAD + i * (TILE_W + GAP);
  const badge = (fg, bg = 'canvas', need = TEXT) => {
    const ratio = ratioOn(fg, bg);
    return `${fmt(ratio)}:1 ${ratio >= need ? (need === TEXT && ratio >= 7 ? 'AAA' : 'AA') : 'FAIL'}`;
  };

  // Surfaces and borders
  sectionTitle('Surfaces and borders');
  ['canvas', 'surface', 'surface-raised', 'border', 'border-strong'].forEach((key, i) => {
    parts.push(
      `<rect x="${xAt(i)}" y="${y}" width="${TILE_W}" height="${TILE_H}" rx="8" fill="${colors[key]}" stroke="${key === 'border-strong' ? colors[key] : colors['border-strong']}" stroke-opacity="${key === 'border-strong' ? 1 : 0.35}"/>`,
    );
    caption(xAt(i), key, key === 'border-strong' ? badge('border-strong', 'surface', UI) + ' on surface' : '');
  });
  y += TILE_H + 72;

  // Text
  sectionTitle('Text on canvas');
  ['text-primary', 'text-secondary', 'text-tertiary', 'accent-primary-text'].forEach((key, i) => {
    parts.push(`<rect x="${xAt(i)}" y="${y}" width="${TILE_W}" height="${TILE_H}" rx="8" fill="${colors.canvas}" stroke="${colors.border}"/>`);
    parts.push(text(xAt(i) + 16, y + 56, 'Aa', { size: 36, weight: 700, fill: colors[key] }));
    caption(xAt(i), key, badge(key));
  });
  y += TILE_H + 72;

  // Accents, ink and status
  sectionTitle('Accents, ink and status');
  ['accent-primary', 'accent-secondary', 'success', 'alert'].forEach((key, i) => {
    parts.push(`<rect x="${xAt(i)}" y="${y}" width="${TILE_W}" height="${TILE_H}" rx="8" fill="${colors[key]}"/>`);
    if (key === 'accent-secondary') parts.push(text(xAt(i) + 16, y + 52, 'Button', { size: 18, weight: 600, fill: colors['on-accent'] }));
    caption(xAt(i), key, badge(key, 'canvas', key === 'accent-primary' ? UI : TEXT) + ' on canvas');
  });
  parts.push(`<rect x="${xAt(4)}" y="${y}" width="${TILE_W}" height="${TILE_H}" rx="8" fill="${colors['accent-secondary']}"/>`);
  parts.push(text(xAt(4) + 16, y + 56, 'Aa', { size: 36, weight: 700, fill: colors['on-accent'] }));
  caption(xAt(4), 'on-accent', badge('on-accent', 'accent-secondary') + ' on button');
  y += TILE_H + 72;

  const pass = checks.filter((r) => r.pass).length;
  parts.push(text(PAD, y + 4, `${pass}/${checks.length} required contrast pairs pass WCAG 2.2 AA. Generated from src/styles/tokens.css.`, { size: 11, mono: true, fill: colors['text-tertiary'] }));
  y += 32;

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${y}" viewBox="0 0 ${W} ${y}" role="img" aria-labelledby="t">\n` +
    `<title id="t">${esc(info(id).name)} colour swatches</title>\n` +
    `<rect width="${W}" height="${y}" fill="${colors.canvas}"/>\n` +
    parts.join('\n') +
    '\n</svg>\n'
  );
}

/* ==========================================================================
   Run
   ========================================================================== */
const normalise = (s) => s.replace(/\r\n/g, '\n');
const files = {};
if (problems.length === 0) {
  files['tokens.json'] = buildTokensJson();
  files['contrast-report.md'] = buildReport();
  for (const id of Object.keys(palettes)) files[`swatches/${id}.svg`] = buildSwatch(id);
}

const stale = [];
for (const [name, content] of Object.entries(files)) {
  const target = resolve(OUT_DIR, name);
  if (CHECK_ONLY) {
    if (!existsSync(target) || normalise(readFileSync(target, 'utf8')) !== content) stale.push(`design/${name}`);
  } else {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, content);
  }
}

const rel = (p) => relative(ROOT, p).replace(/\\/g, '/');
console.log(`Design tokens from ${rel(SOURCE)}`);
for (const id of Object.keys(results)) {
  const rs = results[id].checks;
  const bad = rs.filter((r) => !r.pass).length;
  console.log(`  ${bad === 0 ? 'PASS' : 'FAIL'}  ${info(id).name.padEnd(26)} ${rs.length - bad}/${rs.length} pairs`);
}
if (!CHECK_ONLY && problems.length === 0) console.log(`Wrote ${Object.keys(files).length} files to design/`);
if (CHECK_ONLY && stale.length) {
  fail(`stale exports (run "npm run tokens"): ${stale.join(', ')}`);
}
if (problems.length) {
  console.error('\nProblems:');
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
