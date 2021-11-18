const router = require("express").Router();

// "User" variable logic a little bit confusing => require().import()???
const User = require("../db").import("../models/user");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// USER SIGN UP
router.post("/create", (req, res) => {
  User.create({
    email: req.body.user.email,
    // https://www.npmjs.com/package/bcrypt -> first argument is string to hash and
    // second is how many times it will be salted(encrypted with algorithm)
    password: bcrypt.hashSync(req.body.user.password, 13),
  })
    .then(
      // (user) => {
      //   res.json({
      //     user: user,
      //   });
      // }
      // ↑ DOES SAME THING ↑

      (createSuccess = (user) => {
        // .sign() is used to create a token
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24,
        });

        res.json({
          user: user,
          message: "User successfully created!",
          sessionToken: token,
        });
      })
    )
    .catch((err) => res.status(500).json({ error: err }));
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
                sessionToken: token,
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
