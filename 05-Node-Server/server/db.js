const Sequelize = require("sequelize");

// Sequilize functionality:
// const sequelize = new Sequelize(database://user:password@host:port/dbname)

const sequelize = new Sequelize("postgres://postgres:password@localhost:5432/journal-walkthrough");

// - OR -
// const sequelize = new Sequelize("journal-walkthrough", "postgres", "password", {
//   host: "localhost",
//   dialect: "postgres",
// });
// ~ meaning ~
// new Sequelize(database-table-name, admin-username, admin-password, {
//     host: (points to local host in this example),
//     dialect: (query language [QL] dialect [ex: postgres])
// })

module.exports = sequelize;
