import React from 'react';
import Section from './Section';
import { EXPERIENCE } from '../constants';

const Experience: React.FC = () => {
  return (
    <Section id="experience" title="Leadership">
      <div className="max-w-4xl mx-auto">
        {EXPERIENCE.map((exp, idx) => (
            <div key={idx} className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                            <p className="text-accent text-lg">{exp.organization}</p>
                        </div>
                        <span className="mt-2 md:mt-0 px-4 py-1 bg-slate-700 text-slate-300 rounded-full text-sm font-medium">
                            {exp.duration}
                        </span>
                    </div>
                    
                    <div className="space-y-3">
                         {exp.details.map((detail, i) => (
                            <div key={i} className="flex gap-3 text-slate-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2.5 flex-shrink-0"></span>
                                <p className="leading-relaxed">{detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ))}
      </div>
    </Section>
  );
};

export default Experience;