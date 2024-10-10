const Image = () => {
    return(
        <div className='grid grid-cols-2 gap-2 w-full'>
            {
                [1,2,3,4,5,6].map((img, i) => <div key={i} className='w-full h-[90px] overflow-hidden rounded-md cursor-pointer'>
                    <img className='w-full h-full' src="./assets/bg-dm.png" alt=""></img>
                </div>
                )
            }
        </div>
    );
};

export default Image;