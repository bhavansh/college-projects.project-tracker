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
} = require("../controller/todo");

router.post("/create/:projectId", auth, createTodo);
router.get("/all/:projectId", auth, getAllTodosForAProject);
router.get("/:todoId", auth, getATodoWithId);
router.get("/check-backlog/:todoId", auth, changeIsBackloged);
router.get("/all-backlog/:todoId", auth, getAllBacklogedTodosForAProject);
router.put("/status/:projectId", auth, changeStatusOfTodo);
router.put("/:todoId", auth, updateTodoInfo);
router.delete("/:todoId", auth, deleteTodo);

module.exports = router;
