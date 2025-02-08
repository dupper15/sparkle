import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import * as ProjectService from "../../services/ProjectService";
import Avatar from "antd/es/avatar/avatar";
import profileIcon from "../../assets/default-profile-icon.png";

const History = ({ projectId, setShowHistoryFunction }) => {
  const [items, setItems] = useState([]);
  const mutationGet = useMutation({
    mutationFn: (data) => {
      return ProjectService.getHistory(data);
    },
    onSuccess: (data) => {
      console.log("Project updated successfully:", data.data);
      setItems(data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    mutationGet.mutate(projectId);
  }, []);
  return (
    <div className='flex flex-col gap-2'>
      <span
        className='text-gray-800 dark:text-white text-lg font-semibold cursor-pointer '
        onClick={() => setShowHistoryFunction(false)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-6 h-6 inline-block transform rotate-180'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          strokeWidth='2'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15 19l-7-7 7-7'
          />
        </svg>
      </span>
      <div className='space-y-3 h-max max-h-[300px] overflow-y-auto scrollbar-hide'>
        {items.map((item, index) => (
          <div
            key={index}
            className='relative flex items-start justify-between px-4 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out transform  group'>
            {/* Hiển thị createdAt khi hover */}

            <div className='flex items-start gap-4 w-full'>
              <div className='relative w-10 h-10'>
                <Avatar
                  size={40}
                  src={item.user.image || profileIcon}
                  className='rounded-full w-full h-full pointer-events-none object-cover border-2 border-gray-200 dark:border-gray-600  transition-all'
                />
              </div>
              <div className='flex flex-col w-full'>
                <span className='text-sm font-semibold text-gray-800 dark:text-white'>
                  {item.user.userName}
                </span>
                <span className='text-sm text-gray-600 dark:text-gray-300'>
                  {item.content}
                </span>
                <span className=' hidden group-hover:block ml-auto mr-0 transition-opacity text-xs text-gray-500 dark:text-gray-400'>
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
