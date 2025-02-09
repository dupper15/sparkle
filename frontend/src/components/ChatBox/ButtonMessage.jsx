import React from 'react';
import { MdOutlineMail } from 'react-icons/md';

const ButtonMessage = ({ toggleChatBox }) => {
	return (
		<div
			className='flex flex-col w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] bg-[#4335DE] fixed bottom-3 right-3 rounded-full justify-center items-center cursor-pointer hover:bg-[#6055da]'
			onClick={toggleChatBox}
		>
			<button className='text-white text-3xl'>
				<MdOutlineMail />
			</button>
		</div>
	);
};

export default ButtonMessage;
