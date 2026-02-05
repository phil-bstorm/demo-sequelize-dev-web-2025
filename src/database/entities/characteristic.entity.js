const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");

const Characteristic = sequelize.define("Characteristics", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Characteristic;
