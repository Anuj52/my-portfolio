import React from 'react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../constants';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 pt-16">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="z-10 text-center px-4 max-w-4xl mx-auto">
        <h2 className="text-accent font-medium tracking-wider mb-4 animate-[fadeIn_1s_ease-out]">HELLO, I'M</h2>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight animate-[slideUp_0.8s_ease-out]">
          {PERSONAL_INFO.name}
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-2 font-light animate-[slideUp_1s_ease-out]">
          {PERSONAL_INFO.title}
        </p>
        <p className="text-lg text-slate-400 mb-8 animate-[slideUp_1.2s_ease-out]">
          {PERSONAL_INFO.institute}
        </p>
        
        <p className="text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed animate-[slideUp_1.4s_ease-out]">
          {PERSONAL_INFO.about}
        </p>

        <div className="flex justify-center space-x-6 mb-12 animate-[fadeIn_1.6s_ease-out]">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-accent transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent rounded-full p-1"
              aria-label={`Visit my ${link.name}`}
            >
              <link.icon size={28} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-400" aria-hidden="true">
        <ArrowDown size={24} />
      </div>
    </div>
  );
};

export default Hero;