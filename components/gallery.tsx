'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Eye, Leaf } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef } from 'react';
import type { SiteConfig } from '@/types/site-config';

interface GalleryV2Props {
  config: SiteConfig;
}

const categories = [
  { id: 'all', label: 'Tous les projets' },
  { id: 'amenagement', label: 'Aménagement' },
  { id: 'terrasse', label: 'Terrasses' },
  { id: 'tonte', label: 'Entretien' },
  { id: 'plantation', label: 'Plantation' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-[#a8c97f] text-xs font-semibold tracking-[0.22em] uppercase mb-4"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Leaf className="h-3 w-3" />
      {children}
    </span>
  );
}

export function Gallery({ config }: GalleryV2Props) {
  const [selected, setSelected] = useState('all');
  const [lightbox, setLightbox] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const filtered =
    selected === 'all'
      ? config.gallery.images
      : config.gallery.images.filter((img) => img.category === selected);

  return (
    <section
      id="gallery"
      ref={ref}
      className="py-24 relative overflow-hidden"
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

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          className="mb-12"
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Nos Réalisations</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-white font-bold leading-[1.05] mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
              letterSpacing: '-0.02em',
            }}
          >
            {config.gallery.title}
          </motion.h2>
          <motion.div
            variants={{ hidden: { scaleX: 0, originX: 0 }, show: { scaleX: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
            className="h-[2px] w-20 bg-gradient-to-r from-[#86bc42] to-[#b8d97f] rounded-full mb-6"
          />
          <motion.p
            variants={fadeUp}
            className="text-white/50 max-w-xl mb-10"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1rem' }}
          >
            Chaque projet est unique et reflète notre passion pour l'art du jardinage.
          </motion.p>

          {/* Filter pills */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setSelected(cat.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: '0.04em',
                  background: selected === cat.id ? 'linear-gradient(135deg, #86bc42, #b8d97f)' : 'rgba(255,255,255,0.05)',
                  color: selected === cat.id ? '#0f1f0a' : 'rgba(255,255,255,0.55)',
                  border: selected === cat.id ? 'none' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {cat.label}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Masonry grid */}
        <motion.div
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          <AnimatePresence>
            {filtered.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                className="break-inside-avoid"
              >
                <div
                  className="group relative overflow-hidden rounded-2xl cursor-pointer border border-white/5 hover:border-[#86bc42]/30 transition-colors duration-300"
                  onClick={() => setLightbox(image.url)}
                >
                  <Image
                    src={image.url || '/placeholder.svg?height=400&width=300&query=garden'}
                    alt={image.alt}
                    width={400}
                    height={index % 3 === 0 ? 320 : index % 3 === 1 ? 260 : 290}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                      index % 3 === 0 ? 'h-80' : index % 3 === 1 ? 'h-64' : 'h-72'
                    }`}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a08]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div>
                        <h3
                          className="text-white font-semibold text-base leading-tight"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {image.title}
                        </h3>
                        <span
                          className="text-[#a8c97f] text-xs"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {categories.find((c) => c.id === image.category)?.label}
                        </span>
                      </div>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#86bc42]/20 border border-[#86bc42]/40 backdrop-blur-sm">
                        <Eye className="h-3.5 w-3.5 text-[#86bc42]" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-white/40 py-16" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Aucun projet trouvé pour cette catégorie.
          </p>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={lightbox} alt="Aperçu" width={900} height={600} className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}