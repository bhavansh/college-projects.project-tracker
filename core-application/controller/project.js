const User = require("../model/User");
const { validationResult } = require("express-validator");
const { getErrors } = require("../helper/commonFunc");

// Create a project with with given required info
exports.createProject = async (req, res) => {
  const userId = req.loggedInUser._id;
};

// Join project with given project id and userId
exports.joinProject = async (req, res) => {
  const userId = req.loggedInUser._id;
  const projectId = req.params.projectId;
};

// Get a project with given projectId
exports.getAProjectWithId = async (req, res) => {
  const projectId = req.params.projectId;
};

// Get all projects for a user with userId
exports.getAllProjectForAUser = async (req, res) => {
  const userId = req.loggedInUser._id;
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
