import LoginHeader from "../../components/LoginHeader/LoginHeader";
import { useNavigate } from "react-router-dom";
const HeroPage = () => {
  const navigate = useNavigate();

  const handleNavigateLogin = () => {
    navigate("./login");
  };

  const handleNavigateSignup = () => {
    navigate("./sign-up");
  };

  return (
    <div className="w-screen h-screen bg-no-repeat bg-cover bg-[url('./assets/bg-dm.png')] flex flex-col">
      <LoginHeader
        handleNavigateLogin={handleNavigateLogin}
        handleNavigateSignup={handleNavigateSignup}
      />
      <div className='px-20 flex flex-col justify-center items-start h-full gap-10'>
        <div className='text-4xl md:text-5xl text-white font-bold space md:leading-tight md:w-2/3'>
          Chào mừng đến với website
          <span className='gradient'> Sparkle</span> của chúng tôi <br />
          <span className='font-normal text-xl md:text-2xl leading-none'>
            Tạo thiết kế của riêng bạn ngay
          </span>
        </div>
        <button className='w-[170px] h-[60px] text-xl bg-gradient rounded-lg shadow-sm cursor-pointer font-bold text-white flex justify-center items-center p-2'>
          Get started <span className='text-3xl pb-1 pl-1'> →</span>
        </button>
      </div>
    </div>
  );
};

export default HeroPage;
