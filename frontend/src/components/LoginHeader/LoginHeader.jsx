/* eslint-disable react/prop-types */
const LoginHeader = ({ handleNavigateLogin, handleNavigateSignup }) => {
	return (
		<div className='flex items-center justify-between w-full h-[50px] px-6 md:pl-16 py-8'>
			<div className='flex items-center justify-items-start gap-2'>
				<div className="w-[40px] h-[40px] bg-[url('./assets/logo.png')] bg-cover bg-center" />
				<div className='text-4xl gradient font-bold'>Sparkle</div>
			</div>
			<ul className='hidden md:flex md:items-center md:justify-end md:gap-8 md:text-xl md:text-white md:font-medium md:pr-16 py-8'>
				<li>
					<a href='#'>
						<span className='text-blue-300 hover:text-blue-900'>Home</span>
					</a>
				</li>
				<li>
					<a href='#' className=' relative group hover:text-gray-200 duration-500 gap-1'>
						<span className='pb-1'>Introduce</span>
						<span className='absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-purple-900 to-blue-500 transition-all duration-500 group-hover:w-full transform translate-y-1'></span>
					</a>
				</li>
				<li>
					<a href='#' className='relative group hover:text-gray-400 duration-500 gap-1'>
						<span>Service</span>
						<span className='absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-purple-900 to-blue-500 transition-all duration-500 group-hover:w-full transform translate-y-1'></span>
					</a>
				</li>
				<li>
					<a href='#' className='relative group hover:text-gray-400 duration-500 gap-1'>
						<span>Contact</span>
						<span className='absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-purple-900 to-blue-500 transition-all duration-500 group-hover:w-full transform translate-y-1'></span>
					</a>
				</li>
			</ul>
		</div>
	);
};

export default LoginHeader;
