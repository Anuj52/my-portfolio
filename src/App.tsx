import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/projects';
import Experience from './components/Experience';
import Contact from './components/Footer';
import BackgroundParticles from './components/BackgroundParticles';
import SEO from './components/SEO';

const App: React.FC = () => {
  return (
    <div className="bg-slate-900 min-h-screen text-slate-200">
      <SEO />
      <BackgroundParticles />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
      </main>
      <Contact />
    </div>
  );
};

export default App;