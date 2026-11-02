import { EXPERIENCE } from '../constants';
import Reveal from './Reveal';
import Section from './Section';
import SpotlightCard from './SpotlightCard';

export default function Experience() {
  return (
    <Section
      id="experience"
      index="04"
      eyebrow="Leadership"
      title={
        <>
          Leadership <span className="hl">experience</span>
        </>
      }
    >
      <div className="space-y-6">
        {EXPERIENCE.map((exp, i) => (
          <Reveal key={`${exp.role}-${exp.organization}`} delay={i * 0.08}>
            <SpotlightCard as="article" className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="chip">{exp.duration}</p>
                <h3 className="mt-6 text-h3">{exp.role}</h3>
                <p className="mt-2 text-lg text-accent-text">{exp.organization}</p>
              </div>

              <ul className="space-y-4 lg:col-span-7">
                {exp.details.map((detail) => (
                  <li key={detail} className="flex gap-4 text-muted">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
