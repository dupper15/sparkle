import Header from "../../components/SharedComponents/Header/Header.jsx";
import Footer from "../../components/SharedComponents/Footer/Footer.jsx";
import SettingSideBar from "../../components/SettingSideBar/SettingSideBar.jsx";
import profileIcon from "../../assets/default-profile-icon.png";
import { FaGoogle, FaFacebook } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as UserService from "../../services/UserService.js";
import * as Alert from "../../components/Alert/Alert.jsx";
import { updateUser } from "../../redux/slides/userSlide.js";
import FormChangePassword from "../../components/SharedComponents/FormChangePassword/FormChangePassword.jsx";
import { useMutation } from "@tanstack/react-query";

const MyAccountPage = () => {
  const user = useSelector((state) => state.user);

  const [isEditingUserName, setIsEditingUserName] = useState(false);
  const [userName, setUserName] = useState("");
  const [initialUserName, setInitialUserName] = useState("");

  const [isChangePassword, setChangePassword] = useState(false);

  const [image, setImage] = useState(profileIcon);
  const [isUploading, setIsUploading] = useState(false);
  const [isViewImage, setViewImage] = useState(false);
  const [verify, setVerify] = useState("");
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const mutation = useMutation({
    mutationFn: ({ id, data, access_token }) => {
      return UserService.updateInfoUser(id, data, access_token);
    },
    onError: (error) => {
      const apiErrorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      setErrorMessage(
        apiErrorMessage.message === undefined
          ? apiErrorMessage
          : apiErrorMessage.message
      );
    },
    onSuccess: (data) => {
      setErrorMessage("");
      const apiSuccessMessage = data.message || "Login successful!";
      setSuccessMessage(apiSuccessMessage);
      handleGetDetailUser(data?.data._id, user?.access_token);
    },
  });

  const { data, isSuccess, isError } = mutation;

  useEffect(() => {
    setImage(user?.image || profileIcon);
    setUserName(user?.userName);
    setInitialUserName(user?.userName);
    setVerify(user?.verify);
  }, [user]);

  //   useEffect(() => {
  //   if(isSuccess){
  //     Alert.success("Update information success !")
  //     handleGetDetailUser(user?.id, user?.access_token)
  //   } else if (isError){
  //     Alert.error("Update failed. Please try again.");
  //   }
  // },[isSuccess, isError])

  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleOnChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleEditUserName = () => {
    setIsEditingUserName(!isEditingUserName);
  };

  const handleChangePassword = () => {
    setChangePassword(!isChangePassword);
  };

  const handleCancelClick = () => {
    setUserName(initialUserName);
    setIsEditingUserName(false);
  };

  const handleUpdateUserName = () => {
    try {
      mutation.mutate({
        id: user?.id,
        data: { userName: userName },
        access_token: user?.access_token,
      });
      setIsEditingUserName(false);
      Alert.success("Change user name successfully!");
    } catch (error) {
      Alert.error("Failed to change user name !");
      console.error(error);
    }
  };

  const handleViewImage = () => {
    setViewImage(!isViewImage);
  };

  const closeModal = () => {
    setViewImage(false);
  };

  const handleOnChangeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleUploadImage(file);
    }
  };

  const handleUploadImage = async (file) => {
    try {
      setIsUploading(true);
      const uploadPreset = "afh5sfc";
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/ddcjjegzf/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      setImage(result.secure_url);
      dispatch(
        updateUser({
          ...user,
          image: result.secure_url,
        })
      );
      mutation.mutate({
        id: user?.id,
        data: { image: result.secure_url },
        access_token: user?.access_token,
      });

      Alert.success("Change image successfully!");
    } catch (error) {
      Alert.error("Failed to upload image. Please try again.");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (image === profileIcon) {
      Alert.error("You cannot remove the default profile image.");
      return;
    }
    try {
      setImage(profileIcon);
      dispatch(
        updateUser({
          ...user,
          image: profileIcon,
        })
      );
      mutation.mutate({
        id: user?.id,
        data: { image: null },
        access_token: user?.access_token,
      });
      Alert.success("Remove avatar successfully!");
    } catch (error) {
      Alert.error("Failed to remove image. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className='flex flex-col h-screen overflow-y-auto bg-white dark:bg-black'>
      <header>
        <Header className='fixed top-0 left-0 w-full z-50' />
      </header>
      <div className='flex flex-grow w-auto'>
        <div className='w-[55px] md:w-[80px] h-full overflow-y-auto overflow-x-hidden scrollbar-hide'>
          <SettingSideBar />
        </div>
        <div className='flex flex-col w-[calc(100%-50px)] md:w-[calc(100%-80px)] overflow-y-auto gap-4 pb-8 ps-14 pe-20 scrollbar-hide text-slate-900 bg-white dark:bg-black dark:text-white'>
          <span className='font-bold text-xl md:text-3xl mt-4 pointer-events-none'>
            My Profile
          </span>
          <div>
            <span className='font-semibold text-xl pointer-events-none'>
              Avatar
            </span>
            <div className='flex items-center justify-between mt-4'>
              <label htmlFor='upload-avatar' className='cursor-pointer'>
                <img
                  className='object-cover w-[100px] h-[100px] rounded-full'
                  src={image}
                  alt='Profile Avatar'
                />
              </label>
              <div className='flex flex-col text-right cursor-pointer space-y-2'>
                <label
                  className='md:text-m hover:text-[#4335DE] cursor-pointer'
                  htmlFor='image'>
                  Change image
                </label>
                <input
                  type='file'
                  id='image'
                  onChange={handleOnChangeImage}
                  className='hidden'
                  accept='image/jpeg, image/png, image/jpg'></input>
                {isUploading && (
                  <span className='text-sm text-gray-500'>Uploading...</span>
                )}
                <span
                  onClick={handleViewImage}
                  className='md:text-m hover:text-[#4335DE] cursor-pointer'>
                  View image
                </span>
                <span
                  onClick={handleRemoveImage}
                  className='md:text-m hover:text-[#4335DE] cursor-pointer'>
                  Remove photo
                </span>
              </div>
            </div>
            {isViewImage && (
              <div
                className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
                onClick={closeModal}>
                <div
                  className='bg-white rounded shadow-lg relative'
                  onClick={(e) => e.stopPropagation()}>
                  <img
                    src={image}
                    alt='Profile Image'
                    className='object-fill w-[640px] h-[360px] rounded'
                  />
                </div>
              </div>
            )}
            <div className='w-full h-[1px] bg-gray-400 my-4'></div>
            <div className='flex items-center justify-between w-full'>
              <div className='flex flex-col space-y-2'>
                <span className='font-semibold text-xl pointer-events-none'>
                  Nickname
                </span>
                {isEditingUserName ? (
                  <input
                    type='text'
                    className='font-thin text-s md:text-m rounded bg-white text-slate-700 dark:bg-black dark:text-white p-1 border border-slate-400'
                    value={userName}
                    onChange={handleOnChangeUserName}
                  />
                ) : (
                  <span className='font-thin text-s md:text-m'>{userName}</span>
                )}
              </div>
              <div className='flex space-x-2 mt-2'>
                {isEditingUserName ? (
                  <>
                    <button
                      className='w-[80px] h-[40px] font-semibold rounded-lg shadow-sm flex justify-center items-center p-2 bg-red-500 text-white hover:bg-red-600'
                      onClick={handleCancelClick}>
                      Cancel
                    </button>
                    <button
                      className='w-[80px] h-[40px] font-semibold rounded-lg shadow-sm flex justify-center items-center p-2 bg-green-500 text-white hover:bg-green-600'
                      onClick={handleUpdateUserName}>
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    className='w-[80px] h-[40px] border-slate-600 bg-white text-slate-800 border-2 font-semibold rounded-lg shadow-sm flex justify-center items-center p-2 hover:bg-slate-100 dark:text-white dark:bg-black'
                    onClick={handleEditUserName}>
                    Edit
                  </button>
                )}
              </div>
            </div>
            <div className='w-full h-[1px] bg-gray-400 my-4'></div>
            <div className='flex flex-col justify-between w-full space-y-2'>
              <span className='font-semibold text-xl pointer-events-none'>
                Email
              </span>
              <span className='font-thin text-s md:text-m pointer-events-none'>
                {user.email}
              </span>
            </div>
            <div className='w-full h-[1px] bg-gray-400 my-4'></div>
            <div className='flex items-center justify-between w-full'>
              <div className='flex flex-col space-y-2'>
                <span className='font-semibold text-xl pointer-events-none'>
                  Password
                </span>
              </div>
              <button
                className='w-[auto] h-[50px] sm:h-[40px]  font-semibold rounded-lg border-slate-600  border-2 shadow-sm flex justify-center items-center px-1 ml-3 sm:px-3 py-2 hover:bg-slate-100 bg-white text-slate-800 dark:bg-black dark:text-white'
                onClick={handleChangePassword}>
                Change Password
              </button>
            </div>
            <div className='w-full h-[1px] bg-gray-400 my-4'></div>
            <div className='flex flex-col space-y-2'>
              <span className='font-semibold text-xl pointer-events-none'>
                Social Media
              </span>
              <span className='font-thin text-s  pointer-events-none'>
                Services you have used
              </span>
            </div>
            <div className='flex flex-col gap-2 py-2'>
              <div className='flex flex-col sm:flex-row items-center border-slate-600 w-full h-auto border rounded-lg my-2 py-3 px-2 dark:border-white'>
                <div className='flex flex-row items-center w-full sm:w-auto'>
                  <FaGoogle className='h-10 w-10' />
                  <div className='flex flex-col px-4'>
                    <span className='font-semibold text-lg sm:text-xl pointer-events-none'>
                      Google
                    </span>
                    <span className='font-thin text-sm sm:text-base overflow-x-clip pointer-events-none'>
                      {user?.email}
                    </span>
                  </div>
                </div>
                <button
                  disabled={false}
                  className='mt-3 ml-auto sm:mt-0 sm:ml-auto w-28 bg-slate-300 text-slate-800 border-slate-600 border-2 font-semibold rounded-lg shadow-sm flex justify-center items-center px-4 py-2 dark:bg-black dark:text-white'>
                  Connected
                </button>
              </div>

              {/* <div className='flex flex-col sm:flex-row items-center border-slate-600  w-full h-auto border rounded-lg my-2 py-3 px-2 dark:border-white'>
								<div className='flex flex-row items-center w-full sm:w-auto'>
									<FaFacebook className='h-10 w-10' />
									<div className='flex flex-col px-4'>
										<span className='font-semibold text-lg sm:text-xl pointer-events-none'>Facebook</span>
										<span className='font-thin text-sm sm:text-base pointer-events-none'>caoduonglam@gmail.com</span>
									</div>
								</div>
								<button className='mt-3 w-28 ml-auto sm:mt-0 sm:ml-auto bg-white text-slate-800 font-semibold rounded-lg shadow-sm border-slate-600 border-2 flex justify-center items-center px-4 py-2 hover:bg-slate-100 dark:bg-black dark:text-white'>
									Connect
								</button>
							</div> */}
            </div>
          </div>
        </div>
      </div>
      <div className=''>
        <Footer />
      </div>
      {isChangePassword && (
        <FormChangePassword closeForm={() => setChangePassword(false)} />
      )}
    </div>
  );
};

export default MyAccountPage;
