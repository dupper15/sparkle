const LoginHeader = () => {
  return (
    <div className='flex items-center justify-between w-full h-[50px] px-5 py-8'>
      <div className='flex items-center justify-items-start gap-2'>
        <div className="w-[40px] h-[40px] bg-[url('./assets/logo.png')] bg-cover bg-center" />
        <div className='text-3xl text-white font-bold'>Sparkle</div>
      </div>
      <ul className='flex items-center justify-end gap-8 text-lg text-custom-blue font-medium '>
        <li>
          <a href='#'>
            <span className='text-white underline'>Home</span>
          </a>
        </li>
        <li>
          <a href='#'>Introduce</a>
        </li>
        <li>
          <a href='#'>Service</a>
        </li>
        <li>
          <a href='#'>Contact</a>
        </li>
      </ul>
      <div className='flex items-center justify-center gap-5 px-3 py-10'>
        <button className='w-[80px] h-[40px] bg-black font-semibold rounded-lg shadow-sm cursor-pointer border-black flex justify-center items-center p-2'>
          <span className='gradient'> Login</span>
        </button>
        <button className='w-[80px] h-[40px] bg-transparent font-semibold rounded-lg border-2 border-black shadow-sm cursor-pointer text-black flex justify-center items-center p-2'>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default LoginHeader;
