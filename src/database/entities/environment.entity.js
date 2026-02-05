const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");

const Environment = sequelize.define("Environments", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Environment;
