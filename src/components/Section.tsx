import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, className = "", children }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}
    >
      <div className="mb-16">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4 relative inline-block"
        >
          {title}
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: "40%" }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="absolute -bottom-2 left-0 h-1 bg-accent rounded-full"
          />
        </motion.h2>
      </div>
      {children}
    </motion.section>
  );
};

export default Section;
