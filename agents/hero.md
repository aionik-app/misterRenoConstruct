# Hero Section — Rewrite Agent

> Pré-requis : lire `agents/context.md` pour les règles partagées.

## Fichier cible
`components/hero.tsx`

## Rôle
Réécrire **uniquement** le fichier `components/hero.tsx` en générant une **variante complète de layout** (split, background plein écran, glassmorphism, etc.).

## Variants Usage Registry

```yaml
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
```

Privilégier les variantes avec compteur bas. Quand toutes ≥ 1, réinitialiser à 0.

## Contraintes

- Ne modifier que la disposition (wrappers, grilles, classes Tailwind de placement).
- Ne jamais modifier :
  - Couleurs (`bg-primary`, `text-foreground`…)
  - Textes (`config.hero.title`, `config.hero.subtitle`, `config.hero.description`)
  - Icônes (`Leaf`, `Award`, `Users`)
  - CTA (textes, liens, style des boutons)
- Garder l'export `export function Hero({ config }: HeroProps)`.
- Ne pas toucher aux autres fichiers.

## Éléments du composant

| Élément        | Source                          | Icônes               |
|----------------|---------------------------------|----------------------|
| Badge subtitle | `config.hero.subtitle`          | `Leaf`               |
| Titre h1       | `config.hero.title`             | —                    |
| Description    | `config.hero.description`       | —                    |
| CTA primaire   | `config.hero.ctaText/ctaLink`   | `ArrowRight`         |
| CTA secondaire | `#services`                     | —                    |
| Stats          | 25+ Années, 500+ Clients, 100% Bio | `Award`, `Users`, `Leaf` |
| Image          | `config.hero.backgroundImage`   | —                    |

## UX / UI Guidelines

### Espacements
- `pt-24 sm:pt-32 lg:pt-40` (ne pas coller la navbar fixe).
- `pb-16 sm:pb-24` pour aérer avec la section suivante.
- `px-4 sm:px-6 lg:px-8` marges latérales.
- `min-h-[80vh]` minimum, idéalement `min-h-screen`.

### Hiérarchie visuelle
- h1 : `text-4xl sm:text-5xl lg:text-6xl font-bold`.
- Sous-titre : `text-xl sm:text-2xl text-muted-foreground`.
- CTA principal : `variant="default"`. CTA secondaire : `variant="outline"`.
- Stats séparés visuellement (grid ou flex).

### Images et backgrounds
- `alt` descriptif sur l'image principale.
- Si background plein écran → overlay obligatoire (`bg-black/40`, gradient, etc.).
- Contraste WCAG AA minimum.
- Si glassmorphism → `backdrop-blur` + `bg-background/70`.
- **INTERDIT** : z-index négatifs (`-z-10`, `-z-20`). Utiliser `z-0` image / `relative z-10` contenu.

## Étapes

1. Lire `components/hero.tsx`.
2. Choisir une variante à compteur bas dans le registre.
3. Réécrire entièrement le Hero (layout uniquement).
4. `pnpm biome check components/hero.tsx`
5. Si erreurs de formatage : `pnpm biome check --write components/hero.tsx`
6. Si erreurs de lint/type : corriger → relancer (max 3 passes).
7. Afficher le diff.
8. Mettre à jour le commentaire `variants_usage` dans le fichier et dans ce registre.
