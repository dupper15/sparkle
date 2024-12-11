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
      customLeftArrow={<IoIosArrowDropleft className='left-arrow ' />}
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
            <div
              className="relative bg-cover h-[200px] w-[420px] overflow-hidden border " // Div chứa background và các component
              style={{
                backgroundImage: project.canvasArray?.[0]?.background === '#ffffff' 
                  ? 'none' // Không hiển thị hình ảnh nền
                  : `url(${project.canvasArray?.[0]?.background})`,
                backgroundColor: project.canvasArray?.[0]?.background === '#ffffff' 
                  ? '#ffffff' // Hiển thị màu trắng
                  : 'transparent', // Màu nền trong suốt nếu có hình ảnh nền
                backgroundSize: "100% 100%",
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              {project.canvasArray?.[0]?.componentArray?.map((component, index) => {
                const getShapeStyle = (shapeType) => {
                  switch (shapeType) {
                    case 'circle':
                      return {
                        borderRadius: '50%',  // Tạo hình tròn
                      };
                    case 'triangle':
                      return {
                        clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',  // Hình tam giác
                      };
                    case 'invertedTriangle':
                      return {
                        clipPath: 'polygon(50% 100%, 0 0, 100% 0)',  // Hình tam giác ngược
                      };
                    case 'pentagon':
                      return {
                        clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',  // Hình ngũ giác
                      };
                    case 'hexagon':
                      return {
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',  // Hình lục giác
                      };
                      case "octagon":
                        return {
                          clipPath:
                            "polygon(50% 0%, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%, 0% 50%, 15% 15%)",
                        }; // Hình bát giác
                      case "arrowUp":
                        return {
                          clipPath:
                            "polygon(50% 0%, 100% 50%, 75% 50%, 75% 100%, 25% 100%, 25% 50%, 0% 50%)",
                        }; // Mũi tên hướng lên
                      case "arrowDown":
                        return {
                          clipPath:
                            "polygon(50% 100%, 100% 50%, 75% 50%, 75% 0%, 25% 0%, 25% 50%, 0% 50%)",
                        }; // Mũi tên hướng xuống
                      case "arrowRight":
                        return {
                          clipPath:
                            "polygon(0% 50%, 50% 0%, 50% 25%, 100% 25%, 100% 75%, 50% 75%, 50% 100%)",
                        }; // Mũi tên hướng phải
                      case "arrowLeft":
                        return {
                          clipPath:
                            "polygon(100% 50%, 50% 0%, 50% 25%, 0% 25%, 0% 75%, 50% 75%, 50% 100%)",
                        }; // Mũi tên hướng trái
                    case 'rect':
                      return {};  // Hình chữ nhật (mặc định không cần clipPath)
                    default:
                      return {};
                  }
                };
              
                const shapeStyle = getShapeStyle(component.shapeType);

                const scaleX = 420/project.width;
                const scaleY = 200/project.height;

                const widthComponent = component.width * scaleX;
                const heightComponent = component.height * scaleY;
                const topComponent = component.y * scaleY;
                const leftComponent = component.x * scaleX;
              
                return (
                  <div
                    key={index}
                    style={{
                      position: 'absolute', 
                      top: topComponent,
                      left: leftComponent,
                      width: widthComponent,
                      height: heightComponent,
                      backgroundColor: component.color || 'transparent',
                      ...shapeStyle,  // Áp dụng kiểu dáng cho hình
                    }}
                  />
                );
              })}
            </div>
            <span>{project.projectName || 'Unnamed Project'}</span>
          </div>
          ))
        )}
    </Carousel>
  );
}

export default CustomCarousel;
