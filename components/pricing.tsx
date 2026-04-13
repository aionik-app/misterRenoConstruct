'use client';

import { motion, useInView } from 'framer-motion';
import { Check, HardHat, Sparkles, ArrowRight } from 'lucide-react';
import { useId, useRef } from 'react';
import type { SiteConfig } from '@/types/site-config';

interface PricingProps {
  config: SiteConfig;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease:[0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export function Pricing({ config }: PricingProps) {
  const sectionId = useId();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const pricingConfig = config.pricing;

  if (!pricingConfig?.enabled || !pricingConfig.tiers.length) return null;

  return (
    <section
      id={`pricing-${sectionId}`}
      ref={ref}
      className="py-12 sm:py-16 relative overflow-hidden bg-white"
    >
      {/* Texture de grille orangée */}
      <div
        className="absolute inset-0 opacity-[0.3] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(230,153,56,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(230,153,56,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* En-tête */}
        <motion.div
          className="mb-12 sm:mb-16 flex flex-col items-center text-center"
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={stagger}
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-1.5 text-[#e69938] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <HardHat className="h-3 w-3" />
            Nos Formules
          </motion.span>
          
          <motion.h2
            variants={fadeUp}
            className="text-slate-900 font-extrabold leading-[1.1] mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              letterSpacing: '-0.02em',
            }}
          >
            {pricingConfig.title}
          </motion.h2>

          <motion.div
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8 } } }}
            className="h-[3px] w-16 bg-gradient-to-r from-[#e69938] to-[#fcd288] rounded-full mb-4"
          />

          {pricingConfig.subtitle && (
            <motion.p
              variants={fadeUp}
              className="text-slate-500 max-w-xl text-sm sm:text-base font-light"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {pricingConfig.subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Grille des tarifs */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mt-8"
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={stagger}
        >
          {pricingConfig.tiers.map((tier) => (
            <motion.div key={tier.id} variants={fadeUp}>
              {/* NOTE: overflow-hidden retiré pour laisser le badge déborder proprement */}
              <div 
                className={`group h-full flex flex-col rounded-2xl border transition-all duration-300 relative ${
                  tier.highlighted 
                  ? 'border-[#e69938] border-2 bg-white shadow-xl shadow-orange-500/10 md:scale-105 z-10' 
                  : 'border-slate-100 bg-white shadow-md hover:shadow-lg'
                }`}
              >
                {/* Badge "Recommandé" chevauchant la bordure supérieure */}
                {tier.highlighted && (
                  <div className="absolute top-0 right-6 sm:right-8 -translate-y-1/2 z-20">

                  </div>
                )}

                <div className="p-6 sm:p-8 flex flex-col h-full">
                  {/* Titre & Description */}
                  <h3
                    className="text-slate-900 font-bold mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem' }}
                  >
                    {tier.name}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm font-light mb-6">
                    {tier.description}
                  </p>

                  {/* Prix */}
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-[#e69938] font-bold text-3xl sm:text-4xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="text-slate-400 text-sm font-light">/{tier.period}</span>
                    )}
                  </div>

                  <div className="h-px bg-slate-100 w-full mb-6" />

                  {/* Features */}
                  <ul className="space-y-3.5 mb-8 flex-grow">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="shrink-0 w-5 h-5 rounded-full bg-orange-50 flex items-center justify-center mt-0.5">
                          <Check className="h-3 w-3 text-[#e69938]" />
                        </div>
                        <span className="text-slate-600 text-sm font-light leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Bouton CTA */}
                  <motion.a
                    href={tier.ctaLink || '#contact'}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                      tier.highlighted
                        ? 'bg-[#e69938] text-white shadow-md shadow-orange-500/20 hover:bg-[#d98b2f]'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tier.ctaText || 'Demander un devis'}
                    <ArrowRight className="h-4 w-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}