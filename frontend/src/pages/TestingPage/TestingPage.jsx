import TextPropertyBar from "../../components/SharedComponents/ToolBars/TextToolBar/TextToolBar.jsx";
import ImageToolbar from "../../components/SharedComponents/ToolBars/ImageToolBar/ImageToolBar.jsx";
import ColorPickerPanel
    from "../../components/SharedComponents/ColorPickerPanel/ColorPickerPanel.jsx";
import React, { useRef, useState, useEffect } from "react";
import WorkplaceHeader from "../../components/WorkplaceHeader/WorkplaceHeader";
import ChatBox from "../../components/ChatBox/ChatBox";

const TestingPage = () => {
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [toggleChatBox, setToggleChatBox] = useState(true);
  return (
    <div>
      <WorkplaceHeader usersInRoom={usersInRoom} />
      <ChatBox toggleChatBox={toggleChatBox} setUsersInRoom={setUsersInRoom} />
    </div>
  );
};

export default TestingPage;
