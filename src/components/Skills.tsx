import React from 'react';
import Section from './Section';
import { SKILLS } from '../constants';
import { Code, Database, Terminal, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';

const Skills: React.FC = () => {
  const getIcon = (category: string) => {
    if (category.includes('Language')) return <Code size={20} />;
    if (category.includes('Framework')) return <Database size={20} />;
    if (category.includes('Software')) return <Terminal size={20} />;
    return <PenTool size={20} />;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <Section id="skills" title="Technical Arsenal" className="bg-slate-900">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {SKILLS.map((cat, idx) => (
          <motion.div
            key={idx}
            variants={item}
            whileHover={{ y: -5 }}
            className="group glass-card p-6 rounded-xl hover:border-accent/50 transition-colors duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-slate-900/50 text-accent group-hover:scale-110 transition-transform">
                {getIcon(cat.category)}
              </div>
              <h3 className="text-lg font-semibold text-white">{cat.category}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, sIdx) => (
                <motion.span
                  key={sIdx}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 text-sm text-slate-300 bg-slate-900/50 rounded-full border border-slate-700/50 group-hover:border-accent/30 hover:bg-accent/10 transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export default Skills;