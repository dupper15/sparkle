import LoginHeader from "../../components/LoginHeader/LoginHeader";
const LoginPage = () => {
  return (
    <div className="w-screen h-screen bg-no-repeat bg-cover bg-[url('./assets/bg-dm.png')] flex flex-col">
      <LoginHeader />

      <div className='px-20 flex flex-col justify-center items-start h-full gap-10'>
        <div className='text-4xl text-white font-bold'>
          Chào mừng đến với website <br />
          <span className='gradient'>Sparkle</span> của chúng tôi <br />
          <span className='font-normal text-2xl'>
            Tạo thiết kế của riêng bạn ngay
          </span>
        </div>
        <button className='w-[150px] h-[60px] bg-gradient rounded-lg shadow-sm cursor-pointer font-semibold text-white flex justify-center items-center p-2'>
          Get started →
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
