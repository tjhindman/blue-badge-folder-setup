// need to research .config()
require("dotenv").config();
let express = require("express");
let app = express();
let sequelize = require("./db");

let journal = require("./controllers/journalcontroller");
let user = require("./controllers/usercontroller");

sequelize.sync();
// sequelize.sync({force: true})

app.use(express.json());

app.use("/user", user);

// We imported the  middleware, which will check to see if the incoming request has a token.
// Anything beneath the  will require a token to access, thus becoming protected.
// Anything above it will not require a token, remaining unprotected.
// Therefore, the   routes is not protected, while the  route is protected. ↓↓↓↓

// ***THIS IS WHAT ABOVE IS TALKING ABOUT*** app.use(require("./middleware/validate-session"));
app.use("/journal", journal);

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
