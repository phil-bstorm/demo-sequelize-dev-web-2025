require("dotenv").config();

const { sequelize } = require("./database");
const {
  demoCreate,
  demoFindAll,
  demoFindOne,
  demoWhereCondition,
  demoUpdate,
  demoDelete,
} = require("./demo");

console.log("hello world");

const main = async () => {
  await sequelize.authenticate();
  console.log("C'est good!!");

  // force: true => remise à zéro de la database
  // ATTENTION NE JAMAIS LAISSER force: true en production
  await sequelize.sync({ force: true });

  await demoCreate();

  await demoFindAll();

  await demoFindOne();

  await demoWhereCondition();

  await demoUpdate();

  await demoDelete();

  process.exit(0);
};

main();
