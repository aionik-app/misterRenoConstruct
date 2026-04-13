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

const IconMap: Record<string, React.ElementType> = {
  award: Award,
  'check-circle': CheckCircle,
  building: Building2,
  hammer: Hammer,
};

interface HeroProps {
  config: SiteConfig;
}

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
      onUpdate(val) { setDisplay(Math.floor(val)); },
    });
    return () => controls.stop();
  }, [isInView, num]);

  if (isNaN(num)) return <span ref={ref}>{value}</span>;
  const suffix = value.replace(/[\d]/g, '');
  return <span ref={ref}>{display}{suffix}</span>;
}

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
  const [statsHeight, setStatsHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(68);

  // Mesure hauteur réelle de la barre stats
  useEffect(() => {
    if (!statsRef.current) return;
    const ro = new ResizeObserver(([e]) => setStatsHeight(e.contentRect.height));
    ro.observe(statsRef.current);
    return () => ro.disconnect();
  }, []);

  // Lit --header-height exposée par le Header
  useEffect(() => {
    const read = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue('--header-height').trim();
      const n = parseFloat(v);
      if (!isNaN(n)) setHeaderHeight(n);
    };
    read();
    // Relit si la var change (scroll qui compresse le header)
    const id = setInterval(read, 300);
    return () => clearInterval(id);
  }, []);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], ['0%', '15%']);

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
      className="relative w-full overflow-hidden bg-slate-50 flex flex-col"
      // Occupe exactement 100dvh, stats ancrées en bas
      style={{ height: '100dvh', minHeight: '560px' }}
    >
      {/* ── IMAGE DE FOND ── */}
      <motion.div className="absolute inset-0 z-0 overflow-hidden" style={{ y: bgY }}>
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={config?.hero?.backgroundImage || '/Hero.jpg'}
            alt="Chantier Mister RenoConstruct"
            fill priority
            className="object-cover object-right"
            sizes="100vw"
          />
        </motion.div>
      </motion.div>

      {/* ── OVERLAYS ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
      </div>

      {/* ── TEXTURE ── */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      {/* ── LIGNE DÉCORATIVE ORANGE ── */}
      <motion.div
        className="absolute left-[calc(50%-1px)] top-0 bottom-0 z-[3] hidden lg:block"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(230,153,56,0.2), transparent)',
          width: 1,
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
      />

      {/*
        ── CONTENU PRINCIPAL ──
        flex-1 + flex col + justify-center : le contenu prend tout l'espace disponible
        entre le header et la barre stats.
        Les marges entre blocs utilisent clamp() : larges sur grand écran, mini sur SE.
      */}
      <div
        className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 overflow-hidden"
        style={{
          paddingTop: `${headerHeight + 12}px`,
          paddingBottom: `${statsHeight + 8}px`,
        }}
      >
        <motion.div
          className="max-w-3xl flex flex-col"
          // Pas de y transform ici — ça décalait le contenu hors écran sur petits formats
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >

          {/* Badges */}
          <motion.div
            className="flex flex-wrap items-center gap-2 sm:gap-3"
            style={{ marginBottom: 'clamp(0.5rem, 2vh, 1.25rem)' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-full shadow-sm">
              <HardHat className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#e69938]" />
              <span
                className="text-[#e69938] text-[9px] sm:text-[10px] font-bold uppercase tracking-widest"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Entreprise Générale du BTP
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 text-[9px] sm:text-[10px] font-medium">
              <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
              <span className="tracking-widest uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Intervention sur toute la région
              </span>
            </div>
          </motion.div>

          {/* H1 */}
          <div className="overflow-hidden" style={{ marginBottom: 'clamp(0.5rem, 1.5vh, 1rem)' }}>
            <motion.h1
              id={`hero-heading-${headingId}`}
              className="text-slate-900 font-bold leading-[1.05]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                // Sur SE (375px/590px) → ~2rem, desktop → 5rem
                fontSize: 'clamp(1.9rem, 5.5vw + 0.5vh, 5rem)',
                letterSpacing: '-0.02em',
              }}
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {heroTitle}
            </motion.h1>
          </div>

          {/* Ligne orange */}
          <motion.div
            className="h-[3px] w-16 sm:w-24 bg-gradient-to-r from-[#e69938] to-[#fcd288] rounded-full"
            style={{ marginBottom: 'clamp(0.5rem, 2vh, 1.5rem)' }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Description — masquée sur très petits écrans si nécessaire */}
          <motion.p
            className="text-slate-600 leading-relaxed max-w-xl"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              // Sur SE → 0.8rem, desktop → 1.1rem
              fontSize: 'clamp(0.8rem, 1.5vw + 0.3vh, 1.1rem)',
              fontWeight: 400,
              marginBottom: 'clamp(0.6rem, 2vh, 2rem)',
              // Limite à 4 lignes sur très petits écrans pour ne pas pousser les CTAs
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

          {/* Services tags — masqués sur hauteur < 620px pour préserver les CTAs */}
          <motion.div
            className="flex flex-wrap gap-1.5 sm:gap-3"
            style={{
              marginBottom: 'clamp(0.6rem, 2vh, 2rem)',
              // Sur iPhone SE (h≈590px) on cache les tags pour gagner de la place
              display: 'flex',
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {SERVICES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 border border-slate-200 bg-white/60 backdrop-blur-sm px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-slate-700 shadow-sm transition-all hover:border-[#e69938]/40 hover:bg-white"
              >
                <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-[#e69938] shrink-0" />
                <span
                  className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTAs — toujours visibles, jamais compressés */}
          <motion.div
            className="flex flex-col sm:flex-row gap-2.5 sm:gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <motion.a
              href={config?.hero?.ctaLink ?? '#contact'}
              className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#e69938] to-[#f97316] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-md font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-orange-500/20"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {config?.hero?.ctaText ?? 'Obtenir un devis gratuit'}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href={`tel:${config?.contact?.phone ?? ''}`}
              className="inline-flex items-center justify-center gap-2 border border-slate-300 bg-white/50 backdrop-blur-sm text-slate-700 px-6 sm:px-8 py-3 sm:py-3.5 rounded-md font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-white hover:border-slate-400 transition-colors shadow-sm"
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

      {/*
        ── BARRE DE STATS ──
        position: absolute + bottom: 0 → toujours collée en bas,
        n'influence pas le flux du contenu
      */}
      <motion.div
        ref={statsRef}
        className="absolute bottom-0 left-0 right-0 z-10 border-t border-slate-200 bg-white/85 backdrop-blur-lg"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 flex flex-row justify-between divide-x divide-slate-200">
          {stats.map((stat, index) => {
            const Icon = IconMap[stat.icon] || Hammer;
            return (
              <motion.div
                key={stat.id}
                className="flex flex-col justify-center py-3 sm:py-4 px-3 sm:px-8 flex-1 first:pl-0 last:pr-0"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center gap-1.5 sm:gap-2.5 mb-0.5">
                  <div className="p-1 sm:p-1.5 rounded-md bg-orange-50 text-[#e69938] shrink-0">
                    <Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                  </div>
                  <span
                    className="text-slate-900 font-bold leading-none"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      // Compact sur mobile pour tenir en une ligne
                      fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
                    }}
                  >
                    <Counter value={stat.value} />
                  </span>
                </div>
                <span
                  className="text-slate-500 uppercase font-bold tracking-widest pl-0.5"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 'clamp(7px, 1.5vw, 11px)',
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