import { FaRegUser } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useMutation } from "@tanstack/react-query";
import * as UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";
import { auth, googleProvider, facebookProvider } from "../../utils/firebase";
import { signInWithPopup } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [code, setCode] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [stepVerify, setStepVerify] = useState(false);
  const [stepPassword, setStepPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: UserService.loginUser,
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
    },
  });

  const mutationGoogle = useMutation({
    mutationFn: UserService.loginGoogle,
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
      navigate("/home");
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailUser(decoded?.id, data?.access_token);
        }
      }
    },
  });

  const mutationFacebook = useMutation({
    mutationFn: UserService.loginFacebook,
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
      navigate("/home");
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailUser(decoded?.id, data?.access_token);
        }
      }
    },
  });

  const mutationSendEmail = useMutation({
    mutationFn: UserService.sendEmail,
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
    },
  });

  const mutationVerifyCode = useMutation({
    mutationFn: UserService.verifyForgotPassword,
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
      setStepPassword(true);
    },
  });

  const mutationChangePassword = useMutation({
    mutationFn: UserService.forgotPassword,
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
      setStepPassword(false);
      setStepVerify(false);
    },
  });

  const handleLogin = () => {
    mutation.mutate({
      email,
      password,
    });
  };

  const handleNavigateSendEmail = () => {
    setStepVerify(true);
  };

  const handleSendEmail = () => {
    mutationSendEmail.mutate({ email: email });
  };

  const handleVerifyCode = () => {
    mutationVerifyCode.mutate({ verificationCode: code });
  };

  const handleChangePassword = () => {
    mutationChangePassword.mutate({ email, password, confirmPassword });
  };

  const { isSuccess, isError } = mutation;

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate("/home");
      localStorage.setItem(
        "access_token",
        JSON.stringify(mutation.data?.access_token)
      );
      if (mutation.data?.access_token) {
        const decoded = jwtDecode(mutation.data?.access_token);
        if (decoded?.id) {
          handleGetDetailUser(decoded?.id, mutation.data?.access_token);
        }
      }
    }
  }, [mutation.isSuccess, successMessage]);

  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const emailGoogle = result.user.email;
      const name = result.user.displayName;
      const image = result.user.photoURL;
      mutationGoogle.mutate({ emailGoogle, name, image });
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const handleLoginFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const emailFacebook = result.user.email;
      const name = result.user.displayName;
      const image = result.user.photoURL;
      const fb = result.user.uid;
      mutationFacebook.mutate({ emailFacebook, name, image, fb });
    } catch (error) {
      console.error("Error during Facebook login:", error);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 to-black'>
      <div className='h-max w-[350px] bg-black border-none rounded-md flex flex-col gap-4 justify-center items-center px-6 py-8 shadow-lg'>
        {!stepVerify && !stepPassword && (
          <>
            <h1 className='text-white text-3xl font-bold mt-0'>Login</h1>
            <div className='flex items-center border-2 rounded-lg border-white px-2 bg-black w-full focus-within:border-purple-500 transition-all ease-in-out duration-500'>
              <FaRegUser className='text-white mr-2' />
              <input
                type='email'
                placeholder='Enter your email...'
                onChange={(e) => setEmail(e.target.value)}
                className='w-full h-10 placeholder:text-slate-400 text-white bg-black outline-none'
              />
            </div>
            <div className='flex items-center border-2 rounded-lg border-white px-2 bg-black w-full focus-within:border-purple-500 transition-all ease-in-out duration-300'>
              <IoKeyOutline className='text-white mr-2' />
              <input
                type='password'
                placeholder='Enter your password...'
                onChange={(e) => setPassword(e.target.value)}
                className='w-full h-10 placeholder:text-slate-400 text-white bg-black outline-none'
              />
            </div>
            <div
              onClick={handleNavigateSendEmail}
              className='text-sm ml-auto text-white hover:text-blue-400 hover:ease-in-out transition-colors duration-300 cursor-pointer'>
              Forgot Password?
            </div>
            {errorMessage && typeof errorMessage === "string" && (
              <span className='text-red-500'>
                {errorMessage || apiErrorMessage.message}
              </span>
            )}
            <button
              onClick={handleLogin}
              className='w-full h-max p-1 bg-gradient text-black rounded-lg font-semibold text-lg'>
              Login
            </button>

            <div className='flex justify-center items-center px-3 gap-2'>
              <div className='w-[130px] h-[1px] bg-gray-400'></div>
              <div className='text-gray-400'>Or</div>
              <div className='w-[130px] h-[1px] bg-gray-400'></div>
            </div>

            <button
              onClick={handleLoginFacebook}
              className='flex items-center bg-transparent border-2 rounded-lg border-white text-white w-full h-max p-2 gap-3 hover:border-blue-400 hover:bg-blue-400 transition-all ease-in-out duration-100'>
              <FaFacebook className='h-[25px] w-[25px]' />
              <span>Login with Facebook</span>
            </button>
            <button
              onClick={handleLoginGoogle}
              className='flex items-center bg-transparent border-2 rounded-lg border-white text-white w-full h-max p-2 gap-3 hover:border-red-500 hover:bg-red-500 transition-all ease-in-out duration-100'>
              <BiLogoGmail className='h-[25px] w-[25px]' />
              <span>Login with Gmail</span>
            </button>
          </>
        )}
        {stepVerify && !stepPassword && (
          <>
            <h1 className='text-white text-3xl font-bold mt-0'>Verify Code</h1>
            <div className='flex items-center w-full gap-2'>
              <div className='flex items-center border-2 rounded-lg border-white px-2 bg-black flex-1 focus-within:border-purple-500 transition-all ease-in-out duration-500'>
                <FaRegUser className='text-white mr-2' />
                <input
                  type='email'
                  placeholder='Enter your email...'
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full h-10 placeholder:text-slate-400 text-white bg-black outline-none'
                />
              </div>
              <button
                onClick={handleSendEmail}
                className='px-4 py-2 bg-gradient text-black rounded-lg font-semibold text-lg'>
                Send
              </button>
            </div>
            <div className='flex items-center border-2 rounded-lg border-white px-2 bg-black w-full focus-within:border-purple-500 transition-all ease-in-out duration-500'>
              <input
                type='text'
                placeholder='Enter code...'
                onChange={(e) => setCode(e.target.value)}
                className='w-full h-10 placeholder:text-slate-400 text-white bg-black outline-none'
              />
            </div>
            {errorMessage && typeof errorMessage === "string" && (
              <span className='text-red-500'>{errorMessage}</span>
            )}
            <button
              onClick={handleVerifyCode}
              className='w-full h-max p-1 bg-gradient text-black rounded-lg font-semibold text-lg mt-3'>
              Verify
            </button>
          </>
        )}
        {stepPassword && (
          <>
            <h1 className='text-white text-3xl font-bold mt-0'>New password</h1>
            <div className='flex items-center border-2 rounded-lg border-white px-2 bg-black w-full focus-within:border-purple-500 transition-all ease-in-out duration-300'>
              <IoKeyOutline className='text-white mr-2' />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='Enter your password...'
                className='w-full h-10 placeholder:text-slate-400 text-white  bg-black outline-none'
              />
            </div>
            <div className='flex items-center border-2 rounded-lg border-white px-2 bg-black w-full focus-within:border-purple-500 transition-all ease-in-out duration-300'>
              <RiLockPasswordLine className='text-white mr-2' />
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type='password'
                placeholder='Confirm your password...'
                className='w-full h-10 placeholder:text-slate-400 text-white  bg-black outline-none'
              />
            </div>
            {errorMessage && typeof errorMessage === "string" && (
              <span className='text-red-500'>{errorMessage}</span>
            )}
            <button
              onClick={handleChangePassword}
              className=' w-full h-max p-1 bg-gradient text-black rounded-lg font-semibold text-lg'>
              Change password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
