"use strict";
module.exports = function(sequelize, DataTypes) {
  const Users = sequelize.define(
    "users",
    {
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 50]
        }
      },
      password: {
        type: DataTypes.STRING,
        defaultValue: "123"
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      position_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["user_name"]
        }
      ]
    }
  );

  return Users;
};
