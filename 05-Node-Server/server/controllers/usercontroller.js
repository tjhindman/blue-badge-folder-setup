const router = require("express").Router();

// "User" variable logic a little bit confusing => require().import()???
const User = require("../db").import("../models/user");

// USER SIGN UP
router.post("/create", (req, res) => {
  User.create({
    email: req.body.user.email,
    password: req.body.user.password,
  }).then(res.send("this is our user/create endpoint!"));
});

module.exports = router;
