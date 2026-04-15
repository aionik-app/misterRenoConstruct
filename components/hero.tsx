'use client';

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
} from 'framer-motion';
import {
  ArrowRight,
  Phone,
  Shield,
  Zap,
  Wrench,
  HardHat,
  CheckCircle,
  Building2,
  Award,
  Hammer,
} from 'lucide-react';
import Image from 'next/image';
import { useId, useRef, useState, useEffect } from 'react';
import type { SiteConfig } from '@/types/site-config';

/**
 * Mappage des icônes pour les statistiques
 */
const IconMap: Record<string, React.ElementType> = {
  award: Award,
  'check-circle': CheckCircle,
  building: Building2,
  hammer: Hammer,
};

interface HeroProps {
  config: SiteConfig;
}

/**
 * Composant de compteur animé avec détection de vue
 */
function Counter({ value }: { value: string }) {
  const num = parseInt(value.replace(/\D/g, ''), 10);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView || isNaN(num)) return;
    const controls = animate(0, num, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate(val) {
        setDisplay(Math.floor(val));
      },
    });
    return () => controls.stop();
  }, [isInView, num]);

  if (isNaN(num)) return <span ref={ref}>{value}</span>;
  const suffix = value.replace(/[\d]/g, '');
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/**
 * Liste des services mis en avant dans le Hero
 */
const SERVICES =[
  { icon: Building2, label: 'Gros œuvre' },
  { icon: Zap, label: 'Électricité' },
  { icon: Wrench, label: 'Chauffage' },
  { icon: Shield, label: 'Ventilation' },
];

