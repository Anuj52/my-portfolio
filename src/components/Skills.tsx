import { BarChart3, Code2, Layers, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SKILLS } from '../constants';
import Reveal from './Reveal';
import Section from './Section';
import SpotlightCard from './SpotlightCard';

// Pick an icon from the category name, so re-ordering or renaming groups in constants.ts still works.
function iconFor(category: string): LucideIcon {
  const name = category.toLowerCase();
  if (name.includes('language')) return Code2;
  if (name.includes('framework') || name.includes('database')) return Layers;
  if (name.includes('software') || name.includes('librar')) return BarChart3;
  return Wrench;
}

export default function Skills() {
  return (
    <Section
      id="skills"
      index="02"
      eyebrow="Skills"
      title={
        <>
          Technical <span className="hl">arsenal</span>
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        {SKILLS.map((group, i) => {
          const Icon = iconFor(group.category);
          return (
            <Reveal key={group.category} delay={(i % 2) * 0.08}>
              <SpotlightCard className="h-full p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="grid size-12 place-items-center rounded-card border border-accent/30 bg-accent/10 text-accent">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h3 className="text-h3">{group.category}</h3>
                  </div>
                  <span className="font-mono text-sm text-subtle" aria-hidden="true">
                    {String(group.skills.length).padStart(2, '0')}
                  </span>
                </div>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li key={skill} className="chip chip-hover text-fg/90">
                      {skill}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
