import { promises as fs } from 'fs';
import { type NextRequest, NextResponse } from 'next/server';
import path from 'path';
import type { SiteConfig } from '@/types/site-config';

const CONFIG_PATH = path.join(process.cwd(), 'data', 'site-config.json');

/**
 * Mapping des données du formulaire Aionik vers site-config.json.
 *
 * Corps attendu (JSON) — tous les champs sont optionnels sauf companyName :
 * {
 *   "companyName": "Mon Entreprise",
 *   "description": "Description de l'activité",
 *   "logo": "https://...",
 *   "primaryColor": "#14532d",
 *   "secondaryColor": "#86efac",
 *   "pages": ["accueil","services","about","contact","gallery","testimonials","pricing"],
 *   "features": { "booking": true },
 *   "contact": { "phone": "...", "email": "...", "address": "...", "city": "...", "postalCode": "..." }
 * }
 */

interface AionikFormData {
  companyName: string;
  description?: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  pages?: string[];
  features?: { booking?: boolean };
  contact?: {
    phone?: string;
    email?: string;
    address?: string;
    city?: string;
    postalCode?: string;
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function buildConfig(data: AionikFormData): SiteConfig {
  const pages = data.pages || ['accueil', 'services', 'about', 'contact'];

  const config: SiteConfig = {
    version: 'v1',
    metadata: {
      title: `${data.companyName} - Services Professionnels`,
      description:
        data.description ||
        `Bienvenue chez ${data.companyName}. Découvrez nos services professionnels.`,
      keywords: [],
    },
    branding: {
      companyName: data.companyName,
      logo:
        data.logo ||
        'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=80&fit=crop',
      favicon: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=32&h=32&fit=crop',
    },
    theme: {
      primary: data.primaryColor || '#14532d',
      secondary: data.secondaryColor || '#86efac',
    },
    contact: {
      phone: data.contact?.phone || '',
      email: data.contact?.email || `contact@${slugify(data.companyName)}.com`,
      address: data.contact?.address || '',
      city: data.contact?.city || '',
      postalCode: data.contact?.postalCode || '',
    },
    hero: {
      title: 'Transformez votre espace extérieur',
      subtitle: `Bienvenue chez ${data.companyName}`,
      description:
        data.description ||
        'Nous mettons notre expertise à votre service pour des résultats exceptionnels.',
      backgroundImage:
        'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop',
      ctaText: 'Nous contacter',
      ctaLink: '#contact',
    },
    services: [
      {
        id: 'service-1',
        title: 'Service Principal',
        description: 'Description de votre service principal. À personnaliser.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        price: 'Sur devis',
        features: ['Qualité professionnelle', 'Devis gratuit'],
        icon: '⭐',
      },
    ],
    about: {
      title: 'Notre Expertise à Votre Service',
      description:
        data.description || `Avec ${data.companyName}, bénéficiez d'une expertise reconnue.`,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
      features: [],
    },
    gallery: {
      title: 'Nos Réalisations',
      images: [],
      categories: [],
    },
    footer: {
      description: `${data.companyName} — Votre partenaire de confiance.`,
      socialLinks: [],
      quickLinks: [
        { title: 'Accueil', url: '#hero' },
        ...(pages.includes('services') ? [{ title: 'Services', url: '#services' }] : []),
        ...(pages.includes('about') ? [{ title: 'À Propos', url: '#about' }] : []),
        ...(pages.includes('contact') ? [{ title: 'Contact', url: '#contact' }] : []),
      ],
    },
    lastModified: new Date().toISOString(),
  };

  if (pages.includes('testimonials')) {
    config.testimonials = {
      enabled: true,
      title: 'Ce Que Disent Nos Clients',
      subtitle: 'Découvrez les témoignages de nos clients satisfaits',
      items: [],
    };
  }

  if (pages.includes('pricing')) {
    config.pricing = {
      enabled: true,
      title: 'Nos Tarifs',
      subtitle: 'Des formules adaptées à chaque besoin',
      tiers: [],
    };
  }

  if (data.features?.booking) {
    config.booking = {
      enabled: true,
      apiUrl: '',
      apiKey: '',
      defaultDuration: 60,
      workingHours: { start: '09:00', end: '18:00' },
      workingDays: [1, 2, 3, 4, 5],
    };
  }

  return config;
}

export async function POST(request: NextRequest) {
  try {
    const data: AionikFormData = await request.json();

    if (!data.companyName) {
      return NextResponse.json({ error: 'Le champ companyName est requis.' }, { status: 400 });
    }

    const config = buildConfig(data);

    await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf8');

    return NextResponse.json({
      success: true,
      message: 'Configuration générée avec succès',
      config,
    });
  } catch (error) {
    console.error('Error generating config:', error);
    return NextResponse.json(
      {
        error: 'Échec de la génération de la configuration',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
