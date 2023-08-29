const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const { validationResult } = require("express-validator");
//Creating User
exports.createUser = async (req, res) => {
  try {
    //Validations Error Handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Duplicate email checking
    const checkUser = await User.findOne({ email: req.body.email });
    if (checkUser)
      return res.status(400).json({ error: "User with email exists" });

    //Hashing
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    //Creating a User
    const newuser = new User({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    //Saving a User
    const response = await newuser.save();

    //Creating JWT payload and token using that
    const data = {
      id: response._id,
    };
    const token = jwt.sign(data, JWT_SECRET);
    res.status(200).json({ token });

    //catching errors
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
};

//User Login

exports.userLogin = async (req, res) => {
  try {
    // Validations Error Handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // User checking
    const result = await User.findOne({ email: req.body.email });
    if (!result) return res.status(400).json({ error: "User Doesn't exist" });

    //Comparing password
    const match = await bcrypt.compare(req.body.password, result.password);
    if (!match) return res.status(400).json({ error: "Check your password" });

    // Creating JWT payload and token using that
    const data = {
      id: result._id, // Use result._id instead of response._id
    };
    const token = jwt.sign(data, JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
};

//Get details of Single User

exports.getUser = async (req, res) => {
  const id = req.id;
  const user = await User.findById({ _id: id }).select("-password");
  if (!user) {
    res.status(400).json({ error: "User doesn't exist" });
  }
  res.status(200).json(user);
};

// Update Profile

exports.updateUser = async (req, res) => {
  try {
    // Validations Error Handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // User checking
    const { id } = req.params;
    const result = await User.findOne({ _id: id });
    if (!result) return res.status(400).json({ error: "User Doesn't exist" });

    //Updating User
    const updatedFields = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
    }).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
};

async (req, res) => {
  const { oldpassword, newpassword, confirmnewpassword } = req.body;
  const id = req.id;

  //checking User
  const user = await User.findById({ _id: id });
  if (!user) {
    return res.status(400).json({ error: "User Doesn't exist" });
  }
  try {
    //Comparing password and checking password
    const match = await bcrypt.compare(oldpassword, user.password);
    if (!match) return res.status(400).json({ error: "Check your password" });
    if (newpassword !== confirmnewpassword)
      return res.status(400).json({
        error: "new password and confirm new password has to be same",
      });

    //Creating New Hash
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(newpassword, salt);

    const response = await User.findByIdAndUpdate(
      { _id: id },
      { password: secPass },
      { new: true }
    );
    res.status(200).json({ msg: "password updated successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "some internal error occured" });
  }
};

// Change Password

exports.changePassword = async (req, res) => {
  const { oldpassword, newpassword, confirmnewpassword } = req.body;
  const id = req.id;

  //checking User
  const user = await User.findById({ _id: id });
  if (!user) {
    return res.status(400).json({ error: "User Doesn't exist" });
  }
  try {
    //Comparing password and checking password
    const match = await bcrypt.compare(oldpassword, user.password);
    if (!match) return res.status(400).json({ error: "Check your password" });
    if (newpassword !== confirmnewpassword)
      return res.status(400).json({
        error: "new password and confirm new password has to be same",
      });

    //Creating New Hash
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(newpassword, salt);

    const response = await User.findByIdAndUpdate(
      { _id: id },
      { password: secPass },
      { new: true }
    );
    res.status(200).json({ msg: "password updated successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "some internal error occured" });
  }
};

//User Logout
exports.userLogout = async (req, res) => {
  try {
    //Getting token from headers and making an Object
    const token = req.headers.auth;
    const newToken = {
      token,
    };
    //Pushing the new token into user's revokedTokens Array
    const _id = req.id;
    const user = await User.findByIdAndUpdate(
      { _id },
      { $push: { revokedTokens: newToken } }
    );
    if (!user) {
      res.status(404).json({ error: "Couldn't find the user" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "some internal error occured" });
  }
};
