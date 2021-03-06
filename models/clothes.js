"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class clothes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      clothes.belongsToMany(models.weather, {
        through: "weather_clothes",
        targetKey: "id",
        foreignKey: "clothes_id",
      });
    }
  }
  clothes.init(
    {
      cloth: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "clothes",
    }
  );
  return clothes;
};
