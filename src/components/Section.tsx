import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  /** Section number shown in the label, e.g. "01" */
  index: string;
  /** Short label shown next to the number, e.g. "About" */
  eyebrow: string;
  /** Heading content. Wrap one word in <span className="hl"> for the serif-italic accent. */
  title: ReactNode;
  children: ReactNode;
}

export default function Section({ id, index, eyebrow, title, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 md:py-28"
    >
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 md:mb-16"
      >
        <p className="eyebrow">
          <span>{index}</span>
          {eyebrow}
        </p>
        <h2 id={`${id}-title`} className="mt-4 text-h2">
          {title}
        </h2>
      </motion.header>
      {children}
    </section>
  );
}
