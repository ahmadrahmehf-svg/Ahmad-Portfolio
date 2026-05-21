import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Target,
  Users,
  TrendingUp,
  Award,
  Zap,
  FileText,
  Wrench,
} from 'lucide-react';
import TiltCard from './TiltCard';

export default function About() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const highlights = [
    { icon: Briefcase, label: '5+ Years Experience', value: 'Project Management' },
    { icon: Zap, label: 'Solar & Energy', value: 'Technical Expertise' },
    { icon: Users, label: 'Team Leadership', value: 'Coordination Skills' },
    { icon: TrendingUp, label: 'Budget Control', value: 'Financial Oversight' },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-slate-50" style={{ perspective: '1200px' }}>
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
            Professional Profile
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Summary Text + Photo */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: 15 }}
              animate={visible ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <TiltCard className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-6" tiltAmount={8}>
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <motion.div
                    className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg"
                    whileHover={{ scale: 1.05, rotateY: 10 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <img
                      src="images/ahmad.jpeg"
                      alt="Ahmad Rahmeh"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-slate-600 leading-relaxed text-base mb-4">
                      A dedicated <strong className="text-slate-800">Project & Technical Management
                      Professional</strong> with extensive experience in the energy and solar sector.
                      Proven ability to lead cross-functional teams, manage budgets, and deliver
                      complex technical projects on time.
                    </p>
                    <p className="text-slate-600 leading-relaxed text-base">
                      Combining a strong technical background in <strong className="text-slate-800">solar
                      power systems and electrical engineering</strong> with solid project management
                      skills. Experienced in coordinating between technical teams and management,
                      preparing detailed reports, and ensuring smooth project execution.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, rotateX: 20 }}
                  animate={visible ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <TiltCard tiltAmount={12}>
                    <div className="bg-white rounded-xl p-5 text-center border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all">
                      <div className="w-10 h-10 mx-auto rounded-lg bg-amber-50 flex items-center justify-center mb-3">
                        <item.icon size={20} className="text-amber-600" />
                      </div>
                      <p className="text-slate-900 font-bold text-sm">{item.value}</p>
                      <p className="text-slate-500 text-xs mt-1">{item.label}</p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Info Sidebar */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            animate={visible ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <TiltCard tiltAmount={10}>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Award size={20} className="text-amber-400" />
                  Key Strengths
                </h3>
                <ul className="space-y-4">
                  {[
                    { icon: Target, text: 'Strategic Project Planning' },
                    { icon: FileText, text: 'Technical Documentation' },
                    { icon: Wrench, text: 'Solar & Electrical Systems' },
                    { icon: Users, text: 'Team Coordination & Leadership' },
                    { icon: TrendingUp, text: 'Budget Control & Reporting' },
                    { icon: Zap, text: 'Renewable Energy Expertise' },
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={visible ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <item.icon size={16} className="text-amber-400" />
                      </div>
                      <span className="text-slate-200 text-sm">{item.text}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <h4 className="text-sm font-semibold text-amber-400 mb-3 uppercase tracking-wider">
                    Languages
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Arabic</span>
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                        Native
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">English</span>
                      <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">
                        Fluent
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
