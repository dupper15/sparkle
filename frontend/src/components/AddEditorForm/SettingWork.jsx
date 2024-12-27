import React from "react";
import { MdOutlinePublic } from "react-icons/md";
import Avatar from "antd/es/avatar/avatar";
import profileIcon from "../../assets/default-profile-icon.png";
import { RiDeleteBin6Line } from "react-icons/ri";

const SettingWork = ({ status, handlePrivate, handlePublic }) => {
  const items = [
    {
      avatar: <Avatar size={40} src={profileIcon} />,
      name: "Nguyen Van A",
    },
    {
      avatar: <Avatar size={40} src={profileIcon} />,
      name: "Nguyen Van B",
    },
    {
      avatar: <Avatar size={40} src={profileIcon} />,
      name: "Nguyen Van C",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-md w-[240px] mx-auto">
      {/* Section: Privacy Toggle */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <button
          onClick={status ? handlePrivate : handlePublic}
          className="w-full h-[40px] bg-indigo-600 gap-4 text-white font-semibold rounded-lg shadow cursor-pointer flex justify-center items-center hover:bg-indigo-400 transition-colors">
          <MdOutlinePublic size={24} className="text-white" />
          {status ? "Private" : "Public"}
        </button>
      </div>

      {/* Section: User List */}
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-2 py-4 bg-white dark:bg-black rounded-lg shadow hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              {item.avatar}
              <span className="text-sm font-medium text-gray-700 dark:text-white">
                {item.name}
              </span>
            </div>
            <RiDeleteBin6Line
              size={20}
              className="text-gray-500 dark:text-white cursor-pointer dark:hover:text-red-500 hover:text-red-500 transition-colors"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingWork;
