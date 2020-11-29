const router = require("express").Router();
const { auth } = require("../helper/auhMiddleware");
const { check } = require("express-validator");
const {
  getAllTodosForAProject,
  createTodo,
  getATodoWithId,
  changeStatusOfTodo,
  updateTodoInfo,
  deleteTodo,
  changeIsBackloged,
  getAllBacklogedTodosForAProject,
  addAssignedMembers,
} = require("../controller/todo");

router.post(
  "/create/:projectId",
  auth,
  check("heading", "Project heading is required.").notEmpty(),
  check("description", "Description is required.").notEmpty(),
  check("tags", "Add atleast one tag.").notEmpty(),
  check("assignedMembers", "Assigned task to members.").notEmpty(),
  check("deadline", "Tentative deadline is required.").notEmpty(),
  createTodo
);
router.get("/:todoId", auth, getATodoWithId);
router.get("/all/:projectId", auth, getAllTodosForAProject);
router.get("/all-backlog/:projectId", auth, getAllBacklogedTodosForAProject);
router.put(
  "/:todoId",
  auth,
  check("heading", "Project heading is required.").notEmpty(),
  check("description", "Description is required.").notEmpty(),
  updateTodoInfo
);
router.put("/change-status/:todoId", auth, changeStatusOfTodo);
router.put("/assign/:todoId/:userId", auth, addAssignedMembers);
router.put("/change-backlog/:todoId", auth, changeIsBackloged);

router.delete("/:todoId", auth, deleteTodo);

module.exports = router;
