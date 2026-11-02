import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Leadership', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

// "Anuj Chaudhary" -> "AC"
const INITIALS = PERSONAL_INFO.name
  .split(' ')
  .map((word) => word[0])
  .join('')
  .slice(0, 2)
  .toUpperCase();

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  // Thin progress line at the very top of the page
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  // Highlight the nav link of the section currently in view
  useEffect(() => {
    const targets = ['#home', ...NAV_LINKS.map((link) => link.href)]
      .map((selector) => document.querySelector(selector))
      .filter((el): el is Element => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu with the Escape key
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-action"
      />

      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <motion.nav
          aria-label="Primary"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex w-full max-w-md items-center justify-between gap-2 rounded-card border border-line bg-canvas/80 p-2 shadow-[0_8px_32px_-16px_rgb(0_0_0/0.8)] backdrop-blur-xl md:w-auto md:max-w-none"
        >
          <a
            href="#home"
            aria-label={`${INITIALS} ${PERSONAL_INFO.name} - back to top`}
            className="flex items-center gap-3 rounded-md pr-2"
          >
            <span className="grid size-10 place-items-center rounded-md bg-action font-mono text-sm font-semibold text-on-accent">
              {INITIALS}
            </span>
            {/* The explicit space makes the link's text read "AC Anuj Chaudhary", matching its accessible name (WCAG 2.5.3). */}{' '}
            <span className="text-sm font-medium tracking-tight md:hidden xl:inline">{PERSONAL_INFO.name}</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative isolate block rounded-md px-4 py-2 text-sm transition-colors ${
                      isActive ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-md bg-raised"
                      />
                    )}
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>

          <a href="#contact" className="btn btn-primary btn-sm hidden md:inline-flex">
            Let’s talk <ArrowUpRight size={16} aria-hidden="true" />
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-10 place-items-center rounded-md text-fg transition-colors hover:bg-raised md:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>

          {/* Mobile menu */}
          <AnimatePresence>
            {open && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-x-0 top-full mt-2 rounded-card border border-line bg-surface p-2 shadow-2xl"
              >
                <ul>
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`block rounded-md px-4 py-3 text-base transition-colors hover:bg-raised ${
                          active === link.href ? 'text-accent-text' : 'text-fg'
                        }`}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </header>
    </>
  );
}
