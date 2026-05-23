import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, BookOpen, Zap } from 'lucide-react';
import TiltCard from './TiltCard';
import usePortfolioLanguage from './usePortfolioLanguage';

export default function Education() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { content } = usePortfolioLanguage();
  const education = content.education;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const educationIcons = [Zap, BookOpen];
  const educationColors = ['from-amber-500 to-orange-500', 'from-blue-500 to-cyan-500'];

  return (
    <section id="education" className="py-20 sm:py-28 bg-slate-50" style={{ perspective: '1200px' }}>
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, rotateX: -20 }}
          animate={visible ? { opacity: 1, rotateX: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">
            {education.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
            {education.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Education Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {education.items.map((edu, index) => {
            const Icon = educationIcons[index];
            const color = educationColors[index];

            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateY: index === 0 ? -15 : 15 }}
              animate={visible ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <TiltCard tiltAmount={10}>
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow">
                  {/* Top accent bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${color}`} />

                  <div className="p-6 sm:p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <motion.div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg flex-shrink-0`}
                        whileHover={{ scale: 1.1, rotateY: 20 }}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <Icon size={28} className="text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900">{edu.institution}</h3>
                        <p className="text-amber-600 font-semibold text-sm mt-0.5">{edu.degree}</p>
                        <p className="text-slate-500 text-sm mt-1">{edu.specialization}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                      <Calendar size={16} />
                      {education.graduatedLabel}: {edu.date}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {edu.details.map((detail, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
