const Shape = () => {
    return(
        <div className='grid grid-cols-3 gap-2'>
                        <div className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
                        <div className='h-[90px] bg-[#3c3c3d] cursor-pointer rounded-full'></div>
                        <div style={{clipPath: 'polygon(50% 0,100% 100%, 0 100%)'}} className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
                        <div style={{clipPath: 'polygon(50% 100%, 0 0, 100% 0)'}} className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
                        <div style={{clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'}} className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
                        <div style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}} className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
                        <div style={{clipPath: 'polygon(50% 0%, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%, 0% 50%, 15% 15%)'}} className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
                        <div style={{clipPath: 'polygon(50% 0%, 100% 50%, 75% 50%, 75% 100%, 25% 100%, 25% 50%, 0% 50%)'}} className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
                        <div style={{clipPath: 'polygon(50% 100%, 100% 50%, 75% 50%, 75% 0%, 25% 0%, 25% 50%, 0% 50%)'}} className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
                        <div style={{clipPath: 'polygon(0% 50%, 50% 0%, 50% 25%, 100% 25%, 100% 75%, 50% 75%, 50% 100%)'}} className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
                        <div style={{clipPath: 'polygon(100% 50%, 50% 0%, 50% 25%, 0% 25%, 0% 75%, 50% 75%, 50% 100%)'}} className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
                        
        </div>
    );
};

export default Shape;