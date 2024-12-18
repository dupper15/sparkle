import React, {useEffect, useRef, useState, forwardRef} from "react";
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
import AddCanvasButton from "./../../components/Button/AddCanvasButton";
import Canvas from "./../../components/Canvas/Canvas";
import Background from "../../components/Background/Background";
import ChatBox from "../../components/ChatBox/ChatBox";
import ButtonMessage from "../../components/ChatBox/ButtonMessage";
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
import socket from "../../utils/socket.js";
import {createAndAddComponentToCanvas} from "../../services/utils/componentOrchestrator.js";
import {extractIdFromOver} from "../../utils/utils.js";


const WorkplaceCanvas = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const project = useSelector((state) => state.project);
    const user = useSelector((state) => state.user);

    const {isDarkMode} = useDarkMode();
    const [state, setState] = useState("");
    const canvasRef = useRef([]);
    const [usersInRoom, setUsersInRoom] = useState([]);
    const location = useLocation();
    const designData = location.state || {};

    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [renderKey, setRenderKey] = useState(0);

    useEffect(() => {
        if (state === "design") {
            setRenderKey((prevKey) => prevKey + 1); // Tăng renderKey khi vào design
        }
    }, [state]); 

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
        dispatch(updateProject({...res?.data}));
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
            return ProjectService.updateProject(data.id);
        }, onSuccess: (data) => {
            handleGetDetailProject(data.data.id);
            console.log("Project updated successfully:", data);
        }, onError: (error) => {
            console.error("Failed to update project:", error);
        },
    });

    const mutationTemplate = useMutation({
        mutationFn: (data) => {
            return ProjectService.updateProject(data.id, data.canvas);
        }, onSuccess: (data) => {
            handleGetDetailProject(data.data.id);
            console.log("Project updated successfully:", data);
        }, onError: (error) => {
            console.error("Failed to update project:", error);
        },
    });

    const mutationProject = useMutation({
        mutationFn: (data) => {
            return ProjectService.addProject(data.id, data);
        }, onSuccess: (data) => {
            handleGetDetailProject(data.data.id);
            console.log("Project updated successfully:", data);
        }, onError: (error) => {
            console.error("Failed to update project:", error);
        },
    });

    const {data, isSuccess} = mutation;

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
                name: canvas.name || `Canvas ${index + 1}`,
                background: canvas.background || "white",
            }));
            setCanvases(newCanvases);
            setCurrentCanvas(newCanvases[0]?.id)
        }
    }, [project]);

    useEffect(() => {
        // Chỉ thực hiện cuộn khi canvases đã thay đổi và có ít nhất một trang
        if (canvases.length > 0) {
            const lastCanvasIndex = canvases.length - 1;
            canvasRef.current[lastCanvasIndex]?.scrollIntoView({
                behavior: "smooth", block: "start",
            });
        }
    }, [canvases]);

    const addCanvas = async () => {
        try {
            await mutation.mutateAsync({id: project?.id});
            // Cập nhật lại canvases (local state)
            setCanvases((prev) => {
                const newCanvases = [...prev, project?.canvasArray]; // Thêm canvas mới vào list canvases
                setCurrentCanvas(newCanvases[newCanvases.length]?.id); // Chuyển đến trang mới

                return newCanvases;
            });
            // Hiển thị thông báo thành công
            Alert.success("Add canvas successfully!");

            handleGetDetailProject(project?.id);
        } catch (error) {
            console.error("Failed to add canvas:", error.message);
            Alert.error("Failed to add canvas.");
        }
    };

    const addTemplate = async (templateCanvas) => {
        try {
            await mutationTemplate.mutateAsync({ id: project?.id, canvas: templateCanvas });

            const newCanvas = {
                background: templateCanvas?.background || '#ffffff',
                componentArray: templateCanvas?.componentArray || [],
                id: templateCanvas._id
            };
    
            // Cập nhật lại state của canvases
            setCanvases((prev) => {
                const updatedCanvases = [...prev, newCanvas];
                setCurrentCanvas(newCanvas.id); // Chuyển đến canvas mới
                return updatedCanvases;
            });
    
            Alert.success("Template added successfully!");
    
            handleGetDetailProject(project?.id);
        } catch (error) {
            console.error("Failed to add canvas:", error.message);
            Alert.error("Failed to add canvas.");
        }
    };

    const addProject = async (projectAdd) => {
        try {
            await mutationProject.mutateAsync({ id: project?.id, canvasArray: projectAdd.canvasArray });

            project.canvasArray.map((canvas) => {
                const newCanvas = {
                    background: canvas?.background || '#ffffff',
                    componentArray: canvas?.componentArray || [],
                    id: canvas._id,
                };
    
                // Cập nhật state của canvases
                setCanvases((prev) => {
                    const updatedCanvases = [...prev, newCanvas];
                    setCurrentCanvas(newCanvas.id); // Chuyển đến canvas vừa thêm
                    return updatedCanvases;
                });
            })
                
            Alert.success("Template added successfully!");
    
            handleGetDetailProject(project?.id);
        } catch (error) {
            console.error("Failed to add canvas:", error.message);
            Alert.error("Failed to add canvas.");
        }
    };

    const removeCanvas = async (id) => {
        try {
            if (project?.canvasArray?.length === 1) {
                Alert.error("Can not delete canvas!");
                return;
            }
            await deleteCanvas(id, project?.id);

            setCanvases((prev) => {
                const newCanvases = prev.filter((canvas) => canvas.id !== id);

                const canvasIndex = prev.findIndex((canvas) => canvas.id === id);
                const nextCanvasIndex = canvasIndex < newCanvases.length ? canvasIndex : canvasIndex - 1;

                setCurrentCanvas(newCanvases[nextCanvasIndex]?.id || null);
                return newCanvases;
            });
            Alert.success("Delete canvas successfully!")

            await handleGetDetailProject(project?.id)
        } catch (error) {
            console.error("Failed to delete canvas:", error.message);
            Alert.error("Failed to delete canvas.");
        }
    };

    const setBackground = async (bgLink) => {
        if (current_canvas !== null && current_canvas !== undefined) {
            try {
                // Cập nhật trạng thái tạm thời để UI phản hồi nhanh
                setBackgrounds((prev) => ({
                    ...prev, [current_canvas]: bgLink || "white",
                }));

                // Gửi yêu cầu cập nhật lên server
                const data = {background: bgLink || "white"}; // Giả sử trường là `background`
                const canvasId = current_canvas
                if (!canvasId) {
                    throw new Error("Canvas ID not found");
                }

                await CanvasService.updateCanvas(canvasId, data);

                const updatedProject = await ProjectService.getDetailProject(project?.id);

                if (updatedProject) {

                    // Cập nhật lại backgrounds từ updatedProject
                    const updatedBackgrounds = updatedProject.canvasArray.reduce((acc, canvas) => ({
                        ...acc, [canvas.id]: canvas.background || "white",
                    }), {});
                    setBackgrounds(updatedBackgrounds);
                }

                console.log("Canvas updated successfully");

            } catch (error) {
                console.error("Failed to update canvas:", error.message);
            }
        }
    };
    const [draggingComponent, setDraggingComponent] = useState(null);
    const handleDragEnd = async (event) => {
        const { over, active } = event;
        if (!over) return;

        const componentRectangle = active.rect.current.translated;
        const dropAreaRect = document.getElementById(over.id).getBoundingClientRect();

        if (over && draggingComponent) {
            const relativeX = componentRectangle.left - dropAreaRect.left;
            const relativeY = componentRectangle.top - dropAreaRect.top;

            const newComponent = {
                ...draggingComponent,
                x: relativeX,
                y: relativeY,
            };

            try {
                const response = await createAndAddComponentToCanvas(extractIdFromOver(over.id), draggingComponent.type, newComponent);
                newComponent.id = response.data._id;

                console.log(`update-${draggingComponent.type.toLowerCase()}s-${over.id}`)
                // Notify the specific canvas to update its components
                document.dispatchEvent(new CustomEvent(`update-${draggingComponent.type.toLowerCase()}s-${over.id}`, {
                    detail: newComponent,
                }));
            } catch (error) {
                console.error(`Failed to upload ${draggingComponent.type.toLowerCase()}:`, error);
            }
        }
    };

    const [show, setShow] = useState({
        status: true,
        name: "",
    });

    const setElements = (type, name) => {
        setState(type);
        setShow({
            status: false, name,
        });
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

    return (<DndContext onDragEnd={handleDragEnd}>
        <div
            className={`w-screen h-screen bg-no-repeat bg-cover flex flex-col scrollbar-hide overflow-hidden ${isDarkMode ? "bg-[#151318]" : "bg-slate-300"}`}>
            <WorkplaceHeader usersInRoom={usersInRoom}/>
            <div className="flex h-[calc(100%-60px)] w-screen scrollbar-hide">
                <div
                    className={`w-[80px] z-50 scrollbar-hide h-full overflow-y-auto ${isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"}`}>
                    {[{icon: <LuLayoutTemplate/>, label: "Design", type: "design"}, {
                        icon: <LuShapes/>, label: "Shape", type: "shape"
                    }, {icon: <LuFolder/>, label: "Project", type: "project"}, {
                        icon: <RiText/>, label: "Text", type: "text"
                    }, {icon: <LuImage/>, label: "Image", type: "image"}, {
                        icon: <RxTransparencyGrid/>, label: "Background", type: "background",
                    },].map(({icon, label, type}) => (<div
                        key={type}
                        onClick={() => setElements(type, label.toLowerCase())}
                        className={`${show.name === label.toLowerCase() ? isDarkMode ? "bg-[#252627]" : "bg-white" : ""} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF]`}>
                        <span className="text-2xl">{icon}</span>
                        <span className="text-xs font-medium">{label}</span>
                    </div>))}
                </div>

                <div className="h-full w-[calc(100%-75px)]">
                    <div
                        className={`${show.status ? "py-5 -left-[350px]" : "px-8 left-[75px] py-5"} ${isDarkMode ? "bg-[#252627]" : "bg-white"} h-full fixed transition-all w-[350px] z-30 duration-500`}>
                        <div
                            onClick={() => setShow({name: "", status: true})}
                            className={`flex absolute justify-center items-center w-[20px] -right-2 top-[40%] cursor-pointer h-[100px] rounded-full ${isDarkMode ? "bg-[#252627] text-slate-700" : "bg-white text-slate-300"}`}>
                            <MdKeyboardArrowLeft/>
                        </div>
                        {state === "design" && <TemplateDesign key={renderKey} addCanvasFromTemplate={addTemplate} />}
                        {state === "shape" && (<Shape drag={setDraggingComponent}/>)}
                        {state === "project" && <Project/>}
                        {state === "text" && <Text drag={setDraggingComponent} />}
                        {state === "image" && <Image drag={setDraggingComponent}/>}
                        {state === "background" && (<Background setBackground={setBackground}/>)}
                    </div>
                    <div 
                        className="canvas-container flex flex-col items-center justify-start gap-8 m-8 overflow-y-auto h-[calc(100%-50px)] scrollbar-hide">
                        {canvases.map((canvasData, index) => (<div
                            key={canvasData.id}
                            onClick={() => {
                                if (current_canvas !== canvasData.id) {
                                    setCurrentCanvas(canvasData.id);
                                }
                            }}>
                            <div ref={ref}>
                                <Canvas 
                                    key={canvasData.id}
                                    databaseId={canvasData._id}
                                    id={`drop-area-${canvasData.id}`}
                                    title={`${index + 1}`}
                                    width={width}
                                    height={height}
                                    name={canvasData.name}
                                    bgLink={backgrounds[canvasData.id] || canvasData.background}
                                    removeButton={() => removeCanvas(canvasData.id)}
                                    upButton={() => scrollToCanvas(index - 1)}
                                    downButton={() => scrollToCanvas(index + 1)}
                                    ref={(el) => (canvasRef.current[index] = el)} // Callback function
                                    // ref={(el) => (canvasRef.current[index] = el)}
                                />
                            </div>
                        </div>))}
                        <div>
                            <AddCanvasButton addCanvas={addCanvas}/>
                        </div>
                    </div>
                </div>
                <ButtonMessage toggleChatBox={toggleChatBox}/>
                {showChatBox && (<ChatBox
                    toggleChatBox={toggleChatBox}
                    setUsersInRoom={setUsersInRoom}
                />)}
            </div>
        </div>
    </DndContext>);
});

export default WorkplaceCanvas;
