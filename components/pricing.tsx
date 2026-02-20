'use client';

import { Check } from 'lucide-react';
import { useId } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { SiteConfig } from '@/types/site-config';

interface PricingProps {
  config: SiteConfig;
}

export function Pricing({ config }: PricingProps) {
  const sectionId = useId();
  const pricingConfig = config.pricing;

  if (!pricingConfig?.enabled || !pricingConfig.tiers.length) {
    return null;
  }

  return (
    <section id={`pricing-${sectionId}`} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            Tarifs
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {pricingConfig.title}
          </h2>
          {pricingConfig.subtitle && (
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {pricingConfig.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {pricingConfig.tiers.map((tier) => (
            <Card
              key={tier.id}
              className={`relative border-0 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col ${
                tier.highlighted ? 'ring-2 ring-primary scale-[1.02]' : ''
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Populaire
                </div>
              )}
              <CardHeader className="text-center pb-2 pt-8">
                <h3 className="text-xl font-bold text-foreground mb-2">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                  {tier.period && (
                    <span className="text-muted-foreground text-sm">/{tier.period}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col pt-6">
                <ul className="space-y-3 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-6">
                  <Button
                    variant={tier.highlighted ? 'default' : 'outline'}
                    className="w-full rounded-full"
                    asChild
                  >
                    <a href={tier.ctaLink || '#contact'}>{tier.ctaText || 'Demander un devis'}</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
