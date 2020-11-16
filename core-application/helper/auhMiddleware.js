const User = require("../model/User");
const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split("Bearer ")[1];
  } else {
    return res.status(403).json({
      error: "Unauthorized request! Please sign in again.",
    });
  }

  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(403).json({
        error: "User not found.",
      });
    } else {
      req.loggedInUser = user;
    }
  } catch (e) {
    if (e.message === "jwt expired") {
      return res.status(403).json({
        error: "Session expired, Sign in again.",
      });
    }
    return res.status(500).json({
      error: e.message,
    });
  }
  next();
};
