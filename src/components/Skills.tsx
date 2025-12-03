import React from 'react';
import Section from './Section';
import { SKILLS } from '../constants';
import { Code, Database, Terminal, PenTool } from 'lucide-react';

const Skills: React.FC = () => {
  const getIcon = (category: string) => {
    if (category.includes('Language')) return <Code size={20} />;
    if (category.includes('Framework')) return <Database size={20} />;
    if (category.includes('Software')) return <Terminal size={20} />;
    return <PenTool size={20} />;
  };

  return (
    <Section id="skills" title="Technical Arsenal" className="bg-slate-900">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILLS.map((cat, idx) => (
          <div 
            key={idx} 
            className="group bg-slate-800/40 p-6 rounded-xl border border-slate-800 hover:border-accent/50 hover:bg-slate-800/60 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-slate-900 text-accent group-hover:scale-110 transition-transform">
                {getIcon(cat.category)}
              </div>
              <h3 className="text-lg font-semibold text-white">{cat.category}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, sIdx) => (
                <span 
                  key={sIdx} 
                  className="px-3 py-1 text-sm text-slate-300 bg-slate-900/50 rounded-full border border-slate-700 group-hover:border-accent/30 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;