'use client';

import { motion, useInView } from 'framer-motion';
import { HardHat } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import type { SiteConfig } from '@/types/site-config';

interface ServicesProps {
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

export function Services({ config }: ServicesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  // 1 Grand en haut (Gros œuvre), les autres en dessous
  const featured = config.services[0];
  const rest = config.services.slice(1);

  return (
    <section
      id="services"
      ref={ref}
      className="py-16 sm:py-24 relative overflow-hidden bg-[#050505]"
    >
      {/* Halo lumineux subtil pour donner de la profondeur au noir */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* EN-TÊTE */}
        <motion.div
          className="mb-12 sm:mb-16 flex flex-col items-center text-center"
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/20 px-4 py-2 rounded-full backdrop-blur-xl mb-4"
          >
            <HardHat className="h-4 w-4 text-[#e69938]" />
            <span className="text-white text-[10px] font-black uppercase tracking-[0.25em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Nos Domaines d'Intervention
            </span>
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
            De la fondation à la finition
          </motion.h2>

          <motion.div
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8 } } }}
            className="h-[3px] w-24 bg-[#e69938] rounded-full"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={stagger}
          className="flex flex-col gap-10"
        >
          {/* GRANDE CARTE (Images 100% Couleur) */}
          {featured && (
            <motion.div variants={fadeUp} className="w-full">
              <div className="group relative overflow-hidden rounded-2xl h-[350px] sm:h-[480px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10">
                
                {/* Image : Vive et colorée */}
                <Image
                  src={featured.image || '/placeholder.svg'}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Gradient de lisibilité (uniquement en bas) */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
                
                {/* Badge Prix - Harmonisé en Noir / Verre dépoli */}
                <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
                  <span className="bg-[#050505]/90 backdrop-blur-md text-white border border-white/20 px-4 py-2 rounded-md text-[10px] font-black uppercase tracking-widest shadow-xl">
                    {featured.price}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-14 flex flex-col justify-end">
                  <div className="max-w-3xl">
                    <h3
                      className="text-white font-bold mb-3 sm:mb-4"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                    >
                      {featured.title}
                    </h3>
                    {/* line-clamp-3 sur mobile pour éviter le pavé de texte, texte complet sur PC */}
                    <p className="text-white/90 text-sm sm:text-lg lg:text-xl font-light leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {featured.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* PETITES CARTES (Dark Glass + Contrastes) */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {rest.map((service) => (
                <motion.div key={service.id} variants={fadeUp}>
                  <div className="group h-full flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-2 shadow-xl">
                    
                    {/* Image */}
                    <div className="relative h-56 sm:h-64 overflow-hidden shrink-0">
                      <Image
                        src={service.image || '/placeholder.svg'}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 z-10">
                        <span className="bg-[#050505]/90 backdrop-blur-md text-white border border-white/20 px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest">
                          {service.price}
                        </span>
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-6 sm:p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 mb-4 sm:mb-5">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#e69938]/10 border border-[#e69938]/20 text-[#e69938] flex items-center justify-center text-xl sm:text-2xl shrink-0">
                          {service.icon}
                        </div>
                        <h3
                          className="text-white font-bold leading-tight"
                          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.4rem, 2vw, 1.7rem)' }}
                        >
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-white/70 text-sm line-clamp-3 flex-grow font-light leading-relaxed">
                        {service.description}
                      </p>
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