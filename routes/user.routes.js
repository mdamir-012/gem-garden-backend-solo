const express = require("express");
const { userModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userController = express.Router();

// signup
userController.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 5, async function (err, hash) {
    // Store hash in your password DB.
    if (err) {
      res.send("something went wrong, please try again later");
    }
    const user = new userModel({
      name: name,
      email: email,
      password: hash,
    });

    try {
      await user.save();
      res.send("signup successfully");
    } catch (err) {
      console.log(err);
      res.send("something went wrong");
    }
  });
});

// login
userController.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  const hash = user.password;

  bcrypt.compare(password, hash, function (err, result) {
    // result == true
    if (err) {
      res.send("something went wrong, please try again");
    }
    if (result) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.send({ message: "login successful", token });
    } else {
      res.send("invalid credentials, please sign up");
    }
  });
});

module.exports = { userController };
