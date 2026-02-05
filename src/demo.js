const { Op } = require("sequelize");
const { Monster, Environment, Characteristic } = require("./database");

// Ne fonctionne plus car on a rajouté une relation obligatoire dans monster
// const demoCreate = async () => {
//   // INSERT INTO
//   const dragon = await Monster.create({
//     nom: "Dragon",
//   });
//   const elft = await Monster.create({
//     nom: "Elft",
//   });
//   console.log(dragon);
//   console.log(dragon.id);

//   // Multiple insertion
//   const tableauDeMonstres = await Monster.bulkCreate([
//     {
//       nom: "Gnome",
//     },
//     {
//       nom: "Sirène",
//     },
//   ]);
// };

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

const demoCreateWithRelation = async () => {
  // 1. Créer les environments et characteristics
  const volcan = await Environment.create({
    name: "Volcan",
  });
  const ocean = await Environment.create({
    name: "Ocean",
  });
  const foret = await Environment.create({
    name: "Forêt",
  });

  const volant = await Characteristic.create({
    name: "Volant",
  });
  const nageur = await Characteristic.create({
    name: "Nageur",
  });
  const cracheFeu = await Characteristic.create({
    name: "Crache du feu",
  });

  // 2. Créer les monstres
  const dragon = await Monster.create({
    nom: "Dragon Ancestral",
    puissance: 50,
    environmentId: volcan.id,
  });

  // Ajouter des informations dans une table Many-To-Many
  // "Magic method"
  await dragon.addTraits([volant, cracheFeu]);

  const tableauDeMonstres = await Monster.bulkCreate([
    {
      nom: "Elfe de sang",
      environmentId: foret.id,
    },
    {
      nom: "Elfe de la nuit",
      environmentId: foret.id,
    },
    {
      nom: "Gnome",
      environmentId: foret.id,
    },
    {
      nom: "Sirène",
      environmentId: ocean.id,
    },
  ]);
};

const demoFindWithRelation = async () => {
  const sirene = await Monster.findOne({
    where: {
      nom: "Sirène",
    },
    // JOIN
    include: [
      // JOIN environment
      {
        model: Environment,
        as: "environment",
      },
    ],
  });
  if (sirene) {
    console.log(`${sirene.nom} vie dans ${sirene.environment.name}`);
  }

  const dragon = await Monster.findOne({
    where: {
      nom: "Dragon Ancestral",
    },
    // include: [
    //   {
    //     model: Characteristic,
    //     as: "traits",
    //   },
    // ],
  });
  if (dragon) {
    const traits = await dragon.getTraits();
    console.log("Trait du dragon:");
    // dragon.traits.forEach((t) => console.log(t.name));
    traits.forEach((t) => console.log(t.name));
  }
};

module.exports = {
  //   demoCreate, // Ne fonctionne plus car on a rajouté une relation obligatoire dans monster
  demoFindAll,
  demoFindOne,
  demoWhereCondition,
  demoUpdate,
  demoDelete,
  demoCreateWithRelation,
  demoFindWithRelation,
};
