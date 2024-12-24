import UITLogo from "../../../assets/uit_logo.png";
import { FaFacebookSquare, FaYoutubeSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useDarkMode } from "../../../contexts/DarkModeContext";

const Footer = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`flex flex-col transition-colors duration-500 ${
        isDarkMode ? "bg-[#131315]" : "bg-gray-50"
      }`}>
      <div
        className={`pt-4 pb-4 flex flex-row w-full justify-between ${
          isDarkMode ? "text-gray-400" : "text-black"
        }`}>
        <div className='flex flex-row'>
          <img
            className='mt-auto mb-auto ml-8 w-[80x] h-[80px]'
            src={UITLogo}
            alt='UIT Logo'
          />
          <div className='mt-auto mb-auto ml-8'>
            <p className='text-sm'>SE</p>
            <p className='font-bold'>University of Information Technology</p>
          </div>
        </div>
        <div className='mr-8'>
          <p className='text-sm'>Group 1</p>
          <div className='text-xs font-bold'>
            <p>Cao Dương Lâm</p>
            <p>Nguyễn Chí Nghĩa</p>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className='flex flex-row w-full justify-between'>
        <div className='flex flex-row text-xs font-bold'>
          <a className='ml-8'>Welcome. All rights reserved.</a>
          <a className='ml-8'>Privacy Policy</a>
          <a className='ml-8'>Terms of Service</a>
        </div>
        <div className='flex flex-row mr-8'>
          <FaSquareXTwitter />
          <FaFacebookSquare />
          <FaYoutubeSquare />
        </div>
      </div>
    </div>
  );
};

export default Footer;
