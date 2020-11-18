const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Schema.Types;

const taskSchema = new mongoose.Schema(
  {
    project: {
      type: ObjectId,
      ref: "Project",
    },
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      enum: [0, 1, 2], // 0 = added, 1= in process, 2 = complete
      default: 0,
    },
    deadline: {
      type: String,
      required: true,
    },
    isBackloged: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    creator: {
      type: ObjectId,
      ref: "User",
    },
    assignedMembers: [
      {
        memberId: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
