const Project = require("../model/Project");
const Todo = require("../model/Todo");
const { getErrors } = require("../helper/commonFunc");
const User = require("../model/User");

// Create a Todo with with given required info
exports.createTodo = async (req, res) => {
  const userId = req.loggedInUser._id;
  const projectId = req.params.projectId;

  const errorsArray = getErrors(req);
  if (errorsArray && errorsArray.length !== 0) {
    return res.status(400).json(errorsArray);
  }

  try {
    const foundTodo = await Todo.findOne({
      heading: req.body.heading,
      project: projectId,
    });
    if (foundTodo) {
      return res.status(400).json({
        error:
          "Task with same heading already exists, Try With another heading.",
      });
    }

    const newTodo = new Todo({
      project: projectId,
      heading: req.body.heading,
      description: req.body.description,
      status: 0,
      deadline: req.body.deadline,
      isBackloged: false,
      tags: req.body.tags,
      creator: userId,
      assignedMembers: req.body.assignedMembers,
    });

    await newTodo.save();

    res.status(200).json({
      msg: `New task has been successfully added.`,
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
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({
        error: "Task requested couldn't be found.",
      });
    }

    return res.status(200).json({
      todo,
    });
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
    const project = await Project.findById(projectId);

    //   Check if project exists
    if (!project) {
      return res.status(404).json({
        error: "Project requested doesn't exist'.",
      });
    }
    const alltodosforproject = await Todo.find({
      project: projectId,
    }).sort([["createdAt", sortBy]]);

    if (alltodosforproject.length === 0) {
      return res.status(404).json({
        error: "Project has no Todo.",
      });
    }

    res.status(200).json({
      todos: alltodosforproject,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

// Update given info of todo
exports.updateTodoInfo = async (req, res) => {
  const todoId = req.params.todoId;
  const userId = req.loggedInUser._id;

  const errorsArray = getErrors(req);

  if (errorsArray && errorsArray.length !== 0) {
    return res.status(400).json(errorsArray);
  }

  const newTodo = new Todo({
    heading: req.body.heading,
    description: req.body.description,
    tags: req.body.tags,
    deadline: req.body.deadline,
  });

  try {
    const todo = await Todo.findById(todoId).populate("project", "admin");

    // Check if user is creator of Todo.
    if (
      userId.toString() !== todo.creator.toString() &&
      userId.toString() !== todo.project.admin.toString()
    ) {
      return res.status(400).json({
        error: `Only Creator of Todo or Admin of project can proceed this request.`,
      });
    }

    // Check if todoWithSameheading already exist
    const todoWithSameHeading = await Todo.findOne({
      heading: newTodo.heading,
    });

    if (todoWithSameHeading && todo.heading !== newTodo.heading) {
      return res.status(400).json({
        error: "Todo heading already exists, Try With another heading",
      });
    }

    await todo.updateOne({
      $set: {
        heading: newTodo.heading,
        description: newTodo.description,
        tags: newTodo.tags,
        deadline: newTodo.deadline,
      },
    });

    res.status(200).json({
      msg: `${newTodo.heading} has been updated successfully.`,
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
  const todoId = req.params.todoId;
  const userId = req.loggedInUser._id;

  try {
    const todo = await Todo.findById(todoId).populate("project", "admin");

    if (!todo) {
      return res.status(404).json({
        error: "Task requested couldn't be found.",
      });
    }

    // Check if admin or creator
    if (
      userId.toString() !== todo.creator.toString() &&
      userId.toString() !== todo.project.admin.toString()
    ) {
      return res.status(400).json({
        error: `Only Creator of Todo or Admin of project can proceed this request.`,
      });
    }

    await todo.updateOne({
      $set: {
        status,
      },
    });

    const statuses = {
      0: "Requested task added to 'Todo' list successfully.",
      1: "Requested task added to 'Doing' list successfully.",
      2: "Requested task added to 'Completed' list successfully.",
    };

    res.status(200).json({
      msg: statuses[status],
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
  const userId = req.loggedInUser._id;

  try {
    const todo = await Todo.findById(todoId).populate("project", "admin");

    if (!todo) {
      return res.status(404).json({
        error: "Todo requested couldn't be found.",
      });
    }

    if (userId.toString() !== todo.project.admin.toString()) {
      return res.status(400).json({
        error: `Only Admin of project can proceed this request.`,
      });
    }

    const newBacklogedStatus = !todo.isBackloged;

    await todo.updateOne({
      $set: {
        isBackloged: newBacklogedStatus,
      },
    });

    const msg = newBacklogedStatus
      ? "Todo added to backlog list successfully."
      : "Todo removed from backlog list successfully.";

    return res.status(200).json({
      msg,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

// Add assignedMembers
exports.addAssignedMembers = async (req, res) => {
  const todoId = req.params.todoId;
  const userId = req.params.userId;

  try {
    const todo = await Todo.findById(todoId);
    const user = await User.findById(userId);

    if (!todo) {
      return res.status(404).json({
        error: "Todo requested couldn't be found.",
      });
    }

    if (!user) {
      return res.status(404).json({
        error: "User requested couldn't be found.",
      });
    }

    const pushOrPull = todo.assignedMembers.find(
      (member) => member.memberId.toString() === userId.toString()
    )
      ? "pull"
      : "push";

    const newAssignedMembers = todo.assignedMembers;
    // newAssignedMembers.push({ memberId: userId });
    await todo.updateOne({
      [`$${pushOrPull}`]: {
        assignedMembers: { memberId: userId },
      },
    });

    const status = pushOrPull === "pull" ? "unassigned from" : "assigned to";

    return res.status(200).json({
      msg: `${user.name} was ${status} task successfully.`,
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
    const project = await Project.findById(projectId);

    //   Check if project exists
    if (!project) {
      return res.status(404).json({
        error: "Project requested doesn't exist'.",
      });
    }

    const allBacklogedtodosForProject = await Todo.find({
      project: projectId,
      isBackloged: true,
    }).sort([["createdAt", sortBy]]);

    if (allBacklogedtodosForProject.length === 0) {
      return res.status(404).json({
        error: "There are no backloged todos for a given project.",
      });
    }
    res.status(200).json({
      todos: allBacklogedtodosForProject,
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
  const userId = req.loggedInUser._id;

  try {
    const todo = await Todo.findById(todoId).populate("project", "admin");
    if (!todo) {
      return res.status(404).json({
        error: "Todo requested couldn't be found.",
      });
    }

    // Check if admin or creator
    if (
      userId.toString() !== todo.creator.toString() &&
      userId.toString() !== todo.project.admin.toString()
    ) {
      return res.status(400).json({
        error: `Only Creator of Todo or Admin of project can proceed this request.`,
      });
    }

    await todo.delete();

    return res.status(200).json({
      msg: `Todo was deleted successfully.`,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};
