const User = require("../model/User");
const { getErrors } = require("../helper/commonFunc");

// Get authenticated user
exports.getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.loggedInUser._id);

    //   Check if user exists
    if (!user) {
      return res.status(404).json({
        error: "User requested couldn't found.",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

// Get user with id
exports.getUserWithId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    //   Check if user exists
    if (!user) {
      return res.status(404).json({
        error: "User requested couldn't found.",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

// Get all users
exports.getAllTheUsers = async (req, res) => {
  const sortBy = req.query.sortBy ? req.query.sortBy : "desc";

  try {
    const users = await User.find({}).sort([["createdAt", sortBy]]);
    //   Check if users exists
    if (users.length === 0) {
      return res.status(404).json({
        error: "No users were registed.",
      });
    }

    return res.status(200).json({
      users,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

// Get all users
exports.updateUser = async (req, res) => {
  const updates = {
    username: req.body.username,
    institution: req.body.institution,
    githubLink: req.body.githubLink,
  };

  const errorsArray = getErrors(req);
  if (errorsArray && errorsArray.length !== 0) {
    return res.status(400).json(errorsArray);
  }

  try {
    //   Check if user exists
    const user = await User.findById(req.loggedInUser._id);
    if (!user) {
      return res.status(404).json({
        error: "User to be updated doesn't exists.",
      });
    }

    //   Update the user
    await user.updateOne({
      $set: {
        username: updates.username,
        institution: updates.institution,
        githubLink: updates.githubLink,
      },
    });

    res.status(200).json({
      msg: `${user.name}, Profile updated successfully.`,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};
