module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      //    allowNull optional
      allowNull: false,
      //    "unique" also optional but good for no duplicates
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      //    allowNull optional
      allowNull: false,
    },
  });

  return User;
};
