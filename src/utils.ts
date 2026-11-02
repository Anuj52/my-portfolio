/** Open real web links in a new tab; keep mailto: / tel: links in the same tab. */
export const linkProps = (url: string) =>
  url.startsWith('http') ? ({ target: '_blank', rel: 'noopener noreferrer' } as const) : {};

/** Project links that are still placeholders ("#") should not render a button. */
export const isRealLink = (url?: string): url is string => Boolean(url) && url !== '#';
