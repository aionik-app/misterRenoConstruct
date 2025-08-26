import { ArrowRight, Award, Leaf, Users } from 'lucide-react';
import Image from 'next/image';
import { useId } from 'react';
import { Button } from '@/components/ui/button';
import type { SiteConfig } from '@/types/site-config';

/*
variants_usage:
  split_classic: 1
  split_inverse: 1
  background_full_center: 1
  background_full_left: 1
  background_full_right: 1
  glass_center: 1
  glass_split: 1
  centered_minimal: 1
  banner_large: 1
  banner_inverted: 1
  gradient_background: 1
  pattern_background: 1
  video_background: 0
  overlay_transparent: 1
  circle_image: 1
  cards_grid: 1
  sidebar: 0
  multi_stage: 0
  asymetric: 0
  carousel: 0
  diagonal_split: 1
  clip_path: 0
current_variant: diagonal_split
*/

interface HeroProps {
  config: SiteConfig;
}

export function Hero({ config }: HeroProps) {
  const headingId = useId();
  return (
    <section
      id={`hero-${headingId}`}
      aria-label="Hero section"
      aria-labelledby={`hero-heading-${headingId}`}
      className="relative bg-background overflow-hidden"
    >
      {/* Variant: Diagonal Split */}
      {/* Mobile background (full) */}
      <div className="absolute inset-0 z-0 md:hidden">
        <Image
          src={
            config.hero.backgroundImage || '/placeholder.svg?height=1200&width=1200&query=garden'
          }
          alt="Paysage de jardin verdoyant au lever du soleil"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Desktop background (diagonal on the right) */}
      <div className="absolute inset-y-0 right-0 hidden w-[62%] md:block z-0">
        <div
          className="relative h-full w-full"
          style={{ clipPath: 'polygon(14% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
          aria-hidden
        >
          <Image
            src={
              config.hero.backgroundImage || '/placeholder.svg?height=1600&width=1200&query=garden'
            }
            alt="Vue diagonale d\'un jardin luxuriant"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 60vw, 100vw"
          />
          {/* Overlay to ensure contrast */}
          <div className="absolute inset-0 bg-background/40" />
        </div>
      </div>

      <div className="relative z-10 min-h-screen pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Content */}
            <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left gap-6 sm:gap-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Leaf className="h-4 w-4" />
                {config.hero.subtitle}
              </div>

              <div className="w-full max-w-3xl">
                <h1
                  id={`hero-heading-${headingId}`}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight break-words"
                >
                  {config.hero.title}
                </h1>
                <p className="mt-4 text-xl sm:text-2xl text-muted-foreground leading-relaxed break-words">
                  {config.hero.description}
                </p>
              </div>

              <div className="mt-2 sm:mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
                <Button size="lg" className="rounded-full text-lg px-8">
                  <a
                    href={config.hero.ctaLink}
                    aria-label={config.hero.ctaText}
                    className="flex items-center justify-center gap-2"
                  >
                    {config.hero.ctaText}
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full text-lg px-8 bg-transparent"
                >
                  <a href="#services">Découvrir nos services</a>
                </Button>
              </div>

              {/* Stats row */}
              <div className="mt-6 grid grid-cols-3 gap-4 sm:gap-6 w-full max-w-xl">
                <div className="flex items-center gap-3 rounded-xl bg-background/70 backdrop-blur px-4 py-3 ring-1 ring-primary/10">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-foreground">25+</div>
                    <div className="text-xs text-muted-foreground">Années</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-background/70 backdrop-blur px-4 py-3 ring-1 ring-primary/10">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-foreground">500+</div>
                    <div className="text-xs text-muted-foreground">Clients</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-background/70 backdrop-blur px-4 py-3 ring-1 ring-primary/10">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                    <Leaf className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-foreground">100%</div>
                    <div className="text-xs text-muted-foreground">Bio</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Spacer to align with diagonal image */}
            <div className="hidden md:block md:col-span-5" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
