import testImage from "../../../assets/banner1.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useMutationHooks } from "../../../hooks/useMutationHook";
import * as ProjectService from "../../../services/ProjectService";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";
import * as Alert from "../../Alert/Alert";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
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

function CustomCarousel({ onDelete }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [option, setOption] = useState(false);
  const [renameId, setRenameId] = useState(null);
  const [newProjectName, setNewProjectName] = useState("");
  const inputRef = useRef(null);

  const mutation = useMutationHooks(async (data) => {
    try {
      const project_arr = await ProjectService.getAllProject(data);
      setProjects(project_arr.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  });

  const mutationRename = useMutationHooks(async (data) => {
    try {
      const id = data.projectId;
      const projectName = data.newProjectName;
      const result = await ProjectService.renameProject(id, projectName);
      return result; // Trả về kết quả từ API
    } catch (error) {
      console.error("Error renaming project:", error);
      throw error; // Quăng lỗi để mutation xử lý
    }
  });

  useEffect(() => {
    handleGetAllProject();
  }, [user, onDelete]);

  const handleGetAllProject = () => {
    mutation.mutate(user?.id);
  };

  const handleClick = (id) => {
    localStorage.setItem("projectId", id);
    navigate(`/${id}/edit`);
  };

  const handleRename = (id) => {
    const project = projects.find((p) => p._id === id);
    setRenameId(id);
    setNewProjectName(project?.projectName || "");
    setTimeout(() => {
      inputRef.current?.focus(); // Focus vào ô input sau khi render
    }, 0);
  };

  const handleSaveRename = async (projectId) => {
    try {
      mutationRename.mutate({
        projectId,
        newProjectName,
      });
      // Cập nhật danh sách project sau khi gọi API thành công
      const updatedProjects = projects.map((project) =>
        project._id === projectId
          ? { ...project, projectName: newProjectName }
          : project
      );
      setProjects(updatedProjects);
      setRenameId(null); // Đóng chế độ rename
      Alert.success("Rename project successfully");
    } catch (error) {
      console.error("Error saving renamed project:", error);
      // Bạn có thể thêm logic hiển thị thông báo lỗi ở đây
    }
  };

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
      itemClass='py-4 px-12 flex gap-4'>
      {projects.length === 0 ? (
        <div className='flex justify-center items-center h-full w-full text-gray-500 text-center'>
          There are no projects to display.
        </div>
      ) : (
        projects
          .slice()
          .reverse()
          .map((project, index) => (
            <div
              key={project._id}
              id={project?._id}
              onClick={(e) => {
                e.stopPropagation();
                handleClick(project._id);
              }}
              onMouseEnter={(e) => {
                e.stopPropagation();
                setHoveredProjectId(project._id);
              }}
              onMouseLeave={(e) => {
                e.stopPropagation();
                if (option) {
                  setOption(false);
                }
                setHoveredProjectId(null);
              }}
              className='cursor-pointer group'>
              <div
                className="relative bg-cover h-[200px] w-[300px] overflow-hidden border transition-transform transform hover:scale-105" // Div chứa background và các component
                style={{
                  backgroundImage:
                    project.canvasArray?.[0]?.background === "#ffffff"
                      ? "none" // Không hiển thị hình ảnh nền
                      : `url(${project.canvasArray?.[0]?.background})`,
                  backgroundColor:
                    project.canvasArray?.[0]?.background === "#ffffff"
                      ? "#ffffff" // Hiển thị màu trắng
                      : "transparent", // Màu nền trong suốt nếu có hình ảnh nền
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}>
                {project.canvasArray?.[0]?.componentArray?.map(
                  (component, index) => {
                    const getShapeStyle = (shapeType) => {
                      switch (shapeType) {
                        case "circle":
                          return {
                            borderRadius: "50%", // Tạo hình tròn
                          };
                        case "triangle":
                          return {
                            clipPath: "polygon(50% 0, 100% 100%, 0 100%)", // Hình tam giác
                          };
                        case "invertedTriangle":
                          return {
                            clipPath: "polygon(50% 100%, 0 0, 100% 0)", // Hình tam giác ngược
                          };
                        case "pentagon":
                          return {
                            clipPath:
                              "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)", // Hình ngũ giác
                          };
                        case "hexagon":
                          return {
                            clipPath:
                              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", // Hình lục giác
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
                        case "rect":
                          return {}; // Hình chữ nhật (mặc định không cần clipPath)
                        default:
                          return {};
                      }
                    };

                    const shapeStyle = getShapeStyle(component.shapeType);

                    const scaleX = 300 / project.width;
                    const scaleY = 200 / project.height;

                    const widthComponent = component.width * scaleX;
                    const heightComponent = component.height * scaleY;
                    const topComponent = component.y * scaleY;
                    const leftComponent = component.x * scaleX;

                    return (
                      <>
                        {/* Xử lý Text */}
                        {component.type === "Text" && component.content && (
                          <div
                            key={index}
                            style={{
                              position: "absolute",
                              top: topComponent,
                              left: leftComponent,
                              width: Math.max(widthComponent, 50),
                              height: Math.max(heightComponent, 20),
                              transform: `rotate(${component.rotate || 0}deg)`,
                              transformOrigin: "center",
                              color: component.color || "black",
                              fontSize: Math.max(
                                component.fontSize * scaleY,
                                12
                              ),
                              fontFamily: component.fontFamily || "Arial",
                              fontStyle: component.fontStyle || "normal",
                              fontWeight: component.fontWeight || "normal",
                              textDecoration:
                                component.textDecorationLine || "none",
                              textAlign: component.textAlign || "left",
                              whiteSpace: "pre-wrap",
                            }}>
                            {component.content}
                          </div>
                        )}

                        {/* Xử lý Image */}
                        {component.type === "Image" && component.image && (
                          <img
                            key={index}
                            src={component.image}
                            alt=''
                            style={{
                              position: "absolute",
                              top: topComponent,
                              left: leftComponent,
                              width: widthComponent,
                              height: heightComponent,
                              transform: `rotate(${component.rotate || 0}deg)`,
                              transformOrigin: "center",
                              opacity: component.opacity || 1,
                              objectFit: "contain",
                            }}
                          />
                        )}

                        {/* Xử lý Shape */}
                        {component.type === "Shape" && (
                          <div
                            key={index}
                            style={{
                              position: "absolute",
                              top: topComponent,
                              left: leftComponent,
                              width: widthComponent,
                              height: heightComponent,
                              transform: `rotate(${component.rotate || 0}deg)`,
                              transformOrigin: "center",
                              backgroundColor: component.color || "transparent",
                              ...shapeStyle,
                            }}></div>
                        )}
                      </>
                    );
                  }
                )}
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setOption(!option);
                }}
                className='absolute top-6 right-10 hidden group-hover:flex justify-between border p-1 bg-white rounded shadow'>
                <SlOptionsVertical className='text-black' />
              </div>
              {option && hoveredProjectId === project._id && (
                <div className='absolute top-6 right-10 bg-white dark:bg-gray-700 p-2 rounded shadow'>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRename(project._id);
                    }}
                    className='block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100 dark:text-white dark:hover:bg-gray-400'>
                    <span>Rename</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(project._id);
                    }}
                    className='block px-4 py-2 text-sm text-red-600 hover:bg-red-100'>
                    <span>Delete</span>
                  </button>
                </div>
              )}
              {renameId === project._id ? (
                <div className='p-2 flex flex-row'>
                  <input
                    type='text'
                    ref={inputRef} // Gán input với useRef
                    value={newProjectName}
                    onChange={(e) => {
                      e.stopPropagation();
                      setNewProjectName(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.stopPropagation();
                        handleSaveRename(project._id); // Gọi hàm rename khi nhấn Enter
                      }
                    }}
                    className='border rounded w-full px-2 py-1'
                  />
                </div>
              ) : (
                <span>{project.projectName || "Unnamed Project"}</span>
              )}
            </div>
          ))
      )}
    </Carousel>
  );
}

export default CustomCarousel;
