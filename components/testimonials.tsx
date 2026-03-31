'use client';

import { motion, useInView } from 'framer-motion';
import { Leaf, Star } from 'lucide-react';
import Image from 'next/image';
import { useId, useRef } from 'react';
import type { SiteConfig } from '@/types/site-config';

interface TestimonialsProps {
  config: SiteConfig;
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

// Big decorative quote mark in SVG
function QuoteMark() {
  return (
    <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="mb-4 opacity-30">
      <path
        d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0L16 3.2C11.2 4.16 8.64 6.88 8.16 11.2H14.4V24H0ZM17.6 24V14.4C17.6 6.4 22.4 1.6 32 0L33.6 3.2C28.8 4.16 26.24 6.88 25.76 11.2H32V24H17.6Z"
        fill="#86bc42"
      />
    </svg>
  );
}

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

export function Testimonials({ config }: TestimonialsProps) {
  const sectionId = useId();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const testimonialsConfig = config.testimonials;

  if (!testimonialsConfig?.enabled || !testimonialsConfig.items.length) return null;

  return (
    <section
      id={`testimonials-${sectionId}`}
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
          className="mb-16"
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>L'Avis de Nos Clients</SectionLabel>
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
            {testimonialsConfig.title}
          </motion.h2>
          <motion.div
            variants={{ hidden: { scaleX: 0, originX: 0 }, show: { scaleX: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
            className="h-[2px] w-20 bg-gradient-to-r from-[#86bc42] to-[#b8d97f] rounded-full mb-6"
          />
          {testimonialsConfig.subtitle && (
            <motion.p
              variants={fadeUp}
              className="text-white/50 max-w-xl"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1rem' }}
            >
              {testimonialsConfig.subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonialsConfig.items.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className={i === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
            >
              <div
                className="group h-full rounded-3xl p-7 flex flex-col border border-white/5 hover:border-[#86bc42]/30 transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <QuoteMark />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      className={`h-3.5 w-3.5 ${
                        si < testimonial.rating
                          ? 'text-[#86bc42] fill-[#86bc42]'
                          : 'text-white/15'
                      }`}
                    />
                  ))}
                </div>

                {/* Content */}
                <p
                  className="text-white/60 leading-relaxed flex-1 mb-6"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.95rem' }}
                >
                  {testimonial.content}
                </p>

                {/* Separator */}
                <div className="h-px bg-white/10 mb-5" />

                {/* Author */}
                <div className="flex items-center gap-3">
                  {testimonial.avatar ? (
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover ring-2 ring-[#86bc42]/20"
                    />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full bg-[#86bc42]/10 border border-[#86bc42]/20 flex items-center justify-center flex-shrink-0"
                    >
                      <span
                        className="text-[#86bc42] font-bold text-base"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p
                      className="text-white font-semibold text-sm leading-none mb-1"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {testimonial.name}
                    </p>
                    {testimonial.role && (
                      <p
                        className="text-white/45 text-xs"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {testimonial.role}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}