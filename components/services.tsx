'use client';

import { motion, useInView } from 'framer-motion';
import { ArrowRight, Leaf } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import type { SiteConfig } from '@/types/site-config';

interface ServicesProps {
  config: SiteConfig;
}

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
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

export function Services({ config }: ServicesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const featured = config.services[0];
  const side = config.services.slice(1, 3);
  const rest = config.services.slice(3);

  return (
    <section
      id="services"
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
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Nos Expertises</SectionLabel>
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
            Services de Jardinage
          </motion.h2>
          <motion.div
            variants={{ hidden: { scaleX: 0, originX: 0 }, show: { scaleX: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
            className="h-[2px] w-16 sm:w-20 bg-gradient-to-r from-[#86bc42] to-[#b8d97f] rounded-full mb-4 sm:mb-6"
          />
          <motion.p
            variants={fadeUp}
            className="text-white/50 max-w-xl"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(0.9rem, 2vw, 1rem)', fontWeight: 300 }}
          >
            De la conception à l'entretien, nous transformons vos espaces extérieurs en œuvres naturelles.
          </motion.p>
        </motion.div>

        {/* Featured + Side grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 mb-4 sm:mb-5"
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={stagger}
        >
          {/* Featured card */}
          <motion.div variants={fadeUp} className="lg:col-span-8">
            <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl h-[320px] sm:h-[420px] cursor-pointer">
              <Image
                src={featured?.image || '/placeholder.svg?height=420&width=700&query=garden'}
                alt={featured?.title || 'Service'}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a08]/90 via-[#0c1a08]/30 to-transparent" />

              {/* Price tag */}
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5">
                <span
                  className="inline-block bg-[#86bc42]/20 border border-[#86bc42]/40 text-[#b8d97f] px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs backdrop-blur-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.06em' }}
                >
                  {featured?.price}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-7">
                <h3
                  className="text-white font-bold mb-2 leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.3rem, 4vw, 2.2rem)' }}
                >
                  {featured?.title}
                </h3>
                <p
                  className="text-white/60 text-xs sm:text-sm mb-3 sm:mb-5 line-clamp-2"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                >
                  {featured?.description}
                </p>
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-[#86bc42] text-xs sm:text-sm font-semibold group/btn"
                  style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.04em' }}
                  whileHover={{ x: 4 }}
                >
                  En savoir plus
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover/btn:translate-x-1" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Side cards */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-5">
            {side.map((service) => (
              <motion.div key={service.id} variants={fadeUp} className="flex-1">
                <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl h-full min-h-[160px] sm:min-h-[192px] cursor-pointer border border-white/5 hover:border-[#86bc42]/30 transition-colors duration-300"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div className="absolute inset-0 backdrop-blur-sm" />
                  <div className="relative p-4 sm:p-6 flex gap-3 sm:gap-4 h-full">
                    <div className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#86bc42]/10 border border-[#86bc42]/20 flex items-center justify-center text-base sm:text-xl">
                      {service.icon}
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <h3
                          className="text-white font-semibold mb-1 leading-snug"
                          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}
                        >
                          {service.title}
                        </h3>
                        <p
                          className="text-white/45 text-xs sm:text-sm line-clamp-3"
                          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                        >
                          {service.description}
                        </p>
                      </div>
                      <span
                        className="text-[#86bc42] text-xs sm:text-sm font-semibold mt-2 sm:mt-3 block"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {service.price}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom grid */}
        {rest.length > 0 && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-14"
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
          >
            {rest.map((service) => (
              <motion.div key={service.id} variants={fadeUp}>
                <div
                  className="group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer border border-white/5 hover:border-[#86bc42]/30 transition-all duration-300 hover:-translate-y-1"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div className="relative h-40 sm:h-44 overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
                    <Image
                      src={service.image || '/placeholder.svg?height=200&width=400&query=garden'}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a08]/80 to-transparent" />
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                      <span
                        className="inline-block bg-[#0c1a08]/70 border border-white/10 text-white/70 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs backdrop-blur-sm"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {service.price}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                      <span className="text-base sm:text-lg">{service.icon}</span>
                      <h3
                        className="text-white font-semibold"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1rem, 2.5vw, 1.15rem)' }}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <p
                      className="text-white/45 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-5"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                    >
                      {service.description}
                    </p>
                    <motion.a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 sm:gap-2 text-[#86bc42] text-xs sm:text-sm font-semibold"
                      style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.04em' }}
                      whileHover={{ x: 3 }}
                    >
                      Découvrir <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 sm:gap-3 rounded-full px-6 py-3 sm:px-8 sm:py-4 text-xs sm:text-sm font-semibold text-[#0f1f0a]"
            style={{
              background: 'linear-gradient(135deg, #86bc42 0%, #b8d97f 100%)',
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: '0.04em',
            }}
          >
            Obtenir un devis personnalisé
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}