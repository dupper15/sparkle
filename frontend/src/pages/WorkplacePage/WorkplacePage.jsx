import React, {useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import WorkplaceHeader from "../../components/WorkplaceHeader/WorkplaceHeader";
import {LuFolder, LuImage, LuLayoutTemplate, LuShapes,} from "react-icons/lu";
import {RiText} from "react-icons/ri";
import {RxTransparencyGrid} from "react-icons/rx";
import {MdKeyboardArrowLeft} from "react-icons/md";
import TemplateDesign from "../../components/Template/TemplateDesign";
import Project from "../../components/Template/Project";
import Image from "../../components/Image/Image";
import Shape from "../../components/Shape/Shape";
import AddPageButton from "./../../components/Button/AddPageButton";
import Page from "./../../components/Page/Page";
import Background from "../../components/Background/Background";
import ChatBox from "../../components/ChatBox/ChatBox";
import ButtonMessage from "../../components/ChatBox/ButtonMessage";
import ImageToolbar from "../../components/SharedComponents/ToolBars/ImageToolBar.jsx";
import TextToolbar from "../../components/SharedComponents/ToolBars/TextToolBar.jsx";
import {DndContext} from "@dnd-kit/core";
import Text from "../../components/Text/Text.jsx";
import {useDarkMode} from "../../contexts/DarkModeContext.jsx";
import * as ProjectService from '../../services/ProjectService.js'
import * as CanvasService from '../../services/CanvasService.js'
import {deleteCanvas} from '../../services/CanvasService.js'
import {useDispatch, useSelector} from "react-redux";
import {updateProject} from "../../redux/slides/projectSlide.js";
import * as Alert from '../../components/Alert/Alert.jsx'
import {useMutation} from "@tanstack/react-query";

const WorkplacePage = () => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const user = useSelector((state) => state.user);

  const { isDarkMode } = useDarkMode();
  const [state, setState] = useState("");
  const canvasRef = useRef([]);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const location = useLocation();
  const designData = location.state || {};

  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  useEffect(() => {
    setWidth(project?.width);
    setHeight(project?.height);
  }, [project]);

  const [current_canvas, setCurrentCanvas] = useState(project?.canvasArray[0]);

  const saveCanvasId = (canvasId) => {
    localStorage.setItem("canvasId", canvasId);
  };

  saveCanvasId(project?.canvasArray[current_canvas]);

  useEffect(() => {
    // Lấy id từ localStorage
    const storedProjectId = localStorage.getItem("projectId");

    if (storedProjectId) {
      const fetchProject = async () => {
        const res = await ProjectService.getDetailProject(storedProjectId);
        dispatch(updateProject(res.data)); // Cập nhật dữ liệu dự án vào Redux store
      };
      fetchProject();

      return () => {
        // Cleanup khi rời khỏi trang
        localStorage.removeItem("projectId");
      };
    }
  }, [dispatch]);

  const handleGetDetailProject = async (id) => {
    const res = await ProjectService.getDetailProject(id);
    localStorage.setItem("project", JSON.stringify(res?.data));
    dispatch(updateProject({ ...res?.data }));
  };

    useEffect(() => {
        if (project?.canvasArray) {
            const newCanvases = project.canvasArray.map((canvas, index) => ({
                ...canvas, id: canvas.id || index, name: canvas.name || `Canvas ${index + 1}`,
            }));
            setCanvases(newCanvases);
            setCurrentCanvas(newCanvases[0]?.id)
        }
    }, [project]);

  const mutation = useMutation({
    mutationFn: (data) => {
      console.log("data", data);
      return ProjectService.updateProject(data.id);
    },
    onSuccess: (data) => {
      dispatch(updateProject(data.data));
      handleGetDetailProject(data.data.id);
      console.log("Project updated successfully:", data);
    },
    onError: (error) => {
      console.error("Failed to update project:", error);
    },
  });

  const { data, isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess) {
      handleGetDetailProject(project?.id);
    }
  }, [isSuccess]);

    const scrollToCanvas = (index) => {
        if (index >= 0 && index < canvases.length) {
            if (canvasRef.current[index]) {
                canvasRef.current[index].scrollIntoView({
                    behavior: "smooth", block: "start",
                });
            }
            setCurrentCanvas(canvases[index].id);
        }
    };

  const [canvases, setCanvases] = useState([]);
  const [backgrounds, setBackgrounds] = useState({});

  useEffect(() => {
    if (project?.canvasArray) {
      const newCanvases = project?.canvasArray.map((canvas, index) => ({
        ...canvas,  
        id: canvas.id || canvas._id,  
        name: canvas.name || `Page ${index + 1}`,
        background: canvas.background || "white",
      }));
      setCanvases(newCanvases);
      setCurrentCanvas(newCanvases[0]?.id)
    }
  }, [project]); 

  useEffect(() => {
    // Chỉ thực hiện cuộn khi pages đã thay đổi và có ít nhất một trang
    if (canvases.length > 0) {
      const lastPageIndex = canvases.length - 1;
      canvasRef.current[lastPageIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [canvases]);

  const addCanvas = async () => {
    try {
      await mutation.mutateAsync({ id: project?.id });
      // Cập nhật lại pages (local state)
      setCanvases((prev) => {
        const newCanvases = [...prev, project?.canvasArray]; // Thêm canvas mới vào list pages
        setCurrentCanvas(newCanvases[newCanvases.length - 1]?.id); // Chuyển đến trang mới

          setTimeout(() => {
              canvasRef.current[newCanvases.length - 1]?.scrollIntoView({
                  behavior: 'smooth', block: 'start',
              });
          }, 0);

        return newCanvases;
      });
  
      // Hiển thị thông báo thành công
      Alert.success("Add page successfully!");
    } catch (error) {
      console.error("Failed to add page:", error.message);
      Alert.error("Failed to add page.");
    }
  };
  
  const removeCanvas = async (id) => {
    try {
      console.log("id", id)
      if (project?.canvasArray?.length === 1) {
        Alert.error("Can not delete page!");
        return; 
      }
        await deleteCanvas(id, project?.id);

      setCanvases((prev) => {
        const newCanvases = prev.filter((canvas) => canvas.id !== id);

        const canvasIndex = prev.findIndex((canvas) => canvas.id === id);
        const nextCanvasIndex =
            canvasIndex < newCanvases.length ? canvasIndex : canvasIndex - 1;

        setCurrentCanvas(newCanvases[nextCanvasIndex]?.id || null);
        return newCanvases;
      });      
      Alert.success("Delete page successfully!")
    } catch (error) {
      console.error("Failed to delete canvas:", error.message);
      Alert.error("Failed to delete page.");
    }
  };

  const setBackground = async (bgLink) => {
    if (current_page !== null && current_page !== undefined) {
      try {
        // Cập nhật trạng thái tạm thời để UI phản hồi nhanh
        setBackgrounds((prev) => ({
          ...prev,
          [current_page]: bgLink || "white",
        }));

        // Gửi yêu cầu cập nhật lên server
        const data = { background: bgLink || "white" }; // Giả sử trường là `background`
        const canvasId = current_page
        if (!canvasId) {
          throw new Error("Canvas ID not found");
        }

        await CanvasService.updateCanvas(canvasId, data);
   
        const updatedProject = await ProjectService.getDetailProject(project?.id);

        if (updatedProject) {
         
          // Cập nhật lại backgrounds từ updatedProject
          const updatedBackgrounds = updatedProject.canvasArray.reduce(
            (acc, canvas) => ({
              ...acc,
              [canvas.id]: canvas.background || "white",
            }),
            {}
          );s
          setBackgrounds(updatedBackgrounds);
        }
    
        console.log("Canvas updated successfully");

      } catch (error) {
        console.error("Failed to update canvas:", error.message);
      }
    }
  };

  console.log('current page', current_page)

  const [components, setComponents] = useState([
    {
      name: "main_frame",
      type: "rect",
      id: Math.floor(Math.random() * 100 + 1),
      nameProject: state.nameProject,
      height: state.height,
      width: state.width,
      z_index: 1,
      color: "red",
      image: "",
      setCurrentComponent: (a) => setCurrentComponent(a),
    },
  ]);
  const add_text = () => {
    if (current_page === null) {
      console.log("ko");
      return;
    }

    const newItem = {
      id: Date.now(),
      nameProject: state.nameProject,
      name: "Sample Text",
      type: "text",
      x: 10,
      y: 10,
      font: 22,
      title: "Add Your Text",
      color: "#3c3c3d",
      testId: `drop-area-${current_page}`,
    };

    setShapes((prevShapes) => [...prevShapes, { ...newItem }]);
  };
  const [draggingShape, setDraggingShape] = useState(null);
  const [shapes, setShapes] = useState([]);

  const updateShapes = (newShape, testId) => {
    setShapes((prevShapes) => [...prevShapes, { ...newShape, testId }]);
  };
  const handleDragEnd = async (event) => {
    const { over, active } = event;
      if (!over) return;
    const shapeRect = active.rect.current.translated;
      const dropAreaRect = document
          .getElementById(over.id)
          .getBoundingClientRect();

    if (over && draggingShape) {
      const relativeX = shapeRect.left - dropAreaRect.left;
      const relativeY = shapeRect.top - dropAreaRect.top;

        const newShape = {
            shapeType: draggingShape.shapeType,
            link: draggingShape.backgroundImage
                ? draggingShape.backgroundImage
                : "", x: relativeX, y: relativeY, width: 90, height: 90,
        };

        try {
            const response = await createAndAddComponentToCanvas(canvases[extractIdFromOver(over.id)]._id, "Shape", newShape);
            newShape.id = response.data._id;

            // Notify the specific canvas to update its shapes
            document.dispatchEvent(new CustomEvent(`update-shapes-${over.id}`, {
                detail: newShape,
            }));
        } catch (error) {
            console.error("Failed to upload shape:", error);
        }
    }

  const [current_component, setCurrentComponent] = useState("");
  const [show, setShow] = useState({
    status: true,
    name: "",
  });


  const setElements = (type, name) => {
    setState(type);
    setShow({
      status: false,
      name,
    });
  };

  const createShape = (name, type) => {
    setPages((prevPages) =>
      prevPages.map((page) =>
        page.id === current_page
          ? {
              ...page,
              components: [
                ...page.components,
                {
                  id: Date.now(),
                  name,
                  type,
                  left: 10,
                  top: 10,
                  opacity: 1,
                  width: 100,
                  height: 100,
                  rotate: 0,
                  z_index: 2,
                  color: "blue",
                  ...(type === "circle" && { borderRadius: "50%" }),
                  ...(type === "triangle" && {
                    clipPath: "polygon(50% 0,100% 100%, 0 100%)",
                  }),
                },
              ],
            }
          : page
      )
    );
  };

  const removeElement = (id) => {
    setShapes((prevShapes) => prevShapes.filter((shape) => shape.id !== id));
    setPages((prevPages) =>
      prevPages.map((page) =>
        page.id === current_page
          ? {
              ...page,
              components: page.components.filter((c) => c.id !== id),
            }
          : page
      )
    );
  };

  const [showChatBox, setShowChatBox] = useState(false);

  const toggleChatBox = () => {
    setShowChatBox((prev) => !prev);
  };
      useEffect(() => {
          if (project?.id && user?.id) {
              socket.emit("setUserId", user.id);
              socket.emit("joinRoom", project.id);
              const handleUserInRoom = (usersInRoom) => {
                  setUsersInRoom(usersInRoom);
              };
              socket.on("userInRoom", handleUserInRoom);
              return () => {
                  socket.off("userInRoom", handleUserInRoom);
              };
          }
      }, [project?.id, user?.id]);
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        className={`w-screen h-screen bg-no-repeat bg-cover flex flex-col scrollbar-hide overflow-hidden ${
          isDarkMode ? "bg-[#151318]" : "bg-slate-300"
        }`}>
        <WorkplaceHeader />
        <div className="flex h-[calc(100%-60px)] w-screen scrollbar-hide">
          <div
            className={`w-[80px] z-50 scrollbar-hide h-full overflow-y-auto ${
              isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"
            }`}>
            {[
              { icon: <LuLayoutTemplate />, label: "Design", type: "design" },
              { icon: <LuShapes />, label: "Shape", type: "shape" },
              { icon: <LuFolder />, label: "Project", type: "project" },
              { icon: <RiText />, label: "Text", type: "text" },
              { icon: <LuImage />, label: "Image", type: "image" },
              {
                icon: <RxTransparencyGrid />,
                label: "Background",
                type: "background",
              },
            ].map(({ icon, label, type }) => (
              <div
                key={type}
                onClick={() => setElements(type, label.toLowerCase())}
                className={`${
                  show.name === label.toLowerCase()
                    ? isDarkMode
                      ? "bg-[#252627]"
                      : "bg-white"
                    : ""
                } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF]`}>
                <span className="text-2xl">{icon}</span>
                <span className="text-xs font-medium">{label}</span>
              </div>
            ))}
          </div>

          <div className="h-full w-[calc(100%-75px)]">
            <div
              className={`${
                show.status ? "py-5 -left-[350px]" : "px-8 left-[75px] py-5"
              } ${
                isDarkMode ? "bg-[#252627]" : "bg-white"
              } h-full fixed transition-all w-[350px] z-30 duration-500`}>
              <div
                onClick={() => setShow({ name: "", status: true })}
                className={`flex absolute justify-center items-center w-[20px] -right-2 top-[40%] cursor-pointer h-[100px] rounded-full ${
                  isDarkMode
                    ? "bg-[#252627] text-slate-700"
                    : "bg-white text-slate-300"
                }`}>
                <MdKeyboardArrowLeft />
              </div>
              {state === "design" && (
                <div className="grid grid-cols-2 gap-2">
                  <TemplateDesign />
                </div>
              )}
              {state === "shape" && (
                <Shape addNewShape={updateShapes} drag={setDraggingShape} />
              )}
              {state === "project" && <Project />}
              {state === "text" && <Text addNewText={add_text} />}
              {state === "image" && <Image drag={setDraggingShape} />}
              {state === "background" && (
                <Background setBackground={setBackground} />
              )}
            </div>
            <div className="flex flex-col items-center justify-start gap-8 m-8 overflow-y-auto h-[calc(100%-50px)] scrollbar-hide">
                {canvases.map((canvasData, index) => (
                  <div
                    onClick={() => {
                      if (current_page !== pageData.id) {
                        setCurrentPage(pageData.id);
                      }
                    }}>
                    <Page
                      key={pageData.id}
                      id={`drop-area-${pageData.id}`}
                      title={`${index + 1}`}
                      width={width}
                      height={height}
                      name={pageData.name}
                      shapes={shapes.filter(
                        (shape) => shape.testId === `drop-area-${pageData.id}`
                      )}
                      bgLink={
                        backgrounds[pageData.id] || pageData.background
                      }
                      removeElement={removeElement}
                      removeButton={() => removePage(pageData.id)}
                      upButton={() => scrollToPage(index - 1)}
                      downButton={() => scrollToPage(index + 1)}
                      ref={(el) => (pageRef.current[index] = el)}
                    />
                  </div>
                ))}
              <div>
                <AddPageButton addPage={addPage} />
              </div>
            </div>
          </div>
            <ButtonMessage toggleChatBox={toggleChatBox} />
            {showChatBox && (
                <ChatBox
                    toggleChatBox={toggleChatBox}
                    setUsersInRoom={setUsersInRoom}
                />
            )}
        </div>
      </div>
    </DndContext>
  );
};

export default WorkplacePage;
