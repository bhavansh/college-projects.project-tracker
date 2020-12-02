const mongoose = require("mongoose");
const { ObjectId, Decimal128 } = require("mongoose").Schema.Types;

const chatToxicitySchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    project: {
      type: ObjectId,
      ref: "Project",
    },
    text: {
      type: String,
      require: true,
    },
    probabilities: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatToxicity", chatToxicitySchema);
