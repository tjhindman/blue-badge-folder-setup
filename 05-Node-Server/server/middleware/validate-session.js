const jwt = require("jsonwebtoken");
// .require().import() ???
const { UserModel } = require("../models");

// ~ THIS IS A MIDDLEWARE FUNCTION ~
const validateSession = async (req, res, next) => {
  // need to look into "req.method"
  if (req.method == "OPTIONS") {
    next();
  } else if (
    req.headers.authorization &&
    req.headers.authorization.includes("Bearer")
  ) {
    const { authorization } = req.headers;
    // console.log("authorization ----->", authorization);
    const payload = authorization
      ? jwt.verify(
          authorization.includes("Bearer")
            ? authorization.split(" ")[1]
            : authorization,
          process.env.JWT_SECRET
        )
      : undefined;
    // console.log("payload ----->", payload);

    if (payload) {
      let foundUser = await UserModel.findOne({
        where: {
          id: payload.id,
        },
      });
      // console.log("foundUser ----->", foundUser);

      if (foundUser) {
        // console.log("request ----->", req);
        req.user = foundUser;
        next();
      } else {
        res.status(400).json({
          message: "Not authorized.",
        });
      }
    } else {
      res.status(401).json({
        message: "Invalid token.",
      });
    }
  } else {
    res.status(403).json({
      message: "Forbidden.",
    });
  }
};

module.exports = validateSession;
