'use client';

import { useEffect, useRef, useState } from 'react';
import { About } from '@/components/about';
import { BookingForm } from '@/components/booking/booking-form';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { Gallery } from '@/components/gallery';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Pricing } from '@/components/pricing';
import { Services } from '@/components/services';
import { Testimonials } from '@/components/testimonials';
import { reloadSiteConfig } from '@/lib/site-data';
import type { SiteConfig } from '@/types/site-config';

export default function HomePage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const lastFocusReload = useRef<number>(0);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const siteConfig = await reloadSiteConfig();
        setConfig(siteConfig);
      } catch (error) {
        console.error('Failed to load site configuration:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();

    // Throttle à 30s pour éviter les rechargements intempestifs pendant le formulaire de booking
    const handleFocus = () => {
      const now = Date.now();
      if (now - lastFocusReload.current > 30_000) {
        lastFocusReload.current = now;
        loadConfig();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">Erreur de configuration</h1>
          <p className="text-muted-foreground">Impossible de charger la configuration du site.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header config={config} />
      <main>
        <Hero config={config} />
        <Services config={config} />
        <About config={config} />
        <Testimonials config={config} />
        <Pricing config={config} />
        <Gallery config={config} />
        {config.booking?.enabled && (
          <section id="booking">
            <BookingForm config={config.booking} />
          </section>
        )}
      </main>
      <Footer config={config} />
    </div>
  );
}
