import { FaRegUser } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query";
import * as UserService from '../../services/UserService';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const mutation = useMutation(
    {
      mutationFn: UserService.loginUser,
      onError: (error) => {
        const apiErrorMessage = error.response?.data?.message || "An unexpected error occurred.";
        setErrorMessage(apiErrorMessage);
        console.error("Error:", apiErrorMessage);
      },
      onSuccess: (data) => {
        setErrorMessage("");
        const apiSuccessMessage = data.message || "Login successful!";
        setSuccessMessage(apiSuccessMessage)
        console.log("Login successful:", data);
      },
    }
  )

  console.log('mutation', mutation)

  const handleLogin = () => {
    mutation.mutate({
      email,  
      password
    })
  }
  const { isSuccess, isError } = mutation

  const handleNavigateHome = () => {
    navigate('/home')
  }

  useEffect(() => {
    if (isSuccess){
      handleNavigateHome()
      localStorage.setItem('access_token', mutation.data?.access_token)
      if(mutation.data?.access_token) {
        const decoded = jwtDecode(mutation.data?.access_token)
        console.log("decode", decoded)
        if (decoded?.id){
            handleGetDetailUser(decoded?.id, mutation.data?.access_token)
        }
      }
    } 
  },[isSuccess, successMessage])

  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token)
    dispatch(updateUser({...res?.data, access_token: token}))
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 to-black">
      <div className="h-max w-[350px] bg-black border-none rounded-md flex flex-col gap-4 justify-center items-center px-6 py-8 shadow-lg">
        <h1 className="text-white text-3xl font-bold mt-0">Login</h1>
        <div className="flex items-center border-2 rounded-lg border-white px-2 bg-black w-full focus-within:border-purple-500 transition-all ease-in-out duration-500">
          <FaRegUser className="text-white mr-2" />
          <input
            type="email"
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 placeholder:text-slate-400 text-white bg-black outline-none"
          />
        </div>
        <div className="flex items-center border-2 rounded-lg border-white px-2 bg-black w-full focus-within:border-purple-500 transition-all ease-in-out duration-300">
          <IoKeyOutline className="text-white mr-2" />
          <input
            type="password"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10 placeholder:text-slate-400 text-white bg-black outline-none"
          />
        </div>
        <div className="text-sm ml-auto text-white hover:text-blue-400 hover:ease-in-out transition-colors duration-300 cursor-pointer">
          Forgot Password?
        </div>
        {errorMessage && typeof errorMessage === "string" && (
          <span className="text-red-500">{errorMessage}</span>
        )}

        <button
          onClick={handleLogin}
          className="w-full h-max p-1 bg-gradient text-black rounded-lg font-semibold text-lg"
        >
          Login
        </button>

        <div className="flex justify-center items-center px-3 gap-2">
          <div className="w-[130px] h-[1px] bg-gray-400"></div>
          <div className="text-gray-400">Or</div>
          <div className="w-[130px] h-[1px] bg-gray-400"></div>
        </div>

        <button className="flex items-center bg-transparent border-2 rounded-lg border-white text-white w-full h-max p-2 gap-3 hover:border-blue-400 hover:bg-blue-400 transition-all ease-in-out duration-100">
          <FaFacebook className="h-[25px] w-[25px]" />
          <span>Login with Facebook</span>
        </button>
        <button className="flex items-center bg-transparent border-2 rounded-lg border-white text-white w-full h-max p-2 gap-3 hover:border-red-500 hover:bg-red-500 transition-all ease-in-out duration-100">
          <BiLogoGmail className="h-[25px] w-[25px]" />
          <span>Login with Gmail</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
