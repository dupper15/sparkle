import LoginHeader from "../../components/LoginHeader/LoginHeader";
import { useNavigate } from "react-router-dom";
import l from "../../assets/hero.png";
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
      <div className='px-6 md:px-16 flex flex-col md:flex-row justify-center items-center h-full'>
        <div className='flex flex-col  text-center md:text-left md:w-2/3'>
          <div className='text-4xl md:text-5xl text-white font-bold leading-tight mb-6'>
            Welcome to
          </div>
          <div className='text-4xl md:text-5xl text-white font-bold leading-tight'>
            our website
            <span className='gradient'> Sparkle</span> <br />
            <span className='font-normal text-xl md:text-2xl leading-none'>
              Make your design now
            </span>
          </div>
          <button
            onClick={() => {
              handleNavigateLogin();
            }}
            className='w-[160px] md:w-[180px] h-[60px] text-xl bg-gradient rounded-lg shadow-lg hover:shadow-xl cursor-pointer font-bold text-white flex justify-center items-center p-2 mt-6 mx-auto md:mx-0'>
            Get started <span className='text-3xl pb-1 pl-1'> →</span>
          </button>
        </div>
        <div className='hidden md:block mt-10 md:mt-0'>
          <img
            src={l}
            className='h-auto mb-10 max-w-xs md:max-w-md lg:max-w-lg'
            alt='Design illustration'
          />
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
