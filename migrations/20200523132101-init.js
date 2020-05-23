module.exports = {
  async up(db, client) {
    const position = await db.createCollection('position');
    position.insertMany([
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
    ])


    const junior = await position.findOne({ name: 'Младший разработчик' })
    const middle = await position.findOne({ name: 'Разработчик' })

    const users = await db.createCollection('users');
    users.insertMany([
      {
        name: "Максим",
        surname: "Тимошенко",
        positionId: junior._id,
        rating: 0
      },
      {
        name: "Денис",
        surname: "Петров",
        positionId: middle._id,
        rating: 0
      },
      {
        name: "Евгений",
        surname: "Жуков",
        positionId: middle._id,
        rating: 0
      }
    ])
    const groups = await db.createCollection('groups');
    groups.insertMany([
      {
        title: "Профессиональные навыки/функциональные обязанности",
        subgroups: []
      },
      {
        title: "Профессиональные навыки/функциональные обязанности",
        subgroups: []
      }
    ])

    const subgroups = await db.createCollection('subgroups');
    await subgroups.insertMany([
      {
        groupId: (await groups.find()).toArray()[0]._id,
        title: "Задачи и навыки",
        questions: []
      },
      {
        groupId: (await groups.find()).toArray()[0]._id,
        title: "Задачи и навыки",
        questions: []
      }
    ])
    const questions = await db.createCollection('questions');
    await questions.insertMany([
      {
        subgroupId: (await subgroups.find()).toArray()[0]._id,
        title: "Вёрстка",
        description: "1 -  умеет верстать простые компоненты: карточки, таблицы, задачи выполняет с консульатции ментора 5   - умеет верстать адаптивную верстку,динамику, задачи выполняет самостоятельно, консультации требуются для сложных компонентов\n10 - умеет верстать сложные компоненты, динамику, анимации, рисование,задачи выполняет самостоятельно "
      },
      {
        subgroupId: (await subgroups.find()).toArray()[0]._id,
        title: "Вёрстка",
        description: "1 -  умеет верстать простые компоненты: карточки, таблицы, задачи выполняет с консульатции ментора 5   - умеет верстать адаптивную верстку,динамику, задачи выполняет самостоятельно, консультации требуются для сложных компонентов\n10 - умеет верстать сложные компоненты, динамику, анимации, рисование,задачи выполняет самостоятельно "
      }
    ])

    const templates = await db.createCollection('templates');
    await templates.insertOne(
      {
        groups: (await groups.find()).toArray().map(group => group._id)
      }
    )

    await groups.updateMany({},
      (await groups.find()).toArray().map(group => ({
        ...group,
        subgroups: (await subgroups.find({ groupId: group._id })).toArray()
      }))
    )
    await subgroups.updateMany({},
      (await subgroups.find()).toArray().map(subgroup => ({
        ...subgroup,
        questions: (await questions.find({ subgroupId: subgroup._id })).toArray()
      }))
    )
  },



  async down(db, client) {
    db.users.drop()
    db.templates.drop()
  }
};
