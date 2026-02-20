# Footer — Rewrite Agent

> Pré-requis : lire `agents/context.md` pour les règles partagées.

## Fichier cible
`components/footer.tsx`

## Rôle
Réécrire **uniquement** le fichier `components/footer.tsx` en générant une **variante complète de layout** pour le pied de page du site.

## Variants Usage Registry

```yaml
variants_usage:
  multi_column_classic: 0
  multi_column_asymmetric: 0
  centered_minimal: 0
  mega_footer: 0
  split_cta_info: 0
  newsletter_focused: 0
  dark_gradient: 0
  wave_top: 0
  sitemap_grid: 0
  floating_cards: 0
  social_focused: 0
  accordion_mobile: 0
  two_tone: 0
  minimal_inline: 0
  bordered_sections: 0
```

Privilégier les variantes avec compteur bas. Quand toutes ≥ 1, réinitialiser à 0.

## Contraintes

- Ne modifier que la disposition (wrappers, grilles, classes Tailwind de placement).
- Ne jamais modifier :
  - Couleurs
  - Textes (`config.branding.companyName`, `config.footer.description`)
  - Liens sociaux (`config.footer.socialLinks`)
  - Liens rapides (`config.footer.quickLinks`)
  - Infos contact (`config.contact.*`)
  - La logique `scrollToTop`
  - Les icônes sociales mapping (`socialIcons`)
- Garder l'export `export function Footer({ config }: FooterV2Props)`.
- Ne pas toucher aux autres fichiers.

## Éléments du composant

| Élément          | Source                          | Icônes                                    |
|------------------|---------------------------------|-------------------------------------------|
| Nom entreprise   | `config.branding.companyName`   | —                                         |
| Description      | `config.footer.description`     | —                                         |
| Liens sociaux    | `config.footer.socialLinks`     | `Facebook`, `Instagram`, `Linkedin`       |
| Liens rapides    | `config.footer.quickLinks`      | —                                         |
| Téléphone        | `config.contact.phone`          | `Phone`                                   |
| Email            | `config.contact.email`          | `Mail`                                    |
| Adresse          | `config.contact.address/city/postalCode` | `MapPin`                         |
| Back to top      | `scrollToTop()`                 | `ArrowUp`                                 |
| Mentions légales | Liens statiques                 | —                                         |

## UX / UI Guidelines

### Fond et contraste
- Le footer utilise `bg-foreground text-background` (thème inversé).
- Les textes secondaires : `text-background/80` ou `text-background/60`.
- Les liens hover : `hover:text-primary`.

### Structure
- Séparer visuellement : infos entreprise, navigation, contact.
- Section bottom avec copyright + liens légaux, séparée par `border-t`.
- Le bouton "back to top" doit être accessible et visible.

### Responsive
- Mobile : colonnes empilées.
- Desktop : grille multi-colonnes (`lg:grid-cols-12` ou similaire).
- Les liens sociaux doivent rester cliquables et espacés sur mobile.

## Étapes

1. Lire `components/footer.tsx`.
2. Choisir une variante à compteur bas dans le registre.
3. Réécrire entièrement le Footer (layout uniquement).
4. `pnpm biome check components/footer.tsx`
5. Si erreurs de formatage : `pnpm biome check --write components/footer.tsx`
6. Si erreurs de lint/type : corriger → relancer (max 3 passes).
7. Afficher le diff.
8. Mettre à jour le registre.
