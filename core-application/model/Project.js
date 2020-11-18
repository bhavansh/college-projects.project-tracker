const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Schema.Types;

const projectSchema = new mongoose.Schema(
  {
    admin: {
      type: ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    concept: {
      type: String,
    },
    bannerPhoto: {
      type: String,
    },
    website: {
      type: String,
    },
    githubRepoLink: {
      type: String,
    },
    institution: {
      type: String,
      required: true,
    },
    totalTasks: {
      type: Number,
    },
    completedTasks: {
      type: Number,
    },
    backlogs: {
      type: Number,
    },
    deadline: {
      type: String,
      required: true,
    },
    usefulLinks: [
      {
        title: {
          type: String,
        },
        link: {
          type: String,
        },
      },
    ],
    members: [
      {
        memberId: {
          type: ObjectId,
          ref: "User",
        },
        joinedAt: {
          type: String,
        },
      },
    ],
    bannedMembers: [
      {
        memberId: {
          type: ObjectId,
          ref: "User",
        },
        joinedAt: {
          type: String,
        },
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
