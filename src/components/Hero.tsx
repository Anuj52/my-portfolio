import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { EDUCATION, FOCUS_AREAS, PERSONAL_INFO, PROJECTS, SKILLS, SOCIAL_LINKS } from '../constants';
import { linkProps } from '../utils';
import SpotlightCard from './SpotlightCard';

// Keep the delays short: the hero is the first thing people (and Google) measure, so it should appear fast.
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

// "Final Year Undergraduate | Mechanical Engineering" -> ["Final Year Undergraduate", "Mechanical Engineering"]
const TITLE_PARTS = PERSONAL_INFO.title
  .split('|')
  .map((part) => part.trim())
  .filter(Boolean);

// "Anuj Chaudhary" -> ["Anuj", "Chaudhary"] (shown on two big lines)
const NAME_PARTS = PERSONAL_INFO.name.split(' ');

const SKILL_COUNT = SKILLS.reduce((total, group) => total + group.skills.length, 0);

export default function Hero() {
  const education = EDUCATION[0];

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-16 pt-32 sm:pt-40 lg:pb-24"
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* ---------- Left: intro (7 of 12 columns) ---------- */}
        <div className="lg:col-span-7">
          <motion.p
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1 text-sm leading-6 text-muted"
          >
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success/70 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            Open to new opportunities
          </motion.p>

          <motion.h1 id="hero-title" {...fadeUp(0.04)} className="text-fade mt-8 pb-1 text-display">
            {NAME_PARTS.map((part, i) => (
              <span key={part}>
                <span className="block">{part}</span>
                {i < NAME_PARTS.length - 1 && ' '}
              </span>
            ))}
          </motion.h1>

          <motion.p
            {...fadeUp(0.08)}
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm uppercase tracking-[0.12em] text-muted"
          >
            {TITLE_PARTS.map((part, i) => (
              <span key={part} className="inline-flex items-center gap-3">
                {i > 0 && <span aria-hidden="true" className="size-1 rounded-full bg-accent" />}
                {part}
              </span>
            ))}
          </motion.p>

          <motion.p {...fadeUp(0.12)} className="mt-8 max-w-xl text-balance text-lead text-fg/90">
            Building scalable web applications&nbsp;&amp; <span className="hl whitespace-nowrap">data-driven</span> solutions.
          </motion.p>

          <motion.p {...fadeUp(0.16)} className="mt-6 max-w-xl leading-relaxed text-muted">
            {PERSONAL_INFO.about}
          </motion.p>

          <motion.div {...fadeUp(0.2)} className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#projects" className="btn btn-primary">
              View my work <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Get in touch
            </a>
            <ul className="flex items-center gap-1 sm:ml-2">
              {SOCIAL_LINKS.map(({ name, icon: Icon, url }) => (
                <li key={name}>
                  <a
                    href={url}
                    {...linkProps(url)}
                    aria-label={name}
                    className="grid size-12 place-items-center rounded-card text-muted transition-colors hover:bg-raised hover:text-accent-text"
                  >
                    <Icon size={20} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ---------- Right: mini bento of facts (5 of 12 columns, all derived from constants.ts) ---------- */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-5">
          <motion.div {...fadeUp(0.14)} className="col-span-2">
            <SpotlightCard className="h-full p-6">
              <div className="flex items-center gap-2 text-subtle">
                <GraduationCap size={18} className="text-accent" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-[0.18em]">Education</span>
              </div>
              <p className="mt-4 text-balance text-h3 text-fg">{PERSONAL_INFO.institute}</p>
              <p className="mt-2 font-mono text-xs text-accent-text">
                {education.degree} · {education.year}
              </p>
            </SpotlightCard>
          </motion.div>

          <motion.div {...fadeUp(0.2)}>
            <SpotlightCard className="h-full p-6">
              <p className="text-5xl font-bold tracking-tight">{PROJECTS.length}</p>
              <p className="mt-2 text-sm text-muted">Projects built</p>
            </SpotlightCard>
          </motion.div>

          <motion.div {...fadeUp(0.26)}>
            <SpotlightCard className="h-full p-6">
              <p className="text-5xl font-bold tracking-tight">{SKILL_COUNT}</p>
              <p className="mt-2 text-sm text-muted">Skills &amp; tools</p>
            </SpotlightCard>
          </motion.div>

          <motion.div {...fadeUp(0.32)} className="col-span-2">
            <SpotlightCard className="h-full p-6">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-subtle">Focus</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {FOCUS_AREAS.map((area) => (
                  <li key={area} className="chip text-fg/90">
                    {area}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
