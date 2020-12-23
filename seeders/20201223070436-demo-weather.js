'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('weather', [{
      range: '매우더움',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      range: '더움',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      range: '조금더움',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      range: '따듯함',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      range: '선선함',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      range: '조금추움',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      range: '추움',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      range: '매우추움',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('weather', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
