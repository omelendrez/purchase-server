"use strict";
const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  const Users = sequelize.define(
    "users",
    {
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      organization_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      profile_id: {
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
  Users.beforeCreate((users) => {
    return bcrypt.hash(users.password, 10)
      .then(hash => {
        users.password = hash;
      })
      .catch(() => {
        throw new Error();
      });
  });
  Users.beforeUpdate((users) => {
    return bcrypt.hash(users.password, 10)
      .then(hash => {
        users.password = hash;
      })
      .catch(() => {
        throw new Error();
      });
  });
  return Users;
};
