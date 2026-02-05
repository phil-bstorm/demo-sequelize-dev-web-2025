const { sequelize } = require("./config");
const Monster = require("./entities/monster.entity");
const Environment = require("./entities/environment.entity");
const Characteristic = require("./entities/characteristic.entity");

// Définir les relations entre les modèles
// Monster a une relation (1-1) vers Environment
Monster.belongsTo(Environment, {
  foreignKey: {
    allowNull: false, // Pour créer un Monster, on est obligé de donné son environmentId
    name: "environmentId",
  },
  as: "environment", // alias pour la relation
});
// Environment possède de 0 à N Monster
Environment.hasMany(Monster, {
  as: "monsters",
  foreignKey: "environmentId",
});

// Monster a plusieurs Characteristic (N-N)
Monster.belongsToMany(Characteristic, {
  through: "Monsters_Characteristics",
  foreignKey: "monsterId", // Clé pointant vers Monster
  otherKey: "characteristicId", // Clé pointant vers Characteristic
  as: "traits",
});
// Characteristic peut être lié à plusieurs Monsters (N-N)
Characteristic.belongsToMany(Monster, {
  through: "Monsters_Characteristics",
  foreignKey: "characteristicId", // Clé pointant vers Characteristic
  otherKey: "monsterId", // Clé pointant vers Monster
  as: "monsters",
});

module.exports = {
  sequelize,
  Monster,
  Environment,
  Characteristic,
};
