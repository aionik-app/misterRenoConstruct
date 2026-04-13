'use client';

import { Menu, Phone, X, ArrowRight, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SiteConfig } from '@/types/site-config';
import Image from 'next/image';

interface HeaderProps {
  config: SiteConfig;
}

export function Header({ config }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
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
        className="fixed bg-white top-0 left-0 right-0 z-40 transition-all duration-300 font-sans"
      >
        <div
          className="transition-all duration-300"
          style={{
            background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
            borderBottom: isScrolled ? '1px solid rgba(226, 232, 240, 0.8)' : '1px solid transparent',
            backdropFilter: isScrolled ? 'blur(12px)' : 'none',
            boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)' : 'none',
          }}
        >
          {/* Modification de la largeur max et des paddings pour aligner plus à gauche */}
          <div className="max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 flex items-center justify-between transition-all duration-300"
            style={{ height: isScrolled ? 72 : 96 }}>

            {/* ── Logo ── */}
            <a href="/" className="flex items-center gap-2 sm:gap-3 group">
              <div
                className="relative flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 transition-transform duration-300 group-hover:scale-105 shrink-0"
              >
                <Image
                  src={config?.branding?.logo || "/logo.png"}
                  alt={`Logo ${config?.branding?.companyName || 'Mister RenoConstruct'}`}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 768px) 100px, 148px"
                />
              </div>
              <div className="flex flex-col justify-center leading-tight">
                {/* Séparation du texte sur deux lignes */}
                <div
                  className="text-[#e69938] text-[10px] sm:text-[12px] font-bold uppercase tracking-[0.15em] mt-1 flex flex-col gap-0.5"
                >
                  <span>Construction</span>
                  <span>& Rénovation</span>
                </div>
              </div>
            </a>

            {/* ── Desktop nav ── */}
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

            {/* ── Right: phone + CTA ── */}
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
                className="inline-flex items-center gap-2 bg-[#e69938] shrink-0 text-white text-xs lg:text-sm font-bold uppercase tracking-wider px-5 py-2.5 lg:px-6 lg:py-3 rounded-md shadow-md shadow-orange-500/20"
                whileHover={{ scale: 1.02, backgroundColor: '#d98b2f' }}
                whileTap={{ scale: 0.98 }}
              >
                Devis gratuit
                <ArrowRight className="h-3.5 w-3.5" />
              </motion.a>
            </div>

            {/* ── Mobile burger ── */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-md border border-slate-200 bg-white text-slate-700 hover:border-[#e69938] hover:text-[#e69938] transition-colors shadow-sm"
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

      {/* ── Mobile full-screen menu ── */}
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
            {/* Header row inside menu */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="relative w-28 h-28 shrink-0">
                  <Image
                    src={config?.branding?.logo || "/logo.png"}
                    alt={`Logo ${config?.branding?.companyName || 'Mister RenoConstruct'}`}
                    fill
                    className="object-cover h-96 w-96"
                    sizes="80px"
                  />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-slate-900 font-extrabold tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem' }}>
                    {config?.branding?.companyName || "Mister Reno"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 rounded-md border border-slate-200 bg-white flex items-center justify-center text-slate-700 shadow-sm"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav links */}
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

            {/* Bottom Contact & CTA */}
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