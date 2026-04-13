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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const navigation = [
    { name: 'Accueil', href: '#hero' },
    { name: 'Expertises', href: '#services' },
    { name: 'À Propos', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-sans"
        style={{ overflow: 'visible' }}
      >
        <div
          className="transition-all duration-300"
          style={{
            background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255,255,255,0.92)',
            borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
            backdropFilter: 'blur(12px)',
            boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)' : 'none',
          }}
        >
          <div
            className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300"
            style={{ height: isScrolled ? 56 : 68 }}
          >
            <a href="/" className="flex items-center gap-2 sm:gap-3 group relative">
              <div
                className="relative shrink-0 transition-transform duration-300 group-hover:scale-105"
                style={{
                  width: 'clamp(72px, 10vw, 120px)',
                  height: 'clamp(72px, 10vw, 120px)',
                  marginBottom: isScrolled ? '-12px' : '-16px',
                }}
              >
                <Image
                  src={config?.branding?.logo || '/logo.png'}
                  alt={`Logo ${config?.branding?.companyName || 'Mister RenoConstruct'}`}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 768px) 72px, 120px"
                />
              </div>
              <div className="flex flex-col justify-center leading-tight">
                <div className="text-[#e69938] text-[10px] sm:text-[12px] font-bold uppercase tracking-[0.15em] flex flex-col gap-0.5">
                  <span>Construction</span>
                  <span>&amp; Rénovation</span>
                </div>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-2 lg:gap-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative px-3 py-2 text-slate-600 hover:text-slate-900 text-xs lg:text-sm font-bold uppercase tracking-wider transition-colors group"
                >
                  {item.name}
                  <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-[#e69938] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              <a
                href={`tel:${config?.contact?.phone}`}
                className="hidden lg:flex items-center gap-2 text-slate-500 hover:text-slate-900 text-xs lg:text-sm font-bold transition-colors"
              >
                <div className="p-1.5 rounded-full bg-slate-100 text-[#e69938]">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                {config?.contact?.phone}
              </a>
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 bg-[#e69938] shrink-0 text-white text-xs lg:text-sm font-bold uppercase tracking-wider px-5 py-2 lg:px-6 lg:py-2.5 rounded-md shadow-md shadow-orange-500/20"
                whileHover={{ scale: 1.02, backgroundColor: '#d98b2f' }}
                whileTap={{ scale: 0.98 }}
              >
                Devis gratuit
                <ArrowRight className="h-3.5 w-3.5" />
              </motion.a>
            </div>

            <button
              type="button"
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-md border border-slate-200 bg-white text-slate-700 hover:border-[#e69938] hover:text-[#e69938] transition-colors shadow-sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.span key="x"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span key="m"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-white flex flex-col"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="relative w-20 h-20 shrink-0">
                  <Image
                    src={config?.branding?.logo || '/logo.png'}
                    alt={`Logo ${config?.branding?.companyName || 'Mister RenoConstruct'}`}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
                <div className="flex flex-col leading-none">
                  <span
                    className="text-slate-900 font-extrabold tracking-tight"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem' }}
                  >
                    {config?.branding?.companyName || 'Mister Reno'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="w-9 h-9 rounded-md border border-slate-200 bg-white flex items-center justify-center text-slate-700 shadow-sm"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col px-6 py-8 gap-2 overflow-y-auto">
              {navigation.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-between py-4 text-slate-600 hover:text-[#e69938] group border-b border-slate-50 last:border-0"
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                >
                  <span
                    className="font-bold text-2xl tracking-tight"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {item.name}
                  </span>
                  <ChevronRight className="h-5 w-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <a
                href={`tel:${config?.contact?.phone}`}
                className="flex items-center justify-center gap-2 text-slate-600 text-sm font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="p-2 rounded-full bg-white shadow-sm text-[#e69938]">
                  <Phone className="h-4 w-4" />
                </div>
                {config?.contact?.phone}
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 bg-[#e69938] text-white font-bold uppercase tracking-wider py-4 rounded-md shadow-lg shadow-orange-500/20 w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Demander un devis
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
