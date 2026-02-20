# Header — Rewrite Agent

> Pré-requis : lire `agents/context.md` pour les règles partagées.

## Fichier cible
`components/header.tsx`

## Rôle
Réécrire **uniquement** le fichier `components/header.tsx` en générant une **variante complète de layout** pour la navigation principale du site.

## Variants Usage Registry

```yaml
variants_usage:
  sticky_solid: 0
  sticky_transparent: 0
  centered_logo: 0
  split_logo_center: 0
  hamburger_fullscreen: 0
  mega_menu: 0
  sidebar_drawer: 0
  top_bar_dual_row: 0
  floating_pill: 0
  minimal_inline: 0
  overlay_fullscreen: 0
  bottom_nav_mobile: 0
  gradient_blend: 0
  animated_reveal: 0
  glassmorphism_bar: 0
```

Privilégier les variantes avec compteur bas. Quand toutes ≥ 1, réinitialiser à 0.

## Contraintes

- Ne modifier que la disposition (wrappers, grilles, classes Tailwind de placement).
- Ne jamais modifier :
  - Couleurs
  - Textes de navigation (`navigation` array, `config.branding.companyName`)
  - Logo (`config.branding.logo`)
  - Numéro de téléphone (`config.contact.phone`)
  - CTA "Devis Gratuit"
  - La logique scroll (`isScrolled`) et menu mobile (`isMenuOpen`)
- Garder l'export `export function Header({ config }: HeaderProps)`.
- Ne pas toucher aux autres fichiers.

## Éléments du composant

| Élément         | Source                        | Icônes         |
|-----------------|-------------------------------|----------------|
| Logo            | `config.branding.logo`        | —              |
| Nom entreprise  | `config.branding.companyName` | —              |
| Navigation      | Array interne (5 liens)       | —              |
| Téléphone       | `config.contact.phone`        | `Phone`        |
| CTA             | "Devis Gratuit"               | —              |
| Menu mobile     | Toggle open/close             | `Menu`, `X`    |

## UX / UI Guidelines

### Position et comportement
- Le header doit être `fixed top-0` avec `z-50`.
- Transition de style au scroll (transparent → solide, ombre, etc.).
- Le header ne doit jamais masquer le contenu principal.

### Navigation desktop
- Liens horizontaux avec effet hover (underline, couleur, scale).
- Espacement cohérent entre les liens (`space-x-6` à `space-x-8`).
- Le CTA doit être visuellement distinct (bouton, pas un lien).

### Navigation mobile
- Menu hamburger visible uniquement sous `md:`.
- Le menu mobile doit couvrir suffisamment d'espace (dropdown, fullscreen, drawer).
- Chaque lien doit fermer le menu au clic (`setIsMenuOpen(false)`).
- Animation d'ouverture/fermeture fluide.

### Logo
- Le logo doit toujours être cliquable (lien vers `/`).
- Taille minimale : `h-10 w-auto` à `h-12 w-auto`.

## Étapes

1. Lire `components/header.tsx`.
2. Choisir une variante à compteur bas dans le registre.
3. Réécrire entièrement le Header (layout uniquement).
4. `pnpm biome check components/header.tsx`
5. Si erreurs de formatage : `pnpm biome check --write components/header.tsx`
6. Si erreurs de lint/type : corriger → relancer (max 3 passes).
7. Afficher le diff.
8. Mettre à jour le registre.
