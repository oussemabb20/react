# Guide de test - Application de gestion d'événements

## Prérequis

Avant de tester, assurez-vous que les deux serveurs sont démarrés :

### Terminal 1 - Serveur JSON
```bash
npm run api
```
Le serveur JSON doit être accessible sur : http://localhost:3001

### Terminal 2 - Application React
```bash
npm run dev
```
L'application doit être accessible sur : http://localhost:5173

## Tests à effectuer

### 1. Test de la liste des événements (READ)

**Page :** http://localhost:5173/

**Vérifications :**
- ✅ La liste des événements s'affiche correctement
- ✅ Chaque carte d'événement affiche :
  - Titre (en bleu, cliquable)
  - Price
  - Number of tickets
  - Number of participants
- ✅ Quatre boutons sont présents sur chaque carte :
  - "Like" (cyan/info)
  - "Book an event" (bleu/primary)
  - "Update" (vert/success)
  - "Delete" (rouge/danger)
- ✅ Un spinner s'affiche pendant le chargement
- ✅ Un message d'erreur s'affiche si le serveur JSON n'est pas démarré

### 2. Test du bouton "Like"

**Action :** Cliquer sur le bouton "Like" d'un événement

**Vérifications :**
- ✅ Le statut "like" de l'événement est mis à jour dans la base de données
- ✅ La liste se rafraîchit automatiquement
- ✅ Le bouton est désactivé pendant la mise à jour

### 3. Test du bouton "Book an event"

**Action :** Cliquer sur le bouton "Book an event"

**Vérifications :**
- ✅ Le nombre de tickets diminue de 1
- ✅ Une alerte "Ticket acheté avec succès !" s'affiche
- ✅ La liste se rafraîchit automatiquement
- ✅ Si nbTickets = 0, le bouton est désactivé
- ✅ Une alerte "Désolé, il n'y a plus de tickets disponibles !" s'affiche si on clique quand nbTickets = 0

### 4. Test du bouton "Update"

**Action :** Cliquer sur le bouton "Update" d'un événement

**Vérifications :**
- ✅ Redirection vers `/update-event/:eventId`
- ✅ Le formulaire s'affiche avec les données actuelles pré-remplies
- ✅ Le titre affiche "Modify {nom de l'événement}"
- ✅ Les champs sont modifiables :
  - Name
  - Description
  - Price
  - Number of Tickets
  - Image (interface seulement)
- ✅ Bouton "Update" pour sauvegarder
- ✅ Bouton "Cancel" pour annuler
- ✅ Après modification, redirection automatique vers "/" (1.5 secondes)
- ✅ Message de succès affiché avant la redirection

### 5. Test du bouton "Delete"

**Action :** Cliquer sur le bouton "Delete" d'un événement

**Vérifications :**
- ✅ Une confirmation s'affiche : "Êtes-vous sûr de vouloir supprimer l'événement "{nom}" ?"
- ✅ Si "OK" : l'événement est supprimé de la base de données
- ✅ Une alerte "Événement supprimé avec succès !" s'affiche
- ✅ La liste se rafraîchit automatiquement
- ✅ L'événement n'apparaît plus dans la liste
- ✅ Si "Annuler" : rien ne se passe

### 6. Test de l'ajout d'événement (CREATE)

**Action :** Cliquer sur "Add New Event" dans la barre de navigation

**Vérifications :**
- ✅ Redirection vers `/add-event`
- ✅ Le formulaire s'affiche avec le titre "Add a new Event to your Event List"
- ✅ Tous les champs sont présents :
  - Name (obligatoire)
  - Description (obligatoire)
  - Price (défaut: 0)
  - Number of Tickets (défaut: 0)
  - Image (interface seulement)
- ✅ Bouton "Add an Event" pour ajouter
- ✅ Bouton "Cancel" pour annuler
- ✅ Validation : message d'erreur si Name ou Description sont vides
- ✅ Après ajout, redirection automatique vers "/" (1.5 secondes)
- ✅ Message de succès affiché avant la redirection
- ✅ Le nouvel événement apparaît dans la liste

### 7. Test des détails d'événement

**Action :** Cliquer sur le titre d'un événement (en bleu)

**Vérifications :**
- ✅ Redirection vers `/event/:eventId`
- ✅ Les détails complets de l'événement s'affichent
- ✅ Bouton "Retour aux événements" pour revenir à la liste
- ✅ Boutons "Like" et "Acheter un ticket" fonctionnels
- ✅ Si l'événement n'existe pas : message "Event does not exist"

### 8. Test de la navigation