export function Hero({ config }: HeroProps) {
  const headingId = useId();
  const containerRef = useRef<HTMLElement>(null);
  
  // Logique de parallaxe sur le background
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY,[0, 600], ['0%', '20%']);

  // Configuration par défaut si manquante
  const heroTitle = config?.hero?.title ?? 'Votre projet de A à Z, avec le patron sur chantier';
  const heroDescription =
    config?.hero?.description ??
    "Depuis 2013, Mister RenoConstruct centralise l'intégralité de vos travaux. Avec notre équipe à taille humaine, nous gérons nous-mêmes le gros œuvre, l'électricité, le chauffage, l'HVAC...";

  const stats = config?.hero?.stats?.length
    ? config.hero.stats
    :[
        { id: '1', value: '10+', label: "Ans d'expertise", icon: 'award' },
        { id: '2', value: '500+', label: 'Chantiers livrés', icon: 'building' },
        { id: '3', value: '100%', label: 'Clients satisfaits', icon: 'check-circle' },
      ];

  return (
    <section
      id="hero"
      ref={containerRef}
      aria-labelledby={`hero-heading-${headingId}`}
      // min-h-[100dvh] garantit qu'on prend au moins tout l'écran, 
      // mais on s'agrandit si le contenu mobile est trop imposant.
      className="relative w-full overflow-hidden bg-[#050505] flex flex-col min-h-[100dvh]"
    >
      {/* ── IMAGE DE FOND (Sombre & Contrastée) ── */}
      <motion.div 
        className="absolute inset-0 z-0 overflow-hidden" 
        style={{ y: bgY }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.45, scale: 1 }}
          transition={{ duration: 1.8, ease:[0.22, 1, 0.36, 1] }}
        >
          <Image
            src={config?.hero?.backgroundImage || '/Hero.jpg'}
            alt="Chantier Mister RenoConstruct"
            fill
            priority
            className="object-cover object-center md:object-right"
            sizes="100vw"
          />
        </motion.div>
      </motion.div>

      {/* ── OVERLAYS NOIR PROFOND ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent lg:from-[#050505] lg:via-[#050505]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </div>

      {/* ── TEXTURE NOISE ── */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── CONTENU PRINCIPAL ── */}
      <div
        className="relative z-10 flex-1 flex flex-col justify-center px-5 sm:px-10 lg:px-16"
        // Le padding top s'adapte dynamiquement à la hauteur de la navbar
        // Le padding bottom assure qu'on n'est pas collé aux stats
        style={{
          paddingTop: 'calc(var(--header-height, 80px) + 2rem)',
          paddingBottom: '3rem',
        }}
      >
        <motion.div
          className="max-w-3xl flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Badge Vibrant Orange */}
          <motion.div
            className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 bg-[#e69938]/15 border border-[#e69938]/30 px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md">
              <HardHat className="h-3.5 w-3.5 text-[#e69938]" />
              <span
                className="text-[#e69938] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Entreprise Générale du BTP
              </span>
            </div>
          </motion.div>

          {/* Titre Principal H1 */}
          <div className="overflow-hidden mb-4 sm:mb-6">
            <motion.h1
              id={`hero-heading-${headingId}`}
              className="text-white font-bold leading-[1.1] text-4xl sm:text-5xl lg:text-7xl"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '-0.02em',
              }}
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease:[0.16, 1, 0.3, 1] }}
            >
              {heroTitle}
            </motion.h1>
          </div>

          {/* Ligne de séparation Orange */}
          <motion.div
            className="h-[3px] w-16 sm:w-20 bg-[#e69938] mb-6 sm:mb-8"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.6, ease:[0.22, 1, 0.36, 1] }}
          />

          {/* Description */}
          <motion.p
            className="text-slate-300 leading-relaxed max-w-xl text-sm sm:text-base lg:text-lg mb-8 sm:mb-10"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
          >
            {heroDescription}
          </motion.p>

          {/* Tags Services */}
          <motion.div
            className="flex flex-wrap gap-2 sm:gap-3 mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {SERVICES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 border border-white/10 bg-[#0A0A0A]/60 backdrop-blur-md px-3 sm:px-4 py-2 rounded-lg text-white shadow-2xl transition-all hover:border-[#e69938]/50 hover:bg-white/10 group"
              >
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#e69938] shrink-0 group-hover:scale-110 transition-transform" />
                <span
                  className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest whitespace-nowrap"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Boutons d'appel à l'action */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <motion.a
              href={config?.hero?.ctaLink ?? '#contact'}
              className="group flex items-center justify-center gap-3 bg-[#e69938] text-white px-6 sm:px-10 py-4 rounded-md font-black text-xs sm:text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(230,153,56,0.3)] w-full sm:w-auto"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              whileHover={{ scale: 1.02, backgroundColor: '#f97316' }}
              whileTap={{ scale: 0.98 }}
            >
              {config?.hero?.ctaText ?? 'Obtenir un devis gratuit'}
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
            
            <motion.a
              href={`tel:${config?.contact?.phone?.replace(/\s+/g, '') ?? ''}`}
              className="flex items-center justify-center gap-2 border border-white/20 bg-transparent text-white px-6 sm:px-10 py-4 rounded-md font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-white/5 hover:border-white/40 transition-all shadow-sm w-full sm:w-auto"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#e69938]" />
              {config?.contact?.phone ?? 'Nous appeler'}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── BARRE DE STATISTIQUES (Flux Document, Pousse vers le bas) ── */}
      <motion.div
        className="relative z-10 w-full mt-auto border-t border-white/5 bg-[#050505]/95 backdrop-blur-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex flex-row divide-x divide-white/5">
          {stats.map((stat, index) => {
            const Icon = IconMap[stat.icon] || Hammer;
            return (
              <motion.div
                key={stat.id}
                className="flex flex-col justify-center py-5 sm:py-8 px-3 sm:px-8 flex-1 items-center sm:items-start text-center sm:text-left"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
              >
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                  <div className="p-1.5 rounded-md bg-[#e69938]/10 text-[#e69938] shrink-0 border border-[#e69938]/20">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span
                    className="text-white font-bold leading-none italic text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    <Counter value={stat.value} />
                  </span>
                </div>
                <span
                  className="text-slate-500 uppercase font-black tracking-widest text-[8px] sm:text-[10px]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}