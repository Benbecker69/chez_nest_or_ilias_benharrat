# 🧪 Guide de Tests - Chez Nestor API

## 📥 Import des collections

### Postman
1. Ouvrir Postman
2. Cliquer sur "Import"
3. Sélectionner le fichier `postman-collection.json`
4. La collection "Chez Nestor API" apparaîtra dans votre workspace

### Insomnia
1. Ouvrir Insomnia
2. Cliquer sur "Create" → "Import From" → "File"
3. Sélectionner le fichier `insomnia-collection.json`
4. La collection sera importée avec tous les tests

## 🎯 Tests de validation

### ✅ Pizzas - Tests disponibles

#### 1. **POST Pizza (Valid)**
```json
{
  "name": "Calzone"
}
```
✅ **Résultat attendu:** 201 Created
```json
{
  "id": 5,
  "name": "Calzone"
}
```

#### 2. **POST Pizza (Invalid - Too Short)**
```json
{
  "name": "AB"
}
```
❌ **Résultat attendu:** 400 Bad Request
```json
{
  "message": ["Le nom doit contenir au moins 3 caractères"],
  "error": "Bad Request",
  "statusCode": 400
}
```

#### 3. **POST Pizza (Invalid - Missing Name)**
```json
{}
```
❌ **Résultat attendu:** 400 Bad Request
```json
{
  "message": [
    "Le nom doit contenir au moins 3 caractères",
    "Le nom doit être une chaîne de caractères",
    "Le nom de la pizza est requis"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

#### 4. **POST Pizza (Invalid - Extra Field)**
```json
{
  "name": "Calzone",
  "extraField": "should not be allowed"
}
```
❌ **Résultat attendu:** 400 Bad Request
```json
{
  "message": ["property extraField should not exist"],
  "error": "Bad Request",
  "statusCode": 400
}
```

### ✅ Orders - Tests disponibles

#### 1. **POST Order (Valid)**
```json
{
  "pizzas": [1, 2, 3],
  "totalPrice": 45.50
}
```
✅ **Résultat attendu:** 201 Created
```json
{
  "id": 3,
  "pizzas": [1, 2, 3],
  "totalPrice": 45.5,
  "processed": false,
  "createdAt": "2026-02-12T10:01:59.753Z"
}
```
📝 **Note:** Le champ `createdAt` est **automatiquement rempli** par le service.

#### 2. **POST Order (Invalid - Empty Pizzas)**
```json
{
  "pizzas": [],
  "totalPrice": 45.50
}
```
❌ **Résultat attendu:** 400 Bad Request
```json
{
  "message": ["La commande doit contenir au moins une pizza"],
  "error": "Bad Request",
  "statusCode": 400
}
```

#### 3. **POST Order (Invalid - Negative Price)**
```json
{
  "pizzas": [1, 2],
  "totalPrice": -10
}
```
❌ **Résultat attendu:** 400 Bad Request
```json
{
  "message": ["Le prix total doit être positif ou zéro"],
  "error": "Bad Request",
  "statusCode": 400
}
```

#### 4. **POST Order (Invalid - Pizza ID Not Number)**
```json
{
  "pizzas": [1, "deux", 3],
  "totalPrice": 45.50
}
```
❌ **Résultat attendu:** 400 Bad Request
```json
{
  "message": ["Chaque ID de pizza doit être un nombre"],
  "error": "Bad Request",
  "statusCode": 400
}
```

#### 5. **POST Order (Invalid - Missing Fields)**
```json
{
  "pizzas": [1, 2]
}
```
❌ **Résultat attendu:** 400 Bad Request
```json
{
  "message": [
    "Le prix total doit être positif ou zéro",
    "Le prix total doit être un nombre",
    "Le prix total est requis"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

## 🚀 Fonctionnalités avancées implémentées

### ✨ 1. ValidationPipe globale
**Fichier:** `src/main.ts`

Configuration avec :
- ✅ `whitelist: true` - Supprime automatiquement les propriétés non définies dans le DTO
- ✅ `forbidNonWhitelisted: true` - Renvoie une erreur si des champs non autorisés sont envoyés
- ✅ `transform: true` - Transforme automatiquement les types (ex: string → number)

### ✨ 2. createdAt automatique
Le champ `createdAt` est automatiquement rempli lors de la création d'une commande.
Vous **n'avez pas besoin** de l'envoyer dans le body de la requête POST.

```typescript
create(createOrderDto: CreateOrderDto): Order {
  const newOrder: Order = {
    id: this.nextId++,
    pizzas: createOrderDto.pizzas,
    totalPrice: createOrderDto.totalPrice,
    processed: false,
    createdAt: new Date(), // ← Rempli automatiquement !
  };
  // ...
}
```

### ✨ 3. Gestion avec Map
**Fichier:** `src/orders/orders.service.ts`

Les commandes sont maintenant gérées avec une **Map** au lieu d'un tableau pour :
- ✅ Recherche O(1) au lieu de O(n)
- ✅ Suppression plus performante
- ✅ Meilleure scalabilité

```typescript
private orders: Map<number, Order> = new Map([...]);
```

## 📊 Règles de validation

### Pizzas (CreatePizzaDto)
| Champ | Type   | Règles                                    |
|-------|--------|-------------------------------------------|
| name  | string | Requis, min 3 caractères                  |

### Pizzas (UpdatePizzaDto)
| Champ | Type   | Règles                                    |
|-------|--------|-------------------------------------------|
| name  | string | Optionnel, min 3 caractères               |

### Orders (CreateOrderDto)
| Champ      | Type     | Règles                                           |
|------------|----------|--------------------------------------------------|
| pizzas     | number[] | Requis, tableau non vide, IDs positifs           |
| totalPrice | number   | Requis, positif ou zéro                          |

### Orders (UpdateOrderDto)
| Champ      | Type     | Règles                                           |
|------------|----------|--------------------------------------------------|
| pizzas     | number[] | Optionnel, tableau non vide si présent, IDs positifs |
| totalPrice | number   | Optionnel, positif ou zéro                       |
| processed  | boolean  | Optionnel                                        |

## 🎯 Checklist de test

### Pizzas
- [ ] GET /pizzas - Liste toutes les pizzas
- [ ] GET /pizzas/:id - Récupère une pizza par ID
- [ ] POST /pizzas - Crée une pizza valide
- [ ] POST /pizzas - Erreur si nom trop court
- [ ] POST /pizzas - Erreur si nom manquant
- [ ] POST /pizzas - Erreur si champ supplémentaire
- [ ] PUT /pizzas/:id - Modifie une pizza
- [ ] DELETE /pizzas/:id - Supprime une pizza

### Orders
- [ ] GET /orders - Liste toutes les commandes
- [ ] GET /orders/:id - Récupère une commande par ID
- [ ] POST /orders - Crée une commande valide (createdAt auto)
- [ ] POST /orders - Erreur si tableau pizzas vide
- [ ] POST /orders - Erreur si prix négatif
- [ ] POST /orders - Erreur si ID pizza non numérique
- [ ] POST /orders - Erreur si champ manquant
- [ ] PUT /orders/:id - Modifie une commande
- [ ] PATCH /orders/:id/processed - Marque comme terminée
- [ ] DELETE /orders/:id - Supprime une commande

## 🛠️ Commandes curl rapides

### Test validation pizza (erreur)
```bash
curl -X POST http://localhost:3000/pizzas \
  -H "Content-Type: application/json" \
  -d '{"name": "AB"}'
```

### Test validation commande (erreur)
```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"pizzas": [], "totalPrice": 45.50}'
```

### Test création valide
```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"pizzas": [1, 2, 3], "totalPrice": 45.50}'
```

---

✅ **Toutes les validations sont fonctionnelles !**
