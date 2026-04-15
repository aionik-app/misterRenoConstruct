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
  MapPin,
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
const SERVICES = [
  { icon: Building2, label: 'Gros œuvre' },
  { icon: Zap, label: 'Électricité' },
  { icon: Wrench, label: 'Chauffage' },
  { icon: Shield, label: 'Ventilation' },
];

export function Hero({ config }: HeroProps) {
  const headingId = useId();
  const containerRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  // États pour la gestion dynamique des hauteurs
  const [statsHeight, setStatsHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(68);

  /**
   * Effet pour mesurer la hauteur réelle de la barre de statistiques
   */
  useEffect(() => {
    if (!statsRef.current) return;
    const ro = new ResizeObserver(([e]) => setStatsHeight(e.contentRect.height));
    ro.observe(statsRef.current);
    return () => ro.disconnect();
  }, []);

  /**
   * Effet pour lire la variable CSS du Header (--header-height)
   */
  useEffect(() => {
    const read = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue('--header-height')
        .trim();
      const n = parseFloat(v);
      if (!isNaN(n)) setHeaderHeight(n);
    };
    read();
    const id = setInterval(read, 300);
    return () => clearInterval(id);
  }, []);

  // Logique de parallaxe sur le background
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], ['0%', '20%']);

  // Configuration par défaut si manquante
  const heroTitle = config?.hero?.title ?? 'Mister RenoConstruct';
  const heroDescription =
    config?.hero?.description ??
    "Gros œuvre, électricité, chauffage, ventilation et finitions intérieures — livrés clés en main avec une exigence de chantier professionnelle.";

  const stats = config?.hero?.stats?.length
    ? config.hero.stats
    : [
        { id: '1', value: '15+', label: "Ans d'expérience", icon: 'building' },
        { id: '2', value: '250+', label: 'Chantiers livrés', icon: 'check-circle' },
        { id: '3', value: '100%', label: 'Garantie décennale', icon: 'award' },
      ];

  return (
    <section
      id="hero"
      ref={containerRef}
      aria-labelledby={`hero-heading-${headingId}`}
      className="relative w-full overflow-hidden bg-[#050505] flex flex-col"
      style={{ height: '100dvh', minHeight: '560px' }}
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
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={config?.hero?.backgroundImage || '/Hero.jpg'}
            alt="Chantier Mister RenoConstruct"
            fill
            priority
            className="object-cover object-right "
            sizes="100vw"
          />
        </motion.div>
      </motion.div>

      {/* ── OVERLAYS NOIR PROFOND ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Gradient latéral pour assurer la lisibilité du texte */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent lg:from-[#050505] lg:via-[#050505]/80" />
        {/* Gradient montant pour fusionner avec la barre de stats */}
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
        className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 overflow-hidden"
        style={{
          paddingTop: `${headerHeight + 20}px`,
          paddingBottom: `${statsHeight + 10}px`,
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
            className="flex flex-wrap items-center gap-2 sm:gap-3"
            style={{ marginBottom: 'clamp(1rem, 3vh, 1.5rem)' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 bg-[#e69938]/15 border border-[#e69938]/30 px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-md">
              <HardHat className="h-3.5 w-3.5 text-[#e69938]" />
              <span
                className="text-[#e69938] text-[10px] font-black uppercase tracking-[0.2em]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Entreprise Générale du BTP
              </span>
            </div>
          </motion.div>

          {/* Titre Principal H1 (Blanc Pur) */}
          <div className="overflow-hidden" style={{ marginBottom: 'clamp(0.75rem, 2vh, 1.25rem)' }}>
            <motion.h1
              id={`hero-heading-${headingId}`}
              className="text-white font-bold leading-[1.05]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.2rem, 6vw + 0.5vh, 5.5rem)',
                letterSpacing: '-0.02em',
              }}
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {heroTitle}
            </motion.h1>
          </div>

          {/* Ligne de séparation Orange */}
          <motion.div
            className="h-[3px] w-20 bg-[#e69938]"
            style={{ marginBottom: 'clamp(1rem, 2.5vh, 2rem)' }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Description (Slate Light / Gris clair) */}
          <motion.p
            className="text-slate-400 leading-relaxed max-w-xl"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(0.9rem, 1.6vw + 0.3vh, 1.15rem)',
              fontWeight: 400,
              marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
          >
            {heroDescription}
          </motion.p>

          {/* Tags Services (Effet Verre Sombre) */}
          <motion.div
            className="flex flex-wrap gap-2 sm:gap-3"
            style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)', display: 'flex' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {SERVICES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 rounded-lg text-white shadow-2xl transition-all hover:border-[#e69938]/50 hover:bg-white/10 group"
              >
                <Icon className="h-4 w-4 text-[#e69938] shrink-0 group-hover:scale-110 transition-transform" />
                <span
                  className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Boutons d'appel à l'action */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <motion.a
              href={config?.hero?.ctaLink ?? '#contact'}
              className="group inline-flex items-center justify-center gap-2 bg-[#e69938] text-white px-10 py-4 rounded-md font-black text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(230,153,56,0.3)]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              whileHover={{ scale: 1.02, backgroundColor: '#f97316' }}
              whileTap={{ scale: 0.98 }}
            >
              {config?.hero?.ctaText ?? 'Obtenir un devis gratuit'}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
            
            <motion.a
              href={`tel:${config?.contact?.phone ?? ''}`}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/20 bg-transparent text-white px-10 py-4 rounded-md font-black text-sm uppercase tracking-widest hover:bg-white/5 hover:border-white/40 transition-all shadow-sm"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="h-4 w-4 text-[#e69938]" />
              {config?.contact?.phone ?? 'Nous appeler'}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── BARRE DE STATISTIQUES (Noir sur Noir) ── */}
      <motion.div
        ref={statsRef}
        className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/5 bg-[#050505]/95 backdrop-blur-2xl"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-row justify-between divide-x divide-white/5">
          {stats.map((stat, index) => {
            const Icon = IconMap[stat.icon] || Hammer;
            return (
              <motion.div
                key={stat.id}
                className="flex flex-col justify-center py-6 sm:py-10 px-4 sm:px-8 flex-1 first:pl-0 last:pr-0 items-center sm:items-start"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-1.5">
                  <div className="p-1.5 rounded-md bg-[#e69938]/10 text-[#e69938] shrink-0 border border-[#e69938]/20">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span
                    className="text-white font-bold leading-none italic"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                    }}
                  >
                    <Counter value={stat.value} />
                  </span>
                </div>
                <span
                  className="text-slate-500 uppercase font-black tracking-[0.2em] pl-0.5"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 'clamp(8px, 1.2vw, 10px)',
                  }}
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