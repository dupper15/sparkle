const GroupChat = require("../models/GroupChatModel");

const createGroupChat = async (groupData) => {
  try {
    const { projectId } = groupData;

    const groupChat = new GroupChat({
      projectId: projectId,
      messArr: [],
      userArr: [getProjectOwner(projectId)],
    });

    const savedGroupChat = await groupChat.save();
    return { status: "SUCCESS", data: savedGroupChat };
  } catch (error) {
    throw new Error(error.message);
  }
};

async function getProjectOwner(projectId) {
  const ProjectModel = require("../models/ProjectModel");
  const project = await ProjectModel.findById(projectId);
  return project.owner;
}
const getGroupChat = async (groupId) => {
  try {
    const groupChat = await GroupChat.findById(groupId);
    if (!groupChat) {
      throw new Error("GroupChat not found");
    }
    return { status: "SUCCESS", data: groupChat };
  } catch (error) {
    throw new Error(error.message);
  }
};

const addUserToGroupChat = async (groupId, userId) => {
  try {
    const updatedGroupChat = await GroupChat.findByIdAndUpdate(
      groupId,
      { $addToSet: { userArr: userId } },
      { new: true }
    );

    if (!updatedGroupChat) {
      throw new Error("GroupChat not found");
    }

    return { status: "SUCCESS", data: updatedGroupChat };
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteGroupChat = async (groupId) => {
  try {
    const deletedGroupChat = await GroupChat.findByIdAndDelete(groupId);
    if (!deletedGroupChat) {
      throw new Error("GroupChat not found");
    }
    return { status: "SUCCESS", message: "GroupChat deleted successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createGroupChat,
  getGroupChat,
  addUserToGroupChat,
  deleteGroupChat,
};
