// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
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
