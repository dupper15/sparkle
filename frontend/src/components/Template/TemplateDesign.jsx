import { useEffect, useState } from "react";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as ProjectService from "../../services/ProjectService";
import { useSelector } from "react-redux";

const TemplateDesign = ({ addCanvasFromTemplate }) => {
  const [projects, setProjects] = useState([]);
  const project = useSelector((state) => state.project);
  const [renderKey, setRenderKey] = useState(0);

  const mutation = useMutationHooks(async () => {
    try {
      const response = await ProjectService.getPublic();
      if (response?.status === "OK" && Array.isArray(response.data)) {
        setProjects(response.data); // Đặt vào projects
        setRenderKey((prev) => prev + 1);
        console.log("Projects fetched successfully:", response.data);
      } else {
        setProjects([]); // Nếu không phải mảng, đặt mảng rỗng
        console.warn("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  });

  const handleGetAllProject = () => {
    mutation.mutate();
  };

  useEffect(() => {
    if (project?.id) {
      setRenderKey((prev) => prev + 1);
      handleGetAllProject();
    }
  }, [project.id]);

  useEffect(() => {
    mutation.mutate();
  }, [addCanvasFromTemplate]);

  const handleTemplateClick = (projectId, canvasIndex) => {
    const selectedCanvas = projects.find((project) => project._id === projectId)
      ?.canvasArray[canvasIndex];
    if (selectedCanvas) {
      addCanvasFromTemplate(selectedCanvas);
    }
  };

  useEffect(() => {
    if (project?.id) {
      handleGetAllProject();
    }
  }, [project]);

  return (
    <div
      key={renderKey}
      className='grid grid-cols-2 gap-2 mt-5 w-full max-h-[600px] overflow-auto scrollbar-hide'>
      {projects
        .slice()
        .reverse()
        .flatMap((project, projectIndex) =>
          project.canvasArray?.map((canvas, canvasIndex) => (
            <div
              key={`${project?._id}-${canvasIndex}`}
              onClick={() => handleTemplateClick(project?._id, canvasIndex)}
              className='bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 cursor-pointer' // Tạo hiệu ứng cho từng canvas
            >
              <div
                className='w-[140px] h-[100px] relative bg-cover overflow-hidden border'
                style={{
                  backgroundImage:
                    canvas.background === "#ffffff"
                      ? "none"
                      : `url(${canvas.background})`,
                  backgroundColor:
                    canvas.background === "#ffffff" ? "#ffffff" : "transparent",
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}>
                {/* Hiển thị tất cả các component trên canvas */}
                {canvas.componentArray?.map((component, index) => {
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
                            width: widthComponent,
                            height: heightComponent,
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
                })}
              </div>
            </div>
          ))
        )}
    </div>
  );
};

export default TemplateDesign;
