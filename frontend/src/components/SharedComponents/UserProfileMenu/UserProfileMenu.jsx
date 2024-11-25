import profileIcon from "../../../assets/default-profile-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlinePerson, MdOutlineSettings } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../../services/UserService';
import { useDarkMode } from "../../../contexts/DarkModeContext";
import { resetUser, updateUser } from "../../../redux/slides/userSlide"
import { useEffect, useState } from "react";

const UserProfileMenu = () => {
  const user = useSelector((state) => state.user)
  const [userName, setUserName] = useState('')
  const [image, setImage] = useState('')
  const { isDarkMode } = useDarkMode();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogoutUser = async () => {
    await UserService.logoutUser()
    dispatch(resetUser())
    navigate('/')
  }

  useEffect(() => {
    setUserName(user?.userName);
    setImage(user?.image)
  }, [user?.userName, user?.image]);
  return (
    <div
      className={`profile-dropdown box-border justify-center align-middle pb-2 shadow-lg rounded-2xl ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}>
      <div className="profile-header flex p-4 w-[250px]">
        <img
          src={image}
          alt="Profile Image"
          className="profile-image w-[40px] h-[40px] rounded-[50%] object-cover"
        />
        <span className="profile-name font-bold mt-auto mb-auto pl-4">
          {userName}
        </span>
      </div>
      <div className="">
        <Link className="flex mt-2 mb-6 pl-4 hover:text-[#4335DE]" to="../my-account">
          <MdOutlinePerson className="h-8 w-8 pr-2" />
          <span className="mt-auto mb-auto">Profile</span>
        </Link>
        <Link className="flex mb-6 pl-4 hover:text-[#4335DE]"  to="../settings">
          <MdOutlineSettings className="h-8 w-8 pr-2" />
          <span className="mt-auto mb-auto">Settings</span>
        </Link>
        <Link onClick={handleLogoutUser} className="flex mb-4 pl-4 hover:text-[#4335DE]" to="../">
          <RxExit className="h-8 w-8 pr-2" />
          <span className="mt-auto mb-auto">Log Out</span>
        </Link>
      </div>
    </div>
  );
};

export default UserProfileMenu;
