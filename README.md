# Chez Nest-Or - API de Pizzeria

> "Chez Nest-Or, le Nest plus ultra de la pizza"

API REST modulaire pour la gestion d'une pizzeria, développée avec NestJS et Next.js.

## 📁 Structure du projet

```
/
├── backend/          # API NestJS
├── frontend/         # Interface Next.js (à venir)
└── README.md         # Ce fichier
```

## 🚀 Démarrage rapide

### Backend (API NestJS)

```bash
cd backend
npm install
npm run start:dev
```

L'API sera disponible sur `http://localhost:3000`

### Frontend (Next.js)

```bash
cd frontend
# À venir
```

## 📚 Architecture Backend

```
backend/src/
├── pizzas/           # Gestion des pizzas
├── drinks/           # Gestion des boissons (à venir)
├── desserts/         # Gestion des desserts (à venir)
├── orders/           # Gestion des commandes
├── menu/             # Logique de réduction menu (à venir)
└── app.module.ts     # Module racine
```

## 🍕 Modules

### Pizzas
- **Modèle** : id, name, price, ingredients[], available
- **Endpoints** : GET, POST, PUT, DELETE
- **Validation** : nom (min 3 car), prix (>0), ingrédients (non vide)

### Drinks *(à venir)*
- **Modèle** : id, name, price, size, withAlcohol, available

### Desserts *(à venir)*
- **Modèle** : id, name, price, available

### Orders
- **Modèle** : id, pizzas[], drinks[], desserts[], totalPrice, processed, createdAt
- **Logique métier** :
  - totalPrice calculé automatiquement
  - Vérification existence et disponibilité des ressources
  - Réduction menu si applicable

### Menu *(à venir)*
- **Réduction 10%** si commande contient : 1 pizza + 1 boisson sans alcool + 1 dessert

## 📖 Documentation API

### Pizzas

#### GET /pizzas
Récupère toutes les pizzas
```bash
curl http://localhost:3000/pizzas
```

#### GET /pizzas/:id
Récupère une pizza par ID
```bash
curl http://localhost:3000/pizzas/1
```

#### POST /pizzas
Crée une nouvelle pizza
```bash
curl -X POST http://localhost:3000/pizzas \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Margherita",
    "price": 10.50,
    "ingredients": ["tomate", "mozzarella", "basilic"],
    "available": true
  }'
```

#### PUT /pizzas/:id
Remplace complètement une pizza
```bash
curl -X PUT http://localhost:3000/pizzas/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Margherita Premium",
    "price": 12.00,
    "ingredients": ["tomate", "mozzarella buffalo", "basilic frais"],
    "available": true
  }'
```

#### DELETE /pizzas/:id
Supprime une pizza
```bash
curl -X DELETE http://localhost:3000/pizzas/1
```

### Orders *(documentation complète à venir)*

## 🧪 Tests

Des collections Postman et Insomnia sont disponibles :
- `postman-collection.json`
- `insomnia-collection.json`

## 🛠️ Technologies

- **Backend** : NestJS, TypeScript, class-validator
- **Frontend** : Next.js, React, TypeScript (à venir)
- **Stockage** : En mémoire (NoSQL via fichiers JSON en option)

## 📝 Statut du projet

- [x] Module Pizzas - Complet
- [ ] Module Drinks - À faire
- [ ] Module Desserts - À faire
- [ ] Module Menu - À faire
- [ ] Module Orders - En cours (logique métier à compléter)
- [ ] Frontend Next.js - À faire

## 👨‍💻 Auteur

Ilias Benharrat

## 📄 Licence

UNLICENSED
