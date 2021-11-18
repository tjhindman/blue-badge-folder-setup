const Sequelize = require("sequelize");

// Sequilize functionality:
// new Sequelize(database-table-name, admin-username, admin-password, {
//     host: (points to local host in this example),
//     dialect: (query language [QL] dialect [ex: postgres])
// })

const sequelize = new Sequelize("journal-walkthrough", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

// - OR -
// const sequelize = new Sequelize(database://user:password@host:port/dbname)

// .then() arguments confusing for error handling
sequelize.authenticate().then(
  () => {
    console.log("Connected to journal-walkthrough postgres database");
  },
  (err) => {
    console.log(err);
  }
);

module.exports = sequelize;
