import React, { useEffect, useState } from "react";
import { MdOutlinePublic } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useMutation } from "@tanstack/react-query";
import * as ProjectService from "../../services/ProjectService";
import Avatar from "antd/es/avatar/avatar";
import profileIcon from "../../assets/default-profile-icon.png";
import * as Message from "../Alert/Alert";
import { FaPencil } from "react-icons/fa6";
import History from "./History";
import { FaClockRotateLeft } from "react-icons/fa6";

const SettingWork = ({
  isLoading,
  status,
  handlePrivate,
  handlePublic,
  setOpenAddEditor,
}) => {
  const [items, setItems] = useState([]);
  const projecId = localStorage.getItem("projectId");
  const [refresh, setRefresh] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const mutationGet = useMutation({
    mutationFn: (data) => {
      return ProjectService.getEditor(data);
    },
    onSuccess: (data) => {
      setItems(data.data);
    },
  });

  const mutationDelete = useMutation({
    mutationFn: (data) => {
      return ProjectService.removeEditor(data);
    },
    onSuccess: (data) => {
      console.log("Project updated successfully:", data);
      setRefresh(!refresh);
      Message.success("Remove editor successfully");
      setOpenAddEditor();
    },
  });

  useEffect(() => {
    mutationGet.mutate(projecId);
  }, [refresh]);
  const setShowHistoryFunction = (value) => {
    setShowHistory(value);
  };
  const handleRemove = (email) => {
    mutationDelete.mutate({ id: projecId, email: email });
  };
  return (
    <div className='bg-gray-50 dark:bg-gray-900 p-4 rounded-xl shadow-lg w-[350px] mx-auto space-y-6'>
      {/* Section: Privacy Toggle */}
      {showHistory ? (
        <History setShowHistoryFunction={setShowHistory} projectId={projecId} />
      ) : (
        <div className='gap-4 flex flex-col'>
          <div className='flex gap-2 h-max'>
            <button
              disabled={isLoading}
              onClick={status ? handlePrivate : handlePublic}
              className='w-full h-[45px] bg-indigo-600 text-white font-semibold rounded-lg shadow-md flex justify-center items-center gap-3 hover:bg-indigo-500 transition-colors disabled:bg-gray-400'>
              <MdOutlinePublic size={22} />
              {isLoading ? "Loading..." : status ? "Private" : "Public"}
            </button>

            {/* History Button */}
            <button
              onClick={() => setShowHistory(true)}
              className='w-full h-[45px] bg-blue-700 text-white font-semibold rounded-lg shadow-md flex justify-center items-center gap-3 hover:bg-blue-600 transition-colors'>
              <FaClockRotateLeft size={20} />
              <span>History</span>
            </button>
            {/* Section: User List */}
          </div>
          <div className='space-y-3 '>
            {items.map((item, index) => (
              <div
                key={index}
                className='flex items-center justify-between px-3 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'>
                <div className='flex items-center gap-3'>
                  <Avatar size={40} src={item.image || profileIcon} />
                  <span className='text-sm font-medium text-gray-800 dark:text-white'>
                    {item.userName}
                  </span>
                </div>
                <RiDeleteBin6Line
                  onClick={() => handleRemove(item.email)}
                  size={18}
                  className='text-gray-500 dark:text-gray-400 cursor-pointer hover:text-red-500 dark:hover:text-red-400 transition-colors'
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingWork;
