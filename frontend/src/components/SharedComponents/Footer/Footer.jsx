import UITLogo from "../../../assets/uit_logo.png";
import { FaFacebookSquare, FaYoutubeSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useDarkMode } from "../../../contexts/DarkModeContext";

const Footer = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`flex flex-col h-max transition-colors duration-500 ${
        isDarkMode ? "bg-[#131315]" : "bg-slate-100"
      } `}>
      <div
        className={`flex items-center justify-between py-4 px-8 ${
          isDarkMode ? "text-gray-400" : "text-slate-900"
        }`}>
        <div className="flex items-center space-x-4">
          <img className="w-16 h-16" src={UITLogo} alt="UIT Logo" />
          <div>
            <p className="text-sm">SE</p>
            <p className="font-bold text-lg">
              University of Information Technology
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm">Group 1</p>
          <div className="text-xs font-bold">
            <p>Cao Dương Lâm</p>
            <p>Nguyễn Chí Nghĩa</p>
          </div>
        </div>
      </div>
      <hr className={`${isDarkMode ? "border-gray-700" : "border-gray-300"}`} />

      <div className="flex justify-between items-center py-4 px-8 text-sm">
        <div className="flex space-x-8 font-medium">
          <a href="#" className="hover:underline">
            Welcome. All rights reserved.
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
        </div>
        <div className="flex space-x-4 text-lg">
          <FaSquareXTwitter className="hover:text-blue-500 cursor-pointer" />
          <FaFacebookSquare className="hover:text-blue-700 cursor-pointer" />
          <FaYoutubeSquare className="hover:text-red-600 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
