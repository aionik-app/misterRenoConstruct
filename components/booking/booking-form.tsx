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

  // Formatage des données de la config
  const phoneLink = config.contact.phone.replace(/\s+/g, '');
  const startTime = config.booking?.workingHours?.start?.replace(':', 'h') || '08h00';
  const endTime = config.booking?.workingHours?.end?.replace(':', 'h') || '18h00';
  
  // Encodage de l'adresse pour Google Maps
  const mapQuery = encodeURIComponent(
    `${config.contact.address}, ${config.contact.postalCode} ${config.contact.city}, Belgique`
  );

  return (
    <section
      id="contact"
      ref={ref}
      className="py-16 sm:py-24 relative overflow-hidden bg-white"
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
            <MessageSquare className="h-3 w-3" />
            Contactez-nous
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-slate-900 font-extrabold leading-[1.1] mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
              letterSpacing: '-0.02em',
            }}
          >
            Discutons de votre projet
          </motion.h2>
          <motion.div
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8 } } }}
            className="h-[3px] w-16 bg-gradient-to-r from-[#e69938] to-[#fcd288] rounded-full mb-6 mx-auto"
          />
          <motion.p
            variants={fadeUp}
            className="text-slate-500 max-w-xl mx-auto font-light"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.1rem' }}
          >
            Une question ? Besoin d'un renseignement ou d'un devis ? N'hésitez pas à nous contacter
            directement via nos coordonnées ci-dessous.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={stagger}
        >
          {/* Colonne de gauche : Coordonnées */}
          <div className="space-y-6">
            {/* Carte Téléphone */}
            <motion.a
              href={`tel:${phoneLink}`}
              variants={fadeUp}
              className="group flex items-start gap-5 p-6 rounded-2xl bg-white border border-slate-100 shadow-lg shadow-orange-500/5 hover:border-orange-200 hover:shadow-orange-500/10 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#e69938] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem' }}>
                  Téléphone
                </h3>
                <p className="text-[#e69938] font-medium text-lg mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {config.contact.phone}
                </p>
                <div className="flex items-center gap-1.5 text-sm text-slate-500 font-light">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Lun - Ven, {startTime} - {endTime}</span>
                </div>
              </div>
            </motion.a>

            {/* Carte Email */}
            <motion.a
              href={`mailto:${config.contact.email}`}
              variants={fadeUp}
              className="group flex items-start gap-5 p-6 rounded-2xl bg-white border border-slate-100 shadow-lg shadow-orange-500/5 hover:border-orange-200 hover:shadow-orange-500/10 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#e69938] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem' }}>
                  Email
                </h3>
                <p className="text-[#e69938] font-medium text-lg mb-1 break-all" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {config.contact.email}
                </p>
                <p className="text-sm text-slate-500 font-light">
                  Nous vous répondons dans les plus brefs délais.
                </p>
              </div>
            </motion.a>

            {/* Carte Adresse */}
            <motion.div
              variants={fadeUp}
              className="group flex items-start gap-5 p-6 rounded-2xl bg-white border border-slate-100 shadow-lg shadow-orange-500/5 hover:border-orange-200 hover:shadow-orange-500/10 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#e69938] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem' }}>
                  Nos bureaux
                </h3>
                <p className="text-[#e69938] font-medium text-lg mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {config.contact.address}
                </p>
                <p className="text-sm text-slate-500 font-light">
                  {config.contact.postalCode} {config.contact.city}, Belgique
                </p>
              </div>
            </motion.div>
          </div>

          {/* Colonne de droite : Carte (Google Maps iframe) dynamique */}
          <motion.div
            variants={fadeUp}
            className="w-full h-[400px] lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 relative group"
          >
            {/* Overlay interactif optionnel (retiré au hover pour pouvoir scroller la map) */}
            <div className="absolute inset-0 bg-slate-900/5 pointer-events-none transition-opacity duration-300 group-hover:opacity-0 z-10" />
            
            <iframe
              src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full object-cover grayscale-[20%] contrast-[95%]"
              title="Carte de localisation"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}