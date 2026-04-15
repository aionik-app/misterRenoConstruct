'use client';

import { Menu, Phone, X, ArrowRight, ChevronRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SiteConfig } from '@/types/site-config';
import Image from 'next/image';

interface HeaderProps {
  config: SiteConfig;
}

export function Header({ config }: HeaderProps) {
  const[isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Mise à jour de la variable CSS pour la hauteur du header
  useEffect(() => {
    const update = () => {
      if (headerRef.current) {
        document.documentElement.style.setProperty(
          '--header-height',
          `${headerRef.current.offsetHeight}px`
        );
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (headerRef.current) ro.observe(headerRef.current);
    return () => ro.disconnect();
  }, [isScrolled]); // Ajout de isScrolled en dépendance pour maj après animation

  // Détection du scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  },[]);

  // Bloquer le scroll quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const navigation =[
    { name: 'ACCUEIL', href: '#hero' },
    { name: 'EXPERTISES', href: '#services' },
    { name: 'À PROPOS', href: '#about' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white shadow-xl' : 'bg-transparent'
        }`}
      >
        <div
          className={`max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between transition-all duration-500 ${
            isScrolled ? 'border-b border-slate-100 h-[65px] md:h-[75px]' : 'border-b border-white/10 h-[75px] md:h-[90px]'
          }`}
        >
          {/* LOGO - Côté Gauche */}
          <a href="/" className="flex items-center gap-2 sm:gap-3 md:gap-4 group shrink-0">
            <div
              className={`relative transition-all duration-500 ${
                isScrolled 
                  ? 'w-20 h-20 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-[60px] lg:h-[60px]' 
                  : 'w-20 h-20  sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[70px] lg:h-[70px]'
              }`}
            >
              <Image
                src={isScrolled ? '/logoNoir.png' : '/logo.png'}
                alt="Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-[10px] sm:text-xs md:text-sm lg:text-lg xl:text-xl leading-none transition-colors duration-500 ${
                  isScrolled ? 'text-slate-900' : 'text-white'
                }`}
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                MISTER RENOCONSTRUCT
              </span>
              <span className="text-[#e69938] text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] mt-0.5 md:mt-1">
                Excellence Construction
              </span>
            </div>
          </a>

          {/* NAV DESKTOP - Centré */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative text-[11px] font-bold tracking-[0.25em] transition-colors duration-500 group ${
                  isScrolled ? 'text-slate-800 hover:text-[#e69938]' : 'text-white/80 hover:text-white'
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#e69938] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* ACTIONS DESKTOP - Côté Droit */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            <a
              href={`tel:${config?.contact?.phone.replace(/\s+/g, '')}`}
              className={`flex items-center gap-2 xl:gap-3 group transition-colors ${
                isScrolled ? 'text-slate-800' : 'text-white'
              }`}
            >
              <div className={`w-8 h-8 xl:w-9 xl:h-9 rounded-full flex items-center justify-center transition-all ${
                isScrolled
                  ? 'bg-slate-50 border border-slate-100 group-hover:bg-[#e69938]/10 group-hover:border-[#e69938]/30'
                  : 'bg-white/10 border border-white/20 group-hover:bg-[#e69938]/20 group-hover:border-[#e69938]/40'
              }`}>
                <Phone className="h-3.5 w-3.5 xl:h-4 xl:w-4 text-[#e69938]" />
              </div>
              <span className="text-xs xl:text-sm font-bold tracking-tight">{config?.contact?.phone}</span>
            </a>

            <motion.a
              href="#contact"
              className="flex items-center gap-2 xl:gap-4 bg-[#e69938] text-white text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] px-5 py-2.5 xl:px-8 xl:py-3 rounded-sm shadow-lg shadow-[#e69938]/20"
              whileHover={{ scale: 1.02, backgroundColor: '#d4882e' }}
              whileTap={{ scale: 0.98 }}
            >
              Devis Gratuit
              <ArrowRight className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
            </motion.a>
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <button
            type="button"
            className={`lg:hidden p-1 sm:p-2 focus:outline-none transition-colors duration-500 ${
              isScrolled ? 'text-slate-900' : 'text-white'
            }`}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-7 w-7 sm:h-8 sm:w-8" />
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY - STYLE DARK PREMIUM */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header du Menu Mobile */}
            <div className="flex items-center justify-between px-6 py-6 sm:px-8 sm:py-8 border-b border-white/5 shrink-0">
              <div className="flex flex-col">
                <span className="text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.3em]">Navigation</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10 hover:bg-white/10 transition-colors"
                aria-label="Fermer le menu"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            {/* Liens de Navigation Mobile - Avec Scroll si l'écran est petit */}
            <nav className="flex-1 overflow-y-auto px-6 py-10 sm:px-10 sm:py-16 flex flex-col gap-6 sm:gap-8">
              {navigation.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-between text-white group"
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <span className="text-2xl sm:text-3xl md:text-4xl font-light uppercase tracking-tighter" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {item.name}
                  </span>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#e69938] transition-all">
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </motion.a>
              ))}
            </nav>

            {/* Footer du Menu Mobile */}
            <div className="p-6 sm:p-10 bg-[#0a0a0a] border-t border-white/5 flex flex-col gap-3 sm:gap-4 shrink-0">
              <a
                href={`tel:${config?.contact?.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-3 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-sm text-white font-bold tracking-widest text-xs sm:text-sm hover:bg-white/10 transition-colors"
              >
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#e69938]" />
                {config?.contact?.phone}
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 sm:gap-3 bg-[#e69938] text-white font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] py-3.5 sm:py-4 rounded-sm shadow-2xl text-xs sm:text-sm hover:bg-[#d4882e] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Lancer mon projet
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}