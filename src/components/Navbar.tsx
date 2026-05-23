import { useState, useEffect } from 'react';
import { Languages, Menu, X } from 'lucide-react';
import usePortfolioLanguage from './usePortfolioLanguage';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, content, toggleLanguage } = usePortfolioLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 text-white font-bold text-lg tracking-wide">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-900 font-black text-sm">
              AR
            </div>
            <span className="hidden sm:inline">{content.brand.name}</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {content.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-slate-300 hover:text-amber-400 transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={content.nav.switchLabel}
              className="ml-2 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 transition-colors hover:border-amber-500/30 hover:text-amber-400"
            >
              <Languages size={16} />
              <span className={language === 'en' ? 'text-white' : ''}>EN</span>
              <span className="text-slate-500">/</span>
              <span className={language === 'ar' ? 'text-white' : ''}>ع</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={content.nav.switchLabel}
              className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 text-xs text-slate-300"
            >
              <Languages size={14} />
              <span>{language === 'en' ? 'EN' : 'ع'}</span>
            </button>
            <button
              className="p-2 text-slate-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900/98 backdrop-blur-md border-t border-white/5">
          <div className="px-4 py-3 space-y-1">
            {content.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-sm text-slate-300 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                toggleLanguage();
                setIsMobileMenuOpen(false);
              }}
              className="flex w-full items-center justify-between px-3 py-2.5 text-sm text-slate-300 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-colors"
            >
              <span>{content.nav.switchLabel}</span>
              <span>{language === 'en' ? content.nav.languageNames.ar : content.nav.languageNames.en}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
