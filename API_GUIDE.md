# Guide d'utilisation de l'API avec JSON Server

## Installation

JSON Server a été installé globalement avec la commande :
```bash
npm install -g json-server
```

## Structure de l'API

Le fichier `src/service/api.js` contient toutes les méthodes pour interagir avec l'API :

### Méthodes disponibles :

1. **getallEvents(id)** - Récupère tous les événements ou un événement spécifique
   - Si `id` est fourni : récupère l'événement avec cet ID
   - Si `id` est vide : récupère tous les événements

2. **addEvent(event)** - Ajoute un nouvel événement
   - Paramètre : objet événement avec les propriétés (name, description, price, etc.)

3. **editEvent(id, event)** - Modifie un événement existant
   - Paramètres : ID de l'événement et objet avec les nouvelles données

4. **deleteEvent(id)** - Supprime un événement
   - Paramètre : ID de l'événement à supprimer

## Démarrage du serveur JSON

### Option 1 : Utiliser le script npm (Recommandé)
```bash
npm run api
```

### Option 2 : Démarrer manuellement
```bash
cd src/api
json-server --watch db.json --port 3001
```

Le serveur JSON sera accessible sur : `http://localhost:3001`

## Démarrage de l'application complète

Pour utiliser l'application, vous devez démarrer deux serveurs :

1. **Terminal 1 - Serveur JSON** :
```bash
npm run api
```

2. **Terminal 2 - Application React** :
```bash
npm run dev
```

## Endpoints disponibles

- `GET http://localhost:3001/events` - Récupérer tous les événements
- `GET http://localhost:3001/events/:id` - Récupérer un événement par ID
- `POST http://localhost:3001/events` - Créer un nouvel événement
- `PUT http://localhost:3001/events/:id` - Mettre à jour un événement complet
- `PATCH http://localhost:3001/events/:id` - Mettre à jour partiellement un événement
- `DELETE http://localhost:3001/events/:id` - Supprimer un événement

## Structure du service API

Le fichier `src/services/eventService.js` contient toutes les fonctions pour interagir avec l'API :

- `getAllEvents()` - Récupère tous les événements
- `getEventById(id)` - Récupère un événement spécifique
- `createEvent(eventData)` - Crée un nouvel événement
- `updateEvent(id, eventData)` - Met à jour un événement
- `deleteEvent(id)` - Supprime un événement
- `toggleLike(id, currentLikeStatus)` - Change le statut "like"
- `buyTickets(id, currentTickets, quantity)` - Achète des tickets

## Fonctionnalités implémentées

✅ Récupération des événements depuis l'API (GET)
✅ Ajout de nouveaux événements (POST)
✅ Modification d'événements existants (PUT)
✅ Suppression d'événements (DELETE)
✅ Affichage avec état de chargement
✅ Gestion des erreurs
✅ Bouton "J'aime" avec mise à jour en temps réel
✅ Achat de tickets avec décrémentation
✅ Affichage "Épuisé" quand nbTickets = 0
✅ Navigation vers les détails d'un événement
✅ Formulaire d'ajout d'événement
✅ Bouton de suppression avec confirmation
✅ Mise à jour automatique de l'interface

## Tester l'API avec curl

```bash
# Récupérer tous les événements
curl http://localhost:3001/events

# Récupérer un événement spécifique
curl http://localhost:3001/events/1

# Mettre à jour le like
curl -X PATCH http://localhost:3001/events/1 -H "Content-Type: application/json" -d '{"like": true}'

# Acheter un ticket
curl -X PATCH http://localhost:3001/events/1 -H "Content-Type: application/json" -d '{"nbTickets": 9}'
```
