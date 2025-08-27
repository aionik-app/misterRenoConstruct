import type { Metadata } from 'next';
import { Geist, Playfair_Display } from 'next/font/google';
import type React from 'react';
import './globals.css';

// On mappe directement sur les variables utilisées dans globals.css
const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans', // ✅ correspond à font-sans dans globals.css
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif', // ✅ correspond à font-serif dans globals.css
});

export const metadata: Metadata = {
  title: 'Jardins & Espaces Verts - Services de Jardinage Professionnel',
  description:
    'Spécialiste en aménagement extérieur, tonte de pelouse, création de terrasses, plantation et entretien de jardins. Devis gratuit.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geist.variable} ${playfairDisplay.variable}`}>
      <body className="antialiased bg-background text-foreground font-sans">{children}</body>
    </html>
  );
}
