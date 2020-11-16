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
    rooms: [
      {
        roomId: {
          type: ObjectId,
          ref: "Project",
        },
      },
    ],
    adminRooms: [
      {
        roomId: {
          type: ObjectId,
          ref: "Project",
        },
      },
    ],
    bannedRooms: [
      {
        roomId: {
          type: ObjectId,
          ref: "Project",
        },
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
