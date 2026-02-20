# Booking — Rewrite Agent

> Pré-requis : lire `agents/context.md` pour les règles partagées.

## Fichiers cibles
- `components/booking/booking-form.tsx` (composant principal)
- `components/booking/date-time-picker.tsx` (sous-composant)

## Rôle
Réécrire le layout des fichiers de booking en générant une **variante complète de disposition** pour le formulaire de réservation multi-étapes.

## Variants Usage Registry

```yaml
variants_usage:
  wizard_horizontal: 0
  wizard_vertical: 0
  single_page_scroll: 0
  sidebar_summary: 0
  split_calendar_form: 0
  card_steps: 0
  timeline_steps: 0
  accordion_steps: 0
  minimal_inline: 0
  two_column_details: 0
  fullscreen_flow: 0
  floating_modal: 0
  stepper_top: 0
  progress_bar: 0
  tabbed_steps: 0
```

Privilégier les variantes avec compteur bas. Quand toutes ≥ 1, réinitialiser à 0.

## Contraintes

- Ne modifier que la disposition (wrappers, grilles, classes Tailwind de placement).
- Ne jamais modifier :
  - Couleurs
  - La logique métier (steps, validation, API calls : `checkAvailability`, `createBooking`)
  - Les champs du formulaire (prénom, nom, email, téléphone, adresse, titre, description, note)
  - Le composant `DateTimePicker` et sa logique
  - Le stepper 3 étapes (datetime → details → confirmation → success)
  - Les messages d'erreur et de succès
  - La logique `handleReset`
- Garder les exports :
  - `export function BookingForm({ config }: BookingFormProps)`
  - `export function DateTimePicker({ config, selectedDateTime, onDateTimeChange }: DateTimePickerProps)`
- Ne pas toucher aux fichiers `lib/booking.ts` et `types/booking.ts`.

## Éléments du composant (booking-form.tsx)

| Élément                | Source / Logique                    | Icônes                                |
|------------------------|-------------------------------------|---------------------------------------|
| Badge "Réservation"    | Texte statique                      | `CalendarCheck`                       |
| Titre h2               | "Prendre rendez-vous"               | —                                     |
| Stepper (3 étapes)     | `STEPS` array                       | `Calendar`, `User`, `CheckCircle`     |
| DateTimePicker          | Sous-composant                     | —                                     |
| Résumé date sélectionnée | `selectedDateTime`               | `Calendar`                            |
| Formulaire coordonnées | `formData.*`                        | `User`, `Mail`, `Phone`, `MapPin`     |
| Formulaire détails     | `formData.title/description/note`   | `MessageSquare`                       |
| Récapitulatif          | Toutes les données                  | `Calendar`, `User`, `MessageSquare`   |
| Écran succès           | Confirmation + référence            | `CheckCircle`, `Calendar`, `Clock`    |
| Navigation             | Retour / Continuer                  | `ArrowLeft`, `ArrowRight`             |
| Loading                | État de chargement                  | `Loader2`                             |
| Reset                  | Nouveau rendez-vous                 | `RotateCcw`                           |

## UX / UI Guidelines

### Wizard / Stepper
- L'indicateur d'étape doit être clair : étape active (`bg-primary`), terminée (`bg-primary/10`), future (`bg-muted`).
- Les connecteurs entre étapes : `w-12 h-px` avec couleur conditionnelle.
- Sur mobile : numéros au lieu de labels texte.

### Formulaire
- Labels avec `*` pour les champs obligatoires.
- Icônes à gauche des inputs (`absolute left-3`).
- Inputs avec `pl-10` pour compenser l'icône.
- Validation inline avec messages d'erreur clairs.

### Récapitulatif (step 3)
- Sections visuellement séparées (Rendez-vous, Coordonnées, Description).
- Grid `grid-cols-2` pour label/valeur.
- Fond différent pour chaque section (`bg-primary/5`, `bg-muted/50`).

### Écran de succès
- Centré, avec icône verte de confirmation.
- Référence du rendez-vous visible (`font-mono`).
- CTA pour prendre un autre rendez-vous.

### Responsive
- Mobile : tout en colonne, boutons empilés.
- Desktop : formulaire centré (`max-w-3xl mx-auto`), boutons côte à côte.

## Étapes

1. Lire `components/booking/booking-form.tsx` et `components/booking/date-time-picker.tsx`.
2. Choisir une variante à compteur bas dans le registre.
3. Réécrire le(s) composant(s) (layout uniquement).
4. `pnpm biome check components/booking/booking-form.tsx components/booking/date-time-picker.tsx`
5. Si erreurs de formatage : `pnpm biome check --write components/booking/`
6. Si erreurs de lint/type : corriger → relancer (max 3 passes).
7. Afficher le diff.
8. Mettre à jour le registre.
