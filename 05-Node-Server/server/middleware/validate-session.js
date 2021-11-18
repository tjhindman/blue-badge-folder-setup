const jwt = require("jsonwebtoken");
// .require().import() ???
const User = require("../db").import("../models/user");

// ~ THIS IS A MIDDLEWARE FUNCTION ~
const validateSession = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("token -->", token);

  if (!token) {
    return res.status(403).send({
      auth: false,
      message: "No token provided.",
    });
  } else {
    // arrow function passing in "decodeToken" is confusing. See "Line 10" explanation here:
    // https://elevenfifty.instructure.com/courses/746/pages/12-dot-2-1-validate-session?module_item_id=64822
    jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
      console.log("decodeToken -->", decodeToken);

      if (!err && decodeToken) {
        User.findOne({
          where: {
            // "id" is passed in usercontroller.js in User.create() function
            id: decodeToken.id,
          },
        })
          .then((user) => {
            console.log("user -->", user);

            // no curly braces around "if" statement/function will execute stuff after parenthesis I guess.
            // probably good use if there is only one peice of logic for the "if" statement/function
            if (!user) throw err;

            console.log("req -->", req);
            req.user = user;
            return next();
          })
          .catch((err) => next(err));
      } else {
        req.errors = err;
        return res.status(500).send("Not authorized");
      }
    });
  }
};

module.exports = validateSession;
