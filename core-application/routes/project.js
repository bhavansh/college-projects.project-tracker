const router = require("express").Router();
const { auth } = require("../helper/auhMiddleware");
const { check } = require("express-validator");
const {
  createProject,
  joinProject,
  getAProjectWithId,
  getAllProjectForAUser,
  getAllBannedUsersOfProject,
  updateProjectInfo,
  togglebanUserFromProject,
  deleteProject,
} = require("../controller/project");

router.post("/create", auth, createProject);
router.post("/join/:projectId", auth, joinProject);
router.get("/:projectId", auth, getAProjectWithId);
router.get("/all", auth, getAllProjectForAUser);
router.get("/banned-user/:projectId", auth, getAllBannedUsersOfProject);
router.put("/:projectId", auth, updateProjectInfo);
router.put("/ban/:projectId/:userId", auth, togglebanUserFromProject);
router.delete("/:projectId", auth, deleteProject);

module.exports = router;
