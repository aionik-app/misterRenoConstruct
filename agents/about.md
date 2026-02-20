# About — Rewrite Agent

> Pré-requis : lire `agents/context.md` pour les règles partagées.

## Fichier cible
`components/about.tsx`

## Rôle
Réécrire **uniquement** le fichier `components/about.tsx` en générant une **variante complète de layout** pour la section "À Propos".

## Variants Usage Registry

```yaml
variants_usage:
  split_image_left: 0
  split_image_right: 0
  timeline_vertical: 0
  timeline_horizontal: 0
  team_grid: 0
  values_cards_prominent: 0
  full_width_parallax: 0
  centered_story: 0
  stats_focused: 0
  tabs_sections: 0
  masonry_collage: 0
  bento_grid: 0
  milestone_counter: 0
  overlapping_cards: 0
  diagonal_split: 0
```

Privilégier les variantes avec compteur bas. Quand toutes ≥ 1, réinitialiser à 0.

## Contraintes

- Ne modifier que la disposition (wrappers, grilles, classes Tailwind de placement).
- Ne jamais modifier :
  - Couleurs
  - Textes (`config.about.title`, `config.about.description`, `config.about.features`)
  - Image (`config.about.image`)
  - Les 3 valeurs internes (Écologique/Excellence/Passion) avec leurs icônes
  - La Card flottante "15+ Années d'expérience"
- Garder l'export `export function About({ config }: AboutV2Props)`.
- Ne pas toucher aux autres fichiers.

## Éléments du composant

| Élément           | Source                      | Icônes                              |
|-------------------|-----------------------------|--------------------------------------|
| Badge "À Propos"  | Texte statique              | —                                    |
| Titre h2          | `config.about.title`        | —                                    |
| Description       | `config.about.description`  | —                                    |
| Valeurs (3 cards) | Array interne               | `Leaf`, `Award`, `Heart`             |
| Features list     | `config.about.features`     | `CheckCircle`                        |
| Image principale  | `config.about.image`        | —                                    |
| Stats Card        | "15+ Années d'expérience"   | —                                    |

## UX / UI Guidelines

### Structure
- La section doit raconter une histoire : qui sommes-nous, nos valeurs, nos atouts.
- L'image doit avoir un traitement visuel (rounded, shadow, overlay, etc.).
- Les valeurs (3 items) doivent être visuellement distinctes (cards, icônes colorées).
- Les features (checklist) doivent être faciles à scanner.

### Image
- Utiliser `<Image />` avec `width`/`height` explicites ou `fill`.
- `rounded-3xl` ou `rounded-2xl` avec `shadow-2xl`.
- La Card stats flottante doit être positionnée de manière à créer de la profondeur (`absolute`, décalage négatif).

### Espacements
- `py-24` section padding.
- `gap-16` entre colonnes pour la version split.
- `mb-6` à `mb-8` entre les blocs de contenu.

## Étapes

1. Lire `components/about.tsx`.
2. Choisir une variante à compteur bas dans le registre.
3. Réécrire entièrement le About (layout uniquement).
4. `pnpm biome check components/about.tsx`
5. Si erreurs de formatage : `pnpm biome check --write components/about.tsx`
6. Si erreurs de lint/type : corriger → relancer (max 3 passes).
7. Afficher le diff.
8. Mettre à jour le registre.
