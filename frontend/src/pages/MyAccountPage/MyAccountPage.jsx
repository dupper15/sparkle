import Header from "../../components/SharedComponents/Header/Header.jsx";
import Footer from "../../components/SharedComponents/Footer/Footer.jsx";
import SettingSideBar from "../../components/SettingSideBar/SettingSideBar.jsx";
import profileIcon from "../../assets/default-profile-icon.png";
import { FaGoogle } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";

const MyAccountPage = () => {
    return (
        <div className="w-screen h-screen flex flex-col">
            <header>
                <Header />
            </header>
            <div className="flex h-[calc(100%-60px)] w-screen scrollbar-hide">
                <div className="w-[80px] z-50 scrollbar-hide h-full overflow-y-auto">
                    <SettingSideBar />
                </div>
                <div className="h-full w-[calc(100%-75px)] text-white">
                    <span className="font-bold text-xl md:text-3xl ">Profile</span>
                    <div className="pl-5">
                        <span className="font-semibold text-s md:text-m">Avatar</span>
                        <div className="flex items-center justify-between w-[1000px] h-[50px] px-5 pt-10">
                            <div className="flex items-center justify-items-start gap-2">
                                <div className="rounded-full border-2 border-gray-200 bg-white h-[100px] w-[100px]">
                                    <img className="object-cover w-full h-full rounded-full" src={profileIcon} alt="Profile Image" />
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="h-auto w-[200px] text-right">
                                    <button className="md:text-xl">Change image</button>
                                    <button className="md:text-xl">View image</button>
                                    <button className="md:text-xl">Remove photo</button>
                                </div>
                            </div>
                        </div>
                        <div className="w-[auto] justify-left items-left gap-2 pt-[50px]">
                            <div className="w-[1000px] h-[1px] bg-gray-400"></div>
                        </div>
                        <div className="flex items-center justify-between w-[1000px] h-[auto] pt-3">
                            <div className="flex items-center justify-items-start gap-2">
                                <span className="font-semibold text-s md:text-m">Username</span>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="h-auto w-[200px] ">
                                    <button className="w-[80px] h-[40px] bg-white text-black font-semibold rounded-lg shadow-sm cursor-pointer border-black flex justify-center items-center p-2 transition-all hover:bg-gray-600 duration-500">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-[auto] justify-left items-center gap-2 pt-2">
                            <div className="w-[1000px] h-[1px] bg-gray-400"></div>
                        </div>
                        <div className="flex items-center justify-between w-[1000px] h-[auto] pt-1">
                            <span className="font-semibold text-s md:text-m">Email</span>
                        </div>
                        <div className="flex items-center justify-between w-[1000px] h-[auto]">
                            <span className="font-thin text-s md:text-m">caoduonglamhuhu@gmail.com</span>
                        </div>
                        <div className="w-[auto] justify-left items-center gap-2">
                            <div className="w-[1000px] h-[1px] bg-gray-400"></div>
                        </div>
                        <div className="flex items-center justify-between w-[1000px] h-[auto] pt-3">
                            <div className="flex items-center justify-between w-[1000px] h-[auto]">
                                <span className="font-semibold text-s md:text-m">Password</span>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="h-auto w-[200px] text-right">
                                    <button className="w-[auto] h-[40px] bg-white text-black font-semibold rounded-lg shadow-sm cursor-pointer border-black flex justify-center items-center p-2 transition-all hover:bg-gray-600 duration-500">
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-[auto] justify-left items-center gap-2 pt-2">
                            <div className="w-[1000px] h-[1px] bg-gray-400"></div>
                        </div>
                        <div className="flex items-center justify-between w-[1000px] h-[auto] pt-3">
                            <span className="font-semibold text-s md:text-m">Social Media</span>
                        </div>
                        <div className="flex items-center justify-between w-[1000px] h-[auto]">
                            <span className="font-thin text-s md:text-m">Linked</span>
                        </div>
                        <div className="pt-2"></div>
                        <div className="flex items-center w-[1000px] h-[auto] border-2 border-white rounded-lg">
                            <FaGoogle className="h-[50px] w-[50px] p-2" />
                            <div className="flex items-center justify-between w-[1000px] h-[auto]">
                                <span className="font-thin text-s md:text-m">caoduonglam@gmail.com</span>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="h-auto w-[200px] text-right">
                                    <button className="w-[auto] h-[40px] bg-white text-black font-semibold rounded-lg shadow-sm cursor-pointer border-black flex justify-center items-center p-2 transition-all hover:bg-gray-600 duration-500">
                                        Disconnect
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="pt-1"></div>
                        <div className="flex items-center w-[1000px] h-[auto] border-2 border-white rounded-lg">
                            <FaFacebook className="h-[50px] w-[50px] p-2" />
                            <div className="flex items-center justify-between w-[1000px] h-[auto]">
                                <span className="font-thin text-s md:text-m">Cao Duong Lam</span>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="h-auto w-[200px] text-right">
                                    <button className="w-[auto] h-[40px] bg-white text-black font-semibold rounded-lg shadow-sm cursor-pointer border-black flex justify-center items-center p-2 transition-all hover:bg-gray-600 duration-500">
                                        Disconnect
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MyAccountPage;
