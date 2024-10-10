/* eslint-disable react/prop-types */
const LoginHeader = ({ loginButtonClick, signUpButtonClick }) => {
  return (
    <div className='flex items-center justify-between w-full h-[50px] px-5 py-8'>
      <div className='flex items-center justify-items-start gap-2'>
        <div className="w-[40px] h-[40px] bg-[url('./assets/logo.png')] bg-cover bg-center" />
        <div className='text-3xl text-white font-bold'>Sparkle</div>
      </div>
      <ul className='flex items-center justify-end gap-8 text-lg text-white font-medium '>
        <li>
          <a href='#'>
            <span className='text-blue-300 hover:text-blue-900'>Home</span>
          </a>
        </li>
        <li>
          <a
            href='#'
            className=' relative group hover:text-gray-200 duration-500 gap-1'>
            <span className='pb-1'>Introduce</span>
            <span className='absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-purple-900 to-blue-500 transition-all duration-500 group-hover:w-full transform translate-y-1'></span>
          </a>
        </li>
        <li>
          <a
            href='#'
            className='relative group hover:text-gray-400 duration-500 gap-1'>
            <span>Service</span>
            <span className='absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-purple-900 to-blue-500 transition-all duration-500 group-hover:w-full transform translate-y-1'></span>
          </a>
        </li>
        <li>
          <a
            href='#'
            className='relative group hover:text-gray-400 duration-500 gap-1'>
            <span>Contact</span>
            <span className='absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-purple-900 to-blue-500 transition-all duration-500 group-hover:w-full transform translate-y-1'></span>
          </a>
        </li>
      </ul>
      <div className='flex items-center justify-center gap-5 px-3 py-10'>
        <button
          onClick={loginButtonClick}
          className='w-[80px] h-[40px] bg-black font-semibold rounded-lg shadow-sm cursor-pointer border-black flex justify-center items-center p-2 transition-all hover:bg-white duration-500'>
          <span className='gradient'> Login</span>
        </button>
        <button
          onClick={signUpButtonClick}
          className='w-[80px] h-[40px] bg-transparent font-semibold rounded-lg border-2 border-black shadow-sm cursor-pointer text-black flex justify-center items-center p-2 transition-all hover:bg-gray-200 duration-500 hover:border-gray-200'>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default LoginHeader;
