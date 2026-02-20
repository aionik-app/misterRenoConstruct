# Pricing — Rewrite Agent

> Pré-requis : lire `agents/context.md` pour les règles partagées.

## Fichier cible
`components/pricing.tsx`

## Rôle
Réécrire **uniquement** le fichier `components/pricing.tsx` en générant une **variante complète de layout** pour la section Tarifs.

## Variants Usage Registry

```yaml
variants_usage:
  cards_horizontal: 0
  cards_vertical: 0
  table_comparison: 0
  toggle_period: 0
  slider_single: 0
  tabs_categories: 0
  minimal_list: 0
  feature_matrix: 0
  highlighted_center: 0
  gradient_cards: 0
  stacked_mobile: 0
  accordion_details: 0
  bento_pricing: 0
  split_popular: 0
  floating_cards: 0
```

Privilégier les variantes avec compteur bas. Quand toutes ≥ 1, réinitialiser à 0.

## Contraintes

- Ne modifier que la disposition (wrappers, grilles, classes Tailwind de placement).
- Ne jamais modifier :
  - Couleurs
  - Les données pricing (`config.pricing.*` — title, subtitle, tiers)
  - La logique de guard `if (!pricingConfig?.enabled)` retournant `null`
  - Le badge "Populaire" sur les tiers `highlighted`
  - Les features list avec `Check` icon
  - Les boutons CTA de chaque tier
- Garder l'export `export function Pricing({ config }: PricingProps)`.
- Ne pas toucher aux autres fichiers.

## Éléments du composant

| Élément           | Source                           | Icônes    |
|-------------------|----------------------------------|-----------|
| Badge "Tarifs"    | Texte statique                   | —         |
| Titre h2          | `pricingConfig.title`            | —         |
| Sous-titre        | `pricingConfig.subtitle`         | —         |
| Tiers (cards)     | `pricingConfig.tiers`            | —         |
| Badge "Populaire" | `tier.highlighted`               | —         |
| Nom du tier       | `tier.name`                      | —         |
| Description       | `tier.description`               | —         |
| Prix              | `tier.price` + `tier.period`     | —         |
| Features          | `tier.features`                  | `Check`   |
| CTA               | `tier.ctaText` / `tier.ctaLink`  | —         |

## UX / UI Guidelines

### Cards de pricing
- Le tier `highlighted` doit être visuellement dominant : `ring-2 ring-primary`, `scale-[1.02]`, badge "Populaire".
- Les autres tiers : apparence plus neutre.
- Les features doivent être scannables : icône check + texte aligné.
- Le prix doit être le plus gros élément de chaque card : `text-4xl font-bold`.

### Comparaison
- Les cards doivent avoir la même hauteur (`items-stretch`, `flex flex-col`, `flex-1`).
- Le CTA en bas de chaque card, aligné grâce à `mt-auto` ou `flex-1` sur la liste.

### Responsive
- Mobile : 1 colonne, cards empilées.
- Tablette : 2 colonnes.
- Desktop : 3 colonnes (ou selon le nombre de tiers).

## Étapes

1. Lire `components/pricing.tsx`.
2. Choisir une variante à compteur bas dans le registre.
3. Réécrire entièrement le Pricing (layout uniquement).
4. `pnpm biome check components/pricing.tsx`
5. Si erreurs de formatage : `pnpm biome check --write components/pricing.tsx`
6. Si erreurs de lint/type : corriger → relancer (max 3 passes).
7. Afficher le diff.
8. Mettre à jour le registre.
