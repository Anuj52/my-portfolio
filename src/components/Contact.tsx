import { ArrowUpRight } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import { linkProps } from '../utils';
import ContactForm from './ContactForm';
import Reveal from './Reveal';
import Section from './Section';
import SpotlightCard from './SpotlightCard';

// "mailto:me@x.com" -> "me@x.com",  "https://github.com/me" -> "github.com/me"
const displayValue = (url: string) => url.replace(/^(mailto:|tel:|https?:\/\/)/, '');

export default function Contact() {
  return (
    <Section
      id="contact"
      index="05"
      eyebrow="Contact"
      title={
        <>
          Let’s <span className="hl">connect</span>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <p className="max-w-md text-lg leading-relaxed text-muted">
            I am currently open to new opportunities. Whether you have a question or just want to say hi, I’ll try
            my best to get back to you!
          </p>

          <ul className="mt-8 space-y-4">
            {SOCIAL_LINKS.map(({ name, icon: Icon, url }) => (
              <li key={name}>
                <a href={url} {...linkProps(url)} className="card group flex items-center gap-4 p-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-card bg-raised text-accent transition-colors group-hover:bg-action group-hover:text-on-accent">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-xs uppercase tracking-[0.16em] text-subtle">{name}</span>
                    <span className="block truncate text-fg">{displayValue(url)}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="text-subtle transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <SpotlightCard className="p-6 sm:p-8">
            <h3 className="mb-8 text-h3">Send a message</h3>
            <ContactForm />
          </SpotlightCard>
        </Reveal>
      </div>
    </Section>
  );
}
