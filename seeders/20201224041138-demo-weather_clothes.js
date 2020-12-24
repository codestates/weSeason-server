'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const weather = await queryInterface.sequelize.query(`SELECT id FROM weather;`);
    const clothes = await queryInterface.sequelize.query(`SELECT id FROM clothes`);
    const weatherRows = weather[0] // id
    const clothesRows = clothes[0] // id

    await queryInterface.bulkInsert('weather_clothes', [
      {
        weather_id: weatherRows[0].id,
        clothes_id: clothesRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[0].id,
        clothes_id: clothesRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[0].id,
        clothes_id: clothesRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[0].id,
        clothes_id: clothesRows[3].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[0].id,
        clothes_id: clothesRows[4].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[1].id,
        clothes_id: clothesRows[5].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[1].id,
        clothes_id: clothesRows[6].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[1].id,
        clothes_id: clothesRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[1].id,
        clothes_id: clothesRows[7].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[1].id,
        clothes_id: clothesRows[8].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[1].id,
        clothes_id: clothesRows[4].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[2].id,
        clothes_id: clothesRows[9].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[2].id,
        clothes_id: clothesRows[10].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[2].id,
        clothes_id: clothesRows[7].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[2].id,
        clothes_id: clothesRows[11].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[2].id,
        clothes_id: clothesRows[12].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[2].id,
        clothes_id: clothesRows[13].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[2].id,
        clothes_id: clothesRows[14].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[3].id,
        clothes_id: clothesRows[15].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[3].id,
        clothes_id: clothesRows[48].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[3].id,
        clothes_id: clothesRows[16].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[3].id,
        clothes_id: clothesRows[7].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[3].id,
        clothes_id: clothesRows[11].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[3].id,
        clothes_id: clothesRows[17].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[3].id,
        clothes_id: clothesRows[18].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[3].id,
        clothes_id: clothesRows[19].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[4].id,
        clothes_id: clothesRows[15].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[4].id,
        clothes_id: clothesRows[48].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[4].id,
        clothes_id: clothesRows[20].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[4].id,
        clothes_id: clothesRows[16].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[4].id,
        clothes_id: clothesRows[21].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[4].id,
        clothes_id: clothesRows[22].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[4].id,
        clothes_id: clothesRows[23].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[4].id,
        clothes_id: clothesRows[20].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[4].id,
        clothes_id: clothesRows[24].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[4].id,
        clothes_id: clothesRows[26].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[5].id,
        clothes_id: clothesRows[27].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[5].id,
        clothes_id: clothesRows[28].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[5].id,
        clothes_id: clothesRows[21].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[5].id,
        clothes_id: clothesRows[7].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[5].id,
        clothes_id: clothesRows[11].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[5].id,
        clothes_id: clothesRows[29].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[5].id,
        clothes_id: clothesRows[20].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[5].id,
        clothes_id: clothesRows[25].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[6].id,
        clothes_id: clothesRows[30].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[6].id,
        clothes_id: clothesRows[31].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[6].id,
        clothes_id: clothesRows[21].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[6].id,
        clothes_id: clothesRows[32].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[6].id,
        clothes_id: clothesRows[33].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[6].id,
        clothes_id: clothesRows[34].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[6].id,
        clothes_id: clothesRows[35].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[6].id,
        clothes_id: clothesRows[36].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[6].id,
        clothes_id: clothesRows[37].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[6].id,
        clothes_id: clothesRows[38].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[6].id,
        clothes_id: clothesRows[39].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[7].id,
        clothes_id: clothesRows[40].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[7].id,
        clothes_id: clothesRows[41].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[7].id,
        clothes_id: clothesRows[42].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[7].id,
        clothes_id: clothesRows[43].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[7].id,
        clothes_id: clothesRows[44].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[7].id,
        clothes_id: clothesRows[45].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[7].id,
        clothes_id: clothesRows[46].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[7].id,
        clothes_id: clothesRows[47].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        weather_id: weatherRows[7].id,
        clothes_id: clothesRows[39].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('weather_clothes', null, {});
  }
};
