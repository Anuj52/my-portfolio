import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-subtle sm:flex-row sm:px-8">
        <p>
          © {YEAR} {PERSONAL_INFO.name}. Built with React, Tailwind &amp; Framer Motion.
        </p>
        <a href="#home" className="inline-flex items-center gap-2 transition-colors hover:text-accent-text">
          Back to top <ArrowUp size={16} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
