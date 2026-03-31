'use client';

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import {
  ArrowRight,
  Award,
  CheckCircle,
  ThumbsUp,
  Leaf,
  Trees,
  MapPin,
} from 'lucide-react';
import Image from 'next/image';
import { useId, useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import type { SiteConfig } from '@/types/site-config';

const IconMap: Record<string, React.ElementType> = {
  award: Award,
  'check-circle': CheckCircle,
  'thumbs-up': ThumbsUp,
  leaf: Leaf,
};

interface HeroProps {
  config: SiteConfig;
}

// Floating leaf particle
function FloatingLeaf({ delay, x, duration }: { delay: number; x: number; duration: number }) {
  return (
    <motion.div
      className="absolute top-0 pointer-events-none"
      style={{ left: `${x}%` }}
      initial={{ y: -60, opacity: 0, rotate: -20 }}
      animate={{
        y: '110vh',
        opacity: [0, 0.6, 0.6, 0],
        rotate: ['-20deg', '40deg', '-10deg', '30deg'],
        x: [0, 30, -20, 15, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <Leaf className="h-4 w-4 text-green-400/40" />
    </motion.div>
  );
}

// Animated counter
function Counter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const num = parseInt(value.replace(/\D/g, ''), 10);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView || isNaN(num)) return;
    let start = 0;
    const step = num / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= num) {
        setDisplay(num);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, num]);

  if (isNaN(num)) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref}>
      {display}
      {value.replace(/[\d]/g, '')}
    </span>
  );
}

export function Hero({ config }: HeroProps) {
  const headingId = useId();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], ['0%', '25%']);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0.45, 0.7]);
  const contentY = useTransform(scrollY, [0, 400], ['0%', '8%']);

  const leaves = [
    { delay: 0, x: 10, duration: 12 },
    { delay: 3, x: 25, duration: 16 },
    { delay: 6, x: 45, duration: 14 },
    { delay: 1.5, x: 65, duration: 18 },
    { delay: 8, x: 80, duration: 11 },
    { delay: 4, x: 90, duration: 15 },
  ];

  /* ─── Animation variants ─── */
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  const lineGrow = {
    hidden: { scaleX: 0, originX: 0 },
    show: { scaleX: 1, transition: { duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      ref={containerRef}
      id={`hero-${headingId}`}
      aria-labelledby={`hero-heading-${headingId}`}
      className="relative flex items-center min-h-screen h-auto max-h-screen overflow-hidden"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      {/* ── Parallax Background ── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <Image
          src={config.hero.backgroundImage || '/placeholder.svg?height=1200&width=1920&query=lush+garden+brussels'}
          alt="Jardin aménagé à Bruxelles"
          fill
          priority
          className="object-cover scale-110"
          sizes="100vw"
        />
      </motion.div>

      {/* ── Overlay gradient ── */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{ opacity: overlayOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1f0a]/90 via-[#0f1f0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f0a]/70 via-transparent to-transparent" />
      </motion.div>

      {/* ── Texture grain overlay ── */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      {/* ── Floating leaves ── */}
      <div className="absolute inset-0 z-[3] overflow-hidden pointer-events-none">
        {leaves.map((l, i) => (
          <FloatingLeaf key={i} {...l} />
        ))}
      </div>

      {/* ── Decorative vertical line ── */}
      <motion.div
        className="absolute left-[calc(50%-1px)] top-0 bottom-0 z-[3] hidden lg:block"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(134,188,66,0.15), transparent)',
          width: 1,
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 1, ease: 'easeInOut' }}
      />

      {/* ── Main content ── */}
      <motion.div
        className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8 sm:py-10"
        style={{ y: contentY }}
      >
        <motion.div
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Location badge */}
          <motion.div variants={fadeLeft} className="mb-3 sm:mb-4">
            <span
              className="inline-flex items-center gap-1.5 text-[#a8c97f] text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.2em' }}
            >
              <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              <span className="hidden xs:inline">Bruxelles & environs</span>
              <span className="xs:hidden">Bruxelles</span>
            </span>
          </motion.div>

          {/* Subtitle pill */}
          <motion.div variants={fadeLeft} className="mb-3 sm:mb-4">
            <span
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#86bc42]/15 border border-[#86bc42]/30 text-[#b8d97f] px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-sm backdrop-blur-sm"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(0.65rem, 2vw, 0.78rem)', letterSpacing: '0.06em' }}
            >
              <Trees className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              {config.hero.subtitle}
            </span>
          </motion.div>

          {/* Heading — split into two lines for drama */}
          <motion.div variants={fadeUp} className="mb-2 overflow-hidden">
            <h1
              id={`hero-heading-${headingId}`}
              className="font-bold text-white leading-[1.05] sm:leading-[1.0]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2rem, 8vw, 5.2rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              {config.hero.title}
            </h1>
          </motion.div>

          {/* Animated underline accent */}
          <motion.div
            className="h-[2px] sm:h-[3px] w-16 sm:w-24 bg-gradient-to-r from-[#86bc42] to-[#b8d97f] rounded-full mb-4 sm:mb-5"
            variants={lineGrow}
          />

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="text-white/70 leading-relaxed mb-6 sm:mb-7 max-w-xl"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(0.9rem, 2.5vw, 1.15rem)',
              fontWeight: 300,
            }}
          >
            {config.hero.description}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
            {/* Primary CTA */}
            <motion.a
              href={config.hero.ctaLink}
              aria-label={config.hero.ctaText}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-6 py-3 sm:px-8 sm:py-4 text-xs sm:text-sm font-semibold text-[#0f1f0a]"
              style={{
                background: 'linear-gradient(135deg, #86bc42 0%, #b8d97f 100%)',
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: '0.04em',
              }}
            >
              {/* Shimmer */}
              <motion.span
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"
                animate={{ translateX: ['−100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
              />
              {config.hero.ctaText}
              <motion.span
                className="inline-flex"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </motion.span>
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="#services"
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.08)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 sm:px-8 sm:py-4 text-xs sm:text-sm font-medium text-white/80 backdrop-blur-sm transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.04em' }}
            >
              Nos services
            </motion.a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-10 sm:gap-y-6"
          >
            {config.hero.stats?.map((stat, i) => {
              const IconComponent = IconMap[stat.icon] || Leaf;
              return (
                <motion.div
                  key={stat.id}
                  className="flex items-center gap-2 sm:gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.15, duration: 0.5 }}
                >
                  {/* Icon bubble */}
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#86bc42]/15 border border-[#86bc42]/20">
                    <IconComponent className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#a8c97f]" />
                  </div>
                  <div className="flex flex-col leading-none">
                    <span
                      className="text-white font-bold text-lg sm:text-xl"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      <Counter value={stat.value} />
                    </span>
                    <span
                      className="text-white/50 text-[10px] sm:text-xs mt-0.5 sm:mt-1"
                      style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.05em' }}
                    >
                      {stat.label}
                    </span>
                  </div>
                  {/* Vertical separator */}
                  {i < (config.hero.stats?.length ?? 0) - 1 && (
                    <div className="hidden sm:block w-px h-8 sm:h-10 bg-white/10 ml-2 sm:ml-4" />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 sm:gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span
          className="text-white/30 text-[9px] sm:text-xs tracking-widest uppercase"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(0.5rem, 1.5vw, 0.65rem)' }}
        >
          Défiler
        </span>
        <motion.div
          className="w-px h-8 sm:h-12 bg-gradient-to-b from-[#86bc42]/60 to-transparent"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.7, 0.2, 0.7] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  );
}