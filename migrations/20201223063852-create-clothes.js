'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clothes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cloth: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(function(){
      queryInterface.addColumn('weather_clothes','clothes_id',{
          type: Sequelize.INTEGER,
          references:{model: 'clothes', key: 'id'}
      })
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('clothes');
  }
};