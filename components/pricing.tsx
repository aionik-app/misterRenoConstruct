'use client';

import { motion, useInView } from 'framer-motion';
import { Check, HardHat, ArrowRight } from 'lucide-react';
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
      className="py-16 sm:py-24 relative overflow-hidden bg-[#050505]"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* En-tête */}
        <motion.div
          className="mb-16 flex flex-col items-center text-center"
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-6 border bg-white/5 border-white/10 backdrop-blur-md text-[#e69938]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <HardHat className="h-3.5 w-3.5" />
            Nos Formules
          </motion.div>
          
          <motion.h2
            variants={fadeUp}
            className="text-white font-extrabold leading-[1.1] mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              letterSpacing: '-0.02em',
            }}
          >
            {pricingConfig.title}
          </motion.h2>

          <motion.div
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8 } } }}
            className="h-[3px] w-24 bg-[#e69938] rounded-full mb-8"
          />

          {pricingConfig.subtitle && (
            <motion.p
              variants={fadeUp}
              className="text-slate-400 max-w-xl text-lg font-light leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {pricingConfig.subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Grille des tarifs */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 mt-8"
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={stagger}
        >
          {pricingConfig.tiers.map((tier) => (
            <motion.div key={tier.id} variants={fadeUp}>
              <div 
                className={`group h-full flex flex-col rounded-2xl border transition-all duration-500 relative ${
                  tier.highlighted 
                  ? 'border-[#e69938] border-2 bg-[#0a0a0a] shadow-[0_20px_50px_rgba(230,153,56,0.15)] md:scale-105 z-10' 
                  : 'border-white/10 bg-[#0a0a0a]/60 backdrop-blur-sm hover:border-white/20'
                }`}
              >
                {/* Effet de lueur pour la carte en avant */}
                {tier.highlighted && (
                  <div className="absolute inset-0 bg-[#e69938]/5 rounded-2xl pointer-events-none" />
                )}

                <div className="p-8 sm:p-10 flex flex-col h-full relative z-10">
                  {/* Titre & Description */}
                  <h3
                    className={`font-bold mb-3 ${tier.highlighted ? 'text-[#e69938]' : 'text-white'}`}
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem' }}
                  >
                    {tier.name}
                  </h3>
                  <p className="text-slate-400 text-sm font-light mb-8 leading-relaxed">
                    {tier.description}
                  </p>

                  {/* Prix */}
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-white font-black text-4xl sm:text-5xl italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="text-slate-500 text-xs font-black uppercase tracking-widest">{tier.period}</span>
                    )}
                  </div>

                  <div className="h-px bg-white/10 w-full mb-8" />

                  {/* Features */}
                  <ul className="space-y-4 mb-10 flex-grow">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 group/item">
                        <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 transition-colors ${tier.highlighted ? 'bg-[#e69938]/20 text-[#e69938]' : 'bg-white/5 text-white/40'}`}>
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="text-slate-300 text-sm font-light leading-snug group-hover/item:text-white transition-colors">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Bouton CTA */}
                  <motion.a
                    href={tier.ctaLink || '#contact'}
                    className={`inline-flex items-center justify-center gap-3 px-8 py-4 rounded-md text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                      tier.highlighted
                        ? 'bg-[#e69938] text-white shadow-xl shadow-orange-500/20 hover:bg-[#f97316]'
                        : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
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

        {/* Note de bas de page */}
        <motion.p 
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="text-center text-slate-500 text-xs mt-12 font-light italic"
        >
          * Prix indicatifs basés sur une étude technique préalable. Devis final après visite sur site.
        </motion.p>

      </div>
    </section>
  );
}