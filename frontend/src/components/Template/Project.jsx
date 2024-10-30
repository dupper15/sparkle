import { Link } from "react-router-dom";
import v from "../../assets/logo.png";
const Project = () => {
  return (
    <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide w-full'>
      <div className='grid grid-cols-2 gap-2 mt-5 w-full'>
        {[1, 2, 3, 4, 5, 6].map((img, i) => (
          <div
            to='/your-path'
            key={i}
            className='w-full h-[90px] overflow-hidden rounded-sm cursor-pointer'>
            <img className='w-full h-full object-fill' src={v} alt='' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
