import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  MapPin,
  ChevronRight,
  FileText,
  Settings,
  ClipboardList,
  Users,
  DollarSign,
  MessageSquare,
  Lightbulb,
} from 'lucide-react';
import TiltCard from './TiltCard';

export default function Experience() {
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

  const experiences = [
    {
      title: 'Project / Technical Management Role',
      company: 'Future Energy Project Development Co.',
      location: 'Amman, Jordan',
      period: 'June 2014 – June 2017',
      color: 'from-amber-500 to-orange-500',
      icon: Briefcase,
      responsibilities: [
        { icon: ClipboardList, text: 'Managed project coordination and execution from planning to delivery' },
        { icon: DollarSign, text: 'Assisted in budgeting, cost control, and financial tracking' },
        { icon: Users, text: 'Coordinated between technical teams and management stakeholders' },
        { icon: FileText, text: 'Supported project planning, scheduling, and progress reporting' },
        { icon: Settings, text: 'Oversaw operational and technical activities on-site' },
        { icon: MessageSquare, text: 'Facilitated communication with clients, suppliers, and partners' },
      ],
    },
    {
      title: 'Technical Specialist',
      company: 'New Village of Energy (NVEco)',
      location: 'Amman, Jordan',
      period: 'October 2017 – October 2018',
      color: 'from-blue-500 to-cyan-500',
      icon: Lightbulb,
      responsibilities: [
        { icon: Lightbulb, text: 'Worked on renewable energy and solar power system projects' },
        { icon: Settings, text: 'Provided technical field supervision and hands-on support' },
        { icon: FileText, text: 'Assisted with electrical and solar panel installations' },
        { icon: ClipboardList, text: 'Performed troubleshooting, testing, and preventive maintenance' },
        { icon: FileText, text: 'Prepared comprehensive technical documentation and reports' },
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 sm:py-28 bg-white" style={{ perspective: '1200px' }}>
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
            Career Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
            Professional Experience
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              animate={visible ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Timeline line */}
              <div className="hidden sm:flex absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400 to-transparent" />

              <div className="flex gap-6">
                {/* Timeline dot */}
                <div className="hidden sm:flex relative z-10">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotateY: 15 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <exp.icon size={28} className="text-white" />
                  </motion.div>
                </div>

                {/* Content Card */}
                <div className="flex-1">
                  <TiltCard tiltAmount={6}>
                    <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow">
                      {/* Header */}
                      <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                          <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                              {exp.title}
                            </h3>
                            <p className="text-amber-600 font-semibold mt-1">{exp.company}</p>
                          </div>
                          <div className="flex flex-col sm:items-end gap-1.5">
                            <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                              <Calendar size={14} />
                              {exp.period}
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                              <MapPin size={14} />
                              {exp.location}
                            </div>
                          </div>
                        </div>

                        {/* Responsibilities */}
                        <div className="grid sm:grid-cols-2 gap-3">
                          {exp.responsibilities.map((resp, i) => (
                            <motion.div
                              key={i}
                              className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-100 hover:border-amber-200 transition-colors"
                              whileHover={{ scale: 1.02, translateZ: '10px' }}
                              style={{ transformStyle: 'preserve-3d' }}
                            >
                              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <ChevronRight size={14} className="text-amber-500" />
                              </div>
                              <p className="text-slate-600 text-sm leading-relaxed">{resp.text}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
