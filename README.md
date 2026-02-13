# 🍕 Chez Nest-Or - Pizzeria Full Stack

Application full-stack moderne de gestion de pizzeria avec API REST (NestJS) et interface utilisateur (Next.js).

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [API Endpoints](#-api-endpoints)
- [Fonctionnalités avancées](#-fonctionnalités-avancées)
- [Tests](#-tests)

## ✨ Fonctionnalités

### Backend (API REST)
- ✅ **CRUD complet** pour Pizzas, Boissons, Desserts
- ✅ **Gestion des commandes** avec calcul automatique du prix
- ✅ **Réduction menu -10%** (Pizza + Boisson sans alcool + Dessert)
- ✅ **Recherche par ingrédients** avec normalisation (lowercase, trim)
- ✅ **Validation des données** avec class-validator
- ✅ **Vérification de disponibilité** des produits
- ✅ **Tests unitaires** (Jest)

### Frontend (Interface moderne)
- ✅ **Interface responsive** (Desktop, Tablet, Mobile)
- ✅ **Recherche en temps réel** multi-catégories
- ✅ **Panier interactif** avec sélection visuelle
- ✅ **Badge promo dynamique** -10%
- ✅ **Gestion des commandes** avec statuts
- ✅ **Animations CSS** optimisées GPU
- ✅ **Skeletons de chargement** pour meilleure UX
- ✅ **Pages d'erreur** stylisées (404, 500)
- ✅ **Images optimisées** (WebP + fallback JPG)

## 🛠️ Technologies

### Backend
- **NestJS** 11.x - Framework Node.js
- **TypeScript** - Typage fort
- **class-validator** - Validation des DTOs
- **Jest** - Tests unitaires

### Frontend
- **Next.js** 16.x (Turbopack) - Framework React
- **TypeScript** - Typage fort
- **Tailwind CSS** - Styling utility-first
- **Lucide React** - Icônes modernes

### DevOps
- **npm** - Gestion des dépendances
- **ESLint** - Linting
- **Prettier** - Formatage du code

## 🏗️ Architecture

```
chez-nestor/
├── backend/                    # API NestJS
│   ├── src/
│   │   ├── pizzas/            # Module Pizzas (CRUD)
│   │   ├── drinks/            # Module Boissons (CRUD)
│   │   ├── desserts/          # Module Desserts (CRUD)
│   │   ├── orders/            # Module Commandes (logique métier)
│   │   ├── menu/              # Module Menu (réduction -10%)
│   │   └── main.ts            # Point d'entrée (port 3000)
│   └── test/                  # Tests E2E
│
├── frontend/                   # Interface Next.js
│   ├── app/
│   │   ├── page.tsx           # Page principale
│   │   ├── not-found.tsx      # Page 404
│   │   ├── error.tsx          # Page erreur
│   │   └── globals.css        # Styles globaux + animations
│   ├── components/
│   │   ├── ui/                # Composants UI réutilisables
│   │   │   ├── Button.tsx
│   │   │   └── SearchBar.tsx
│   │   ├── skeletons/         # Skeletons de chargement
│   │   ├── ProductCard.tsx    # Card produit
│   │   ├── Cart.tsx           # Panier
│   │   ├── OrderList.tsx      # Liste commandes
│   │   ├── Header.tsx         # En-tête
│   │   └── Section.tsx        # Section catégorie
│   ├── lib/
│   │   └── api.ts             # Client API
│   └── public/
│       └── images/            # Assets images
│           ├── logo/          # Logo application
│           ├── products/      # Images produits (12)
│           └── source/        # Backup images
│
└── README.md                   # Ce fichier
```

## 🚀 Installation

### Prérequis
- Node.js 18+ et npm
- Git

### 1. Cloner le repository
```bash
git clone <repository-url>
cd chez-nestor
```

### 2. Backend (API)
```bash
cd backend
npm install
npm run start:dev
```
L'API démarre sur **http://localhost:3000**

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
L'interface démarre sur **http://localhost:3001**

## 📡 API Endpoints

### Pizzas
- `GET /pizzas` - Liste toutes les pizzas
- `GET /pizzas?ingredient=X&ingredients=Y,Z` - Recherche par ingrédients
- `GET /pizzas/:id` - Récupère une pizza
- `POST /pizzas` - Crée une pizza
- `PUT /pizzas/:id` - Met à jour une pizza
- `DELETE /pizzas/:id` - Supprime une pizza

### Boissons
- `GET /drinks` - Liste toutes les boissons
- `GET /drinks/:id` - Récupère une boisson
- `POST /drinks` - Crée une boisson
- `PUT /drinks/:id` - Met à jour une boisson
- `DELETE /drinks/:id` - Supprime une boisson

### Desserts
- `GET /desserts` - Liste tous les desserts
- `GET /desserts/:id` - Récupère un dessert
- `POST /desserts` - Crée un dessert
- `PUT /desserts/:id` - Met à jour un dessert
- `DELETE /desserts/:id` - Supprime un dessert

### Commandes
- `GET /orders` - Liste toutes les commandes
- `GET /orders/:id` - Récupère une commande
- `POST /orders` - Crée une commande (avec calcul prix + promo)
- `PATCH /orders/:id/processed` - Marque une commande comme traitée
- `DELETE /orders/:id` - Supprime une commande

## 🎯 Fonctionnalités avancées

### Réduction Menu -10%
La réduction s'applique automatiquement si la commande contient :
- ✅ Au moins 1 pizza
- ✅ Au moins 1 boisson **sans alcool**
- ✅ Au moins 1 dessert

**Règles** :
- La réduction s'applique sur **TOUS** les produits éligibles
- Les boissons **avec alcool** sont exclues de la réduction
- Le calcul est fait côté serveur (sécurisé)

### Recherche par ingrédients
```bash
# Recherche pizzas contenant "tomate" ET "mozzarella"
GET /pizzas?ingredients=tomate,mozzarella

# Recherche avec un seul ingrédient
GET /pizzas?ingredient=basilic
```

**Fonctionnalités** :
- Normalisation automatique (lowercase, trim)
- Recherche inclusive (AND logic)
- Insensible à la casse

### Validation des commandes
Le serveur vérifie automatiquement :
- ✅ Existence de tous les produits
- ✅ Disponibilité de tous les produits
- ✅ Au moins 1 pizza dans la commande
- ✅ Calcul correct du prix total

### Interface Frontend

#### Design System
- **Palette** : Noir, Blanc, Gris, Bleu accent
- **Typographie** : Inter (system fonts)
- **Animations** : fade-in, slide-up, scale-in, pulse-subtle, glow
- **Performance** : GPU-accelerated, will-change optimisé

#### Composants réutilisables
- **Button** : 3 variantes (primary, secondary, outline)
- **ProductCard** : 2 styles (cover pour pizzas/desserts, contain pour boissons)
- **SearchBar** : Recherche instantanée
- **Cart** : Badge promo dynamique
- **OrderList** : Statuts colorés (vert = traitée)
- **Skeletons** : Effet shimmer pendant chargement

#### Pages d'erreur
- **404** : Page non trouvée (icône Search)
- **Error** : Erreur générale (bouton réessayer)
- **500** : Erreur serveur critique

## 🧪 Tests

### Backend
```bash
cd backend

# Tests unitaires
npm run test

# Tests E2E
npm run test:e2e

# Coverage
npm run test:cov
```

**Modules testés** :
- ✅ Pizzas (CRUD complet)
- ✅ Drinks (CRUD complet)
- ✅ Desserts (CRUD complet)
- ✅ Orders (logique métier + validation)
- ✅ Menu (calcul réduction)

### Frontend
Tests manuels via interface :
- Recherche multi-catégories
- Sélection produits
- Calcul panier + promo
- Création commande
- Gestion statuts

## 📊 Données de démonstration

### Pizzas (4)
1. Margherita - 10.50€
2. Regina - 12.00€
3. Quatre fromages - 13.50€
4. Calzone - 14.00€ (indisponible)

### Boissons (5)
1. Coca-Cola - 2.50€ (sans alcool)
2. Orangina - 2.50€ (sans alcool)
3. Bière Heineken - 4.00€ (avec alcool)
4. Vin rouge - 5.50€ (avec alcool)
5. Eau pétillante - 2.00€ (sans alcool)

### Desserts (4)
1. Tiramisu - 5.50€
2. Panna cotta - 5.00€
3. Glace vanille - 4.50€
4. Café gourmand - 6.00€

## 🎨 Design & UX

### Couleurs
- **Principal** : Noir (#0F172A) - Textes, boutons
- **Accent** : Bleu (#3B82F6) - Sélection, hover
- **Succès** : Vert (#10B981) - Promo, validations
- **Erreur** : Rouge (#EF4444) - Badges alcool, erreurs
- **Fond** : Blanc/Gris clair (#FAFAFA)

### Animations
- **fade-in** : Apparition douce (0.5s)
- **slide-up** : Glissement depuis le bas (0.6s)
- **scale-in** : Zoom léger (0.3s)
- **pulse-subtle** : Pulsation badge promo (2s loop)
- **hover-glow** : Effet lumineux boutons

### Responsive
- **Desktop** : Layout 3 colonnes (2 menu + 1 sidebar)
- **Tablet** : Layout 2 colonnes adaptatives
- **Mobile** : Empilé verticalement

## 📝 Statut du projet

- ✅ Backend API REST complet
- ✅ Modules Pizzas, Drinks, Desserts
- ✅ Module Orders avec logique métier
- ✅ Module Menu avec réduction -10%
- ✅ Frontend Next.js complet
- ✅ Interface responsive et animée
- ✅ Tests backend (Jest)
- ✅ Pages d'erreur stylisées
- ✅ Documentation complète
