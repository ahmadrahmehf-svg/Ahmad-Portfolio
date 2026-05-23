import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Download,
} from 'lucide-react';
import usePortfolioLanguage from './usePortfolioLanguage';
import { downloadPortfolioPdf } from './downloadPortfolioPdf';

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  const { content, isArabic, language } = usePortfolioLanguage();
  const hero = content.hero;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDownloadPdf = async () => {
    if (isDownloading) return;

    try {
      setIsDownloading(true);
      setDownloadError('');
      await downloadPortfolioPdf(language === 'ar' ? 'ahmad-rahmeh-portfolio-ar.pdf' : 'ahmad-rahmeh-portfolio-en.pdf');
    } catch (error) {
      console.error(error);
      setDownloadError(
        language === 'ar'
          ? 'تعذر إنشاء ملف PDF. حاول مرة أخرى.'
          : 'Failed to generate the PDF. Please try again.'
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900"
      style={{ perspective: '1200px' }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ opacity: 0.15 }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500 rounded-full blur-3xl"
            animate={{
              x: [0, -20, 0],
              y: [0, 30, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            style={{ opacity: 0.1 }}
          />
        </div>
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating 3D Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20 backdrop-blur-sm"
        animate={{
          rotateX: [0, 15, 0, -15, 0],
          rotateY: [0, -15, 0, 15, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          transformStyle: 'preserve-3d',
          translateZ: '50px',
        }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 backdrop-blur-sm"
        animate={{
          rotateX: [0, -20, 0, 20, 0],
          rotateY: [0, 20, 0, -20, 0],
          y: [0, 15, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/20 backdrop-blur-sm"
        animate={{
          rotateZ: [0, 90, 180, 270, 360],
          y: [0, -15, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        style={{ transformStyle: 'preserve-3d' }}
      />

      <div
        className={`relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Photo with 3D effect */}
        <motion.div
          className="mb-8 inline-block"
          style={{
            rotateX: mousePos.y * 0.5,
            rotateY: mousePos.x * 0.5,
            transformStyle: 'preserve-3d',
          }}
          initial={{ scale: 0, rotateY: 180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
        >
          <div className="relative">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-1.5 mx-auto shadow-2xl shadow-amber-500/30">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
                <img
                  src="images/ahmad.jpeg"
                  alt={hero.photoAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* 3D floating badge */}
            <motion.div
              className={`absolute -bottom-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg ${
                isArabic ? '-left-2 sm:-left-1' : '-right-2 sm:-right-1'
              }`}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformStyle: 'preserve-3d', translateZ: '30px' }}
            >
              {hero.available}
            </motion.div>
          </div>
        </motion.div>

        {/* Name with 3D text effect */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight"
          style={{
            textShadow: '0 4px 30px rgba(0,0,0,0.3)',
            transformStyle: 'preserve-3d',
          }}
          initial={{ opacity: 0, rotateX: -30 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {hero.firstName}{' '}
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
            {hero.lastName}
          </span>
        </motion.h1>

        {/* Title */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="h-px w-8 bg-amber-500/50" />
          <p className="text-lg sm:text-xl text-slate-300 font-medium tracking-wide">
            {hero.title}
          </p>
          <div className="h-px w-8 bg-amber-500/50" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {hero.tagline}
        </motion.p>

        {/* Contact Quick Links */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {[Phone, Mail, MapPin].map((Icon, i) => {
            const item = hero.quickLinks[i];

            return (
            <motion.a
              key={i}
              href={item.href}
              aria-label={item.label}
              title={item.label}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-slate-300 hover:text-amber-400 hover:border-amber-500/30 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05, translateZ: '20px' }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Icon size={16} />
              <span className="text-sm">{item.text}</span>
            </motion.a>
            );
          })}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <motion.a
            href="#contact"
            className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 font-bold rounded-xl shadow-lg shadow-amber-500/25"
            whileHover={{ scale: 1.05, translateZ: '30px', boxShadow: '0 20px 40px rgba(245,158,11,0.4)' }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {hero.primaryCta}
          </motion.a>
          <motion.a
            href="#experience"
            className="px-8 py-3.5 bg-white/5 border border-white/15 text-white font-semibold rounded-xl flex items-center gap-2"
            whileHover={{ scale: 1.05, translateZ: '30px', backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {hero.secondaryCta}
            <ChevronDown size={16} />
          </motion.a>
          <motion.button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="px-8 py-3.5 bg-white/5 border border-white/15 text-white font-semibold rounded-xl flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            whileHover={{ scale: isDownloading ? 1 : 1.05, translateZ: '30px', backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: isDownloading ? 1 : 0.95 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Download size={16} />
            {isDownloading ? hero.downloadingCta : hero.downloadCta}
          </motion.button>
        </motion.div>
        {downloadError && (
          <p className="mt-4 text-sm text-rose-300">
            {downloadError}
          </p>
        )}

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="text-slate-500" size={24} />
        </motion.div>
      </div>
    </section>
  );
}
