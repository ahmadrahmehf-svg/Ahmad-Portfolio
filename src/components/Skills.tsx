import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wrench,
  Sun,
  Monitor,
  LayoutDashboard,
  ClipboardCheck,
  Users,
  PenTool,
  FileText,
  BarChart3,
  Settings,
  MousePointerClick,
} from 'lucide-react';
import TiltCard from './TiltCard';
import usePortfolioLanguage from './usePortfolioLanguage';

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { content } = usePortfolioLanguage();
  const skillsContent = content.skills;

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

  const categoryIcons = [LayoutDashboard, Wrench, Monitor];
  const categoryColors = ['from-violet-500 to-purple-600', 'from-amber-500 to-orange-600', 'from-blue-500 to-cyan-600'];
  const skillIcons = [
    [ClipboardCheck, BarChart3, Users, PenTool, FileText, Settings],
    [Sun, Wrench, Settings, MousePointerClick],
    [FileText, Monitor, FileText],
  ];

  return (
    <section id="skills" className="py-20 sm:py-28 bg-white" style={{ perspective: '1200px' }}>
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
            {skillsContent.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
            {skillsContent.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Skill Categories */}
        <div className="grid lg:grid-cols-3 gap-8">
          {skillsContent.categories.map((category, catIndex) => {
            const CategoryIcon = categoryIcons[catIndex];
            const categoryColor = categoryColors[catIndex];

            return (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 50, rotateY: catIndex === 1 ? 0 : catIndex === 0 ? -10 : 10 }}
              animate={visible ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.7, delay: catIndex * 0.15 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <TiltCard tiltAmount={8}>
                <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow h-full">
                  {/* Category Header */}
                  <div className={`p-6 bg-gradient-to-r ${categoryColor}`}>
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"
                        whileHover={{ rotateY: 180 }}
                        transition={{ duration: 0.5 }}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <CategoryIcon size={22} className="text-white" />
                      </motion.div>
                      <h3 className="text-white font-bold text-lg">{category.title}</h3>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="p-6 space-y-5">
                    {category.skills.map((skill, i) => {
                      const SkillIcon = skillIcons[catIndex][i];

                      return (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <SkillIcon size={14} className="text-slate-400" />
                            <span className="text-sm font-semibold text-slate-700">{skill.name}</span>
                          </div>
                          <span className="text-xs font-bold text-slate-400">{skill.level}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${categoryColor}`}
                            initial={{ width: 0 }}
                            animate={visible ? { width: `${skill.level}%` } : {}}
                            transition={{
                              duration: 1,
                              delay: catIndex * 0.15 + i * 0.1 + 0.5,
                              ease: 'easeOut',
                            }}
                          />
                        </div>
                      </div>
                      );
                    })}
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
