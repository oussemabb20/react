# Résumé final - Application de gestion d'événements

## 📋 Objectif du projet

Créer une application React complète de gestion d'événements avec :
- Affichage de la liste des événements
- Ajout de nouveaux événements
- Modification d'événements existants
- Suppression d'événements
- Interaction avec une API REST (json-server)

## 🏗️ Architecture du projet

```
src/
├── Components/
│   ├── Event.jsx              # Carte d'événement avec boutons CRUD
│   ├── Events.jsx             # Liste de tous les événements
│   ├── EventDetails.jsx       # Détails d'un événement
│   ├── AddEvent.jsx           # Formulaire d'ajout
│   ├── UpdateEvent.jsx        # Formulaire de modification
│   ├── NavigationBar.jsx      # Barre de navigation
│   ├── NotFound.jsx           # Page 404
│   └── RootLayout.jsx         # Layout principal
├── service/
│   └── api.js                 # Service API avec Axios
├── api/
│   └── db.json                # Base de données JSON
├── assets/
│   └── placeholder.jpg        # Image par défaut
├── router.jsx                 # Configuration des routes
└── main.jsx                   # Point d'entrée
```

## 🔧 Technologies utilisées

- **React 19.2.0** - Framework JavaScript
- **React Router DOM 7.13.0** - Gestion des routes
- **Axios 1.13.5** - Requêtes HTTP
- **React Bootstrap 2.10.10** - Composants UI
- **Bootstrap 5.3.8** - Styles CSS
- **json-server** - API REST simulée
- **Vite 7.2.4** - Build tool

## 📦 Installation et démarrage

### Installation des dépendances
```bash
npm install
```

### Démarrage du serveur JSON (Terminal 1)
```bash
npm run api
```
API disponible sur : http://localhost:3001

### Démarrage de l'application React (Terminal 2)
```bash
npm run dev
```
Application disponible sur : http://localhost:5173

### Démarrage automatique (optionnel)
```bash
./start-dev.sh
```

## 🎯 Fonctionnalités implémentées

### 1. Service API (src/service/api.js)

Quatre méthodes principales :

```javascript
// Récupérer tous les événements ou un événement spécifique
getallEvents(id)

// Ajouter un nouvel événement
addEvent(event)

// Modifier un événement existant
editEvent(id, event)

// Supprimer un événement
deleteEvent(id)
```

### 2. Composant Event.jsx

**Affichage :**
- Titre de l'événement (cliquable, en bleu)
- Prix
- Nombre de tickets
- Nombre de participants

**Boutons :**
1. **Like** (cyan) - Toggle le statut "like"
2. **Book an event** (bleu) - Achète un ticket (décrémente nbTickets)
3. **Update** (vert) - Redirige vers le formulaire de modification
4. **Delete** (rouge) - Supprime l'événement avec confirmation

**Fonctionnalités :**
- Désactivation des boutons pendant les opérations
- Confirmation avant suppression
- Mise à jour automatique de la liste après chaque action
- Gestion des erreurs

### 3. Composant Events.jsx

**Fonctionnalités :**
- Récupération de tous les événements au chargement
- Affichage en grille responsive (Bootstrap)
- Spinner pendant le chargement
- Message d'erreur si le serveur n'est pas accessible
- Rafraîchissement automatique après modifications

### 4. Composant AddEvent.jsx

**Formulaire d'ajout avec :**
- Name (obligatoire)
- Description (obligatoire)
- Price (nombre)
- Number of Tickets (nombre)
- Image (interface seulement)

**Fonctionnalités :**
- Validation des champs obligatoires
- Message de succès après ajout
- Redirection automatique vers "/" après 1.5 secondes
- Bouton "Cancel" pour annuler

### 5. Composant UpdateEvent.jsx

**Formulaire de modification avec :**
- Récupération des données existantes
- Pré-remplissage du formulaire
- Titre dynamique : "Modify {nom de l'événement}"
- Mêmes champs que AddEvent

**Fonctionnalités :**
- Message "Event does not exist" si l'événement n'existe pas
- Message de succès après modification
- Redirection automatique vers "/" après 1.5 secondes
- Bouton "Cancel" pour annuler

### 6. Composant EventDetails.jsx

**Affichage détaillé :**
- Toutes les informations de l'événement
- Image
- Description complète
- Boutons "Like" et "Acheter un ticket"
- Bouton "Retour aux événements"

**Fonctionnalités :**
- Récupération de l'événement par ID
- Message "Event does not exist" si inexistant
- Mise à jour en temps réel

### 7. NavigationBar.jsx

**Menu de navigation :**
- MyEvents (logo/brand)
- Events (lien vers "/")
- Add New Event (lien vers "/add-event")

**Fonctionnalités :**
- Liens actifs mis en évidence
- Responsive (collapse sur mobile)

## 🛣️ Routes configurées

| Route | Composant | Description |
|-------|-----------|-------------|
| `/` | Events | Liste de tous les événements |
| `/event/:eventName` | EventDetails | Détails d'un événement |
| `/add-event` | AddEvent | Formulaire d'ajout |
| `/update-event/:eventId` | UpdateEvent | Formulaire de modification |
| `/*` | NotFound | Page 404 |

## 🔄 Opérations CRUD

