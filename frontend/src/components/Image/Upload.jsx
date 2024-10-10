import Image from "./Image";

const UploadImage = () => {
    return(
        <div>
            <div className='w-full h-[40px] flex justify-center items-center bg-purple-500 rounded-md text-white mb-3'>
                <label className='text-center cursor-pointer' htmlFor="image">Upload Image</label>
                <input type="file" id="image" className='hidden'></input>
            </div>
            <div className='h-[88vh] overflow-x-auto flex justify-start items-start w-full'>
                <Image/>
            </div>
        </div>
    );
};

export default UploadImage;