const User = require("../model/User");
const Project = require("../model/Project");
const ChatToxicity = require("../model/ChatToxicity");

exports.getAllToxitiesOfAUserFromARoom = async (req, res) => {
  const projectId = req.params.projectId;
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    const project = await Project.findById(projectId);
    if (!user) {
      return res.status(404).json({
        error: "Chat Toxicity couldn't saved as user requested is unavailable.",
      });
    }
    if (!project) {
      return res.status(404).json({
        error:
          "Chat Toxicity couldn't saved as project requested is unavailable.",
      });
    }

    const chatToxicities = await ChatToxicity.find({
      user: userId,
      project: projectId,
    })
      .populate("user", "name profilePhoto")
      .sort([["createdAt", "desc"]]);

    res.status(201).json({
      count: chatToxicities.length,
      chatToxicities: chatToxicities,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.msg,
    });
  }
};

exports.getAllToxitiesOfAllMembersfromARoom = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        error:
          "Chat Toxicity couldn't saved as project requested is unavailable.",
      });
    }

    const chatToxicities = await ChatToxicity.find({
      project: projectId,
    })
      .populate("user", "name profilePhoto")
      .sort([["createdAt", "desc"]]);

    res.status(200).json({
      count: chatToxicities.length,
      chatToxicities: chatToxicities,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.msg,
    });
  }
};

exports.postAToxicity = async (req, res) => {
  const projectId = req.params.projectId;
  const userId = req.loggedInUser._id;

  try {
    const user = await User.findById(userId);
    const project = await Project.findById(projectId);

    if (!user) {
      return res.status(404).json({
        error: "Chat Toxicity couldn't saved as user requested is unavailable.",
      });
    }
    if (!project) {
      return res.status(404).json({
        error:
          "Chat Toxicity couldn't saved as project requested is unavailable.",
      });
    }

    const newChatToxicity = new ChatToxicity({
      user: userId,
      project: projectId,
      text: req.body.text,
      probabilities: req.body.probabilities,
    });

    await newChatToxicity.save();

    res.status(201).json({
      msg: "Chat just added violated our policy with severe toxicity.",
    });
  } catch (e) {
    return res.status(500).json({
      error: e.msg,
    });
  }
};
