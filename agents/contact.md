# Contact — Rewrite Agent

> Pré-requis : lire `agents/context.md` pour les règles partagées.

## Fichier cible
`components/contact.tsx`

## Rôle
Réécrire **uniquement** le fichier `components/contact.tsx` en générant une **variante complète de layout** pour la section Contact / Demande de devis.

## Variants Usage Registry

```yaml
variants_usage:
  split_form_info: 0
  split_form_map: 0
  full_width_form: 0
  card_based: 0
  minimal_centered: 0
  floating_form: 0
  two_column_cards: 0
  sidebar_form: 0
  glassmorphism_form: 0
  gradient_split: 0
  tabbed_form: 0
  stacked_sections: 0
  grid_contact_cards: 0
  hero_style_cta: 0
  accordion_info: 0
```

Privilégier les variantes avec compteur bas. Quand toutes ≥ 1, réinitialiser à 0.

## Contraintes

- Ne modifier que la disposition (wrappers, grilles, classes Tailwind de placement).
- Ne jamais modifier :
  - Couleurs
  - La logique du formulaire (`formData`, `handleSubmit`, `handleChange`)
  - Les champs du formulaire (name, email, phone, service, message)
  - Le select dynamique des services (`config.services.map(...)`)
  - Les infos contact (`config.contact.phone/email/address/postalCode/city`)
- Garder l'export `export function Contact({ config }: ContactV2Props)`.
- Ne pas toucher aux autres fichiers.

## Éléments du composant

| Élément            | Source                       | Icônes                        |
|--------------------|------------------------------|-------------------------------|
| Badge "Contact"    | Texte statique               | —                             |
| Titre h2           | "Parlons de votre projet"    | —                             |
| Formulaire         | 5 champs + submit            | `Send`                        |
| Téléphone          | `config.contact.phone`       | `Phone`                       |
| Email              | `config.contact.email`       | `Mail`                        |
| Adresse            | `config.contact.*`           | `MapPin`                      |
| Select services    | `config.services`            | —                             |

## UX / UI Guidelines

### Formulaire
- Champs avec `rounded-xl`, fond `bg-muted/50`, transition `focus:bg-background`.
- Labels clairs avec indication des champs obligatoires (`*`).
- Bouton submit pleine largeur, bien visible.
- Message de réassurance en bas ("Réponse garantie sous 24h").

### Infos contact
- Chaque info dans une Card distincte avec icône colorée.
- Hiérarchie : icône → label → valeur.
- Les cards doivent être cliquables si pertinent (tel:, mailto:).

### Responsive
- Mobile : formulaire empilé, puis infos contact en dessous.
- Desktop : grille asymétrique (formulaire 8 cols, infos 4 cols ou inversé).

## Étapes

1. Lire `components/contact.tsx`.
2. Choisir une variante à compteur bas dans le registre.
3. Réécrire entièrement le Contact (layout uniquement).
4. `pnpm biome check components/contact.tsx`
5. Si erreurs de formatage : `pnpm biome check --write components/contact.tsx`
6. Si erreurs de lint/type : corriger → relancer (max 3 passes).
7. Afficher le diff.
8. Mettre à jour le registre.
