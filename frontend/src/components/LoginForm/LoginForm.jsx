const LoginForm = () => {
  return (
    <div className='h-max w-[350px] bg-black border-none rounded-md flex flex-col gap-5 justify-center items-center px-6 '>
      <h1 className='text-white text-3xl font-bold mt-0'>Login</h1>
      <input
        type='text'
        placeholder='Enter your email...'
        className='w-full h-12 placeholder:text-slate-400 text-white border-2 rounded-lg border-white p-4 bg-black'
      />
      <input
        type='password'
        placeholder='Enter your password...'
        className='w-full h-12 placeholder:text-slate-400 text-white border-2 rounded-lg border-white p-4 bg-black'
      />
      <button className=' w-full h-max p-1 bg-gradient text-black rounded-lg font-semibold text-lg'>
        Login
      </button>
      <div className='text-sm text-gray-100'>Or</div>
      <button className='bg-transparent border-2 rounded-lg border-white text-white w-full h-max p-1'>
        Log in with Google
      </button>
      <button className='bg-transparent border-2 rounded-lg border-white text-white w-full h-max p-1'>
        Log in with Facebook
      </button>
    </div>
  );
};

export default LoginForm;
