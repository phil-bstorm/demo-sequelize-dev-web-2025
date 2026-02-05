const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");

const Monster = sequelize.define(
  "Monsters",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    puissance: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
  },
  {
    // OPTIONS
    // - index (optimiser la recherche sur un certain champs)
    // - contraintes
  },
);

module.exports = Monster;
