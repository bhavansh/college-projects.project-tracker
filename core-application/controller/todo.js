const User = require("../model/User");
const Project = require("../model/Project");
const { getErrors } = require("../helper/commonFunc");

// Create a Todo with with given required info
exports.createTodo = async (req, res) => {
  const userId = req.loggedInUser._id;
  const projectId = req.params.projectId;

  try {
    res.status(200).json({
      msg: `has been successfully created.`,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

// Get a Todo with given todoId
exports.getATodoWithId = async (req, res) => {
  const todoId = req.params.todoId;
  try {
    return res.status(200).json({});
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

// Get all todos for a project with projectId
exports.getAllTodosForAProject = async (req, res) => {
  const projectId = req.params.projectId;
  const sortBy = req.query.sortBy ? req.query.sortBy : "desc";

  try {
    res.status(200).json({});
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

// Update given info of todo
exports.updateTodoInfo = async (req, res) => {
  const todoId = req.params.todoId;

  try {
    res.status(200).json({
      msg: `  has been updated successfully.`,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

// Update the status of todo  ( 0 = added, 1= in process, 2 = complete)
exports.changeStatusOfTodo = async (req, res) => {
  const status = req.query.status;
  const projectId = req.params.projectId;
  try {
    res.status(200).json({
      msg: `You've successfully joined the ${project.name} project.`,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

// changeIfBackloged
exports.changeIsBackloged = async (req, res) => {
  const todoId = req.params.todoId;

  try {
    res.status(200).json({
      msg: `You've successfully joined the ${project.name} project.`,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

// Get all banned users for a projects with projectId
exports.getAllBacklogedTodosForAProject = async (req, res) => {
  const projectId = req.params.projectId;
  const sortBy = req.query.sortBy ? req.query.sortBy : "desc";

  try {
    res.status(200).json({
      bannedMembers: project.bannedMembers.sort(),
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

// Delete a todo with given todoId
exports.deleteTodo = async (req, res) => {
  const todoId = req.params.todoId;

  try {
    return res.status(200).json({
      msg: `${project.name} was deleted successfully.`,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};
