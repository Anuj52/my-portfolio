import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { motion } from 'framer-motion';
import ContactForm from './ContactForm';

const Contact: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-950 py-20 border-t border-slate-900 relative z-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white mb-6"
        >
          Let's Connect
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-slate-400 max-w-lg mx-auto mb-10 text-lg"
        >
          I am currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </motion.p>

        <ContactForm />

        <div className="flex justify-center space-x-8 my-12">
          {SOCIAL_LINKS.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 300 }}
              className="text-slate-400 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded-lg p-2"
            >
              <link.icon size={32} aria-hidden="true" />
              <span className="sr-only">{link.name}</span>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-slate-600 text-sm"
        >
          <p>© {new Date().getFullYear()} Anuj Chaudhary. Built with React, Tailwind & Framer Motion.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Contact;