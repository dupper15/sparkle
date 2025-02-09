import Header from '../../components/SharedComponents/Header/Header.jsx';
import Footer from '../../components/SharedComponents/Footer/Footer.jsx';
import SettingSideBar from '../../components/SettingSideBar/SettingSideBar.jsx';
import { useDarkMode } from '../../contexts/DarkModeContext.jsx';

const SettingPage = () => {
	const { toggleDarkMode } = useDarkMode();

	return (
		<div className='flex flex-col h-screen overflow-y-auto w-screen bg-white transition-colors duration-500 dark:bg-black'>
			<header>
				<Header className='fixed top-0 left-0 w-full z-50' />
			</header>
			<div className='flex w-screen h-screen'>
				{/* Sidebar */}
				<div className='w-[70px] md:w-[90px] h-full transition-colors duration-500 bg-white dark:bg-black shadow-md'>
					<SettingSideBar />
				</div>

				{/* Main Content */}
				<div className='flex flex-col flex-grow px-8 py-6 w-full transition-colors duration-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-black overflow-y-auto gap-6'>
					{/* Title */}
					<h1 className='text-2xl md:text-4xl font-bold'>Settings</h1>

					{/* Dark Mode Toggle */}
					<div className='flex items-center justify-between w-full p-4 border transition-colors duration-500 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black shadow-sm'>
						<div>
							<p className='text-lg font-semibold text-black dark:text-white'>Dark Mode</p>
							<p className='text-sm text-gray-600 dark:text-gray-400'>Adjust the appearance to reduce eye strain.</p>
						</div>
						<button
							onClick={toggleDarkMode}
							className='relative flex items-center min-w-16 ml-1 h-8 rounded-full transition-all duration-500 bg-gray-300 dark:bg-gray-600'
						>
							<span className='absolute top-1 left-1 min-w-6 h-6 rounded-full bg-white transition-all duration-500 dark:left-auto dark:right-1' />
						</button>
					</div>
				</div>
			</div>

			<div className=''>
				<Footer />
			</div>
		</div>
	);
};

export default SettingPage;
