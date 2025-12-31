import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, Menu, X, ChevronDown, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

const Navbar: React.FC = () => {
  const { language, setLanguage } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const t = TRANSLATIONS[language];

  const langs: Language[] = ['EN', 'KZ', 'RU'];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const NavItem = ({ to, children, mobile = false }: { to: string, children: React.ReactNode, mobile?: boolean }) => (
    <NavLink 
      to={to} 
      onClick={() => mobile && setIsMenuOpen(false)}
      className={({ isActive }) => 
        mobile 
        ? `text-3xl font-display font-bold py-2 ${isActive ? 'text-neo-lime' : 'text-white/60'}`
        : `px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${isActive ? 'bg-neo-sand text-neo-dark' : 'text-white/70 hover:text-white'}`
      }
    >
      {children}
    </NavLink>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-2 md:px-4 pointer-events-none">
        <div className="bg-neo-dark/80 backdrop-blur-xl border border-white/10 rounded-full pl-3 pr-3 md:pl-6 md:pr-6 py-2 md:py-3 flex items-center justify-between md:justify-start gap-2 md:gap-8 shadow-2xl pointer-events-auto w-full md:w-auto max-w-7xl mx-auto">
          
          {/* Logo/Brand - Tablet+ */}
          <div className="hidden md:flex items-center gap-2 font-display font-black text-xl text-neo-lime tracking-tighter shrink-0">
            <Compass className="w-6 h-6" />
            <span>NOMAD</span>
          </div>

          {/* Mobile: Logo Icon + Hamburger */}
          <div className="md:hidden flex items-center justify-between w-full">
             <div className="flex items-center gap-2 font-display font-bold text-neo-lime">
                <Compass className="w-5 h-5" />
                <span>NOMAD</span>
             </div>
             <button 
                onClick={toggleMenu} 
                className="p-2 -mr-2 text-white hover:text-neo-lime transition-colors"
             >
                <Menu className="w-6 h-6" />
             </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 shrink-0">
            <NavItem to="/">{t.nav.home}</NavItem>
            <NavItem to="/map">{t.nav.map}</NavItem>
            <NavItem to="/planner">{t.nav.planner}</NavItem>
            <NavItem to="/tours">{t.nav.tours}</NavItem>
          </div>

          {/* Desktop Lang Switcher */}
          <div className="hidden md:flex items-center gap-0.5 md:gap-1 bg-black/20 rounded-full p-0.5 md:p-1 shrink-0">
              {langs.map((lang) => (
                  <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-bold transition-all ${
                          language === lang 
                          ? 'bg-neo-lime text-neo-dark shadow-lg' 
                          : 'text-white/50 hover:text-white'
                      }`}
                  >
                      {lang}
                  </button>
              ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-neo-dark flex flex-col p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-2 font-display font-black text-2xl text-neo-lime tracking-tighter">
                  <Compass className="w-8 h-8" />
                  <span>NOMAD</span>
                </div>
                <button 
                  onClick={toggleMenu}
                  className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-4 mb-auto">
              <NavItem mobile to="/">{t.nav.home}</NavItem>
              <NavItem mobile to="/map">{t.nav.map}</NavItem>
              <NavItem mobile to="/planner">{t.nav.planner}</NavItem>
              <NavItem mobile to="/tours">{t.nav.tours}</NavItem>
            </div>

            {/* Language Dropdown Area */}
            <div className="border-t border-white/10 pt-6">
                <p className="text-white/40 text-xs uppercase font-bold tracking-widest mb-4">Select Language</p>
                <div className="relative">
                    <button 
                        onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                        className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white font-bold text-lg"
                    >
                        <span className="flex items-center gap-3">
                            <span className="text-neo-lime">{language}</span>
                            <span className="text-sm font-normal text-white/50">
                                {language === 'EN' ? 'English' : language === 'KZ' ? 'Qazaqsha' : 'Русский'}
                            </span>
                        </span>
                        <ChevronDown className={`w-5 h-5 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isLangDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                exit={{ opacity: 0, y: -10, height: 0 }}
                                className="overflow-hidden bg-white/5 border border-white/10 rounded-xl mt-2"
                            >
                                {langs.map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => {
                                            setLanguage(lang);
                                            setIsLangDropdownOpen(false);
                                        }}
                                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`text-sm font-bold ${language === lang ? 'text-neo-lime' : 'text-white'}`}>{lang}</span>
                                        </div>
                                        {language === lang && <Check className="w-4 h-4 text-neo-lime" />}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;