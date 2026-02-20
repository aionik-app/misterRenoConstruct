'use client';

import { Quote, Star } from 'lucide-react';
import Image from 'next/image';
import { useId } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { SiteConfig } from '@/types/site-config';

interface TestimonialsProps {
  config: SiteConfig;
}

export function Testimonials({ config }: TestimonialsProps) {
  const sectionId = useId();
  const testimonialsConfig = config.testimonials;

  if (!testimonialsConfig?.enabled || !testimonialsConfig.items.length) {
    return null;
  }

  return (
    <section id={`testimonials-${sectionId}`} className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            Témoignages
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {testimonialsConfig.title}
          </h2>
          {testimonialsConfig.subtitle && (
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {testimonialsConfig.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsConfig.items.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-8">
                <Quote className="h-8 w-8 text-primary/30 mb-4" />

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={`${testimonial.id}-star-${i}`}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-3">
                  {testimonial.avatar ? (
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={44}
                      height={44}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    {testimonial.role && (
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
