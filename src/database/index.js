const { sequelize } = require("./config");
const Monster = require("./entities/monster.entity");
const Environment = require("./entities/environment.entity");

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

module.exports = {
  sequelize,
  Monster,
  Environment,
};
