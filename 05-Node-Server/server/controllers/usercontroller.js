const router = require("express").Router();

// require().import()??? [OLD CODE]
const { UserModel } = require("../models");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// need to look into this
const { UniqueConstraintError } = require("sequelize/lib/errors");

// USER REGISTER
// async/await and try/catch logic implemented from working with Paul. This is preferred method.
router.post("/register", async (req, res) => {
  const { email, password } = req.body.user;

  // try/catch logic implemented from working with Paul. This is preferred method.
  try {
    const newUser = await UserModel.create({
      email,
      // https://www.npmjs.com/package/bcrypt -> first argument is string to hash and
      // second is how many times it will be salted(encrypted with algorithm)
      password: bcrypt.hashSync(password, 13),
    });

    // .sign() is used to create a token
    
    let token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(201).json({
      message: "User successfully registered!",
      user: newUser,
      token,
    });
  } catch (err) {
    // need to look into this "instanceof"
    /************************************/
    // if email already in use will throw a "UniqueConstraintError"
    // so we are throwing an error for that specifically
  
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        error: `Email already in use`,
      });
    } else {
      res.status(500).json({
        error: `Failed to register user ${err}`,
      });
    }
  }
});

// USER LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body.user;

  try {
    let loginUser = await UserModel.findOne({
      where: {
        email,
      },
    });

    if (loginUser) {
      // - OPTIONAL SYNTAX -
      // let comparison = bcrypt.compare(req.body.password, comparedUser.password)
      // - would need if/else logic with this syntax
    
      bcrypt.compare(password, loginUser.password, (error, matches) => {
        if (matches) {
          // start SESSION for user (with token) if credentials are valid
          let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24,
          });

          res.status(200).json({
            message: "User successfully logged in!",
            user: loginUser,
            token,
          });
        } else {
          res.status(401).json({
            error,
          });
        }
      });
    } else {
      res.status(401).json({
        error: "User does not exist.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

module.exports = router;
