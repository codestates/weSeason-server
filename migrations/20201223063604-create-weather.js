"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable("weather", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        range: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(function () {
        queryInterface.createTable("weather_clothes", {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          weather_id: {
            type: Sequelize.INTEGER,
            references: { model: "weather", key: "id" },
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        });
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("weather");
  },
};
