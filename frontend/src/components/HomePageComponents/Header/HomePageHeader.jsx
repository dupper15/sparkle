
const HomePageHeader = () => {
    return (
        <div className='flex items-center justify-between w-full h-[50px] px-5 py-8 bg-[#18191B]'>
            <div className='flex items-center justify-items-start gap-2'>
                <div className="w-[40px] h-[40px] bg-[url('./assets/logo.png')] bg-cover bg-center"/>
                <div className='text-3xl text-white font-bold'>Sparkle</div>
            </div>

            <div className='flex items-center justify-center gap-5 px-3 py-10'>
                <button
                    className='w-[120px] h-[40px] bg-gradient font-semibold rounded-lg shadow-sm cursor-pointer border-black flex justify-center items-center p-2'>
                    <span className='text-black'> Create a design</span>
                </button>
                <div className="rounded-full border-2 border-gray-200 bg-white p-2 h-[40px] w-[40px]">
                    <img className="object-cover w-full h-full rounded-full" src="assets/default-profile-icon.png" alt="Profile Image"/>
                </div>
            </div>
        </div>
    );
};

export default HomePageHeader