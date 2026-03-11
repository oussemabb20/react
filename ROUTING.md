# Configuration du Routage React

## Routes implémentées

### 1. Route principale - Liste des événements
- **Path:** `/`
- **Composant:** `Events` (lazy loaded)
- **Description:** Affiche la liste de tous les événements disponibles

### 2. Route des détails d'événement
- **Path:** `/event/:eventName`
- **Composant:** `EventDetails` (lazy loaded)
- **Description:** Affiche les détails complets d'un événement spécifique
- **Paramètre:** `eventName` - Le nom de l'événement

### 3. Route 404 - Page non trouvée
- **Path:** `*` (toutes les routes non définies)
- **Composant:** `NotFound` (lazy loaded)
- **Description:** Affiche une page 404 avec l'image notfound.jfif

## Composants créés

### NavigationBar
- Barre de navigation avec liens vers les différentes pages
- Utilise `NavLink` de react-router-dom pour mettre en évidence la route active

### RootLayout
- Layout principal qui inclut la NavigationBar et l'Outlet
- Gère le Suspense pour le lazy loading avec un fallback "Loading..."

### EventDetails
- Affiche les détails complets d'un événement
- Récupère l'événement depuis events.json en utilisant le paramètre de route
- Bouton pour retourner à la liste des événements

### NotFound
- Page 404 personnalisée avec l'image notfound.jfif

## Lazy Loading

Tous les composants de routes sont chargés de manière lazy avec `React.lazy()` pour optimiser les performances :
- `Events`
- `EventDetails`
- `NotFound`

## Navigation

Le composant `Event` a été mis à jour pour inclure un bouton "View Details" qui navigue vers la page de détails de l'événement en utilisant `useNavigate()`.

## Pour démarrer l'application

```bash
npm run dev
```

L'application sera accessible sur http://localhost:5173
