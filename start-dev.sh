#!/bin/bash

# Script pour démarrer le serveur JSON et l'application React

echo "🚀 Démarrage du serveur JSON sur le port 3001..."
json-server --watch src/api/db.json --port 3001 &
JSON_PID=$!

echo "⏳ Attente du démarrage du serveur JSON..."
sleep 3

echo "🚀 Démarrage de l'application React..."
npm run dev &
VITE_PID=$!

echo ""
echo "✅ Les deux serveurs sont démarrés !"
echo "📡 API JSON Server: http://localhost:3001"
echo "🌐 Application React: http://localhost:5173"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter les deux serveurs"

# Fonction pour arrêter les serveurs
cleanup() {
    echo ""
    echo "🛑 Arrêt des serveurs..."
    kill $JSON_PID 2>/dev/null
    kill $VITE_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Attendre que les processus se terminent
wait
