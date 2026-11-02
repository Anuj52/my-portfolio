import { Award, BookOpen, Check, GraduationCap } from 'lucide-react';
import { ACHIEVEMENTS, COURSES, EDUCATION } from '../constants';
import Reveal from './Reveal';
import Section from './Section';
import SpotlightCard from './SpotlightCard';

export default function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      title={
        <>
          Education &amp; <span className="hl">background</span>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-12">
        {/* ---------- Education timeline ---------- */}
        <Reveal className="lg:col-span-5">
          <SpotlightCard className="flex h-full flex-col p-6 sm:p-8">
            <h3 className="flex items-center gap-3 text-h3">
              <GraduationCap className="text-accent" size={22} aria-hidden="true" />
              Academic journey
            </h3>

            {/* On desktop the entries spread out to fill the card height */}
            <ol className="relative mt-8 flex flex-1 flex-col justify-between gap-8 border-l border-line pl-8">
              {EDUCATION.map((edu) => (
                <li key={`${edu.degree}-${edu.year}`} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[39px] top-1.5 size-3 rounded-full border-2 border-accent bg-canvas"
                  />
                  <p className="font-mono text-xs tracking-wide text-accent-text">{edu.year}</p>
                  <h4 className="mt-2 text-lg font-semibold tracking-tight">{edu.degree}</h4>
                  <p className="mt-1 text-muted">{edu.institute}</p>
                  {edu.score && <p className="chip mt-4">Score: {edu.score}</p>}
                </li>
              ))}
            </ol>
          </SpotlightCard>
        </Reveal>

        <div className="grid gap-6 lg:col-span-7">
          {/* ---------- Achievements ---------- */}
          <Reveal delay={0.08}>
            <SpotlightCard className="h-full p-6 sm:p-8">
              <h3 className="flex items-center gap-3 text-h3">
                <Award className="text-accent" size={22} aria-hidden="true" />
                Achievements &amp; extra-curriculars
              </h3>
              <ul className="mt-6 space-y-4">
                {ACHIEVEMENTS.map((item) => (
                  <li key={item} className="flex items-start gap-4 text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent/15 text-accent"
                    >
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>

          {/* ---------- Relevant courses ---------- */}
          <Reveal delay={0.16}>
            <SpotlightCard className="h-full p-6 sm:p-8">
              <h3 className="flex items-center gap-3 text-h3">
                <BookOpen className="text-accent" size={22} aria-hidden="true" />
                Relevant courses
              </h3>
              <div className="mt-6 grid gap-8 sm:grid-cols-2">
                {COURSES.map((group) => (
                  <div key={group.category}>
                    <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">{group.category}</h4>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {group.courses.map((course) => (
                        <li key={course} className="chip chip-hover">
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
