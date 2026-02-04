require("dotenv").config();

const { sequelize, Monster } = require("./database");

console.log("hello world");

const main = async () => {
  await sequelize.authenticate();
  console.log("C'est good!!");

  await sequelize.sync();

  // INSERT INTO
  //   const dragon = await Monster.create({
  //     nom: "Dragon",
  //   });
  //   console.log(dragon);

  // SELECT * FROM Monster
  const listeMonsters = await Monster.findAndCountAll();
  console.log(listeMonsters);

  listeMonsters.rows.forEach((m) => console.log(m.nom));

  for (let i = 0; i < listeMonsters.rows.length; i++) {
    console.log(listeMonsters.rows[i].nom);
  }
};

main();
