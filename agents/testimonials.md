# Testimonials — Rewrite Agent

> Pré-requis : lire `agents/context.md` pour les règles partagées.

## Fichier cible
`components/testimonials.tsx`

## Rôle
Réécrire **uniquement** le fichier `components/testimonials.tsx` en générant une **variante complète de layout** pour la section Témoignages.

## Variants Usage Registry

```yaml
variants_usage:
  grid_cards: 0
  carousel_single: 0
  carousel_multi: 0
  masonry_quotes: 0
  spotlight_featured: 0
  slider_fullwidth: 0
  wall_of_love: 0
  alternating_sides: 0
  minimal_quotes: 0
  card_stack: 0
  timeline_reviews: 0
  bento_testimonials: 0
  split_highlight: 0
  floating_bubbles: 0
  marquee_scroll: 0
```

Privilégier les variantes avec compteur bas. Quand toutes ≥ 1, réinitialiser à 0.

## Contraintes

- Ne modifier que la disposition (wrappers, grilles, classes Tailwind de placement).
- Ne jamais modifier :
  - Couleurs
  - Les données testimonials (`config.testimonials.*` — title, subtitle, items)
  - La logique de guard `if (!testimonialsConfig?.enabled)` retournant `null`
  - Le système d'étoiles (5 `Star` icons avec couleur conditionnelle)
  - L'avatar avec fallback (initiale si pas d'image)
  - L'icône `Quote` décorative
- Garder l'export `export function Testimonials({ config }: TestimonialsProps)`.
- Ne pas toucher aux autres fichiers.

## Éléments du composant

| Élément             | Source                          | Icônes          |
|---------------------|---------------------------------|-----------------|
| Badge "Témoignages" | Texte statique                  | —               |
| Titre h2            | `testimonialsConfig.title`      | —               |
| Sous-titre          | `testimonialsConfig.subtitle`   | —               |
| Quote icon          | Décoratif                       | `Quote`         |
| Étoiles (rating)    | `testimonial.rating` (1-5)      | `Star`          |
| Contenu             | `testimonial.content`           | —               |
| Avatar              | `testimonial.avatar` ou initiale| —               |
| Nom                 | `testimonial.name`              | —               |
| Rôle                | `testimonial.role`              | —               |

## UX / UI Guidelines

### Cards de témoignage
- Chaque card : quote icon, étoiles, texte, auteur (avatar + nom + rôle).
- Le texte du témoignage entre guillemets (`"..."`).
- Les étoiles : `text-amber-400 fill-amber-400` pour les remplies, `text-muted-foreground/30` pour les vides.
- L'avatar : `rounded-full`, fallback avec initiale sur fond `bg-primary/10`.

### Hiérarchie
- Le contenu textuel du témoignage est l'élément principal.
- L'auteur est secondaire (plus petit, en bas de la card).
- Le Quote icon est décoratif (grande, semi-transparent `text-primary/30`).

### Responsive
- Mobile : 1 colonne.
- Tablette : 2 colonnes.
- Desktop : 3 colonnes (ou carousel/slider selon variante).

### Engagement
- Hover subtil sur les cards (`hover:shadow-lg`).
- Si carousel : contrôles de navigation clairs (flèches, dots).

## Étapes

1. Lire `components/testimonials.tsx`.
2. Choisir une variante à compteur bas dans le registre.
3. Réécrire entièrement le Testimonials (layout uniquement).
4. `pnpm biome check components/testimonials.tsx`
5. Si erreurs de formatage : `pnpm biome check --write components/testimonials.tsx`
6. Si erreurs de lint/type : corriger → relancer (max 3 passes).
7. Afficher le diff.
8. Mettre à jour le registre.
