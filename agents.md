# Contexte du Projet

Boilerplate Site Vitrine Jardinage
- Next.js (App Router)
- TypeScript
- TailwindCSS
- Config JSON (`data/site-config.json`) avec API REST
- Interface admin (/admin) permettant la modification des contenus
- Couleurs définies dans `site-config.json` (ne jamais modifier en dur dans les composants)
- Structure projet avec composants principaux (`hero.tsx`, `header.tsx`, etc.)

# Hero Variants Rewrite Agent

## Rôle
Réécrire **uniquement** le fichier `components/hero.tsx` en générant une **variante complète de layout** à la fois (split, background plein écran, glassmorphism, etc.).

## Variants Usage Registry (compteur)
L’agent doit tenir le compte des variantes déjà utilisées.  
À chaque fois qu’une variante est choisie, incrémenter son compteur.  
Privilégier les variantes avec compteur bas pour diversifier les sorties.  
Quand toutes les variantes sont utilisées au moins une fois, réinitialiser les compteurs.

```
yaml
variants_usage:
  split_classic: 0
  split_inverse: 0
  background_full_center: 0
  background_full_left: 0
  background_full_right: 0
  glass_center: 0
  glass_split: 0
  centered_minimal: 0
  banner_large: 0
  banner_inverted: 0
  gradient_background: 0
  pattern_background: 0
  video_background: 0
  overlay_transparent: 0
  circle_image: 0
  cards_grid: 0
  sidebar: 0
  multi_stage: 0
  asymetric: 0
  carousel: 0
  diagonal_split: 0
  clip_path: 0
```

## Contraintes

- Ne modifier que la disposition (wrappers, grilles, classes Tailwind de placement).
- Ne jamais modifier :
    - couleurs (bg-primary, text-foreground…)
    - textes (config.hero.title, etc.)
    - icônes (Leaf, Award, Users)
    - CTA (textes, liens, style)
    - Garder tous les imports et l’export export function Hero({ config }: HeroProps)
    - Ne pas toucher aux autres fichiers que components/hero.tsx

## UX / UI Guidelines pour Hero Section
📏 Espacements et proportions

- Toujours prévoir un padding-top suffisant pour ne pas coller la navbar (pt-24 sm:pt-32 lg:pt-40 recommandé).
- Toujours prévoir un padding-bottom pour aérer avec la section suivante (pb-16 sm:pb-24).
- Marges latérales (px-4 sm:px-6 lg:px-8) pour que le contenu ne colle jamais aux bords.
- Le Hero doit couvrir au moins min-h-[80vh] et idéalement min-h-screen pour donner une impression immersive.

🎯 Hiérarchie visuelle

- Titre principal (h1) doit être le plus gros élément : text-4xl sm:text-5xl lg:text-6xl font-bold.

- Sous-titre (p) doit être secondaire : text-xl sm:text-2xl text-muted-foreground.
- CTA (call-to-action) doit être très visible : bouton principal en variant="default", bouton secondaire en variant="outline".
- Les stats / arguments clés doivent être visuellement séparés (grid ou flex, espace suffisant).

🖼️ Images et backgrounds (règles strictes)

- Toujours utiliser un `alt` descriptif clair pour l’image principale du Hero.  
- Si image en **background plein écran**, toujours ajouter un **overlay** (`bg-black/40`, `bg-gradient-to-r`, etc.) pour assurer le contraste texte/fond.  
- Ne jamais laisser le texte illisible (contraste minimum WCAG AA).  
- Si design "glassmorphism", toujours appliquer `backdrop-blur` + `bg-background/70`.  
- ❌ **INTERDIT** : utiliser `-z-10`, `-z-20` ou tout autre z-index négatif sur l’image du Hero ou son overlay.  
  - Utiliser uniquement `z-0` pour l’image et `relative z-10` pour le contenu.  
  - Cela garantit que l’image n’est jamais cachée derrière le layout ou une autre section.

📱 Responsive

- Mobile first : contenu centré en colonne sur petit écran.
- Grille ou split seulement à partir de md: ou lg:.
- Boutons CTA en stack vertical sur mobile (flex-col), en ligne sur desktop (flex-row).
- Toujours vérifier que les textes ne sortent pas de l’écran (break-words, max-w-xl).

👩‍🦯 Accessibilité

- Le Hero doit commencer avec une balise <section id="hero" aria-label="Hero section">.
- Les images décoratives doivent avoir alt="" et role="presentation", mais les images informatives doivent avoir un vrai alt.
- Les boutons doivent avoir un aria-label explicite si le texte n’est pas clair.
- CTA doit être navigable au clavier (focus-visible:ring).

⚡ Performance

- Utiliser <Image /> de Next.js avec priority sur l’image principale du Hero.
- Pas d’images énormes : object-cover, tailles adaptées, lazy-loading si non critique.

🎨 Style et cohérence

- Garder le style cohérent avec le reste du site (typographies, boutons, couleurs issues de site-config.json).
- Jamais de couleurs "hardcodées" dans le composant.
- Respecter les tokens de couleur (bg-background, text-foreground, text-muted-foreground, bg-primary).

## Stack

Framework : Next.js
Langage : TypeScript
Styles : TailwindCSS
UI : lucide-react, shadcn/ui (Button)
Images : next/image

## Étapes

1. Lire le fichier components/hero.tsx.

2. Choisir une variante de layout parmi la liste (voir registre).

3. Réécrire entièrement le Hero avec uniquement le changement d’agencement.

4. Lancer la commande :
    ` pnpm biome check components/hero.tsx `


5. Si Biome affiche uniquement des erreurs de formatage (quotes, indentation, imports, trailing commas, etc.) :
Corriger automatiquement avec :
    ` pnpm biome check --write components/hero.tsx `


6. Si Biome affiche des erreurs de lint ou de type (non fixables automatiquement) :

    - Réécrire le code généré pour corriger ces erreurs.
    - Relancer pnpm biome check components/hero.tsx.
    - Répéter jusqu’à obtenir zéro erreur (maximum 3 passes de correction).

7. Une fois corrigé, afficher /diff du fichier.