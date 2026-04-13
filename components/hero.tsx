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

// Composant compteur animé (avec framer-motion 'animate')
function Counter({ value }: { value: string }) {
  // Extrait uniquement le nombre (ex: "500+" devient 500)
  const num = parseInt(value.replace(/\D/g, ''), 10);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const[display, setDisplay] = useState(0);
  
  useEffect(() => {
    if (!isInView || isNaN(num)) return;
    
    // Animation Framer Motion native pour les chiffres
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
  
  // Recompose le texte (ex: 500 + "+")
  const suffix = value.replace(/[\d]/g, '');
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// Services mis en avant sous le texte
const SERVICES =[
  { icon: Building2, label: 'Gros œuvre' },
  { icon: Zap, label: 'Électricité' },
  { icon: Wrench, label: 'Chauffage' },
  { icon: Shield, label: 'Ventilation' },
];

export function Hero({ config }: HeroProps) {
  const headingId = useId();
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], ['0%', '15%']);
  const contentY = useTransform(scrollY, [0, 400], ['0%', '6%']);

  // Valeurs par défaut sécurisées via la config JSON
  const heroTitle = config?.hero?.title ?? 'Mister RenoConstruct';
  const heroDescription = config?.hero?.description ?? "Gros œuvre, électricité, chauffage, ventilation et finitions intérieures — livrés clés en main avec une exigence de chantier professionnelle.";

  const stats = config?.hero?.stats?.length ? config.hero.stats :[
    { id: '1', value: '15+', label: "Ans d'expérience", icon: 'building' },
    { id: '2', value: '250+', label: 'Chantiers livrés', icon: 'check-circle' },
    { id: '3', value: '100%', label: 'Garantie décennale', icon: 'award' },
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      aria-labelledby={`hero-heading-${headingId}`}
      // h-[100dvh] s'assure de prendre EXACTEMENT l'écran (bureau comme mobile)
      className="relative w-full h-[100dvh] min-h-[700px] overflow-hidden bg-slate-50 flex flex-col"
    >
      {/* ── IMAGE DE FOND (avec effet parallaxe) ── */}
      <motion.div className="absolute inset-0 z-0 overflow-hidden" style={{ y: bgY }}>
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, y: 60, scale: 1.1 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={config?.hero?.backgroundImage || "/Hero.jpg"}
            alt="Chantier Mister RenoConstruct"
            fill
            priority
            className="object-cover object-right"
            sizes="100vw"
          />
        </motion.div>
      </motion.div>

      {/* ── OVERLAYS DE LISIBILITÉ ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
      </div>

      {/* ── TEXTURE SUBTILE ── */}
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

      {/* ── CONTENU PRINCIPAL ── */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-24 pb-8"
        style={{ y: contentY }}
      >
        <div className="max-w-3xl">
          {/* Badges hauts */}
          <motion.div
            className="flex flex-wrap items-center gap-3 mb-5 sm:mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-full shadow-sm">
              <HardHat className="h-3.5 w-3.5 text-[#e69938]" />
              <span 
                className="text-[#e69938] text-[10px] sm:text-xs font-bold uppercase tracking-widest"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Entreprise Générale du BTP
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 text-[10px] sm:text-xs font-medium">
              <MapPin className="h-3.5 w-3.5" />
              <span className="tracking-widest uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Intervention sur toute la région
              </span>
            </div>
          </motion.div>

          {/* Titre (H1) */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              id={`hero-heading-${headingId}`}
              className="text-slate-900 font-bold leading-[1.05]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.5rem, 6.5vw, 5rem)',
                letterSpacing: '-0.02em',
              }}
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {heroTitle}
            </motion.h1>
          </div>

          {/* Ligne accentuée orange */}
          <motion.div
            className="h-[3px] w-20 sm:w-28 bg-gradient-to-r from-[#e69938] to-[#fcd288] rounded-full mb-6 shadow-sm"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.0, duration: 0.6, ease:[0.22, 1, 0.36, 1] }}
          />

          {/* Paragraphe descriptif */}
          <motion.p
            className="text-slate-600 leading-relaxed max-w-xl mb-8"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
              fontWeight: 400,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
          >
            {heroDescription}
          </motion.p>

          {/* Mini-tags Services */}
          <motion.div
            className="flex flex-wrap gap-2 sm:gap-3 mb-8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            {SERVICES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 border border-slate-200 bg-white/60 backdrop-blur-sm px-3.5 py-2 rounded-lg text-slate-700 shadow-sm transition-all hover:border-[#e69938]/40 hover:bg-white"
              >
                <Icon className="h-4 w-4 text-[#e69938]" />
                <span
                  className="text-[10px] sm:text-xs font-bold uppercase tracking-wider"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Boutons (CTAs) */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <motion.a
              href={config?.hero?.ctaLink ?? '#contact'}
              className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#e69938] to-[#f97316] text-white px-8 py-3.5 sm:py-4 rounded-md font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-orange-500/20"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {config?.hero?.ctaText ?? 'Obtenir un devis gratuit'}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href={`tel:${config?.contact?.phone ?? ''}`}
              className="inline-flex items-center justify-center gap-2 border border-slate-300 bg-white/50 backdrop-blur-sm text-slate-700 px-8 py-3.5 sm:py-4 rounded-md font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-white hover:border-slate-400 transition-colors shadow-sm"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="h-4 w-4 text-[#e69938]" />
              {config?.contact?.phone ?? 'Nous appeler'}
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* ── BARRE DE STATISTIQUES (FIXÉE EN BAS GRÂCE AU FLEX) ── */}
      <motion.div
        className="relative z-10 shrink-0 border-t border-slate-200 bg-white/80 backdrop-blur-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row justify-between divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
          {stats.map((stat, index) => {
            const Icon = IconMap[stat.icon] || Hammer;
            return (
              <motion.div
                key={stat.id}
                className="flex flex-col justify-center py-4 sm:py-5 sm:px-8 flex-1 first:pl-0 last:pr-0"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="p-1.5 rounded-md bg-orange-50 text-[#e69938]">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                  </div>
                  <span
                    className="text-slate-900 font-bold leading-none"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                    }}
                  >
                    <Counter value={stat.value} />
                  </span>
                </div>
                <span
                  className="text-slate-500 text-[10px] sm:text-xs uppercase font-bold tracking-widest pl-1"
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