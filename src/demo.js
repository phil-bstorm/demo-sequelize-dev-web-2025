const { Monster } = require("./database");

const demoCreate = async () => {
  // INSERT INTO
  const dragon = await Monster.create({
    nom: "Dragon",
  });
  const elft = await Monster.create({
    nom: "Elft",
  });
  console.log(dragon);
  console.log(dragon.id);

  // Multiple insertion
  const tableauDeMonstres = await Monster.bulkCreate([
    {
      nom: "Gnome",
    },
    {
      nom: "Sireine",
    },
  ]);
};

const demoFindAll = async () => {
  // SELECT * FROM Monster
  const listeMonsters = await Monster.findAndCountAll();
  console.log(listeMonsters);

  listeMonsters.rows.forEach((m) => console.log(m.nom));

  for (let i = 0; i < listeMonsters.rows.length; i++) {
    console.log(listeMonsters.rows[i].nom);
  }
};

module.exports = {
  demoCreate,
  demoFindAll,
};
