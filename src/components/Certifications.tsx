import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Cpu, BookOpen, CheckCircle } from 'lucide-react';
import TiltCard from './TiltCard';
import usePortfolioLanguage from './usePortfolioLanguage';

export default function Certifications() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { content } = usePortfolioLanguage();
  const certifications = content.certifications;

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

  const certificationIcons = [Cpu, Zap, BookOpen];
  const certificationColors = ['from-blue-500 to-indigo-600', 'from-amber-500 to-orange-600', 'from-green-500 to-emerald-600'];

  return (
    <section id="certifications" className="py-20 sm:py-28 bg-slate-50" style={{ perspective: '1200px' }}>
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
            {certifications.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
            {certifications.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {certifications.items.map((cert, index) => {
            const Icon = certificationIcons[index];
            const color = certificationColors[index];

            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateY: index === 0 ? -15 : index === 2 ? 15 : 0 }}
              animate={visible ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <TiltCard tiltAmount={12}>
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow group">
                  {/* Top accent */}
                  <div className={`h-1.5 bg-gradient-to-r ${color}`} />

                  <div className="p-6 sm:p-8">
                    {/* Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <motion.div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
                        whileHover={{ scale: 1.1, rotateY: 20 }}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <Icon size={28} className="text-white" />
                      </motion.div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${color} text-white`}>
                        {cert.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{cert.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-5">{cert.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {cert.details.map((detail, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium"
                        >
                          <CheckCircle size={10} className="text-green-500" />
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
