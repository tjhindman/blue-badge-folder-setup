const { DataTypes } = require("sequelize");
// "db" comes from Sequelize database connection made in "db.js"
const db = require("../db");

const Journal = db.define("journal", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  entry: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Journal;
