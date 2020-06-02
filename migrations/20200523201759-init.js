/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-use-before-define */
const template = require('./template.json');

const migration = {
  async up(db, client) {
    await seedTemplate(db);
    await seedUsers(db);
  },

  async down(db, client) {
    const collections = await Promise.all([
      await db.collection('positions'),
      await db.collection('users'),
      await db.collection('templates'),
      await db.collection('groups'),
      await db.collection('subgroups'),
      await db.collection('questions'),
    ]);

    collections.forEach(collection => collection.drop())
  }
};

async function saveArrayToCollection(collection, array) {
  return Promise.all(
    array.map(async item => {
      const { insertedId } = await collection.insertOne(item);

      return insertedId;
    })
  );
}

async function seedUsers(db) {
  const positions = await db.createCollection('positions');
  const users = await db.createCollection('users');

  await positions.insertMany([
    {
      name: "Младший разработчик"
    },
    {
      name: "Разработчик"
    },
    {
      name: "Старший разработчик"
    },
    {
      name: "Ведущий разработчик"
    }
  ]);

  const junior = await positions.findOne({ name: 'Младший разработчик' })
  const middle = await positions.findOne({ name: 'Разработчик' })

  await users.insertMany([
    {
      name: "Максим",
      surname: "Тимошенко",
      positionId: junior._id,
      rating: 0,
      username: 'maxim',
      password: '1234'
    },
    {
      name: "Денис",
      surname: "Петров",
      positionId: middle._id,
      rating: 0,
      username: 'denis',
      password: '1234'
    },
    {
      name: "Евгений",
      surname: "Жуков",
      positionId: middle._id,
      rating: 0,
      username: 'evgen',
      password: '1234'
    }
  ]);
}

async function seedTemplate(db) {
  const templatesCollection = await db.createCollection('templates');
  const groupsCollection = await db.createCollection('groups');
  const subgroupsCollection = await db.createCollection('subgroups');
  const questionsCollection = await db.createCollection('questions');
  await db.createCollection('application-forms');

  const saveGroups = saveArrayToCollection.bind(this, groupsCollection);
  const saveSubgroups = saveArrayToCollection.bind(this, subgroupsCollection);
  const saveQuestions = saveArrayToCollection.bind(this, questionsCollection);

  const savedObjects = await Promise.all(
    template.groups.map(async ({ subgroups, ...group }) => ({
      ...group,
      subgroupsIds: await saveSubgroups(
        await Promise.all(subgroups.map(async ({ questions, ...subgroup }) => ({
          ...subgroup,
          questionsIds: await saveQuestions(questions)
        }))))
    }))
  );

  const groupsIds = await saveGroups(savedObjects);

  await templatesCollection.insertOne({
    groupsIds
  });
}

module.exports = migration;
