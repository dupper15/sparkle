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
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

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

  const handleLogin = (e) => {
    e.preventDefault();
    mutation.mutate({
      email,
      password,
    });
  };

  const handleNavigateSendEmail = () => {
    setStepVerify(true);
    setErrorMessage("");
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

  const handleLoginGoogle = async (e) => {
    try {
      e.preventDefault();
      const result = await signInWithPopup(auth, googleProvider);
      const emailGoogle = result.user.email;
      const name = result.user.displayName;
      const image = result.user.photoURL;
      mutationGoogle.mutate({ emailGoogle, name, image });
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const handleLoginFacebook = async (e) => {
    try {
      e.preventDefault();
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
    <form
      onSubmit={handleLogin}
      className="flex justify-center items-center h-screen bg-no-repeat bg-cover bg-[url('./assets/bg-lm.jpg')] dark:bg-[url('./assets/bg-dm.jpg')]">
      <div className="bg-orange-50 dark:bg-black border border-gray-700 dark:border-gray-100 rounded-xl shadow-lg p-8 my-4 h-max w-full max-w-md">
        {!stepVerify && !stepPassword && (
          <>
            <h1 className="text-black dark:text-white text-3xl font-bold text-center mb-6">
              Log In
            </h1>

            <div className="space-y-4">
              <div className="flex items-center border-2 rounded-lg border-gray-600 bg-white px-3 py-2 dark:bg-black dark:border-gray-200 focus-within:border-orange-300 dark:focus-within:border-orange-300">
                <MdOutlineEmail className="text-gray-500 dark:text-white mr-3" />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className="w-full text-black placeholder-gray-500 dark:text-white dark:placeholder-gray-500 bg-transparent outline-none"
                />
              </div>
              <div className="flex items-center border-2 rounded-lg border-gray-600 bg-white px-3 py-2 dark:bg-black dark:border-gray-200 focus-within:border-orange-300 dark:focus-within:border-orange-300">
                <IoKeyOutline className="text-gray-500 dark:text-white mr-3" />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="w-full text-black placeholder-gray-500 dark:text-white dark:placeholder-gray-500 bg-transparent outline-none"
                />
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}
            </div>

            <div className="flex justify-between items-center mt-4">
              <div></div>
              <p
                onClick={handleNavigateSendEmail}
                className="text-[#4335DE] text-sm font-semibold cursor-pointer hover:underline">
                Forgot Password?
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-500 text-white font-semibold rounded-lg py-2 mt-4 transition duration-300">
              Login
            </button>

            <div className="flex items-center justify-between mt-6">
              <span className="bg-gray-700 h-px w-1/3"></span>
              <p className="text-gray-400 text-sm mx-2">Or sign in with</p>
              <span className="bg-gray-700 h-px w-1/3"></span>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={handleLoginFacebook}
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 transition duration-300">
                <FaFacebook className="mr-3" />
                Facebook
              </button>
              <button
                onClick={handleLoginGoogle}
                className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 transition duration-300">
                <BiLogoGmail className="mr-3" />
                Google
              </button>
            </div>

            <p className="text-center text-gray-400 mt-6">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/sign-up")}
                className="text-[#4335DE] font-semibold cursor-pointer hover:underline">
                Sign up
              </span>
            </p>
          </>
        )}
        {stepVerify && !stepPassword && (
          <div>
            <div>
              <IoArrowBack
                className="w-5 h-5 cursor-pointer text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-500"
                onClick={() => {
                  setStepVerify((prev) => !prev);
                  setErrorMessage("");
                }}
              />
            </div>
            <div className="flex flex-col gap-6 p-6 items-center justify-center h-max">
              <h1 className="text-black dark:text-white text-4xl font-bold">
                Verify Code
              </h1>

              {/* Email Input */}
              <div className="flex flex-col w-full max-w-md gap-4">
                <div className="flex items-center border-2 rounded-lg border-black px-3 bg-white dark:border-white dark:bg-black focus-within:border-orange-500 dark:focus-within:border-orange-500 transition-all ease-in-out duration-500">
                  <FaRegUser className="text-black dark:text-white mr-2" />
                  <input
                    type="email"
                    placeholder="Enter your email..."
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 placeholder:text-slate-400 text-black dark:text-white bg-white dark:bg-black outline-none"
                  />
                </div>
                <button
                  onClick={handleSendEmail}
                  className="w-full h-12 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg font-semibold text-lg transition-transform transform hover:scale-105">
                  Send
                </button>
              </div>

              {/* Code Input */}
              <div className="w-full max-w-md">
                <div className="flex items-center border-2 rounded-lg border-black px-3 bg-white dark:border-white dark:bg-black focus-within:border-orange-500 dark:focus-within:border-orange-500 transition-all ease-in-out duration-500">
                  <input
                    type="text"
                    placeholder="Enter code..."
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-12 placeholder:text-slate-400 text-black dark:text-white bg-white dark:bg-black outline-none"
                  />
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && typeof errorMessage === "string" && (
                <span className="text-red-500 text-center">{errorMessage}</span>
              )}

              {/* Verify Button */}
              <button
                onClick={handleVerifyCode}
                className="w-full max-w-md h-12 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg font-semibold text-lg transition-transform transform hover:scale-105">
                Verify
              </button>
            </div>
          </div>
        )}
        {stepPassword && (
          <div className="space-y-6">
            <div>
              <IoArrowBack
                className="w-5 h-5 cursor-pointer text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-500"
                onClick={() => {
                  setStepVerify(true);
                  setStepPassword(false);
                  setErrorMessage("");
                }}
              />
            </div>
            <h1 className="text-black dark:text-white text-3xl font-bold mt-0">
              New password
            </h1>
            <div className="flex items-center border-2 rounded-lg border-black bg-white dark:border-white px-2 dark:bg-black w-full focus-within:border-orange-500 dark:focus-within:border-orange-500 transition-all ease-in-out duration-300">
              <IoKeyOutline className="text-black dark:text-white mr-2" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password..."
                className="w-full h-10 placeholder:text-slate-400 text-black bg-white dark:text-white  dark:bg-black outline-none"
              />
            </div>
            <div className="flex items-center border-2 rounded-lg border-black bg-white dark:border-white px-2 dark:bg-black w-full focus-within:border-orange-500 dark:focus-within:border-orange-500 transition-all ease-in-out duration-300">
              <RiLockPasswordLine className="text-black dark:text-white mr-2" />
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm your password..."
                className="w-full h-10 placeholder:text-slate-400 text-black bg-white dark:text-white  dark:bg-black outline-none"
              />
            </div>
            {errorMessage && typeof errorMessage === "string" && (
              <span className="text-red-500">{errorMessage}</span>
            )}
            <button
              onClick={handleChangePassword}
              className=" w-full h-max p-1 bg-gradient text-[#5A3E2B] rounded-lg font-semibold text-lg">
              Change password
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default LoginPage;
