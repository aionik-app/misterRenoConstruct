# Services — Rewrite Agent

> Pré-requis : lire `agents/context.md` pour les règles partagées.

## Fichier cible
`components/services.tsx`

## Rôle
Réécrire **uniquement** le fichier `components/services.tsx` en générant une **variante complète de layout** pour la section Services / Expertises.

## Variants Usage Registry

```yaml
variants_usage:
  cards_grid_uniform: 0
  cards_asymmetric: 0
  list_detailed: 0
  accordion_expandable: 0
  tabs_horizontal: 0
  tabs_vertical: 0
  timeline_process: 0
  bento_grid: 0
  icon_grid_minimal: 0
  carousel_cards: 0
  split_featured: 0
  hover_flip_cards: 0
  stacked_sections: 0
  masonry_cards: 0
  pricing_integrated: 0
```

Privilégier les variantes avec compteur bas. Quand toutes ≥ 1, réinitialiser à 0.

## Contraintes

- Ne modifier que la disposition (wrappers, grilles, classes Tailwind de placement).
- Ne jamais modifier :
  - Couleurs
  - Les données services (`config.services` — titre, description, image, price, icon)
  - Le CTA final ("Obtenir un devis personnalisé" → `#contact`)
  - La distinction premier service (featured) vs les suivants
- Garder l'export `export function Services({ config }: ServicesProps)`.
- Ne pas toucher aux autres fichiers.

## Éléments du composant

| Élément              | Source                          | Icônes       |
|----------------------|---------------------------------|--------------|
| Badge "Expertises"   | Texte statique                  | —            |
| Titre h2             | "Services de Jardinage"         | —            |
| Description          | Texte statique                  | —            |
| Service featured     | `config.services[0]`            | emoji icon   |
| Services secondaires | `config.services.slice(1, 3)`   | emoji icon   |
| Services restants    | `config.services.slice(3)`      | emoji icon   |
| Prix                 | `service.price`                 | —            |
| CTA global           | "#contact"                      | `ArrowRight` |

## UX / UI Guidelines

### Cards de service
- Chaque service doit avoir : icône, titre, description, prix.
- Le premier service peut être mis en avant (plus grand, image, etc.).
- Hover : shadow + léger scale ou couleur de fond.
- Les images de service : `object-cover`, hauteurs cohérentes, `rounded-t-lg`.

### Hiérarchie
- Le service featured doit être visuellement dominant (taille, image plein, overlay).
- Les prix doivent être visibles mais pas dominants (`text-primary font-semibold text-sm`).
- Le bouton "En savoir plus" ou "Découvrir" sur chaque carte.

### Responsive
- Mobile : cartes empilées en 1 colonne.
- Tablette : 2 colonnes.
- Desktop : grille asymétrique (8+4 featured, puis 3 cols) ou uniforme.

## Étapes

1. Lire `components/services.tsx`.
2. Choisir une variante à compteur bas dans le registre.
3. Réécrire entièrement le Services (layout uniquement).
4. `pnpm biome check components/services.tsx`
5. Si erreurs de formatage : `pnpm biome check --write components/services.tsx`
6. Si erreurs de lint/type : corriger → relancer (max 3 passes).
7. Afficher le diff.
8. Mettre à jour le registre.
