import React from 'react';
import Section from './Section';
import { EDUCATION, COURSES, ACHIEVEMENTS } from '../constants';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

const About: React.FC = () => {
  return (
    <Section id="about" title="Education & Background">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Education */}
        <div className="space-y-8">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
                <GraduationCap className="text-accent" aria-hidden="true" /> Academic Journey
            </h3>
            <div className="relative border-l border-slate-700 ml-3 pl-8 space-y-10">
                {EDUCATION.map((edu, index) => (
                <div key={index} className="relative">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-accent" aria-hidden="true"></span>
                    <span className="text-sm text-accent font-mono mb-1 block">{edu.year}</span>
                    <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                    <p className="text-slate-400">{edu.institute}</p>
                    {edu.score && <p className="text-slate-400 text-sm mt-1 font-medium">Score: {edu.score}</p>}
                </div>
                ))}
            </div>
        </div>

        {/* Right Column: Achievements & Courses */}
        <div className="space-y-12">
             {/* Achievements */}
             <div>
                <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
                    <Award className="text-accent" aria-hidden="true" /> Achievements & Extra-Curriculars
                </h3>
                <ul className="space-y-4">
                    {ACHIEVEMENTS.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" aria-hidden="true"></span>
                            <span className="text-sm leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Courses */}
            <div>
                 <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
                    <BookOpen className="text-accent" aria-hidden="true" /> Relevant Courses
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                    {COURSES.map((category, idx) => (
                        <div key={idx} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h4 className="text-white font-medium mb-3 border-b border-slate-700 pb-2">{category.category}</h4>
                            <div className="flex flex-wrap gap-2">
                                {category.courses.map((c, i) => (
                                    <span key={i} className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700">
                                        {c}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </Section>
  );
};

export default About;