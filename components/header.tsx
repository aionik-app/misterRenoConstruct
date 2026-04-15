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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Mise à jour de la variable CSS pour la hauteur du header (utile pour le padding du reste du site)
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
  }, []);

  // Détection du scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquer le scroll quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const navigation = [
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
          className={`max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between transition-all duration-500 ${
            isScrolled ? 'border-b border-slate-100' : 'border-b border-white/10'
          }`}
          style={{ height: isScrolled ? '75px' : '80px' }}
        >
          {/* LOGO - Côté Gauche */}
          <a href="/" className="flex items-center  gap-3 md:gap-4 group shrink-0">
            <div
              className="relative transition-all  duration-500"
              style={{
                width: isScrolled ? '120px' : '105px',
                height: isScrolled ? '120px' : '105px',
              }}
            >
              <Image
                src={isScrolled ? '/logoNoir.png' : '/logo.png'}
                alt="Logo"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-bold uppercase tracking-[0.15em] text-xs md:text-lg lg:text-xl leading-none transition-colors duration-500 ${
                  isScrolled ? 'text-slate-900' : 'text-white'
                }`}
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                MISTER RENOCONSTRUCT
              </span>
              <span className="text-[#e69938] text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] mt-0.5 md:mt-1">
                Excellence Construction
              </span>
            </div>
          </a>

          {/* NAV DESKTOP - Centré */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
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
          <div className="hidden lg:flex items-center gap-6 xl:gap-10">
            <a
              href={`tel:${config?.contact?.phone.replace(/\s+/g, '')}`}
              className={`flex items-center gap-3 group transition-colors ${
                isScrolled ? 'text-slate-800' : 'text-white'
              }`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isScrolled
                  ? 'bg-slate-50 border border-slate-100 group-hover:bg-[#e69938]/10 group-hover:border-[#e69938]/30'
                  : 'bg-white/10 border border-white/20 group-hover:bg-[#e69938]/20 group-hover:border-[#e69938]/40'
              }`}>
                <Phone className="h-4 w-4 text-[#e69938]" />
              </div>
              <span className="text-sm font-bold tracking-tight">{config?.contact?.phone}</span>
            </a>

            <motion.a
              href="#contact"
              className="flex items-center gap-4 bg-[#e69938] text-white text-[11px] font-bold uppercase tracking-[0.2em] px-8 py-3 rounded-sm shadow-lg shadow-[#e69938]/20"
              whileHover={{ scale: 1.02, backgroundColor: '#d4882e' }}
              whileTap={{ scale: 0.98 }}
            >
              Devis Gratuit
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <button
            type="button"
            className={`lg:hidden p-2 focus:outline-none transition-colors duration-500 ${
              isScrolled ? 'text-slate-900' : 'text-white'
            }`}
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-8 w-8" />
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
            <div className="flex items-center justify-between px-8 py-8 border-b border-white/5">
              <div className="flex flex-col">
                <span className="text-white text-xs font-black uppercase tracking-[0.3em]">Navigation</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Liens de Navigation Mobile */}
            <nav className="flex-1 px-10 py-16 flex flex-col gap-8">
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
                  <span className="text-4xl font-light uppercase tracking-tighter" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {item.name}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#e69938] transition-all">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </motion.a>
              ))}
            </nav>

            {/* Footer du Menu Mobile */}
            <div className="p-10 bg-[#0a0a0a] border-t border-white/5 flex flex-col gap-4">
              <a
                href={`tel:${config?.contact?.phone}`}
                className="flex items-center justify-center gap-4 py-4 bg-white/5 border border-white/10 rounded-sm text-white font-bold tracking-widest text-sm"
              >
                <Phone className="h-4 w-4 text-[#e69938]" />
                {config?.contact?.phone}
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center gap-3 bg-[#e69938] text-white font-black uppercase tracking-[0.2em] py-4 rounded-sm shadow-2xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Lancer mon projet
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}