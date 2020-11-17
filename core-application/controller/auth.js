const User = require("../model/User");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { getErrors } = require("../helper/commonFunc");

exports.signin = async (req, res) => {
  const enteredUser = new User({
    email: req.body.email,
  });

  try {
    const errorsArray = getErrors(req);

    if (errorsArray && errorsArray.length !== 0) {
      return res.status(400).json(errorsArray);
    }
    // Check if user already exists
    const foundUser = await User.findOne({ email: enteredUser.email });

    if (!foundUser) {
      return res.status(404).json({
        error: "User could not found, Sign up",
      });
    }

    //   Create token
    const payload = {
      userId: foundUser._id,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 43200,
    });

    res.status(200).json({
      msg: `Welcome ${foundUser.name} to Project Tracker.`,
      token,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

exports.signup = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    profilePhoto: req.body.profilePhoto
      ? req.body.profilePhoto
      : "https://raw.githubusercontent.com/saurabh-619/project-tracker/a2f9dc97941f26ce9d76ed7c149f45237fac2d88/resources/noProfile.svg",
    githubLink: req.body.githubLink,
    institution: req.body.institution,
    rooms: [],
    adminRooms: [],
    bannedRooms: [],
  });

  try {
    const errorsArray = getErrors(req);

    if (errorsArray && errorsArray.length !== 0) {
      return res.status(400).json(errorsArray);
    }
    // Check if user already exists
    const foundUser1 = await User.findOne({ email: newUser.email });
    const foundUser2 = await User.findOne({ username: newUser.username });

    if (foundUser1) {
      return res.status(400).json({
        error: "User already exists, sign in please.",
      });
    }
    if (foundUser2) {
      return res.status(400).json({
        error: "Username is already taken. Try another",
      });
    }

    //   Save user to db
    const user = await newUser.save();

    //   Create token
    const payload = {
      userId: user._id,
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 43200,
    });
    res.status(200).json({
      msg: `${newUser.name} signed up succefully.`,
      token,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};
