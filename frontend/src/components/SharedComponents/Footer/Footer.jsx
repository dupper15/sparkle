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
      <div
        className={`flex flex-col md:flex-row items-center md:justify-between py-4 px-6 md:px-8 ${
          isDarkMode ? "text-gray-400" : "text-slate-900"
        }`}>
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <img
            className="w-12 h-12 md:w-16 md:h-16"
            src={UITLogo}
            alt="UIT Logo"
          />
          <div>
            <p className="text-xs md:text-sm">SE121.P11</p>
            <p className="font-bold text-sm md:text-lg">
              University of Information Technology
            </p>
          </div>
        </div>
        <div className="text-center md:text-right">
          <div className="text-xs font-bold">
            <p>Nguyễn Lê Tuấn Nhật</p>
            <p>Phạm Trần Anh Nhật</p>
          </div>
        </div>
      </div>

      <hr className={`${isDarkMode ? "border-gray-700" : "border-gray-300"}`} />
    </div>
  );
};

export default Footer;
