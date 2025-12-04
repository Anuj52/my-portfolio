import React from 'react';
import Section from './Section';
import { EXPERIENCE } from '../constants';
import { motion } from 'framer-motion';

const Experience: React.FC = () => {
  return (
    <Section id="experience" title="Leadership">
      <div className="max-w-4xl mx-auto relative">
        {/* Vertical Line */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute left-0 md:left-1/2 w-0.5 bg-slate-700 h-full -translate-x-1/2 hidden md:block"
        />

        <div className="space-y-12">
          {EXPERIENCE.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.2 }}
              className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-accent rounded-full -translate-x-1/2 mt-8 hidden md:block shadow-[0_0_10px_rgba(56,189,248,0.5)] z-10" />

              {/* Content */}
              <div className="flex-1">
                <div className={`glass-card rounded-2xl p-8 border border-slate-700/50 relative overflow-hidden group hover:border-accent/30 transition-colors ${idx % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  }`}>
                  <div className="absolute top-0 right-0 p-32 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors"></div>

                  <div className="relative z-10">
                    <div className="flex flex-col justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                        <p className="text-accent text-lg">{exp.organization}</p>
                      </div>
                      <span className="mt-2 inline-block px-4 py-1 bg-slate-900/50 text-slate-300 rounded-full text-sm font-medium w-fit border border-slate-700/50">
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
              </div>

              {/* Empty space for the other side of timeline */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Experience;