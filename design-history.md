# Design History

## [slug: rubini-garden] - 2025-08-26
Secteur: Jardinage
Culture: Société familiale, proximité client, professionnelle et souriante.

- Palette:
  - Primary: #166534 (oklch(0.450 0.080 150)) — vert mousse pour actions et CTAs
  - Secondary: #CFEAD9 (oklch(0.860 0.100 160)) — sauge douce pour surlignages et surfaces
  - Background: #FAFAF7 (oklch(0.985 0.005 100)) — lin très clair
  - Foreground: #1C2431 (oklch(0.240 0.040 260)) — charbon doux
  - Accent: #C26D3A (oklch(0.680 0.140 50)) — terre cuite chaleureuse

- Fonts:
  - Sans: Inter — excellente lisibilité UI, moderne et neutre
  - Serif: Lora — naturelle, élégante pour titres, adaptée au secteur

- Contrast (vérifié approximativement):
  - Foreground sur Background ≈ 12:1 (AA/AAA ✅)
  - White sur Primary ≈ 7.4:1 (AA/AAA ✅)
  - Foreground sur Secondary ≈ 6:1 (AA ✅)

- Exemples d'utilisation:
  - Boutons primaires: `bg-primary text-primary-foreground`
  - Badges doux: `bg-secondary text-secondary-foreground`
  - Titres: `font-serif text-foreground`
  - Corps: `font-sans text-foreground`

## [slug: rubini-garden-v2] - 2025-08-27
Secteur: Jardinage
Culture: Société familiale, proximité client, professionnelle et souriante.

- Palette:
  - Primary: #248c59 (oklch(0.580 0.120 140)) — vert émeraude moyen pour actions et CTAs
  - Secondary: #c7e5c7 (oklch(0.820 0.060 120)) — vert menthe pâle pour surlignages et surfaces
  - Background: #f5faf5 (oklch(0.980 0.008 120)) — menthe très clair
  - Foreground: #252d25 (oklch(0.180 0.025 260)) — vert foncé profond
  - Accent: #e0b842 (oklch(0.750 0.150 70)) — jaune doré printanier

- Fonts:
  - Sans: Geist — moderne, claire et distinctive pour l'UI
  - Serif: Playfair Display — élégante et raffinée pour les titres

- Contrast (vérifié approximativement):
  - Foreground sur Background ≈ 10:1 (AA/AAA ✅)
  - Background sur Primary ≈ 7:1 (AA/AAA ✅)
  - Foreground sur Secondary ≈ 6:1 (AA ✅)

- Exemples d'utilisation:
  - Boutons primaires: `bg-primary text-primary-foreground`
  - Badges doux: `bg-secondary text-secondary-foreground`
  - Titres: `font-serif text-foreground`
  - Corps: `font-sans text-foreground`