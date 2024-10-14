import UITLogo from '../../../assets/uit_logo.png'
import {FaFacebookSquare, FaYoutubeSquare} from "react-icons/fa";
import {FaSquareXTwitter} from "react-icons/fa6";

const HomePageFooter = () => {
    return (
        <div className='flex flex-col'>
            <div className='pt-4 pb-4 flex flex-row w-full justify-between'>
                <div className='flex flex-row'>
                    <img className='mt-auto mb-auto ml-8 w-[80x] h-[80px]' src={UITLogo} alt='UIT Logo'/>
                    <div className='mt-auto mb-auto ml-8'>
                        <p className='text-sm'>SE100</p>
                        <p className='font-bold'>University of Information Technology</p>
                    </div>
                </div>
                <div className='mr-8'>
                    <p className='text-sm'>Group 1</p>
                    <div className='text-xs font-bold'>
                        <p>Phạm Trần Anh Nhật</p>
                        <p>Cao Dương Lâm</p>
                        <p>Nguyễn Lê Tuấn Nhật</p>
                        <p>Nguyễn Chí Nghĩa</p>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className='flex flex-row w-full justify-between'>
                <div className='flex flex-row text-xs font-bold'>
                    <a className='ml-8'>Welcome. All rights reserved.</a>
                    <a className='ml-8'>Privacy Policy</a>
                    <a className='ml-8'>Terms of Service</a>
                </div>
                <div className='flex flex-row mr-8'>
                    <FaSquareXTwitter/>
                    <FaFacebookSquare/>
                    <FaYoutubeSquare/>
                </div>
            </div>
        </div>
    )
}

export default HomePageFooter