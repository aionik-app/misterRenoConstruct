'use client';

import { motion, useInView } from 'framer-motion';
import { ArrowRight, HardHat } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import type { SiteConfig } from '@/types/site-config';

interface ServicesProps {
  config: SiteConfig;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export function Services({ config }: ServicesProps) {
  const ref = useRef(null);
  // Margin plus petit pour déclencher l'animation plus tôt
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  // 1 Grand en haut, les 3 autres en dessous
  const featured = config.services[0];
  const rest = config.services.slice(1);

  return (
    <section
      id="services"
      ref={ref}
      // Paddings réduits pour tenir sur un écran
      className="py-12 sm:py-16 relative overflow-hidden bg-white"
    >
      {/* Texture de grille très subtile */}
      <div
        className="absolute inset-0 opacity-[0.3] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(230,153,56,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(230,153,56,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* En-tête (plus compact) */}
        <motion.div
          className="mb-8 sm:mb-10 flex flex-col items-center text-center"
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
            Nos Domaines d'Intervention
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
            De la fondation à la finition
          </motion.h2>

          <motion.div
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8 } } }}
            className="h-[3px] w-16 bg-gradient-to-r from-[#e69938] to-[#fcd288] rounded-full mb-4"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={stagger}
          className="flex flex-col gap-6"
        >
          {/* GRANDE CARTE (Featured - Gros Oeuvre) */}
          {featured && (
            <motion.div variants={fadeUp} className="w-full">
              <div className="group relative overflow-hidden rounded-2xl h-[280px] sm:h-[360px] cursor-pointer shadow-lg">
                <Image
                  src={featured.image || '/placeholder.svg?height=400&width=1200&query=construction'}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
                
                {/* Prix en haut à droite */}
                <div className="absolute top-4 right-4">
                  <span className="bg-[#e69938] text-white px-3 py-1.5 rounded-md text-xs font-bold shadow-md">
                    {featured.price}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="max-w-2xl">
                    <h3
                      className="text-white font-bold mb-2"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}
                    >
                      {featured.title}
                    </h3>
                    <p className="text-slate-200 text-sm sm:text-base line-clamp-2 md:line-clamp-none font-light">
                      {featured.description}
                    </p>
                  </div>
                  <motion.a
                    href="#contact"
                    className="shrink-0 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-md text-sm font-bold uppercase tracking-wide hover:bg-white/20 transition-colors"
                  >
                    Découvrir
                    <ArrowRight className="h-4 w-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}

          {/* PETITES CARTES (HVAC, Elec, Finitions) - Alignées en 3 colonnes */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rest.map((service) => (
                <motion.div key={service.id} variants={fadeUp}>
                  <div className="group h-full flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1">
                    
                    {/* Image en haut */}
                    <div className="relative h-40 sm:h-48 overflow-hidden shrink-0">
                      <Image
                        src={service.image || '/placeholder.svg?height=200&width=400&query=renovation'}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="bg-white/95 text-slate-900 px-3 py-1 rounded-md text-[10px] sm:text-xs font-bold shadow-sm">
                          {service.price}
                        </span>
                      </div>
                    </div>

                    {/* Contenu en bas */}
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-md bg-orange-50 text-[#e69938] flex items-center justify-center text-lg shrink-0">
                          {service.icon}
                        </div>
                        <h3
                          className="text-slate-900 font-bold leading-tight"
                          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.1rem, 2vw, 1.3rem)' }}
                        >
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-slate-500 text-xs sm:text-sm line-clamp-3 mb-4 flex-grow font-light">
                        {service.description}
                      </p>
                      <motion.a
                        href="#contact"
                        className="inline-flex items-center gap-1.5 text-[#e69938] text-xs font-bold uppercase tracking-wider"
                        whileHover={{ x: 3 }}
                      >
                        En savoir plus <ArrowRight className="h-3.5 w-3.5" />
                      </motion.a>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}