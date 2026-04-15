'use client';

import { motion, useInView } from 'framer-motion';
import { Clock, Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import { useRef } from 'react';
import type { SiteConfig } from '@/types/site-config';

interface ContactProps {
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

export function ContactSection({ config }: ContactProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  // Formatage des données
  const phoneLink = config.contact.phone.replace(/\s+/g, '');
  const startTime = config.booking?.workingHours?.start?.replace(':', 'h') || '08h00';
  const endTime = config.booking?.workingHours?.end?.replace(':', 'h') || '18h00';
  
  const mapQuery = encodeURIComponent(
    `${config.contact.address}, ${config.contact.postalCode} ${config.contact.city}, Belgique`
  );

  return (
    <section
      id="contact"
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
            <MessageSquare className="h-3.5 w-3.5" />
            Contactez-nous
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
            Discutons de votre projet
          </motion.h2>

          <motion.div
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8 } } }}
            className="h-[3px] w-24 bg-[#e69938] rounded-full mb-8"
          />

          <motion.p
            variants={fadeUp}
            className="text-slate-400 max-w-xl mx-auto text-lg font-light leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Une question ? Besoin d'un devis gratuit ? Nos experts sont à votre écoute pour concrétiser vos idées.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch"
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={stagger}
        >
          {/* Colonne de gauche : Coordonnées (Dark Cards) */}
          <div className="space-y-6 flex flex-col justify-between">
            {/* Téléphone */}
            <motion.a
              href={`tel:${phoneLink}`}
              variants={fadeUp}
              className="group flex items-start gap-6 p-8 rounded-2xl border border-white/10 bg-[#0a0a0a] hover:bg-white/[0.04] hover:border-[#e69938]/40 transition-all duration-500 shadow-xl"
            >
              <div className="w-14 h-14 rounded-xl bg-[#e69938]/15 border border-[#e69938]/20 text-[#e69938] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                <Phone className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem' }}>
                  Téléphone
                </h3>
                <p className="text-[#e69938] font-black text-xl mb-2 italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {config.contact.phone}
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500 font-light">
                  <Clock className="h-4 w-4" />
                  <span>Lun - Ven, {startTime} - {endTime}</span>
                </div>
              </div>
            </motion.a>

            {/* Email */}
            <motion.a
              href={`mailto:${config.contact.email}`}
              variants={fadeUp}
              className="group flex items-start gap-6 p-8 rounded-2xl border border-white/10 bg-[#0a0a0a] hover:bg-white/[0.04] hover:border-[#e69938]/40 transition-all duration-500 shadow-xl"
            >
              <div className="w-14 h-14 rounded-xl bg-[#e69938]/15 border border-[#e69938]/20 text-[#e69938] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                <Mail className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem' }}>
                  Email
                </h3>
                <p className="text-[#e69938] font-black text-xl mb-2 break-all italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {config.contact.email}
                </p>
                <p className="text-sm text-slate-500 font-light">
                  Réponse garantie sous 24h à 48h.
                </p>
              </div>
            </motion.a>

            {/* Adresse */}
            <motion.div
              variants={fadeUp}
              className="group flex items-start gap-6 p-8 rounded-2xl border border-white/10 bg-[#0a0a0a] hover:bg-white/[0.04] transition-all duration-500 shadow-xl"
            >
              <div className="w-14 h-14 rounded-xl bg-[#e69938]/15 border border-[#e69938]/20 text-[#e69938] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                <MapPin className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem' }}>
                  Siège Social
                </h3>
                <p className="text-[#e69938] font-black text-xl mb-2 italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {config.contact.address}
                </p>
                <p className="text-sm text-slate-500 font-light">
                  {config.contact.postalCode} {config.contact.city}, Belgique
                </p>
              </div>
            </motion.div>
          </div>

          {/* Colonne de droite : Carte stylisée Dark */}
          <motion.div
            variants={fadeUp}
            className="w-full h-full min-h-[450px] rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl"
          >
            <iframe
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full object-cover"
              title="Carte de localisation"
            />
            {/* Overlay de finition pour l'aspect sombre */}
            <div className="absolute inset-0 pointer-events-none border-2 border-white/5 rounded-2xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}