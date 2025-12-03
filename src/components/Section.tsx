
import React, { useEffect, useRef, useState } from 'react';

interface SectionProps {
  id: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, className = "", children }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative inline-block">
          {title}
          <span className={`absolute -bottom-2 left-0 h-1 bg-accent rounded-full transition-all duration-1000 delay-300 ${isVisible ? 'w-1/3' : 'w-0'}`}></span>
        </h2>
      </div>
      {children}
    </section>
  );
};

export default Section;
