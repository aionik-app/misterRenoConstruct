# Agents — Index

Boilerplate Site Vitrine Jardinage — Next.js / TypeScript / TailwindCSS / shadcn/ui

## Règle de Routage

Avant toute réécriture de composant, lire **obligatoirement** :
1. `agents/context.md` — règles partagées (couleurs, accessibilité, responsive, performance, workflow Biome).
2. Le fichier agent de la section concernée (voir table ci-dessous).

## Table des Agents

| Section        | Composant(s)                                       | Agent                       |
|----------------|----------------------------------------------------|-----------------------------|
| Header         | `components/header.tsx`                            | `agents/header.md`          |
| Hero           | `components/hero.tsx`                              | `agents/hero.md`            |
| Services       | `components/services.tsx`                          | `agents/services.md`        |
| About          | `components/about.tsx`                             | `agents/about.md`           |
| Gallery        | `components/gallery.tsx`                           | `agents/gallery.md`         |
| Pricing        | `components/pricing.tsx`                           | `agents/pricing.md`         |
| Testimonials   | `components/testimonials.tsx`                      | `agents/testimonials.md`    |
| Contact        | `components/contact.tsx`                           | `agents/contact.md`         |
| Booking        | `components/booking/booking-form.tsx`, `date-time-picker.tsx` | `agents/booking.md` |
| Footer         | `components/footer.tsx`                            | `agents/footer.md`          |

## Autres Fichiers

| Fichier                     | Contenu                                            |
|-----------------------------|----------------------------------------------------|
| `agents/context.md`        | Contexte projet, stack, règles absolues, workflow   |
| `agents/design-history.md` | Historique des palettes de couleurs et typographies |
| `docs/BOOKING_SYSTEM.md`   | Documentation technique du système de booking       |

## Règles Globales Rapides

- **Couleurs** : jamais hardcodées, toujours via tokens Tailwind (`bg-primary`, `text-foreground`…).
- **Config** : `data/site-config.json` est la source unique. Ne pas inventer de textes.
- **Exports** : ne jamais changer la signature des composants.
- **Validation** : toujours terminer par `pnpm biome check` sur le fichier modifié.
- **Scope** : chaque agent ne touche qu'à son/ses fichier(s) cible(s), jamais aux autres.
