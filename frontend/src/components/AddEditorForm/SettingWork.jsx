import React, { useEffect, useState } from "react";
import { MdOutlinePublic } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useMutation } from "@tanstack/react-query";
import * as ProjectService from "../../services/ProjectService";
import Avatar from "antd/es/avatar/avatar";
import profileIcon from "../../assets/default-profile-icon.png";
import * as Message from "../Alert/Alert"

const SettingWork = ({ status, handlePrivate, handlePublic, setOpenAddEditor }) => {
  const [items, setItems] = useState([]);
  const projecId = localStorage.getItem("projectId");
  const [refresh, setRefresh] = useState(false);

  const mutationGet = useMutation({
    mutationFn: (data) => {
      return ProjectService.getEditor(data);
    },
    onSuccess: (data) => {
      console.log("Project updated successfully:", data);
      setItems(data.data)

    },
  })

  const mutationDelete = useMutation({
    mutationFn: (data) => {
      return ProjectService.removeEditor(data);
    },
    onSuccess: (data) => {
      console.log("Project updated successfully:", data);
      setRefresh(!refresh)
      Message.success("Remove editor successfully")
      setOpenAddEditor();
    },
  })

  useEffect(() => {
    mutationGet.mutate(projecId)
  }, [refresh])

  const handleRemove = (email) => { 
    mutationDelete.mutate({ id: projecId, email: email})
  };

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
      <div className='flex flex-col gap-3'>
        {items.length === 0 ? (
          // Nếu items rỗng, hiển thị div trắng
          <div className='h-20 bg-white rounded-lg shadow'></div>
        ) : (
          // Nếu items không rỗng, hiển thị danh sách
          items.map((item, index) => (
            <div
              key={index}
            className="flex items-center justify-between px-2 py-4 bg-white dark:bg-black rounded-lg shadow hover:bg-gray-100 transition-colors">
              <div className='flex items-center gap-3'>
                <Avatar size={40} src={item.image || profileIcon} />
              <span className="text-sm font-medium text-gray-700 dark:text-white">
                  {item.userName}
                </span>
              </div>
              <RiDeleteBin6Line
                onClick={() => handleRemove(item.email)}
                size={20}
                className='text-gray-500 dark:text-white cursor-pointer dark:hover:text-red-500 hover:text-red-500 transition-colors'
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SettingWork;
