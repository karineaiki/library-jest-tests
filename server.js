const express = require('express');
const bookController = require('./book.controller');

// Créer une application Express
const app = express();

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Définir les routes pour l'API des livres
app.use('/books', bookController);

// Définir le port sur lequel le serveur écoute
const PORT = 3000;

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Exporter l'application pour les tests d'intégration
module.exports = app;
