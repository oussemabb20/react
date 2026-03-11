# Guide d'implémentation - Gestion des événements

## Structure de l'API (src/service/api.js)

### Méthodes implémentées :

1. **getallEvents(id)**
   - Récupère tous les événements si `id` est vide
   - Récupère un événement spécifique si `id` est fourni
   - Retourne une promesse avec la réponse Axios

2. **addEvent(event)**
   - Ajoute un nouvel événement
   - Paramètre : objet événement complet
   - Retourne une promesse avec la réponse Axios

3. **editEvent(id, event)**
   - Modifie un événement existant
   - Paramètres : ID de l'événement et objet avec les nouvelles données
   - Retourne une promesse avec la réponse Axios

4. **deleteEvent(id)**
   - Supprime un événement
   - Paramètre : ID de l'événement
   - Retourne une promesse avec la réponse Axios

## Composants créés/modifiés

### 1. Events.jsx
**Modifications :**
- Import de `getallEvents` depuis `src/service/api`
- Utilisation de `response.data` pour accéder aux données
- Gestion des états : loading, error, events
- Fonction `fetchEvents()` pour récupérer la liste des événements
- Affichage conditionnel : Spinner pendant le chargement, Alert en cas d'erreur

**Code clé :**
```javascript
const response = await getallEvents();
setEvents(response.data);
```

### 2. EventDetails.jsx
**Modifications :**
- Import de `getallEvents` et `editEvent` depuis `src/service/api`
- Récupération d'un événement par ID : `getallEvents(eventName)`
- Message "Event does not exist" si l'événement n'existe pas
- Utilisation de `editEvent()` pour les mises à jour (like, achat de tickets)

**Code clé :**
```javascript
const response = await getallEvents(eventName);
setEvent(response.data);
```

### 3. AddEvent.jsx (Nouveau composant)
**Fonctionnalités :**
- Formulaire d'ajout d'événement avec les champs :
  - Name (obligatoire)
  - Description (obligatoire)
  - Price
  - Number of Tickets
  - Image (interface seulement)
- Validation des champs obligatoires
- Utilisation de `addEvent()` pour l'ajout
- Redirection automatique vers "/" après ajout réussi avec `useNavigate()`
- Gestion des états : loading, error, success

**Code clé :**
```javascript
await addEvent({
  ...formData,
  price: Number(formData.price),
  nbTickets: Number(formData.nbTickets),
  nbParticipants: Number(formData.nbParticipants)
});
setTimeout(() => {
  navigate('/');
}, 1500);
```

### 4. UpdateEvent.jsx (Nouveau composant)
**Fonctionnalités :**
- Formulaire de modification d'événement
- Récupération des données existantes avec `getallEvents(eventId)`
- Pré-remplissage du formulaire avec les données actuelles
- Message "Event does not exist" si l'événement n'existe pas
- Utilisation de `editEvent()` pour la mise à jour
- Redirection automatique vers "/" après modification réussie
- Titre dynamique : "Modify {nom de l'événement}"

**Code clé :**
```javascript
const response = await getallEvents(eventId);
setFormData(response.data);

// Lors de la soumission
await editEvent(eventId, {
  ...formData,
  price: Number(formData.price),
  nbTickets: Number(formData.nbTickets),
  nbParticipants: Number(formData.nbParticipants)
});
```

### 5. NavigationBar.jsx
**Modifications :**
- Ajout du lien "Add New Event" dans la barre de navigation
- Utilisation de `NavLink` pour la navigation

**Code ajouté :**
```javascript
<Nav.Link as={NavLink} to="/add-event">Add New Event</Nav.Link>
```

### 6. Event.jsx
**Modifications :**
- Ajout du bouton "Modifier" (variant="warning")
- Fonction `handleEdit()` pour naviguer vers `/update-event/${event.id}`
- Import de `editEvent` et `deleteEvent` depuis `src/service/api`
- Utilisation de `editEvent()` pour les mises à jour (like, tickets)

### 7. router.jsx
**Modifications :**
- Ajout de la route `/add-event` → composant AddEvent
- Ajout de la route `/update-event/:eventId` → composant UpdateEvent
- Lazy loading des nouveaux composants

## Routes disponibles

| Route | Composant | Description |
|-------|-----------|-------------|
| `/` | Events | Liste de tous les événements |
| `/event/:eventName` | EventDetails | Détails d'un événement spécifique |
| `/add-event` | AddEvent | Formulaire d'ajout d'événement |
| `/update-event/:eventId` | UpdateEvent | Formulaire de modification d'événement |
| `/*` | NotFound | Page 404 |

## Fonctionnalités CRUD complètes

✅ **CREATE** - Ajouter un événement
- Formulaire dans AddEvent.jsx
- Bouton "Add New Event" dans NavigationBar
- Redirection automatique après ajout

✅ **READ** - Lire les événements
- Liste complète dans Events.jsx
- Détails dans EventDetails.jsx
- Message d'erreur si événement inexistant

✅ **UPDATE** - Modifier un événement
- Formulaire dans UpdateEvent.jsx
- Bouton "Modifier" sur chaque carte d'événement
- Pré-remplissage des données existantes
- Redirection automatique après modification

✅ **DELETE** - Supprimer un événement
- Bouton "Supprimer" sur chaque carte d'événement
- Confirmation avant suppression
- Mise à jour automatique de la liste

## Gestion des erreurs

- Message "Event does not exist" si l'événement n'existe pas (EventDetails et UpdateEvent)
- Alertes Bootstrap pour les erreurs et succès
- Gestion des états de chargement avec Spinner
- Désactivation des boutons pendant les opérations

## Navigation

- Utilisation de `useNavigate()` pour les redirections programmatiques
- `NavLink` dans NavigationBar pour la navigation
- Redirection automatique après ajout/modification (1.5 secondes)

## Pour tester l'application

1. Démarrer le serveur JSON :
```bash
npm run api
```

2. Démarrer l'application React :
```bash
npm run dev
```

3. Accéder à l'application : http://localhost:5173
4. API disponible sur : http://localhost:3001/events