**Vérifications :**
- ✅ La barre de navigation affiche : "MyEvents | Events | Add New Event"
- ✅ Cliquer sur "MyEvents" redirige vers "/"
- ✅ Cliquer sur "Events" redirige vers "/"
- ✅ Cliquer sur "Add New Event" redirige vers "/add-event"
- ✅ Les liens actifs sont mis en évidence

### 9. Test des erreurs

**Test 1 : Serveur JSON arrêté**
- ✅ Arrêter le serveur JSON
- ✅ Recharger la page
- ✅ Message d'erreur : "Erreur lors du chargement des événements. Assurez-vous que le serveur JSON est démarré."

**Test 2 : Événement inexistant**
- ✅ Accéder à `/event/999` (ID inexistant)
- ✅ Message : "Event does not exist"
- ✅ Bouton "Retour aux événements" fonctionnel

**Test 3 : Modification d'événement inexistant**
- ✅ Accéder à `/update-event/999` (ID inexistant)
- ✅ Message : "Event does not exist"
- ✅ Bouton "Retour aux événements" fonctionnel

### 10. Test de l'API directement

**Avec curl ou Postman :**

```bash
# GET - Récupérer tous les événements
curl http://localhost:3001/events

# GET - Récupérer un événement spécifique
curl http://localhost:3001/events/1

# POST - Ajouter un événement
curl -X POST http://localhost:3001/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Event",
    "description": "Description test",
    "img": "placeholder.jpg",
    "price": 25,
    "nbTickets": 50,
    "nbParticipants": 0,
    "like": false
  }'

# PUT - Modifier un événement
curl -X PUT http://localhost:3001/events/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Festival international de Carthage - Modifié",
    "description": "Description modifiée",
    "img": "event1.jpg",
    "price": 35,
    "nbTickets": 8,
    "nbParticipants": 12,
    "like": true
  }'

# DELETE - Supprimer un événement
curl -X DELETE http://localhost:3001/events/3
```

## Résumé des fonctionnalités

### CRUD complet implémenté :

| Opération | Méthode HTTP | Endpoint | Composant | Bouton/Action |
|-----------|--------------|----------|-----------|---------------|
| CREATE | POST | /events | AddEvent.jsx | "Add New Event" (navbar) |
| READ (liste) | GET | /events | Events.jsx | Chargement automatique |
| READ (détail) | GET | /events/:id | EventDetails.jsx | Clic sur le titre |
| UPDATE | PUT | /events/:id | UpdateEvent.jsx | Bouton "Update" |
| DELETE | DELETE | /events/:id | Event.jsx | Bouton "Delete" |

### Fonctionnalités supplémentaires :

- ✅ Like/Unlike d'un événement (PATCH)
- ✅ Achat de tickets (PATCH - décrémente nbTickets)
- ✅ Gestion des états de chargement (Spinner)
- ✅ Gestion des erreurs (Alerts)
- ✅ Confirmations avant suppression
- ✅ Redirections automatiques après ajout/modification
- ✅ Désactivation des boutons pendant les opérations
- ✅ Validation des formulaires

## Checklist finale

Avant de considérer le projet terminé, vérifiez que :

- [ ] Le serveur JSON démarre correctement avec `npm run api`
- [ ] L'application React démarre correctement avec `npm run dev`
- [ ] Tous les événements s'affichent dans la liste
- [ ] Les 4 boutons (Like, Book, Update, Delete) sont visibles sur chaque carte
- [ ] Le bouton "Add New Event" est visible dans la navbar
- [ ] L'ajout d'événement fonctionne et redirige vers "/"
- [ ] La modification d'événement fonctionne et redirige vers "/"
- [ ] La suppression d'événement fonctionne avec confirmation
- [ ] Le like fonctionne et met à jour l'événement
- [ ] L'achat de tickets décrémente le nombre de tickets
- [ ] Les messages d'erreur s'affichent correctement
- [ ] Les redirections fonctionnent correctement
- [ ] Le design correspond aux captures d'écran fournies

## Problèmes courants et solutions

### Problème : "Cannot GET /events"
**Solution :** Le serveur JSON n'est pas démarré. Exécutez `npm run api`

### Problème : "Network Error"
**Solution :** Vérifiez que le serveur JSON tourne sur le port 3001

### Problème : Les événements ne s'affichent pas
**Solution :** Vérifiez que le fichier `src/api/db.json` contient des données

### Problème : Les boutons ne fonctionnent pas
**Solution :** Vérifiez la console du navigateur pour les erreurs JavaScript

### Problème : La redirection ne fonctionne pas
**Solution :** Vérifiez que `useNavigate()` est bien importé et utilisé
