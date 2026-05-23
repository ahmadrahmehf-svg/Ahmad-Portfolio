import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  CheckCircle,
} from 'lucide-react';
import TiltCard from './TiltCard';

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-slate-900" style={{ perspective: '1200px' }}>
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, rotateX: -20 }}
          animate={visible ? { opacity: 1, rotateX: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">
            Let's Connect
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 mt-6 max-w-xl mx-auto">
            Interested in working together? Feel free to reach out. I'm always open to discussing
            new opportunities and projects.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50, rotateY: 15 }}
            animate={visible ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="space-y-6">
              {[
                {
                  icon: Phone,
                  label: 'Phone',
                  value: '+962797536891',
                  href: 'tel:+962797536891',
                },
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'ahmedrahmeh@yahoo.com',
                  href: 'mailto:ahmedrahmeh@yahoo.com',
                },
                {
                  icon: MapPin,
                  label: 'Location',
                  value: 'Amman, Jordan',
                  href: '#',
                },
                {
                  icon: Clock,
                  label: 'Availability',
                  value: 'Open to opportunities',
                  href: '#',
                },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all group"
                  whileHover={{ scale: 1.03, translateZ: '15px' }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/30 transition-colors">
                    <item.icon size={20} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider font-medium">
                      {item.label}
                    </p>
                    <p className="text-white font-semibold text-sm mt-0.5">{item.value}</p>
                  </div>
                </motion.a>
              ))}

              {/* Social Links */}
              <div className="pt-4">
                <p className="text-slate-400 text-xs uppercase tracking-wider font-medium mb-3">
                  Connect With Me
                </p>
                <div className="flex gap-3">
                  <motion.a
                    href="#"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/30 hover:bg-white/10 transition-all"
                    whileHover={{ scale: 1.1, rotateY: 15, translateZ: '10px' }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </motion.a>
                  <motion.a
                    href="mailto:ahmedrahmeh@yahoo.com"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/30 hover:bg-white/10 transition-all"
                    whileHover={{ scale: 1.1, rotateY: 15, translateZ: '10px' }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Mail size={18} />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            animate={visible ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <TiltCard tiltAmount={5}>
              {submitted ? (
                <div className="bg-white/5 border border-green-500/30 rounded-2xl p-12 text-center">
                  <motion.div
                    className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <CheckCircle size={36} className="text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                  <p className="text-slate-400">Thank you for reaching out. I'll get back to you shortly.</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8"
                >
                  <div className="space-y-5">
                    <div>
                      <label className="text-slate-300 text-sm font-medium mb-2 block">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium mb-2 block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium mb-2 block">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your project or opportunity..."
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none text-sm"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 font-bold rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02, translateZ: '20px', boxShadow: '0 20px 40px rgba(245,158,11,0.4)' }}
                      whileTap={{ scale: 0.98 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <Send size={18} />
                      Send Message
                    </motion.button>
                  </div>
                </form>
              )}
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
