const router = require("express").Router();
const { auth } = require("../helper/auhMiddleware");
const {
  getAllToxitiesOfAUserFromARoom,
  postAToxicity,
  getAllToxitiesOfAllMembersfromARoom,
} = require("../controller/chat_toxicity");

router.post("/:projectId/", auth, postAToxicity);
router.get("/all/:projectId/", auth, getAllToxitiesOfAllMembersfromARoom);
router.get("/all/:projectId/:userId", auth, getAllToxitiesOfAUserFromARoom);

module.exports = router;
