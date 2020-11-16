const router = require("express").Router();
const { check } = require("express-validator");
const { signin, signup } = require("../controller/auth");

router.post(
  "/signin",
  check("email", "Please enter valid email").isEmail(),
  signin
);
router.post(
  "/signup",
  check("email", "Please enter valid email").isEmail(),
  check("name", "Name is required.").not().isEmpty(),
  check("username", "Username is required.").not().isEmpty(),
  check(
    "institution",
    "Institution is required. ex - Google, Facebook, MIT, Stanford etc."
  )
    .not()
    .isEmpty(),
  signup
);
module.exports = router;
