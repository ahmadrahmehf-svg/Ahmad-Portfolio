import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Sparkles } from 'lucide-react';
import TiltCard from './TiltCard';
import usePortfolioLanguage from './usePortfolioLanguage';

export default function Interests() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { content } = usePortfolioLanguage();
  const interests = content.interests;

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

  const interestIcons = [Sparkles, Monitor];
  const interestColors = ['from-violet-500 to-purple-600', 'from-green-500 to-emerald-600'];

  return (
    <section className="py-20 sm:py-28 bg-white" style={{ perspective: '1200px' }}>
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
            {interests.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
            {interests.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Interests Grid */}
        <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {interests.items.map((interest, index) => {
            const Icon = interestIcons[index];
            const color = interestColors[index];

            return (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 40, rotateX: 20 }}
              animate={visible ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <TiltCard tiltAmount={15}>
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:border-amber-200 transition-all group">
                  <motion.div
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg`}
                    whileHover={{ scale: 1.15, rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Icon size={32} className="text-white" />
                  </motion.div>
                  <h3 className="font-bold text-slate-900 mb-2">{interest.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{interest.description}</p>
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
