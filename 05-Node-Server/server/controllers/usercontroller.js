const router = require("express").Router();

// "User" variable logic a little bit confusing => require().import()???
const User = require("../db").import("../models/user");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// need to look into this
const { UniqueConstraintError } = require("sequelize/lib/errors");

// USER SIGN UP
// async/await and try/catch logic implemented from working with Paul. This is preferred method.
router.post("/create", async (req, res) => {
  const { email, password } = req.body.user;

  // try/catch logic implemented from working with Paul. This is preferred method.
  try {
    const newUser = await User.create({
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
      message: "User successfully created!",
      user: newUser,
      token,
    });
  } catch (err) {
    // need to look into this "instanceof"
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
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.user.email,
    },
  })
    .then((user) => {
      if (user) {
        bcrypt.compare(
          req.body.user.password,
          user.password,
          (err, matches) => {
            if (matches) {
              // start SESSION for user (with token) if credentials are valid
              let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24,
              });

              res.status(200).json({
                user: user,
                message: "User successfully logged in!",
                token,
              });
            } else {
              res.status(502).send({
                error: "Login failed.",
              });
            }
          }
        );
      } else {
        res.status(500).json({
          error: "User does not exist.",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
