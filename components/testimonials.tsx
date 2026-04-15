'use client';

import { motion, useInView } from 'framer-motion';
import { HardHat, Star } from 'lucide-react';
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

function QuoteMark() {
  return (
    <svg width="40" height="30" viewBox="0 0 32 24" fill="none" className="mb-6 opacity-20">
      <path
        d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0L16 3.2C11.2 4.16 8.64 6.88 8.16 11.2H14.4V24H0ZM17.6 24V14.4C17.6 6.4 22.4 1.6 32 0L33.6 3.2C28.8 4.16 26.24 6.88 25.76 11.2H32V24H17.6Z"
        fill="#e69938"
      />
    </svg>
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
      className="py-16 sm:py-24 relative overflow-hidden bg-[#050505]"
    >
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          className="mb-16 text-center sm:text-left flex flex-col sm:items-start items-center"
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-6 border bg-white/5 border-white/10 backdrop-blur-md text-[#e69938]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <HardHat className="h-3.5 w-3.5" />
            Témoignages Clients
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
            {testimonialsConfig.title}
          </motion.h2>

          <motion.div
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8 } } }}
            className="h-[3px] w-24 bg-[#e69938] rounded-full mb-8 origin-left"
          />

          {testimonialsConfig.subtitle && (
            <motion.p
              variants={fadeUp}
              className="text-slate-400 max-w-xl text-lg font-light leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {testimonialsConfig.subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsConfig.items.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="group h-full rounded-2xl p-8 flex flex-col border border-white/10 bg-[#0a0a0a] hover:bg-white/[0.04] hover:border-[#e69938]/30 transition-all duration-500 shadow-2xl relative"
              >
                <QuoteMark />

                {/* Stars */}
                <div className="flex gap-1.5 mb-6">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      className={`h-4 w-4 ${
                        si < testimonial.rating
                          ? 'text-[#e69938] fill-[#e69938]'
                          : 'text-white/10 fill-white/10'
                      }`}
                    />
                  ))}
                </div>

                {/* Content */}
                <p
                  className="text-slate-200 leading-relaxed flex-1 mb-8 italic font-light text-base"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  "{testimonial.content}"
                </p>

                {/* Separator */}
                <div className="h-px bg-white/5 mb-6" />

                {/* Author */}
                <div className="flex items-center gap-4">
                  {testimonial.avatar ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#e69938]/30">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-12 h-12 rounded-full bg-[#e69938]/10 border border-[#e69938]/20 flex items-center justify-center flex-shrink-0"
                    >
                      <span
                        className="text-[#e69938] font-bold text-xl"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p
                      className="text-white font-bold text-sm tracking-wide mb-1"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {testimonial.name}
                    </p>
                    {testimonial.role && (
                      <p
                        className="text-[#e69938] text-[10px] font-black uppercase tracking-widest"
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