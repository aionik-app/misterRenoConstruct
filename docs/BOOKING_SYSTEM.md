# Système de Réservation - Documentation

## Vue d'ensemble

Le système de réservation permet aux visiteurs de votre site vitrine de prendre rendez-vous directement en ligne. Les rendez-vous sont automatiquement synchronisés avec l'application neoo_nx qui gère les plannings des jardiniers.

## Architecture

### Stack Technique

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19 + shadcn/ui components
- **Gestion des dates**: `react-day-picker` + `date-fns`
- **API**: neoo_nx REST API publique
- **Configuration**: JSON dans `data/site-config.json`

### Structure des Fichiers

```
boilerplate-aionik/
├── types/
│   ├── site-config.ts          # Interface BookingConfig
│   └── booking.ts               # Types pour formulaires et API
├── lib/
│   └── booking.ts               # Fonctions utilitaires et appels API
├── components/
│   ├── booking/
│   │   ├── booking-form.tsx     # Composant principal avec flux multi-étapes
│   │   └── date-time-picker.tsx # Sélecteur de date/heure
│   └── admin/
│       └── editors/
│           └── booking-editor.tsx # Interface admin
├── app/
│   └── page.tsx                 # Intégration dans page publique
└── docs/
    └── BOOKING_SYSTEM.md        # Cette documentation
```

## Configuration

### Structure JSON

Dans `data/site-config.json`, ajoutez la section `booking` (optionnelle) :

```json
{
  "booking": {
    "enabled": true,
    "apiUrl": "https://votre-api-neoo.com",
    "apiKey": "neoo_votre_cle_api",
    "defaultDuration": 60,
    "workingHours": {
      "start": "09:00",
      "end": "18:00"
    },
    "workingDays": [1, 2, 3, 4, 5]
  }
}
```

### Paramètres

| Paramètre | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `enabled` | boolean | Active/désactive le système | `true` |
| `apiUrl` | string | URL de l'API neoo_nx (sans `/` final) | `"https://api.neoo.app"` |
| `apiKey` | string | Clé API fournie par neoo_nx | `"neoo_abc123..."` |
| `defaultDuration` | number | Durée des RDV en minutes | `60` |
| `workingHours.start` | string | Heure de début (HH:MM) | `"09:00"` |
| `workingHours.end` | string | Heure de fin (HH:MM) | `"18:00"` |
| `workingDays` | number[] | Jours ouvrables (0=Dim, 6=Sam) | `[1,2,3,4,5]` |

## Utilisation

### Configuration via Interface Admin

1. Accédez à `/admin`
2. Connectez-vous avec le code admin
3. Cliquez sur l'onglet **"Réservations"**
4. Configurez les paramètres :
   - **Activer les réservations** : Toggle ON/OFF
   - **URL de l'API** : Adresse de votre API neoo_nx
   - **Clé API** : Votre clé d'authentification
   - **Durée des rendez-vous** : 30, 45, 60, 90 ou 120 minutes
   - **Heures de travail** : Début et fin de journée
   - **Jours ouvrables** : Cochez les jours disponibles
5. Cliquez sur **"Sauvegarder"**

### Affichage Public

Quand `booking.enabled` est `true`, le formulaire de réservation s'affiche automatiquement sur la page d'accueil, entre la section Contact et le Footer.

### Flux Utilisateur

#### Étape 1 : Sélection Date/Heure
- Calendrier avec jours ouvrables uniquement
- Créneaux horaires de 30 minutes
- Respect des heures de travail configurées

#### Étape 2 : Informations Client
Formulaire avec validation :
- Prénom * (requis)
- Nom * (requis)
- Email * (requis, validé)
- Téléphone * (requis)
- Message (optionnel)

#### Étape 3 : Confirmation
Récapitulatif complet avant validation :
- Date et heure
- Durée du rendez-vous
- Coordonnées du client
- Message éventuel

#### Étape 4 : Succès
- Message de confirmation
- ID de référence du rendez-vous
- Information sur l'email de confirmation

## API Integration

### Endpoints Utilisés

Le système communique avec l'API publique de neoo_nx via deux actions :

#### 1. Vérification de Disponibilité

**Endpoint**: `POST /api/public/booking`

**Payload**:
```json
{
  "action": "check-availability",
  "apiKey": "neoo_...",
  "date": "2026-01-15T10:00:00.000Z",
  "duration": 60
}
```

**Response**:
```json
{
  "available": true,
  "message": "Créneau disponible"
}
```

#### 2. Création de Rendez-vous

**Endpoint**: `POST /api/public/booking`

**Payload**:
```json
{
  "action": "create",
  "apiKey": "neoo_...",
  "clientFirstName": "Jean",
  "clientLastName": "Dupont",
  "clientEmail": "jean@example.com",
  "clientPhone": "+32 470 12 34 56",
  "startDate": "2026-01-15T10:00:00.000Z",
  "duration": 60,
  "title": "Rendez-vous client",
  "description": "Message optionnel"
}
```

**Response**:
```json
{
  "success": true,
  "eventId": "evt_abc123",
  "message": "Rendez-vous créé avec succès"
}
```

## Fonctions Utilitaires

### `lib/booking.ts`

#### `checkAvailability(apiUrl, apiKey, date, duration)`
Vérifie si un créneau est disponible.

```typescript
const availability = await checkAvailability(
  "https://api.neoo.app",
  "neoo_abc123",
  new Date("2026-01-15T10:00:00Z"),
  60
);
```

