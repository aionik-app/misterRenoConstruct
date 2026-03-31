'use client';

import { motion, useInView } from 'framer-motion';
import { Check, Leaf, Sparkles } from 'lucide-react';
import { useId, useRef } from 'react';
import type { SiteConfig } from '@/types/site-config';

interface PricingProps {
  config: SiteConfig;
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 sm:gap-2 text-[#a8c97f] text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase mb-3 sm:mb-4"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Leaf className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
      {children}
    </span>
  );
}

export function Pricing({ config }: PricingProps) {
  const sectionId = useId();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const pricingConfig = config.pricing;

  if (!pricingConfig?.enabled || !pricingConfig.tiers.length) return null;

  return (
    <section
      id={`pricing-${sectionId}`}
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
      style={{ background: '#0c1a08' }}
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(134,188,66,1) 1px, transparent 1px), linear-gradient(90deg, rgba(134,188,66,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <motion.div
          className="mb-10 sm:mb-12 lg:mb-16"
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Tarifs</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-white font-bold leading-[1.05] mb-3 sm:mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.8rem, 6vw, 4rem)',
              letterSpacing: '-0.02em',
            }}
          >
            {pricingConfig.title}
          </motion.h2>
          <motion.div
            variants={{ hidden: { scaleX: 0, originX: 0 }, show: { scaleX: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
            className="h-[2px] w-16 sm:w-20 bg-gradient-to-r from-[#86bc42] to-[#b8d97f] rounded-full mb-4 sm:mb-6"
          />
          {pricingConfig.subtitle && (
            <motion.p
              variants={fadeUp}
              className="text-white/50 max-w-xl"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}
            >
              {pricingConfig.subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Tiers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {pricingConfig.tiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <div
                className={`relative rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1 ${
                  tier.highlighted
                    ? 'border border-[#86bc42]/40 shadow-[0_0_40px_rgba(134,188,66,0.12)]'
                    : 'border border-white/5 hover:border-[#86bc42]/30'
                }`}
                style={{
                  background: tier.highlighted
                    ? 'linear-gradient(145deg, rgba(134,188,66,0.08) 0%, rgba(12,26,8,1) 60%)'
                    : 'rgba(255,255,255,0.03)',
                }}
              >
                {tier.highlighted && (
                  <div className="absolute top-3 right-3 sm:top-5 sm:right-5">
                    <span
                      className="inline-flex items-center gap-1 sm:gap-1.5 bg-[#86bc42]/15 border border-[#86bc42]/30 text-[#b8d97f] px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs"
                      style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.06em' }}
                    >
                      <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      <span className="hidden xs:inline">Populaire</span>
                      <span className="xs:hidden">Pop.</span>
                    </span>
                  </div>
                )}

                <div className="p-4 sm:p-7 pb-4 sm:pb-5">
                  <h3
                    className="text-white font-semibold mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.1rem, 3vw, 1.4rem)' }}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className="text-white/50 text-xs sm:text-sm mb-4 sm:mb-6"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                  >
                    {tier.description}
                  </p>

                  <div className="flex items-baseline gap-1 mb-4 sm:mb-6">
                    <span
                      className="text-white font-bold"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 2.8rem)', lineHeight: 1 }}
                    >
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span
                        className="text-white/40 text-xs sm:text-sm ml-1"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        /{tier.period}
                      </span>
                    )}
                  </div>

                  {/* Separator */}
                  <div className="h-px bg-white/10 mb-4 sm:mb-6" />

                  {/* Features */}
                  <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 sm:gap-3">
                        <div className="flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#86bc42]/15 border border-[#86bc42]/30 flex items-center justify-center mt-0.5">
                          <Check className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-[#86bc42]" />
                        </div>
                        <span
                          className="text-white/60 text-xs sm:text-sm leading-relaxed"
                          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-4 sm:px-7 pb-4 sm:pb-7 mt-auto">
                  <motion.a
                    href={tier.ctaLink || '#contact'}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center w-full rounded-full py-3 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all duration-200"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      letterSpacing: '0.04em',
                      ...(tier.highlighted
                        ? { background: 'linear-gradient(135deg, #86bc42 0%, #b8d97f 100%)', color: '#0f1f0a' }
                        : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }),
                    }}
                  >
                    {tier.ctaText || 'Demander un devis'}
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}