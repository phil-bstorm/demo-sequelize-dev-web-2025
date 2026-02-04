// Charge le module Sequelize
const { Sequelize } = require("sequelize");

// Connecter Sequelize à la base de donnée
const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } = process.env; // déconstruction pour directement récupérer nos variables d'environnement
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
});

// export la connexion pour pouvoir l'utiliser
module.exports = {
  sequelize,
};
