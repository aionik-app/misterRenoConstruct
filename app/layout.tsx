import type { Metadata } from 'next';
import { DM_Sans, Cormorant_Garamond } from 'next/font/google';
import type React from 'react';
import './globals.css';

// Remplacement de Geist par DM Sans (votre nouvelle police sans-serif)
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight:['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-sans', // ✅ correspond à font-sans dans Tailwind / globals.css
});

// Remplacement de Playfair par Cormorant Garamond (votre police pour les titres)
const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight:['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-serif', // ✅ correspond à font-serif dans Tailwind / globals.css
});

export const metadata: Metadata = {
  title: 'Mister RenoConstruct | Rénovation et Construction Clé en Main',
  description:
    'Artisans experts en construction et rénovation depuis 2013. De la fondation à la finition : gros œuvre, électricité, chauffage, HVAC et carrelage. Patron sur chantier.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${cormorantGaramond.variable}`}>
      <body className="antialiased bg-slate-50 text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}