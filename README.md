# Boilerplate Site Vitrine Jardinage

Un système complet de création de sites vitrines pour entreprises de jardinage avec interface d'administration et gestion JSON.

## 🌟 Fonctionnalités

### Deux Versions de Site
- **Version 1** (`/`) : Design moderne avec couleurs vertes naturelles
- **Version 2** (`/v2`) : Design minimaliste et épuré

### Interface d'Administration
- **URL** : `/admin`
- **Code par défaut** : `admin123`
- Modification de tous les contenus sans code
- Gestion des images par URL
- Personnalisation des couleurs et thèmes
- Système de sécurité avec limitation des tentatives

### Gestion JSON Complète
- Configuration centralisée dans `data/site-config.json`
- API REST pour lecture/écriture
- Validation automatique des données
- Rechargement automatique des modifications

## 🚀 Utilisation

### Démarrage Rapide
1. Cloner le projet
2. Installer les dépendances : `npm install`
3. Lancer le serveur : `npm run dev`
4. Accéder à l'admin : `http://localhost:3000/admin`

### Configuration du Site
1. Se connecter à l'interface admin avec le code `admin123`
2. Modifier les sections selon vos besoins :
   - **Métadonnées** : Titre, description, favicon
   - **Branding** : Nom de l'entreprise, logo, slogan
   - **Thème** : Couleurs primaires et secondaires
   - **Contact** : Informations de contact
   - **Hero** : Section d'accueil
   - **Services** : Liste des services proposés
   - **À propos** : Présentation de l'entreprise
   - **Galerie** : Images des réalisations
   - **Témoignages** : Avis clients

### Services de Jardinage Inclus
- Tonte de pelouse
- Retrait des mauvaises herbes
- Création de terrasses en bois
- Aménagement extérieur
- Plantation
- Pose de gazon
- Terrasses en klinkers
- Dalles romaines
- Et plus encore...

## 📁 Structure du Projet

\`\`\`
├── app/
│   ├── page.tsx              # Version 1 du site
│   ├── v2/page.tsx           # Version 2 du site
│   ├── admin/page.tsx        # Interface d'administration
│   └── api/                  # API routes
├── components/
│   ├── *.tsx                 # Composants version 1
│   ├── v2/                   # Composants version 2
│   └── admin/                # Composants admin
├── data/
│   ├── site-config.json      # Configuration du site
│   └── admin-config.json     # Configuration admin
├── types/
│   └── site-config.ts        # Types TypeScript
└── lib/
    └── site-data.ts          # Utilitaires de gestion des données
\`\`\`

## 🔧 API Endpoints

### Configuration du Site
- `GET /api/site-config` : Récupérer la configuration
- `POST /api/site-config` : Sauvegarder la configuration

### Administration
- `POST /api/admin/login` : Connexion admin
- `POST /api/admin/verify` : Vérification de session
- `POST /api/admin/logout` : Déconnexion
- `POST /api/admin/change-code` : Changer le code d'accès

## 🎨 Personnalisation

### Couleurs
Les couleurs sont définies dans le fichier JSON et appliquées automatiquement via les tokens CSS.

### Images
Toutes les images sont gérées par URL. Aucun upload de fichier requis.

### Contenu
Tout le contenu est modifiable via l'interface admin sans toucher au code.

## 🔒 Sécurité

- Authentification par code d'accès
- Protection contre les attaques par force brute
- Sessions sécurisées avec expiration
- Validation des données côté serveur

## 🌐 Déploiement

Le projet est prêt pour le déploiement sur Vercel, Netlify ou tout autre hébergeur supportant Next.js.

## 📝 Automatisation IA

Le fichier `site-config.json` est conçu pour être généré automatiquement par des IA comme Gemini. Structure standardisée pour faciliter l'automatisation de création de sites.

## 🆘 Support

Pour toute question ou problème, consultez la documentation ou contactez le support technique.
