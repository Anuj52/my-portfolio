import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const Contact: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-950 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Let's Connect</h2>
        <p className="text-slate-400 max-w-lg mx-auto mb-10">
            I am currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>

        <div className="flex justify-center space-x-8 mb-12">
           {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-accent transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent rounded-lg p-2"
            >
              <link.icon size={32} aria-hidden="true" />
              <span className="sr-only">{link.name}</span>
            </a>
          ))}
        </div>

        <div className="text-slate-600 text-sm">
            <p>© {new Date().getFullYear()} Anuj Chaudhary. Built with React & Tailwind.</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;