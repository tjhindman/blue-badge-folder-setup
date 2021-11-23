// need to research .config()
require("dotenv").config();
let express = require("express");
let app = express();
let dbConnection = require("./db");

let controllers = require("./controllers");

// sequelize.sync({force: true})

app.use(require("./middleware/headers"));

app.use(express.json());

app.use("/user", controllers.usercontroller);

app.use("/journal", controllers.journalcontroller);

dbConnection
  .authenticate()
  .then(() => dbConnection.sync())
  .then(() => {
    app.listen(3000, () => {
      console.log("[Server]: App is listening on port 3000");
    });
  })
  .catch((err) => {
    console.log(`[Server]: Server crashed: Error = ${err}`);
  });
