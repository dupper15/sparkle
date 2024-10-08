import { useState, useRef, useEffect } from "react";
import LoginHeader from "../../components/LoginHeader/LoginHeader";
import LoginForm from "../../components/LoginForm/LoginForm";
const LoginPage = () => {
  const [show, setShow] = useState(false);
  const loginFormRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        loginFormRef.current &&
        !loginFormRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [loginFormRef]);
  return (
    <div className="w-screen h-screen bg-no-repeat bg-cover bg-[url('./assets/bg-dm.png')] flex flex-col">
      <LoginHeader />
      <div className='px-20 flex flex-col justify-center items-start h-full gap-10'>
        <div className='text-5xl text-white font-bold'>
          Chào mừng đến với website <br />
          <span className='gradient'>Sparkle</span> của chúng tôi <br />
          <span className='font-normal text-2xl'>
            Tạo thiết kế của riêng bạn ngay
          </span>
        </div>
        <button
          onClick={() => setShow(true)}
          className='w-[170px] h-[60px] text-xl bg-gradient rounded-lg shadow-sm cursor-pointer font-bold text-white flex justify-center items-center p-2'>
          Get started <span className='text-3xl pb-1 pl-1'> →</span>
        </button>
        {show && (
          <div className='fixed inset-0 w-full h-full z-10 flex justify-center items-center'>
            <div
              className='absolute inset-0 bg-black opacity-70'
              onClick={() => setShow(false)}></div>
            <div
              className='relative bg-black w-fit h-fit p-6 rounded-2xl'
              ref={loginFormRef}
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
