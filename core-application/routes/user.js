const router = require("express").Router();
const { auth } = require("../helper/auhMiddleware");
const { check } = require("express-validator");
const {
  getLoggedInUser,
  getUserWithId,
  getAllTheUsers,
  updateUser,
} = require("../controller/user");

router.get("/", auth, getLoggedInUser);
router.get("/all", auth, getAllTheUsers);
router.get("/:userId", auth, getUserWithId);
router.put(
  "/",
  auth,
  check("username", "Username is required.").not().isEmpty(),
  check("githubLink", "Github Link is required.").not().isEmpty(),
  check(
    "institution",
    "Institution is required. ex - Google, Facebook, MIT, Stanford etc."
  )
    .not()
    .isEmpty(),
  updateUser
);

module.exports = router;