### CREATE - Ajouter un événement
- **Composant :** AddEvent.jsx
- **Route :** /add-event
- **Méthode API :** addEvent(event)
- **HTTP :** POST /events
- **Accès :** Bouton "Add New Event" dans la navbar

### READ - Lire les événements
- **Liste complète :**
  - Composant : Events.jsx
  - Route : /
  - Méthode API : getallEvents()
  - HTTP : GET /events

- **Événement spécifique :**
  - Composant : EventDetails.jsx
  - Route : /event/:eventName
  - Méthode API : getallEvents(id)
  - HTTP : GET /events/:id

### UPDATE - Modifier un événement
- **Composant :** UpdateEvent.jsx
- **Route :** /update-event/:eventId
- **Méthode API :** editEvent(id, event)
- **HTTP :** PUT /events/:id
- **Accès :** Bouton "Update" sur chaque carte

### DELETE - Supprimer un événement
- **Composant :** Event.jsx
- **Méthode API :** deleteEvent(id)
- **HTTP :** DELETE /events/:id
- **Accès :** Bouton "Delete" sur chaque carte
- **Confirmation :** Oui (window.confirm)

## 🎨 Design et UI

### Couleurs des boutons
- **Like :** Cyan (info)
- **Book an event :** Bleu (primary)
- **Update :** Vert (success)
- **Delete :** Rouge (danger)
- **Cancel :** Gris (secondary)

### Layout
- Cartes d'événements en grille responsive
- 3 colonnes sur desktop (md)
- 2 colonnes sur tablette (sm)
- 1 colonne sur mobile (xs)

### États visuels
- Spinner pendant le chargement
- Boutons désactivés pendant les opérations
- Alerts pour les succès et erreurs
- Titre cliquable en bleu

## 📊 Structure de données (db.json)

```json
{
  "events": [
    {
      "id": 1,
      "name": "Festival international de Carthage",
      "description": "Le lorem ipsum est...",
      "img": "event1.jpg",
      "price": 30,
      "nbTickets": 10,
      "nbParticipants": 10,
      "like": false
    }
  ]
}
```

## ✅ Checklist des fonctionnalités

### Affichage
- [x] Liste des événements
- [x] Détails d'un événement
- [x] Spinner de chargement
- [x] Messages d'erreur
- [x] Messages de succès

### Navigation
- [x] Barre de navigation
- [x] Liens vers toutes les pages
- [x] Redirection après ajout/modification
- [x] Bouton retour

### CRUD
- [x] Créer un événement
- [x] Lire les événements
- [x] Modifier un événement
- [x] Supprimer un événement

### Interactions
- [x] Like/Unlike
- [x] Acheter des tickets
- [x] Confirmation avant suppression
- [x] Validation des formulaires

### Gestion d'état
- [x] Loading states
- [x] Error handling
- [x] Désactivation des boutons pendant les opérations
- [x] Rafraîchissement automatique

## 🐛 Gestion des erreurs

### Erreurs gérées :
1. Serveur JSON non démarré
2. Événement inexistant
3. Erreur réseau
4. Validation de formulaire
5. Erreur lors des opérations CRUD

### Messages d'erreur :
- "Erreur lors du chargement des événements. Assurez-vous que le serveur JSON est démarré."
- "Event does not exist"
- "Le nom et la description sont obligatoires"
- "Erreur lors de l'ajout/modification/suppression de l'événement"

## 📝 Scripts npm disponibles

```json
{
  "dev": "vite",                    // Démarre l'app React
  "build": "vite build",            // Build de production
  "lint": "eslint .",               // Linting du code
  "preview": "vite preview",        // Preview du build
  "api": "json-server --watch src/api/db.json --port 3001"  // Démarre l'API
}
```

## 🚀 Déploiement

### Build de production
```bash
npm run build
```

### Preview du build
```bash
npm run preview
```

## 📚 Documentation créée

1. **API_GUIDE.md** - Guide d'utilisation de l'API
2. **IMPLEMENTATION_GUIDE.md** - Guide d'implémentation détaillé
3. **TEST_GUIDE.md** - Guide de test complet
4. **FINAL_SUMMARY.md** - Ce document

## 🎓 Concepts React utilisés

- **Hooks :**
  - useState (gestion d'état)
  - useEffect (effets de bord)
  - useNavigate (navigation)
  - useParams (paramètres d'URL)

- **Composants :**
  - Composants fonctionnels
  - Props
  - Événements
  - Conditional rendering

- **Routing :**
  - Routes imbriquées
  - Paramètres dynamiques
  - Lazy loading
  - Navigation programmatique

- **API :**
  - Requêtes HTTP avec Axios
  - Async/await
  - Gestion des promesses
  - Gestion des erreurs

## 🏆 Résultat final

Une application complète de gestion d'événements avec :
- ✅ Interface utilisateur moderne et responsive
- ✅ CRUD complet fonctionnel
- ✅ Gestion d'état robuste
- ✅ Gestion des erreurs
- ✅ Navigation fluide
- ✅ Code propre et maintenable
- ✅ Documentation complète

## 🔗 Liens utiles

- React : https://react.dev/
- React Router : https://reactrouter.com/
- Axios : https://axios-http.com/
- Bootstrap : https://getbootstrap.com/
- json-server : https://github.com/typicode/json-server