#### `createBooking(apiUrl, apiKey, formData)`
Crée un rendez-vous dans neoo_nx.

```typescript
const result = await createBooking(
  "https://api.neoo.app",
  "neoo_abc123",
  {
    clientFirstName: "Jean",
    clientLastName: "Dupont",
    clientEmail: "jean@example.com",
    clientPhone: "+32 470 12 34 56",
    startDate: new Date(),
    duration: 60,
    description: "Tonte de pelouse"
  }
);
```

#### `generateTimeSlots(date, startHour, endHour, intervalMinutes)`
Génère les créneaux horaires disponibles pour une journée.

```typescript
const slots = generateTimeSlots(
  new Date("2026-01-15"),
  "09:00",
  "18:00",
  30
);
// Retourne: [9h00, 9h30, 10h00, ..., 17h30]
```

#### `formatDate(date)` / `formatTime(date)`
Formatage en français pour l'affichage.

```typescript
formatDate(new Date("2026-01-15T10:30:00Z"));
// "mercredi 15 janvier 2026"

formatTime(new Date("2026-01-15T10:30:00Z"));
// "10:30"
```

#### `isWorkingDay(date, workingDays)`
Vérifie si une date est un jour ouvrable.

```typescript
isWorkingDay(new Date("2026-01-15"), [1, 2, 3, 4, 5]);
// true si c'est un jour de semaine
```

## Composants

### `<BookingForm />`

Composant principal gérant le flux complet.

**Props**:
```typescript
interface BookingFormProps {
  config: BookingConfig;
}
```

**État interne**:
- `step`: 'datetime' | 'form' | 'confirmation' | 'success'
- `selectedDateTime`: Date sélectionnée
- `formData`: Données du formulaire client
- `loading`: État de chargement
- `error`: Messages d'erreur

### `<DateTimePicker />`

Sélecteur de date et heure avec contraintes.

**Props**:
```typescript
interface DateTimePickerProps {
  config: BookingConfig;
  selectedDateTime: Date | null;
  onDateTimeChange: (date: Date) => void;
}
```

**Fonctionnalités**:
- Calendrier français avec `react-day-picker`
- Désactivation des jours non ouvrables
- Grille de créneaux horaires de 30 minutes
- Respect des heures de travail

### `<BookingEditor />`

Interface admin pour la configuration.

**Props**:
```typescript
interface BookingEditorProps {
  config: SiteConfig;
  onUpdate: (updates: Partial<SiteConfig>) => void;
}
```

**Champs**:
- Toggle activation
- Input URL API avec validation
- Input clé API avec visibilité masquée
- Select durée par défaut
- Time inputs pour heures de travail
- Checkboxes pour jours ouvrables

## Sécurité

### API Key

⚠️ **Important**: La clé API est stockée en clair dans `site-config.json`.

**Pour la production**, considérez :
- Variables d'environnement (`NEXT_PUBLIC_BOOKING_API_KEY`)
- Route API Next.js comme proxy pour masquer la clé
- Chiffrement côté serveur

### Validation

- Validation côté client (formulaire)
- Validation email avec regex
- Vérification disponibilité avant création
- Gestion des erreurs API

## Personnalisation

### Modifier l'Intervalle des Créneaux

Dans `components/booking/date-time-picker.tsx`:

```typescript
const timeSlots = generateTimeSlots(
  selectedDate,
  config.workingHours.start,
  config.workingHours.end,
  30  // Modifier ici: 15, 30, 45, 60 minutes
);
```

### Ajouter des Durées

Dans `components/admin/editors/booking-editor.tsx`:

```typescript
const DURATION_OPTIONS = [30, 45, 60, 90, 120, 180]; // Ajouter 180 min
```

### Personnaliser les Styles

Tous les composants utilisent Tailwind CSS et respectent le design system existant :
- `bg-primary` / `text-primary-foreground`
- `bg-background` / `text-foreground`
- `bg-muted` / `text-muted-foreground`

## Dépannage

### Le formulaire n'apparaît pas

1. Vérifier que `booking.enabled` est `true` dans `site-config.json`
2. Vérifier que tous les champs requis sont renseignés
3. Regarder la console du navigateur pour les erreurs

### Erreur "Invalid API key"

- Vérifier l'API key dans l'interface admin
- Contacter l'administrateur neoo_nx pour régénérer une clé

### Erreur "This time slot is not available"

- Le créneau est déjà réservé dans neoo_nx
- Essayer un autre créneau horaire

### Erreur CORS

- Vérifier que l'`apiUrl` est correcte
- Contacter l'administrateur pour vérifier la configuration CORS de l'API

## Tests

### Test en Local

```bash
# Démarrer le serveur
pnpm dev

# Ouvrir http://localhost:3000
# Aller à la section réservation
# Tester le flux complet
```

### Vérification TypeScript

```bash
pnpm typecheck
```

### Build de Production

```bash
pnpm build
```

## Support

Pour toute question ou problème :
1. Consulter cette documentation
2. Vérifier les logs de la console navigateur
3. Contacter le support technique neoo_nx

## Notes de Migration

Ce système a été migré de Next.js 12 (Pages Router) vers Next.js 15 (App Router) avec les changements suivants :

- ✅ `react-datepicker` → `react-day-picker`
- ✅ Composants "use client" pour les hooks
- ✅ Imports absolus avec `@/`
- ✅ Compatibilité React 19
- ✅ Design system shadcn/ui

---

**Version**: 1.0  
**Dernière mise à jour**: 5 janvier 2026
