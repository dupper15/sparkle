import { FaRegUser } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useMutation } from "@tanstack/react-query";
import * as UserService from '../../services/UserService'
import { useEffect, useState } from "react"
import * as Alert from '../Alert/Alert'
import { useNavigate } from "react-router-dom";
const SignUpForm = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const mutation = useMutation(
    {
      mutationFn: UserService.signupUser,
      onError: (error) => {
        const apiErrorMessage = error.response?.data?.message || "An unexpected error occurred.";
        setErrorMessage(apiErrorMessage);
        console.error("Error:", apiErrorMessage);
      },
      onSuccess: (data) => {
        setErrorMessage("");
        const apiSuccessMessage = data.message || "Sign up successful!";
        setSuccessMessage(apiSuccessMessage)
        console.log("Sign up successful:", data);
      },
    }
  )

  console.log('mutation', mutation)

  const handleSignup = () => {
    mutation.mutate({
      email,  
      password,
      confirmPassword
    })
  }

  const { isSuccess, isError } = mutation

  const handleNavigateLogin= () => {
    navigate('/login')
  }

  useEffect(() => {
    if (isSuccess){
      Alert.success(successMessage)
      handleNavigateLogin()
    } 
  },[isSuccess, successMessage]);

  return (
    <div className='h-max w-[350px] bg-black border-none rounded-md flex flex-col gap-4 justify-center items-center px-6 '>
      <h1 className='text-white text-3xl font-bold mt-0'>Sign up</h1>
      <div className='flex items-center border-2 rounded-lg border-white px-2 bg-black w-full focus-within:border-purple-500 transition-all ease-in-out duration-500'>
        <FaRegUser className='text-white mr-2' />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          placeholder='Enter your email...'
          className='w-full h-10 placeholder:text-slate-400 text-white bg-black outline-none'
        />
      </div>
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
        <span className="text-red-500">{errorMessage}</span>
      )}
      <button onClick={handleSignup} className=' w-full h-max p-1 bg-gradient text-black rounded-lg font-semibold text-lg'>
        Register
      </button>
      <div className='flex justify-center items-center px-3 gap-2'>
        <div className='w-[130px] h-[1px] bg-gray-400'></div>
        <div className='text-gray-400'>Or</div>
        <div className='w-[130px] h-[1px] bg-gray-400'></div>
      </div>

      <button className='flex items-center bg-transparent border-2 rounded-lg border-white text-white w-full h-max p-2 gap-3 hover:border-blue-400 hover:bg-blue-400 transition-all ease-in-out duration-100'>
        <FaFacebook className='h-[25px] w-[25px]' />
        <span>Login with Facebook</span>
      </button>
      <button className='flex items-center bg-transparent border-2 rounded-lg border-white text-white w-full h-max p-2 gap-3  hover:border-red-500 hover:bg-red-500 transition-all ease-in-out duration-100'>
        <BiLogoGmail className='h-[25px] w-[25px]' />
        <span>Login with Gmail</span>
      </button>
    </div>
  );
};

export default SignUpForm;
