const User = require("../model/User");
const Project = require("../model/Project");
const { validationResult } = require("express-validator");
const { getErrors } = require("../helper/commonFunc");

// Create a project with with given required info
exports.createProject = async (req, res) => {
  const userId = req.loggedInUser._id;

  const errorsArray = getErrors(req);
  if (errorsArray && errorsArray.length !== 0) {
    return res.status(400).json(errorsArray);
  }
  try {
    const newProject = new Project({
      _id: new mongoose.Types.ObjectId(),
      admin: userId,
      name: req.body.name,
      companyName: req.body.companyName,
      description: req.body.description,
      concept: req.body.concept,
      bannerPhoto: req.body.bannerPhoto,
      website: req.body.website,
      githubRepoLink: req.body.githubRepoLink,
      institution: req.body.institution,
      totalTasks: 0,
      completedTasks: 0,
      backlogs: 0,
      deadline: Date.now(),
      usefulLinks: [],
      members: [
        {
          memberId: userId,
        },
      ],
      bannedMembers: [],
    });

    await newProject.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "User doesnt exist.",
      });
    }

    //   Update the user
    await user.adminRooms.push(newProject._id)

    res.status(200).json({
      msg: `${newProject.name} with UserId ${newProject.admin} has successfully Created a Project with Id ${newProject.id}.`,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

// Join project with given project id and userId
exports.joinProject = async (req, res) => {
  const userId = req.loggedInUser._id;
  const projectId = req.params.projectId;

  try {
  const project = await Project.findById(projectId)

  if (!project) {
    return res.status(404).json({
      error: "Project requested couldn't found.",
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      error: "User doesnt exist.",
    });
  }

  await user.rooms.push(projectId)
  await project.members.push(userId)

  res.status(200).json({
    msg: `${user.name} with UserId ${userId} has successfully Joined a Project with Id ${projectId}.`,
  });
} catch (e) {
  return res.status(500).json({
    error: e.message,
  });
}


};

// Get a project with given projectId
exports.getAProjectWithId = async (req, res) => {
  const projectId = req.params.c;
  try{
    const project = await Project.findById(projectId)

    if (!project) {
      return res.status(404).json({
        error: "Project requested couldn't found.",
      });
    }

    return res.status(200).json({
      project,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

// Get all projects for a user with userId
exports.getAllProjectForAUser = async (req, res) => {
  const userId = req.loggedInUser._id;
  const sortBy = req.query.sortBy ? req.query.sortBy : "desc";

  try{

    const user = await User.findById(userId);

    //   Check if user exists
    if (!user) {
      return res.status(404).json({
        error: "User requested doesn't exist'.",
      });
    }

    const allprojectsforuser = await Project.find({ "members.memberId": UserId}).sort([["createdAt", sortBy]]);

    if (allprojectsforuser.length === 0) {
      return res.status(404).json({
        error: "User is not member of any projects",
      });
    }

    res.status(200).json({
      allprojectsforuser,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

// Get all banned users for a projects with projectId
exports.getAllBannedUsersOfProject = async (req, res) => {
  const projectId = req.params.projectId;
};

// Update given info of project (only admin can call this)
exports.updateProjectInfo = async (req, res) => {
  const projectId = req.params.projectId;
  const userId = req.loggedInUser._id;
};

// Add or remove a user to bannedList with given userId and projectId (only admin can call this)
exports.togglebanUserFromProject = async (req, res) => {
  const ban = req.query.ban ? req.query.ban : true;
  const banUserId = req.params.userId;
  const projectId = req.params.projectId;
};

// Delete a project with given projectId
exports.deleteProject = async (req, res) => {
  const projectId = req.params.projectId;
};
