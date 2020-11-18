const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Schema.Types;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    profilePhoto: {
      type: String,
      required: true,
      default: "",
    },
    githubLink: {
      type: String,
    },
    institution: {
      type: String,
      required: true,
    },
    projects: [
      {
        projectId: {
          type: ObjectId,
          ref: "Project",
        },
        joinedAt: {
          type: String,
        },
      },
    ],
    adminProjects: [
      {
        projectId: {
          type: ObjectId,
          ref: "Project",
        },
        joinedAt: {
          type: String,
        },
      },
    ],
    bannedProjects: [
      {
        projectId: {
          type: ObjectId,
          ref: "Project",
        },
        joinedAt: {
          type: String,
        },
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
