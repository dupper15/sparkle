import UITLogo from "../../../assets/uit_logo.png";
import { FaFacebookSquare, FaYoutubeSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useDarkMode } from "../../../contexts/DarkModeContext";

const Footer = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`flex flex-col h-max transition-colors duration-500 ${
        isDarkMode ? "bg-black" : "bg-slate-100"
      }`}>
      {/* Phần trên: Logo và thông tin nhóm */}
      <div
        className={`flex flex-col md:flex-row items-center md:justify-between py-4 px-6 md:px-8 ${
          isDarkMode ? "text-gray-400" : "text-slate-900"
        }`}>
        <div className='flex items-center space-x-4 mb-4 md:mb-0'>
          <img
            className='w-12 h-12 md:w-16 md:h-16'
            src={UITLogo}
            alt='UIT Logo'
          />
          <div>
            <p className='text-xs md:text-sm'>SE</p>
            <p className='font-bold text-sm md:text-lg'>
              University of Information Technology
            </p>
          </div>
        </div>
        <div className='text-center md:text-right'>
          <p className='text-xs md:text-sm'>Group 23</p>
          <div className='text-xs font-bold'>
            <p>Phạm Trần Anh Nhật</p>
            <p>Nguyễn Chí Nghĩa</p>
          </div>
        </div>
      </div>

      <hr className={`${isDarkMode ? "border-gray-700" : "border-gray-300"}`} />

      {/* Phần dưới: Footer */}
      <div className='flex flex-col md:flex-row justify-between items-center py-4 px-6 md:px-8 text-xs md:text-sm'>
        <div className='flex flex-col md:flex-row md:space-x-8 font-medium mb-4 md:mb-0 text-center md:text-left'>
          <a href='#' className='hover:underline'>
            Welcome. All rights reserved.
          </a>
          <a href='#' className='hover:underline'>
            Privacy Policy
          </a>
          <a href='#' className='hover:underline'>
            Terms of Service
          </a>
        </div>
        <div className='flex space-x-4 text-lg justify-center'>
          <FaSquareXTwitter className='hover:text-blue-500 cursor-pointer' />
          <FaFacebookSquare className='hover:text-blue-700 cursor-pointer' />
          <FaYoutubeSquare className='hover:text-red-600 cursor-pointer' />
        </div>
      </div>
    </div>
  );
};

export default Footer;
