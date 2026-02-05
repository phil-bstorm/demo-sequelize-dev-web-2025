require("dotenv").config();

const { sequelize } = require("./database");
const {
  //   demoCreate,
  demoCreateWithRelation,
  demoFindAll,
  demoFindOne,
  demoWhereCondition,
  demoUpdate,
  demoDelete,
  demoFindWithRelation,
} = require("./demo");

console.log("hello world");

const main = async () => {
  await sequelize.authenticate();
  console.log("C'est good!!");

  // force: true => remise à zéro de la database
  // ATTENTION NE JAMAIS LAISSER force: true en production
  await sequelize.sync({ force: true });

  //   await demoCreate();
  await demoCreateWithRelation();

  await demoFindAll();

  await demoFindOne();

  await demoWhereCondition();

  await demoUpdate();

  //   await demoDelete();

  await demoFindWithRelation();

  process.exit(0);
};

main();
