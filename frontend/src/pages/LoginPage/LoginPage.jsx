import { useState } from "react";
import LoginHeader from "../../components/LoginHeader/LoginHeader";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
const LoginPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  return (
    <div className="w-screen h-screen bg-no-repeat bg-cover bg-[url('./assets/bg-dm.png')] flex flex-col">
      <LoginHeader
        loginButtonClick={() => setShowLoginForm(true)}
        signUpButtonClick={() => setShowSignUpForm(true)}
      />
      <div className='px-20 flex flex-col justify-center items-start h-full gap-10'>
        <div className='text-5xl text-white font-bold'>
          Chào mừng đến với website <br />
          <span className='gradient'>Sparkle</span> của chúng tôi <br />
          <span className='font-normal text-2xl'>
            Tạo thiết kế của riêng bạn ngay
          </span>
        </div>
        <button
          onClick={() => setShowLoginForm(true)}
          className='w-[170px] h-[60px] text-xl bg-gradient rounded-lg shadow-sm cursor-pointer font-bold text-white flex justify-center items-center p-2'>
          Get started <span className='text-3xl pb-1 pl-1'> →</span>
        </button>
        {showSignUpForm && (
          <div className='fixed inset-0 w-full h-full z-10 flex justify-center items-center'>
            <div
              className='absolute inset-0 bg-black opacity-70'
              onClick={() => setShowSignUpForm(false)}></div>
            <div
              className='relative bg-black w-fit h-fit p-6 rounded-2xl'
              onClick={(e) => e.stopPropagation()}>
              <SignUpForm />
            </div>
          </div>
        )}
        ,
        {showLoginForm && (
          <div className='fixed inset-0 w-full h-full z-10 flex justify-center items-center transition-transform duration-300'>
            <div
              className='absolute inset-0 bg-black opacity-70'
              onClick={() => setShowLoginForm(false)}></div>
            <div
              className='relative bg-black w-fit h-fit p-6 rounded-2xl'
              onClick={(e) => e.stopPropagation()}>
              <LoginForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
