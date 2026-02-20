# Gallery — Rewrite Agent

> Pré-requis : lire `agents/context.md` pour les règles partagées.

## Fichier cible
`components/gallery.tsx`

## Rôle
Réécrire **uniquement** le fichier `components/gallery.tsx` en générant une **variante complète de layout** pour la section Portfolio / Galerie.

## Variants Usage Registry

```yaml
variants_usage:
  masonry_classic: 0
  grid_uniform: 0
  carousel_single: 0
  carousel_multi: 0
  lightbox_grid: 0
  isotope_filter: 0
  pinterest_columns: 0
  fullscreen_slider: 0
  thumbnail_strip: 0
  hover_reveal: 0
  mosaic_mixed: 0
  card_flip: 0
  bento_grid: 0
  stacked_cards: 0
  parallax_scroll: 0
```

Privilégier les variantes avec compteur bas. Quand toutes ≥ 1, réinitialiser à 0.

## Contraintes

- Ne modifier que la disposition (wrappers, grilles, classes Tailwind de placement).
- Ne jamais modifier :
  - Couleurs
  - Les données images (`config.gallery.images`, `config.gallery.title`)
  - La logique de filtrage (`selectedCategory`, `filteredImages`)
  - Les catégories internes (`categories` array)
  - L'overlay hover avec titre et catégorie
- Garder l'export `export function Gallery({ config }: GalleryV2Props)`.
- Ne pas toucher aux autres fichiers.

## Éléments du composant

| Élément            | Source                        | Icônes    |
|--------------------|-------------------------------|-----------|
| Badge "Portfolio"  | Texte statique                | —         |
| Titre h2           | `config.gallery.title`        | —         |
| Filtres catégories | Array interne (5 boutons)     | —         |
| Images             | `config.gallery.images`       | —         |
| Overlay hover      | `image.title` + catégorie     | `Eye`     |
| État vide          | Message "Aucun projet trouvé" | —         |

## UX / UI Guidelines

### Grille d'images
- Les images doivent avoir des hauteurs variées pour du dynamisme (masonry) ou uniformes (grid).
- Hover : scale subtil (`group-hover:scale-105`) + overlay avec infos.
- Transition fluide (`transition-transform duration-700`).
- Les images doivent avoir un `alt` descriptif.

### Filtres
- Boutons `rounded-full` avec état actif visuellement distinct (`variant="default"` vs `variant="outline"`).
- Centrage horizontal avec `flex-wrap` pour le responsive.
- Espacement `gap-3`.

### Responsive
- Mobile : 1 colonne.
- Tablette : 2 colonnes.
- Desktop : 3 colonnes (ou masonry/bento selon la variante).

### Performance
- `width`/`height` explicites sur `<Image />`.
- Pas de `priority` (images below-the-fold) sauf la première visible.

## Étapes

1. Lire `components/gallery.tsx`.
2. Choisir une variante à compteur bas dans le registre.
3. Réécrire entièrement la Gallery (layout uniquement).
4. `pnpm biome check components/gallery.tsx`
5. Si erreurs de formatage : `pnpm biome check --write components/gallery.tsx`
6. Si erreurs de lint/type : corriger → relancer (max 3 passes).
7. Afficher le diff.
8. Mettre à jour le registre.
