import Header from "../../components/SharedComponents/Header/Header.jsx";
import Footer from "../../components/SharedComponents/Footer/Footer.jsx";
import SettingSideBar from "../../components/SettingSideBar/SettingSideBar.jsx";
import profileIcon from "../../assets/default-profile-icon.png";
import { FaGoogle, FaFacebook } from "react-icons/fa6";

const MyAccountPage = () => {
  return (
    <div className="flex flex-col h-screen overflow-y-auto bg-black">
      <header>
        <Header className="fixed top-0 left-0 w-full z-50" />
      </header>
      <div className="flex flex-grow w-screen">
        <div className="w-[55px] md:w-[80px] z-50 h-full overflow-y-auto overflow-x-hidden scrollbar-hide">
          <SettingSideBar />
        </div>
        <div className="flex flex-col w-[calc(100%-50px)] md:w-[calc(100%-80px)] overflow-y-auto text-white gap-4 ps-14 pe-20 scrollbar-hide">
          <span className="font-bold text-xl md:text-3xl pointer-events-none">
            My Profile
          </span>
          <div>
            <span className="font-semibold text-xl pointer-events-none">
              Avatar
            </span>
            <div className="flex items-center justify-between">
              <img
                className="object-cover w-[100px] h-[100px] rounded-full mt-3 cursor-pointer"
                src={profileIcon}
                alt="Profile Image"
              />
              <div className="flex flex-col text-right cursor-pointer space-y-2">
                <span className="md:text-m hover:text-[#4335DE] cursor-pointer">
                  Change image
                </span>
                <span className="md:text-m hover:text-[#4335DE] cursor-pointer">
                  View image
                </span>
                <span className="md:text-m hover:text-[#4335DE] cursor-pointer">
                  Remove photo
                </span>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-400 my-4"></div>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col space-y-2">
                <span className="font-semibold text-xl pointer-events-none">
                  Username
                </span>
                <span className="font-thin text-s md:text-m pointer-events-none">
                  caoduonglam
                </span>
              </div>
              <button className="w-[80px] h-[40px] bg-white text-black font-semibold rounded-lg shadow-sm flex justify-center items-center p-2 hover:bg-slate-400">
                Edit
              </button>
            </div>
            <div className="w-full h-[1px] bg-gray-400 my-4"></div>
            <div className="flex flex-col justify-between w-full space-y-2">
              <span className="font-semibold text-xl pointer-events-none">
                Email
              </span>
              <span className="font-thin text-s md:text-m pointer-events-none">
                caoduonglamhuhu@gmail.com
              </span>
            </div>
            <div className="w-full h-[1px] bg-gray-400 my-4"></div>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col space-y-2">
                <span className="font-semibold text-xl pointer-events-none">
                  Password
                </span>
              </div>
              <button className="w-[auto] h-[40px] bg-white text-black font-semibold rounded-lg shadow-sm flex justify-center items-center px-3 py-2 hover:bg-slate-400">
                Change Password
              </button>
            </div>
            <div className="w-full h-[1px] bg-gray-400 my-4"></div>
            <div className="flex flex-col space-y-2">
              <span className="font-semibold text-xl pointer-events-none">
                Social Media
              </span>
              <span className="font-thin text-s pointer-events-none">
                Services you have used
              </span>
            </div>
            <div className="flex flex-row items-center w-max md:w-full h-[auto] border-2 border-white rounded-lg my-2 py-3 px-2">
              <div className="flex flex-row items-center">
                <FaGoogle className="h-[40px] w-[40px]" />
                <div className="flex flex-col px-4">
                  <span className="font-semibold text-xl pointer-events-none">
                    Google
                  </span>
                  <span className="font-thin text-s pointer-events-none">
                    caoduonglam@gmail.com
                  </span>
                </div>
              </div>
              <button className="w-[auto] h-[40px] ml-auto bg-white text-black font-semibold rounded-lg shadow-sm flex justify-center items-center px-3 py-2 hover:bg-slate-400">
                Disconnect
              </button>
            </div>
            <div className="flex flex-row items-center w-max md:w-full h-[auto] border-2 border-white rounded-lg my-2 py-3 px-2">
              <div className="flex flex-row items-center">
                <FaFacebook className="h-[40px] w-[40px]" />
                <div className="flex flex-col px-4">
                  <span className="font-semibold text-xl pointer-events-none">
                    Facebook
                  </span>
                  <span className="font-thin text-s pointer-events-none">
                    caoduonglam@gmail.com
                  </span>
                </div>
              </div>
              <button className="w-[auto] h-[40px] ml-auto bg-white text-black font-semibold rounded-lg shadow-sm flex justify-center items-center px-3 py-2 hover:bg-slate-400">
                Disconnect
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Footer />
      </div>
    </div>
  );
};

export default MyAccountPage;
