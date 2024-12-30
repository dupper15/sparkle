import { useEffect, useState } from "react";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as ProjectService from "../../services/ProjectService";
import { useSelector } from "react-redux";

const Project = ({ addProjectFromWorkplace }) => {
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project);
  const [projects, setProjects] = useState([]);

  const mutation = useMutationHooks(async (data) => {
    try {
      const project_arr = await ProjectService.getAllProject(data);
      setProjects(project_arr.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  });

  useEffect(() => {
    if (project?.id) {
      handleGetAllProject();
    }
  }, [addProjectFromWorkplace]);

  const handleGetAllProject = () => {
    mutation.mutate(user?.id);
  };

  const handleProjectClick = (projectId) => {
    const selectedProject = projects.find(
      (project) => project._id === projectId
    );
    if (selectedProject) {
      addProjectFromWorkplace(selectedProject);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 mt-5 w-full max-h-[600px] overflow-auto scrollbar-hide">
      {projects
        .slice()
        .reverse()
        .map((project, index) => (
          <div
            key={project._id}
            id={project?._id}
            onClick={() => handleProjectClick(project._id)}
            className="cursor-pointer">
            <div
              className="w-[140px] h-[100px] relative bg-cover overflow-hidden border"
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

                  const scaleX = 140 / project.width;
                  const scaleY = 100 / project.height;

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
                            fontSize: Math.max(component.fontSize * scaleY, 12),
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
                          alt=""
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
            <span>{project.projectName || "Unnamed Project"}</span>
          </div>
        ))}
    </div>
  );
};

export default Project;
