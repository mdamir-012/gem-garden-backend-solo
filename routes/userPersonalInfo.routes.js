const express = require("express");
const { userInfoModel } = require("../models/user.model");
require("dotenv").config();

const userInfoController = express.Router();

// Get user information by user ID using GET method
userInfoController.get("/", async (req, res) => {
  const { userId } = req.body;

   // Retrieve user information based on the provided user ID
  const userInfo = await userInfoModel.find({ userId: userId });
  // Respond with user data in JSON format
  res.status(200).json({ userdata: userInfo });
});

// Create a new user information entry using POST method
userInfoController.post("/create", async (req, res) => {
  const { firstName, lastName, email, phone, city, state, pincode, userId } =
    req.body;

     // Create a new user information object
  const userinfoAdded = new userInfoModel({
    firstName,
    lastName,
    email,
    phone,
    city,
    state,
    pincode,
    userId,
  });

  try {
    // Save the new user information entry to the database
    await userinfoAdded.save();

    // Respond with a success message and the created user data
    res.status(200).json({ message: "created", createdData: userinfoAdded });
  } catch (err) {
    // Handle errors and respond with an error message
    console.log(err);
    res.send("something went wrong");
  }
});

// Delete user information by ID using DELETE method
userInfoController.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

   // Attempt to find and delete user information based on the provided ID and user ID
  const deletedData = await userInfoModel.findOneAndDelete({
    _id: id,
    userId: req.body.userId,
  });
  // Respond with a success message and the deleted user data, or an error message if deletion fails
  if (deletedData) {
    res.status(200).json({ message: "deleted", data: deletedData });
  } else {
    res.status(400).json("couldn't delete");
  }
});

// Edit user information by ID using PATCH method
userInfoController.patch("/edit/:id", async (req, res) => {
  const { id } = req.params;

   // Attempt to find and update user information based on the provided ID and user ID
  const editUserInfo = await userInfoModel.findOneAndUpdate(
    { _id: id, userId: req.body.userId },
    { ...req.body }
  );
  // Respond with a success message and the edited user data, or an error message if editing fails
  if (editUserInfo) {
    res.status(200).json({ message: "edited", data: editUserInfo });
  } else {
    res.status(400).json("couldn't edit");
  }
});

// Export the userInfoController for use in other parts of the application
module.exports = { userInfoController };
