const { Op } = require("sequelize");
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
      nom: "Sirène",
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

const demoFindOne = async () => {
  // SELECT * FROM "Monsters" WHERE nom = "Dragon";
  const monstre = await Monster.findOne({
    where: {
      nom: "dragon",
    },
  });
  if (monstre) {
    console.log(monstre.nom);
  } else {
    console.log("le monstre n'existe pas.");
  }
};

const demoWhereCondition = async () => {
  // SELECT * FROM "Monster" WHERE puissance > 5
  const monsters = await Monster.findAll({
    where: {
      puissance: {
        [Op.gt]: 4,
      },
    },
  });
  monsters.forEach((m) => console.log(m.nom));

  const dragon = await Monster.findOne({
    where: {
      nom: {
        [Op.iLike]: "drag%",
      },
    },
  });
  console.log(`${dragon.nom} - ${dragon.id}`);
};

const demoUpdate = async () => {
  // méthode 1: UPDATE
  // UPDATE "Monster" SET puissance = 10 WHERE ...
  await Monster.update(
    { puissance: 10 },
    {
      where: {
        nom: {
          [Op.iLike]: "drag%",
        },
      },
    },
  );

  // méthode 2 : SAVE
  const sirene = await Monster.findOne({
    where: {
      nom: {
        [Op.iLike]: "Sirène",
      },
    },
  });
  if (sirene) {
    sirene.puissance = 20;
    await sirene.save();
  }
};

const demoDelete = async () => {
  // méthode 1: Model.Destroy
  await Monster.destroy({
    where: {
      nom: {
        [Op.iLike]: "elft%",
      },
    },
  });

  // méthode 2: Instance.Destroy
  const gnome = await Monster.findOne({
    where: {
      nom: {
        [Op.iLike]: "gnome",
      },
    },
  });
  if (gnome) {
    await gnome.destroy();
  }
};

module.exports = {
  demoCreate,
  demoFindAll,
  demoFindOne,
  demoWhereCondition,
  demoUpdate,
  demoDelete,
};
