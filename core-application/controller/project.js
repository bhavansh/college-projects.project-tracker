const User = require("../model/User");
const Project = require("../model/Project");
const { getErrors } = require("../helper/commonFunc");

// Create a project with with given required info
exports.createProject = async (req, res) => {
  const userId = req.loggedInUser._id;

  const errorsArray = getErrors(req);

  if (errorsArray && errorsArray.length !== 0) {
    return res.status(400).json(errorsArray);
  }

  try {
    const foundProject = await Project.findOne({ name: req.body.name });
    if (foundProject) {
      return res.status(400).json({
        error: "Project Name already exists, Try With another name",
      });
    }

    const newProject = new Project({
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
      deadline: req.body.deadline,
      usefulLinks: req.body.usefulLinks,
      members: [
        {
          memberId: userId,
          joinedAt: new Date().toISOString(),
        },
      ],
      bannedMembers: [],
    });

    // Find user creating project
    const creator = await User.findById(userId);
    if (!creator) {
      return res.status(404).json({
        error: "User doesn't exist.",
      });
    }

    //   Update the user
    await creator.updateOne({
      $push: {
        projects: {
          projectId: newProject._id,
          joinedAt: new Date().toISOString(),
        },
        adminProjects: {
          projectId: newProject._id,
          joinedAt: new Date().toISOString(),
        },
      },
    });
    await newProject.save();

    res.status(200).json({
      msg: `${newProject.name} has been successfully created.`,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

// Join project with given project id and userId
exports.joinProject = async (req, res) => {
  const userId = req.params.userId;
  const projectId = req.params.projectId;

  const errorsArray = getErrors(req);
  if (errorsArray && errorsArray.length !== 0) {
    return res.status(400).json(errorsArray);
  }

  try {
    const project = await Project.findById(projectId);

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

    // Check if user is already admin
    if (
      project.members.find(
        (member) => member.memberId.toString() === userId.toString()
      )
    ) {
      return res.status(404).json({
        error: `${user.name} has already joined the project.`,
      });
    }

    //   Update the user
    await user.updateOne({
      $push: {
        projects: {
          projectId: projectId,
          joinedAt: new Date().toISOString(),
        },
      },
    });

    // Update the project
    await project.updateOne({
      $push: {
        members: {
          memberId: userId,
          joinedAt: new Date().toISOString(),
        },
      },
    });

    res.status(200).json({
      msg: `${user.name} successfully joined the ${project.name} project.`,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

// Join project with given project id and userId
exports.removeFromTheProject = async (req, res) => {
  const userId = req.params.userId;
  const projectId = req.params.projectId;

  try {
    const project = await Project.findById(projectId);

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

    // Check if user is member and admin
    let isAMember = project.members.find(
      (member) => member.memberId.toString() === userId.toString()
    );

    if (!isAMember) {
      return res.status(404).json({
        error: `${user.name} hasn't joined the project.`,
      });
    }

    if (project.admin.toString() === userId.toString()) {
      return res.status(404).json({
        error: `${user.name} is admin of project. ${user.name} can't be removed.`,
      });
    }

    //   Update the user
    await user.updateOne({
      projects: user.projects.filter(
        (proj) => proj.projectId.toString() !== projectId.toString()
      ),
      adminProjects: user.adminProjects.filter(
        (proj) => proj.projectId.toString() !== projectId.toString()
      ),
      bannedProjects: user.bannedProjects.filter(
        (proj) => proj.projectId.toString() !== projectId.toString()
      ),
    });

    // Update the project
    await project.updateOne({
      members: project.members.filter(
        (member) => member.memberId.toString() !== userId.toString()
      ),
      bannedMembers: project.bannedMembers.filter(
        (member) => member.memberId.toString() !== userId.toString()
      ),
    });

    res.status(200).json({
      msg: `${user.name} successfully removed the ${project.name} project.`,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

// Get a project with given projectId
exports.getAProjectWithId = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const project = await Project.findById(projectId)
      .populate("admin", "name profilePhoto")
      .populate("members.memberId", "name profilePhoto")
      .populate("bannedMembers.memberId", "name profilePhoto");

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

  try {
    const user = await User.findById(userId);

    //   Check if user exists
    if (!user) {
      return res.status(404).json({
        error: "User requested doesn't exist'.",
      });
    }

    const allprojectsforuser = await Project.find({
      "members.memberId": userId,
    })
      .sort([["createdAt", sortBy]])
      .populate("admin members.memberId", "profilePhoto");

    res.status(200).json({
      projects: allprojectsforuser,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

// Update given info of project (only admin can call this)
exports.updateProjectInfo = async (req, res) => {
  const projectId = req.params.projectId;
  const userId = req.loggedInUser._id;

  const errorsArray = getErrors(req);

  if (errorsArray && errorsArray.length !== 0) {
    return res.status(400).json(errorsArray);
  }

  const newProject = new Project({
    admin: userId,
    name: req.body.name,
    companyName: req.body.companyName,
    description: req.body.description,
    concept: req.body.concept,
    bannerPhoto: req.body.bannerPhoto,
    website: req.body.website,
    githubRepoLink: req.body.githubRepoLink,
    deadline: req.body.deadline,
    usefulLinks: req.body.usefulLinks,
  });

  try {
    const project = await Project.findById(projectId);

    // Check if user to be removed is admin
    if (userId.toString() !== project.admin.toString()) {
      return res.status(400).json({
        error: `Only Admin of project can proceed this request.`,
      });
    }

    // Check if name already exist
    const projectWithSameName = await Project.findOne({
      name: newProject.name,
    });

    if (projectWithSameName && project.name !== newProject.name) {
      return res.status(400).json({
        error: "Project Name already exists, Try With another name",
      });
    }

    //   Update the user
    await project.updateOne({
      $set: {
        admin: userId,
        name: newProject.name,
        companyName: newProject.companyName,
        description: newProject.description,
        concept: newProject.concept,
        bannerPhoto: newProject.bannerPhoto,
        website: newProject.website,
        githubRepoLink: newProject.githubRepoLink,
        institution: newProject.institution,
        deadline: newProject.deadline,
        usefulLinks: newProject.usefulLinks,
      },
    });

    res.status(200).json({
      msg: `${newProject.name} has been updated successfully.`,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

// Add or remove a user to bannedList with given userId and projectId (only admin can call this)
exports.togglebanUserFromProject = async (req, res) => {
  const banUserId = req.params.userId;
  const projectId = req.params.projectId;
  try {
    // Find project and user
    const project = await Project.findById(projectId);
    const user = await User.findById(banUserId);

    if (!project || !user) {
      const unavailable = !user
        ? `User requested unavailable.`
        : "Project requested unavailable.";
      return res.status(404).json({
        error: `${unavailable}`,
      });
    }
    // Check if user is part of Project
    if (
      !user.projects.find(
        (project) => project.projectId.toString() === projectId.toString()
      )
    ) {
      return res.status(404).json({
        error: `${user.name} is not Project member.`,
      });
    }

    // Check if user removing is admin
    if (req.loggedInUser._id.toString() !== project.admin.toString()) {
      return res.status(404).json({
        error: `Only Admin of project can ban other members.`,
      });
    }

    // Check if user to be removed is admin
    if (banUserId.toString() === project.admin.toString()) {
      return res.status(404).json({
        error: `Admin of project can't be banned.`,
      });
    }

    const isBanned = project.bannedMembers.filter(
      (user) => user.memberId.toString() === banUserId.toString()
    ).length;
    const pushOrPop = isBanned !== 0 ? "pull" : "push";

    if (pushOrPop === "push") {
      // Update bannedList in project
      await project.updateOne({
        $push: {
          bannedMembers: {
            memberId: banUserId,
            joinedAt: new Date().toISOString(),
          },
        },
      });

      // Update bannedProjects in user
      await user.updateOne({
        $push: {
          bannedProjects: {
            projectId: projectId,
            joinedAt: new Date().toISOString(),
          },
        },
      });
    } else {
      // Update bannedList in project
      await project.updateOne({
        $pull: {
          bannedMembers: {
            memberId: banUserId,
          },
        },
      });

      // Update bannedProjects in user
      await user.updateOne({
        $pull: {
          bannedProjects: {
            projectId: projectId,
          },
        },
      });
    }

    const newStatus = isBanned !== 0 ? "unbanned" : "banned";

    res.status(200).json({
      msg: `${user.name} is ${newStatus} from  ${project.name} project.`,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

// Get all project members
exports.getAllProjectMembers = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    // Find project and user
    const project = await Project.findById(projectId).populate(
      "members.memberId",
      "-projects -adminProjects -bannedProjects"
    );

    if (!project) {
      return res.status(404).json({
        error: `Requested project is unavailable.`,
      });
    }

    const members = project.members.sort(
      (memberA, memberB) => memberB.joinedAt - memberA.joinedAt
    );

    res.status(200).json({
      members,
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

  try {
    // Find project and user
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        error: `Requested project is unavailable.`,
      });
    }

    // Check if user removing is admin
    if (req.loggedInUser._id.toString() !== project.admin.toString()) {
      return res.status(404).json({
        error: `Only Admin of project can proceed this request.`,
      });
    }

    res.status(200).json({
      bannedMembers: project.bannedMembers.sort(),
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

// Get if user is admin based on given userId and projectId
exports.checkIfAdmin = async (req, res) => {
  const projectId = req.params.projectId;
  const userId = req.loggedInUser._id;
  try {
    // Find project and user
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        error: `Requested project is unavailable.`,
      });
    }

    // Check if user removing is admin
    let isAdmin = false;
    if (userId.toString() === project.admin.toString()) {
      isAdmin = true;
    }

    return res.status(200).json({
      isAdmin,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

// Delete a project with given projectId
exports.deleteProject = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        error: "Project requested couldn't found.",
      });
    }

    // Update users

    return res.status(200).json({
      msg: `${project.name} was deleted successfully.`,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};
