import testImage from "../../../assets/banner1.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useMutationHooks } from "../../../hooks/useMutationHook";
import * as ProjectService from '../../../services/ProjectService'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function CustomCarousel() {
  
  const user = useSelector((state) => state.user)
  console.log("user", user?.id)
  const navigate = useNavigate()

  const [projects, setProjects] = useState([])

  const mutation = useMutationHooks(async (data) => {
    try {
      const project_arr = await ProjectService.getAllProject(data); 
      setProjects(project_arr.data); 
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  });
  

  useEffect(() => {
    handleGetAllProject()
  }, [user])

  const handleGetAllProject = () => {
    mutation.mutate(user?.id)
  }

  const handleClick = (id) => {
    localStorage.setItem('projectId', id)
    navigate(`/${id}/edit`)
  }

  return (
    <Carousel
      customLeftArrow={<IoIosArrowDropleft className='left-arrow' />}
      customRightArrow={<IoIosArrowDropright className='right-arrow' />}
      responsive={responsive}
      swipeable={false}
      draggable={false}
      infinite={false}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      transitionDuration={500}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      itemClass='p-4 flex gap-4'>
      {projects.length === 0 ? (
            <div className="flex justify-center items-center h-full w-full text-gray-500 text-center">
               There are no projects to display.
            </div>
        ) : (
      projects.slice().reverse().map((project, index) => (
        <div key={project._id} id={project?._id} onClick={() => handleClick(project._id)} className="cursor-pointer" >
          <img
            className='bg-cover h-[200px] w-[420px]'
            src={
              project.canvasArray?.[0]?.background === '#ffffff' 
                ? testImage 
                : project.canvasArray?.[0]?.background
            }
            alt={project.projectName || 'Project Image'}
          />
          <span>{project.projectName || 'Unnamed Project'}</span>
        </div>
        ))
      )}
    </Carousel>
  );
}

export default CustomCarousel;
