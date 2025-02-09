import { FaRegUser } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useMutation } from "@tanstack/react-query";
import * as UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import * as Alert from "../../components/Alert/Alert";
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { auth, googleProvider, facebookProvider } from "../../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { updateUser } from "../../redux/slides/userSlide";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import * as Message from "../../components/Alert/Alert";

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: UserService.signupUser,
    onMutate: () => {
      setIsLoading(true);
    },
    onError: (error) => {
      setIsLoading(false);
      const apiErrorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      setErrorMessage(
        apiErrorMessage.message === undefined
          ? apiErrorMessage
          : apiErrorMessage.message
      );
      console.error("Error:", apiErrorMessage);
    },
    onSuccess: (data) => {
      setIsLoading(false);
      setErrorMessage("");
      const apiSuccessMessage =
        data.message || "Sign up successful! Please verify your email.";
      setSuccessMessage(apiSuccessMessage);
    },
  });

  const verifyMutation = useMutation({
    mutationFn: (code) => UserService.verifyEmail(code),
    onError: (error) => {
      const apiErrorMessage =
        error.response?.data?.message || "Verification failed.";
      setErrorMessage(apiErrorMessage);
      Alert.error(apiErrorMessage);
    },
    onSuccess: (data) => {
      setErrorMessage("");
      Alert.success("Email verified successfully!");
      navigate("/login");
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
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailUser(decoded?.id, data?.access_token);
          navigate("/home");
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
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailUser(decoded?.id, data?.access_token);
          navigate("/home");
        }
      }
    },
  });

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

  const handleSignup = (e) => {
    e.preventDefault();
    mutation.mutate(
      {
        userName,
        email,
        password,
        confirmPassword,
      },
      {
        onSuccess: () => {
          Message.success("Please check your email to get the code!");
          setIsVerificationStep(true);
        },
      }
    );
  };

  const handleVerifyEmail = () => {
    verifyMutation.mutate(verificationCode);
  };

  return (
    <form
      onSubmit={handleSignup}
      className="w-screen justify-center items-center bg-opacity-80 h-screen bg-no-repeat bg-cover bg-[url('./assets/bg-dm.png')] flex flex-col">
      <div className='bg-black bg-opacity-70 w-full h-full justify-center items-center flex'>
        <div className='bg-white dark:bg-black border mx-4 border-gray-700 dark:border-gray-100 rounded-xl shadow-lg px-8 py-6 my-4 h-max w-full max-w-md'>
          {!isVerificationStep ? (
            <>
              <h1 className='text-slate-800 dark:text-white text-3xl font-bold text-center mb-6'>
                Sign Up
              </h1>
              <div className='space-y-4'>
                <div className='flex items-center border-2 rounded-lg border-gray-600 bg-white px-3 py-2 dark:bg-black dark:border-gray-200 focus-within:border-purple-500'>
                  <FaRegUser className='text-gray-500 dark:text-white mr-3' />
                  <input
                    onChange={(e) => setUserName(e.target.value)}
                    type='text'
                    placeholder='Username'
                    className='w-full text-black placeholder-gray-500 dark:text-white dark:placeholder-gray-500 bg-transparent outline-none'
                  />
                </div>
                <div className='flex items-center border-2 rounded-lg border-gray-600 bg-white px-3 py-2 dark:bg-black dark:border-gray-200 focus-within:border-purple-500'>
                  <MdOutlineEmail className='text-gray-500 dark:text-white mr-3' />
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type='email'
                    placeholder='Email'
                    className='w-full text-black placeholder-gray-500 dark:text-white dark:placeholder-gray-500 bg-transparent outline-none'
                  />
                </div>
                <div className='flex items-center border-2 rounded-lg border-gray-600 bg-white px-3 py-2 dark:bg-black dark:border-gray-200 focus-within:border-purple-500'>
                  <IoKeyOutline className='text-gray-500 dark:text-white mr-3' />
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    placeholder='Password'
                    className='w-full text-black placeholder-gray-500 dark:text-white dark:placeholder-gray-500 bg-transparent outline-none'
                  />
                </div>
                <div className='flex items-center border-2 rounded-lg border-gray-600 bg-white px-3 py-2 dark:bg-black dark:border-gray-200 focus-within:border-purple-500'>
                  <RiLockPasswordLine className='text-gray-500 dark:text-white mr-3' />
                  <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type='password'
                    placeholder='Confirm Password'
                    className='w-full text-black placeholder-gray-500 dark:text-white dark:placeholder-gray-500 bg-transparent outline-none'
                  />
                </div>
                {errorMessage && (
                  <p className='text-red-500 text-sm mt-2'>{errorMessage}</p>
                )}
              </div>

              <button
                type='submit'
                className='w-full bg-[#4335DE] hover:bg-[#584cdb] text-white font-semibold rounded-lg py-2 mt-4 transition duration-300'>
                Register
              </button>

              <div className='flex items-center justify-between mt-6'>
                <span className='bg-gray-700 h-px w-full'></span>
                <p className='text-gray-400 text-sm mx-2 whitespace-nowrap'>
                  Or sign in with
                </p>
                <span className='bg-gray-700 h-px w-full'></span>
              </div>

              <div className='flex flex-col gap-3 mt-4'>
                <button
                  onClick={handleLoginFacebook}
                  className='flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 transition duration-300'>
                  <FaFacebook className='mr-3' />
                  Facebook
                </button>
                <button
                  onClick={handleLoginGoogle}
                  className='flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 transition duration-300'>
                  <BiLogoGmail className='mr-3' />
                  Google
                </button>
              </div>

              <p className='text-center text-gray-400 mt-6'>
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className='text-[#4335DE] font-semibold cursor-pointer hover:underline'>
                  Sign in
                </span>
              </p>
            </>
          ) : (
            <>
              <h1 className='text-black dark:text-white text-4xl font-bold text-center mb-6'>
                Verify Email
              </h1>
              <div className='flex items-center border-2 rounded-lg border-gray-600 px-3 py-2 bg-white dark:bg-black focus-within:border-purple-500'>
                <input
                  onChange={(e) => setVerificationCode(e.target.value)}
                  type='text'
                  placeholder='Verification Code'
                  className='w-full text-black dark:text-white placeholder-gray-500 bg-transparent outline-none'
                />
              </div>
              {errorMessage && (
                <p className='text-red-500 text-sm mt-2'>{errorMessage}</p>
              )}

              <button
                type='submit'
                className={`w-full ${
                  isLoading
                    ? "bg-[#4335DE] cursor-not-allowed"
                    : "bg-[#4335DE] hover:bg-[#584cdb]"
                } text-white font-semibold rounded-lg py-2 mt-4 transition duration-300 flex justify-center items-center`}
                disabled={isLoading}>
                {isLoading ? (
                  <svg
                    className='animate-spin h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 2.042.784 3.898 2.051 5.291l1.949-1.949z'></path>
                  </svg>
                ) : (
                  "Register"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default SignupPage;
