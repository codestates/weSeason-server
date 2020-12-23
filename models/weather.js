'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class weather extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      weather.belongsToMany(models.clothes, {through: 'weatherClothes', targetKey:'id', foreignKey: 'weatherId'})
    }
  };
  weather.init({
    range: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'weather',
  });
  return weather;
};