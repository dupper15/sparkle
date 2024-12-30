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
import { IoArrowBack } from "react-icons/io5";

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

  const mutation = useMutation({
    mutationFn: UserService.signupUser,
    onError: (error) => {
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
          setIsVerificationStep(true);
        },
      }
    );
  };

  const handleVerifyEmail = () => {
    verifyMutation.mutate(verificationCode);
  };

  useEffect(() => {
    if (verifyMutation.isSuccess) {
      Alert.success(successMessage);
    }
  }, [verifyMutation.isSuccess, successMessage]);

  return (
    <form
      onSubmit={handleSignup}
      className="flex justify-center items-center h-screen bg-no-repeat bg-cover bg-[url('./assets/bg-lm.jpg')] dark:bg-[url('./assets/bg-dm.jpg')]">
      <div className="bg-orange-50 dark:bg-black border border-gray-700 dark:border-gray-100 rounded-xl shadow-lg p-8 my-4 h-max w-full max-w-md">
        {!isVerificationStep ? (
          <>
            <h1 className="text-black dark:text-white text-3xl font-bold text-center mb-6">
              Sign Up
            </h1>

            <div className="space-y-4">
              <div className="flex items-center border-2 rounded-lg border-gray-600 bg-white px-3 py-2 dark:bg-black dark:border-gray-200 focus-within:border-orange-300 dark:focus-within:border-orange-300">
                <FaRegUser className="text-gray-500 dark:text-white mr-3" />
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  type="text"
                  placeholder="Username"
                  className="w-full text-black placeholder-gray-500 dark:text-white dark:placeholder-gray-500 bg-transparent outline-none"
                />
              </div>
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
              <div className="flex items-center border-2 rounded-lg border-gray-600 bg-white px-3 py-2 dark:bg-black dark:border-gray-200 focus-within:border-orange-300 dark:focus-within:border-orange-300">
                <RiLockPasswordLine className="text-gray-500 dark:text-white mr-3" />
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full text-black placeholder-gray-500 dark:text-white dark:placeholder-gray-500 bg-transparent outline-none"
                />
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-500 text-white font-semibold rounded-lg py-2 mt-4 transition duration-300">
              Register
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
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-[#4335DE] font-semibold cursor-pointer hover:underline">
                Log in
              </span>
            </p>
          </>
        ) : (
          <>
            <div>
              <IoArrowBack
                className="w-5 h-5 cursor-pointer hover:text-orange-500 dark:hover:text-orange-500 text-black dark:text-white"
                onClick={() => {
                  setIsVerificationStep((prev) => !prev);
                  setErrorMessage("");
                }}
              />
            </div>
            <h1 className="text-black dark:text-white text-4xl font-bold text-center mb-6">
              Verify Email
            </h1>
            <div className="flex items-center border-2 rounded-lg border-gray-600 px-3 py-2 bg-white dark:bg-black focus-within:border-orange-300 dark:focus-within:border-orange-300">
              <input
                onChange={(e) => setVerificationCode(e.target.value)}
                type="text"
                placeholder="Verification Code"
                className="w-full text-white placeholder-gray-500 bg-transparent outline-none"
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
            <button
              onClick={handleVerifyEmail}
              className="w-full bg-orange-500 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-500 text-white font-semibold rounded-lg py-2 mt-4 transition duration-300">
              Verify
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default SignupPage;
