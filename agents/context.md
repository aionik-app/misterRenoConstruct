# Contexte Partagé — Boilerplate Site Vitrine

## Projet

- **Framework** : Next.js (App Router)
- **Langage** : TypeScript
- **Styles** : TailwindCSS
- **UI** : lucide-react, shadcn/ui (Button, Card, Input, Label, Textarea, Badge, etc.)
- **Images** : next/image
- **Config** : `data/site-config.json` — source unique de vérité pour tous les contenus et couleurs
- **Types** : `types/site-config.ts` — interfaces TypeScript pour la config
- **Admin** : interface `/admin` pour modifier les contenus via API REST

## Règles Absolues (tous composants)

### Couleurs
- **Jamais** de couleurs hardcodées dans les composants.
- Utiliser exclusivement les tokens Tailwind : `bg-background`, `text-foreground`, `text-muted-foreground`, `bg-primary`, `text-primary-foreground`, `bg-secondary`, `bg-muted`, `border-border`, etc.
- Les couleurs sont définies dans `data/site-config.json` → appliquées via CSS variables.

### Imports & Exports
- Garder tous les imports existants sauf si un import n'est plus utilisé.
- Conserver l'export nommé du composant : `export function NomComposant({ config }: NomProps)`.
- Ne jamais changer la signature du composant.

### Textes & Données
- Tous les textes proviennent de `config.*` (jamais de textes hardcodés sauf labels UI génériques).
- Les icônes proviennent de `lucide-react`.

### Accessibilité
- Utiliser des balises sémantiques : `<section>`, `<nav>`, `<header>`, `<footer>`.
- `aria-label` sur les sections et les boutons dont le texte n'est pas explicite.
- Images informatives : `alt` descriptif. Images décoratives : `alt=""` + `role="presentation"`.
- Navigation clavier : `focus-visible:ring` sur les éléments interactifs.

### Performance
- `<Image />` de Next.js pour toutes les images.
- `priority` sur les images above-the-fold (Hero, Header).
- `object-cover` + `sizes` appropriés.

### Responsive
- Mobile first : contenu centré/empilé sur petit écran.
- Grilles et splits uniquement à partir de `md:` ou `lg:`.
- Boutons en stack vertical sur mobile (`flex-col`), en ligne sur desktop (`flex-row`).
- Textes : `break-words`, `max-w-*` pour éviter les débordements.

### Style & Cohérence
- Typographies cohérentes : `font-serif` pour les titres, `font-sans` pour le corps.
- Boutons : `rounded-full` avec `variant="default"` ou `variant="outline"`.
- Cards : `border-0 shadow-md hover:shadow-lg transition-*`.
- Badges section : `inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium`.

## Stack Technique

| Outil       | Usage                       |
|-------------|-----------------------------|
| Next.js     | App Router, SSR, Image      |
| TypeScript  | Typage strict               |
| TailwindCSS | Styles utilitaires          |
| shadcn/ui   | Composants UI               |
| lucide-react| Icônes                      |
| Biome       | Linter + Formatter          |

## Workflow de Validation (commun)

1. Lire le fichier composant cible.
2. Choisir une variante de layout parmi le registre du fichier agent correspondant.
3. Réécrire le composant avec la nouvelle disposition.
4. `pnpm biome check components/<fichier>.tsx`
5. Si erreurs de formatage uniquement : `pnpm biome check --write components/<fichier>.tsx`
6. Si erreurs de lint/type : corriger manuellement, relancer (max 3 passes).
7. Afficher le diff du fichier.
