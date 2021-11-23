const { DataTypes } = require("sequelize");
// "db" comes from Sequelize database connection made in "db.js"
const db = require("../db");

const User = db.define("user", {
  email: {
    type: DataTypes.STRING(100),
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

module.exports = User;
