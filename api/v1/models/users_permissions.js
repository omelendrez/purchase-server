"use strict";
module.exports = function(sequelize, DataTypes) {
  const UsersPermissions = sequelize.define(
    "users_permissions",
    {
      user_id: {
        type: DataTypes.INTEGER
      },
      permission_id: {
        type: DataTypes.INTEGER
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["user_id", "permission_id"]
        }
      ]
    }
  );

  return UsersPermissions;
};
