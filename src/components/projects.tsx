
import React from 'react';
import Section from './Section';
import { PROJECTS } from '../constants';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Zap, 
  Code, 
  Database, 
  Server, 
  Layout, 
  Cpu, 
  Globe 
} from 'lucide-react';

const Projects: React.FC = () => {
  
  // Helper to get icon based on technology name
  const getTechIcon = (tech: string) => {
    const t = tech.toLowerCase();
    if (t.includes('react') || t.includes('html') || t.includes('css') || t.includes('bootstrap') || t.includes('tailwind') || t.includes('d3')) return <Layout size={14} />;
    if (t.includes('node') || t.includes('django') || t.includes('flask') || t.includes('express')) return <Server size={14} />;
    if (t.includes('mongo') || t.includes('sql')) return <Database size={14} />;
    if (t.includes('python') || t.includes('js') || t.includes('java')) return <Code size={14} />;
    if (t.includes('ml') || t.includes('pandas') || t.includes('numpy') || t.includes('scikit')) return <Cpu size={14} />;
    return <Globe size={14} />;
  };

  return (
    <Section id="projects" title="Featured Projects">
      <div className="grid md:grid-cols-2 gap-8">
        {PROJECTS.map((project, idx) => (
          <div 
            key={idx} 
            className="flex flex-col h-full bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 group relative"
          >
            {/* Header */}
            <div className="p-6 pb-0">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-slate-900 rounded-xl text-accent group-hover:text-white group-hover:bg-accent transition-colors duration-300">
                        <FolderGit2 size={24} aria-hidden="true" />
                    </div>
                    <span className="text-xs font-mono text-slate-400 border border-slate-700 px-2 py-1 rounded">
                        {project.type}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                
                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.split(',').map((item, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-300 bg-slate-900/60 px-2 py-1 rounded border border-slate-700/50"
                    >
                      {getTechIcon(item)}
                      {item.trim()}
                    </span>
                  ))}
                </div>
            </div>
            
            {/* Description & Impact */}
            <div className="p-6 pt-2 flex-grow">
                {/* Impact Summary */}
                {project.impact && (
                  <div className="mb-4 p-3 bg-slate-900/50 rounded-lg border-l-2 border-accent/70">
                    <div className="flex items-start gap-2">
                      <Zap size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-slate-300 font-medium italic">{project.impact}</p>
                    </div>
                  </div>
                )}

                <ul className="space-y-2 mb-4">
                    {project.description.slice(0, 3).map((desc, i) => (
                         <li key={i} className="text-slate-400 text-sm leading-relaxed flex items-start gap-2">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-600 flex-shrink-0" aria-hidden="true"></span>
                            {desc}
                         </li>
                    ))}
                </ul>
            </div>

            {/* Links */}
            <div className="px-6 pb-6 pt-0 mt-auto flex gap-4 border-t border-slate-700/50 pt-4">
              {project.demoLink && (
                <a 
                  href={project.demoLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded-md px-2 py-1 -ml-2"
                  aria-label={`View live demo of ${project.title}`}
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  Live Demo
                </a>
              )}
              {project.codeLink && (
                <a 
                  href={project.codeLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded-md px-2 py-1"
                  aria-label={`View source code for ${project.title}`}
                >
                  <Github size={16} aria-hidden="true" />
                  Source Code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Projects;
