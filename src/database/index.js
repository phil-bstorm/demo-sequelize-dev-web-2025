const { sequelize } = require("./config");
const Monster = require("./entities/monster.entity");

module.exports = {
  sequelize,
  Monster,
};
