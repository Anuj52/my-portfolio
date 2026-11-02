import { ArrowUpRight, Github, Zap } from 'lucide-react';
import { PROJECTS } from '../constants';
import type { Project } from '../types';
import { isRealLink, linkProps } from '../utils';
import Reveal from './Reveal';
import Section from './Section';
import SpotlightCard from './SpotlightCard';

interface ProjectCardProps {
  project: Project;
  index: number;
  featured: boolean;
}

function ProjectCard({ project, index, featured }: ProjectCardProps) {
  const techs = project.tech
    .split(',')
    .map((tech) => tech.trim())
    .filter(Boolean);

  // For "Self Project" the date just repeats the type, so only show the date when it adds information.
  const showDate = Boolean(project.date) && project.date !== project.type;

  const impact = project.impact ? (
    <div className="flex gap-3 rounded-card border border-accent/25 bg-accent/10 p-4">
      <Zap size={18} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
      <p className="leading-relaxed text-fg/90">
        <span className="sr-only">Impact: </span>
        {project.impact}
      </p>
    </div>
  ) : null;

  const bullets = (
    <ul className="space-y-4">
      {project.description.map((line) => (
        <li key={line} className="flex gap-3 leading-relaxed text-muted">
          <span aria-hidden="true" className="mt-[11px] size-1 shrink-0 rounded-full bg-subtle" />
          {line}
        </li>
      ))}
    </ul>
  );

  const links = (
    <div className="flex flex-wrap gap-4">
      {isRealLink(project.demoLink) && (
        <a
          href={project.demoLink}
          {...linkProps(project.demoLink)}
          aria-label={`Live demo of ${project.title}`}
          className="btn btn-primary btn-sm"
        >
          Live demo <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      )}
      {isRealLink(project.codeLink) && (
        <a
          href={project.codeLink}
          {...linkProps(project.codeLink)}
          aria-label={`Source code of ${project.title} on GitHub`}
          className="btn btn-ghost btn-sm"
        >
          <Github size={16} aria-hidden="true" /> Source code
        </a>
      )}
    </div>
  );

  return (
    <SpotlightCard as="article" className="flex h-full flex-col p-6 sm:p-8">
      <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-4">
        <p className="flex items-center gap-3 font-mono">
          <span className="text-sm text-accent-text">{String(index + 1).padStart(2, '0')}</span>
          {showDate && (
            <span className="whitespace-nowrap text-xs uppercase tracking-wider text-subtle">{project.date}</span>
          )}
        </p>
        <p className="whitespace-nowrap rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-accent-text">
          {project.type}
        </p>
      </header>

      <h3 className="mt-6 text-h3">{project.title}</h3>

      <ul aria-label="Technologies used" className="mt-4 flex flex-wrap gap-2">
        {techs.map((tech) => (
          <li key={tech} className="chip chip-hover">
            {tech}
          </li>
        ))}
      </ul>

      {featured ? (
        // Featured card: impact + links on the left (5 of 12 columns), details on the right (7 of 12)
        <div className="mt-8 grid flex-1 gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-5">
            {impact}
            <div className="mt-auto">{links}</div>
          </div>
          <div className="lg:col-span-7">{bullets}</div>
        </div>
      ) : (
        <>
          {impact && <div className="mt-6">{impact}</div>}
          <div className="mt-6 flex-1">{bullets}</div>
          <div className="mt-8">{links}</div>
        </>
      )}
    </SpotlightCard>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      index="03"
      eyebrow="Projects"
      title={
        <>
          Featured <span className="hl">projects</span>
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((project, i) => {
          const isFeatured = i === 0;
          // Keep the grid tidy: if the last card would sit alone on a row, let it span the full width.
          const isOrphan = i === PROJECTS.length - 1 && PROJECTS.length % 2 === 0;
          return (
            <Reveal
              key={project.title}
              delay={i > 0 ? ((i - 1) % 2) * 0.08 : 0}
              className={isFeatured || isOrphan ? 'md:col-span-2' : ''}
            >
              <ProjectCard project={project} index={i} featured={isFeatured} />
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
