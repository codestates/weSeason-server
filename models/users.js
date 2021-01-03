"use strict";
const crypto = require("crypto");

const { Model } = require("sequelize");
const { use } = require("../router");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      name: DataTypes.STRING,
      nickname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );

  users.beforeCreate((users, options) => {
    if (users.password) {
      users.password = crypto
        .createHash("sha512")
        .update(users.password)
        .digest("base64");
    }
  });

  users.beforeFind((users, options) => {
    if (users.where.password) {
      users.where.password = crypto
        .createHash("sha512")
        .update(users.where.password)
        .digest("base64");
    }
  });
  users.beforeUpdate((users, options) => {
    if (users.password) {
      users.password = crypto
        .createHash("sha512")
        .update(users.password)
        .digest("base64");
    }
  });
  return users;
};
