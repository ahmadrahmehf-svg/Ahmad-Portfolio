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

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  const skillCategories = [
    {
      title: 'Project Management',
      icon: LayoutDashboard,
      color: 'from-violet-500 to-purple-600',
      skills: [
        { name: 'Project Management', level: 90, icon: ClipboardCheck },
        { name: 'Budget Control', level: 85, icon: BarChart3 },
        { name: 'Team Coordination', level: 90, icon: Users },
        { name: 'Project Planning', level: 85, icon: PenTool },
        { name: 'Reporting', level: 80, icon: FileText },
        { name: 'Technical Supervision', level: 85, icon: Settings },
      ],
    },
    {
      title: 'Technical Skills',
      icon: Wrench,
      color: 'from-amber-500 to-orange-600',
      skills: [
        { name: 'Solar Power Systems', level: 90, icon: Sun },
        { name: 'Electrical Wiring', level: 85, icon: Wrench },
        { name: 'Industrial Control', level: 75, icon: Settings },
        { name: 'AutoCAD', level: 70, icon: MousePointerClick },
      ],
    },
    {
      title: 'Computer Skills',
      icon: Monitor,
      color: 'from-blue-500 to-cyan-600',
      skills: [
        { name: 'Microsoft Office', level: 90, icon: FileText },
        { name: 'Computer Systems', level: 85, icon: Monitor },
        { name: 'Technical Documentation', level: 85, icon: FileText },
      ],
    },
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
            Expertise & Abilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
            Core Skills
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Skill Categories */}
        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
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
                  <div className={`p-6 bg-gradient-to-r ${category.color}`}>
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"
                        whileHover={{ rotateY: 180 }}
                        transition={{ duration: 0.5 }}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <category.icon size={22} className="text-white" />
                      </motion.div>
                      <h3 className="text-white font-bold text-lg">{category.title}</h3>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="p-6 space-y-5">
                    {category.skills.map((skill, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <skill.icon size={14} className="text-slate-400" />
                            <span className="text-sm font-semibold text-slate-700">{skill.name}</span>
                          </div>
                          <span className="text-xs font-bold text-slate-400">{skill.level}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
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
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
