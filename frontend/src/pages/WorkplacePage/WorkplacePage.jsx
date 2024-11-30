// eslint-disable-next-line no-unused-vars
import React, {useRef, useState, useEffect} from "react";
import WorkplaceHeader from "../../components/WorkplaceHeader/WorkplaceHeader";
import {
    LuLayoutTemplate,
    LuShapes,
    LuFolder,
    LuImage,
} from "react-icons/lu";
import {RiText} from "react-icons/ri";
import {RxTransparencyGrid} from "react-icons/rx";
import {MdKeyboardArrowLeft} from "react-icons/md";
import TemplateDesign from "../../components/Template/TemplateDesign";
import Project from "../../components/Template/Project";
import Image from "../../components/Image/Image";
import Shape from "../../components/Shape/Shape";
import AddCanvasButton from "../../components/Button/AddCanvasButton.jsx";
import Canvas from "../../components/Canvas/Canvas.jsx";
import Background from "../../components/Background/Background";
import ChatBox from "../../components/ChatBox/ChatBox";
import ButtonMessage from "../../components/ChatBox/ButtonMessage";
import {DndContext} from "@dnd-kit/core";
import Text from "../../components/Text/Text.jsx";
import {useDarkMode} from "../../contexts/DarkModeContext.jsx";
import * as ProjectService from '../../services/ProjectService.js'
import {useDispatch, useSelector} from "react-redux";
import {updateProject} from "../../redux/slides/projectSlide.js";
import {deleteCanvas} from "../../services/CanvasService.js";
import * as Alert from '../../components/Alert/Alert.jsx'
import {useMutation} from "@tanstack/react-query";
import {createAndAddComponentToCanvas} from "../../services/utils/componentOrchestrator.js";

const WorkplacePage = () => {
        const dispatch = useDispatch();
        const project = useSelector((state) => state.project);
        const [width, setWidth] = useState('')
        const [height, setHeight] = useState()

        useEffect(() => {
            setWidth(project?.width)
            setHeight(project?.height)
        }, [project])

        useEffect(() => {
            // Lấy id từ localStorage
            const storedProjectId = localStorage.getItem('projectId');

            if (storedProjectId) {
                // Gọi API để lấy chi tiết dự án
                const fetchProject = async () => {
                    const res = await ProjectService.getDetailProject(storedProjectId);
                    dispatch(updateProject(res.data)); // Cập nhật dữ liệu dự án vào Redux store
                };

                fetchProject();
            }
        }, [dispatch]);

        const handleGetDetailProject = async (id) => {
            const res = await ProjectService.getDetailProject(id)
            localStorage.setItem('project', JSON.stringify(res?.data));
            dispatch(updateProject({...res?.data}))
        };

        const {isDarkMode} = useDarkMode();
        const [state, setState] = useState("");
        const canvasRef = useRef([]);

        const [canvases, setCanvases] = useState([]);
        const [currentCanvas, setCurrentCanvas] = useState(null);

        useEffect(() => {
            if (project?.canvasArray) {
                const newCanvases = project.canvasArray.map((canvas, index) => ({
                    ...canvas,
                    id: canvas.id || index,
                    name: canvas.name || `Canvas ${index + 1}`,
                }));
                setCanvases(newCanvases);
                setCurrentCanvas(newCanvases[0]?.id)
            }
        }, [project]);

        const mutation = useMutation(
            {
                mutationFn: (data) => {
                    const {id} = data;
                    return ProjectService.updateProject(id);
                },
                onSuccess: (data) => {
                    dispatch(updateProject(data.data));
                    handleGetDetailProject(data.data.id)
                    console.log('Project updated successfully:', data);
                },
                onError: (error) => {
                    console.error('Failed to update project:', error);
                }
            })

        const { isSuccess} = mutation

        useEffect(() => {
            if (isSuccess) {
                Alert.success('Add success')
                handleGetDetailProject(project?.id)
            }
        }, [isSuccess])

        const scrollToCanvas = (index) => {
            if (index >= 0 && index < canvases.length) {
                if (canvasRef.current[index]) {
                    canvasRef.current[index].scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
                setCurrentCanvas(canvases[index].id);
            }
        };

        const addCanvas = async () => {
            mutation.mutate({id: project?.id});

            setCanvases((prev) => {
                const newCanvases = [...prev, ...project.canvasArray];

                setCurrentCanvas(newCanvases[newCanvases.length - 1]?.id);

                setTimeout(() => {
                    canvasRef.current[newCanvases.length - 1]?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }, 0);

                return newCanvases;
            });
        };
        const createText = () => {
            if (currentCanvas === null) {
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
                testId: `drop-area-${currentCanvas}`,
            };

            setShapes((prevShapes) => [...prevShapes, {...newItem}]);
        };
        const [draggingShape, setDraggingShape] = useState(null);
        const [shapes, setShapes] = useState([]);

        const updateShapes = (newShape, testId) => {
            setShapes((prevShapes) => [...prevShapes, {...newShape, testId}]);
        };
        const handleDragEnd = async (event) => {
            const {over, active} = event;
            const shapeRect = active.rect.current.translated;

            if (over && draggingShape) {
                const dropAreaRect = document.getElementById(over.id).getBoundingClientRect();
                const relativeX = shapeRect.left - dropAreaRect.left;
                const relativeY = shapeRect.top - dropAreaRect.top;
                const newComponent = {
                    shapeType: draggingShape.shapeType,
                    x: relativeX,
                    y: relativeY,
                };

                try {
                    const response = await createAndAddComponentToCanvas(currentCanvas, 'Shape', newComponent);
                    newComponent.id = response.data._id;

                    updateShapes(newComponent, over.id);
                } catch (error) {
                    console.error('Failed to upload shape:', error);
                }
            }
            setDraggingShape(null);
        };
        const removeCanvas = async (id) => {
            try {

                if (project?.canvasArray?.length === 1) {
                    Alert.error("Can not delete canvas!");
                    return;
                }

                const canvasId = project?.canvasArray[id]
                await deleteCanvas(canvasId, project?.id);

                setCanvases((prev) => {
                    const newCanvases = prev.filter((canvas) => canvas.id !== id);

                    const canvasIndex = prev.findIndex((canvas) => canvas.id === id);
                    const nextCanvasIndex =
                        canvasIndex < newCanvases.length ? canvasIndex : canvasIndex - 1;

                    setCurrentCanvas(newCanvases[nextCanvasIndex]?.id || null);
                    return newCanvases;
                });

                // Đồng bộ dữ liệu dự án
                await handleGetDetailProject(project?.id);
            } catch (error) {
                console.error("Failed to delete canvas:", error.message);
                Alert.error("Failed to delete canvas.");
            }
        };
        const [show, setShow] = useState({
            status: true,
            name: "",
        });
        const [backgrounds, setBackgrounds] = useState({});
        const setBackground = (bgLink) => {
            if (currentCanvas !== null) {
                setBackgrounds((prev) => ({
                    ...prev,
                    [currentCanvas]: bgLink || "white",
                }));
            }
        };
        const setElements = (type, name) => {
            setState(type);
            setShow({
                status: false,
                name,
            });
        };
        const removeElement = (id) => {
            setShapes((prevShapes) => prevShapes.filter((shape) => shape.id !== id));
            setCanvases((prevCanvas) =>
                prevCanvas.map((canvas) =>
                    canvas.id === currentCanvas
                        ? {
                            ...canvas,
                            components: canvas.components.filter((c) => c.id !== id),
                        }
                        : canvas
                )
            );
        };

        const [showChatBox, setShowChatBox] = useState(false);

        const toggleChatBox = () => {
            setShowChatBox((prev) => !prev);
        };

        return (
            <DndContext onDragEnd={handleDragEnd}>
                <div
                    className={`w-screen h-screen bg-no-repeat bg-cover flex flex-col scrollbar-hide overflow-hidden ${
                        isDarkMode ? "bg-[#151318]" : "bg-slate-300"
                    }`}>
                    <WorkplaceHeader/>
                    <div className="flex h-[calc(100%-60px)] w-screen scrollbar-hide">
                        <div
                            className={`w-[80px] z-50 scrollbar-hide h-full overflow-y-auto ${
                                isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"
                            }`}>
                            {[
                                {icon: <LuLayoutTemplate/>, label: "Design", type: "design"},
                                {icon: <LuShapes/>, label: "Shape", type: "shape"},
                                {icon: <LuFolder/>, label: "Project", type: "project"},
                                {icon: <RiText/>, label: "Text", type: "text"},
                                {icon: <LuImage/>, label: "Image", type: "image"},
                                {
                                    icon: <RxTransparencyGrid/>,
                                    label: "Background",
                                    type: "background",
                                },
                            ].map(({icon, label, type}) => (
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
                                    onClick={() => setShow({name: "", status: true})}
                                    className={`flex absolute justify-center items-center w-[20px] -right-2 top-[40%] cursor-pointer h-[100px] rounded-full ${
                                        isDarkMode
                                            ? "bg-white text-slate-700"
                                            : "bg-[#252627] text-slate-300"
                                    }`}>
                                    <MdKeyboardArrowLeft/>
                                </div>
                                {state === "design" && (
                                    <div className="grid grid-cols-2 gap-2">
                                        <TemplateDesign/>
                                    </div>
                                )}
                                {state === "shape" && (
                                    <Shape addNewShape={updateShapes} drag={setDraggingShape}/>
                                )}
                                {state === "project" && <Project/>}
                                {state === "text" && <Text addNewText={createText}/>}
                                {state === "image" && <Image drag={setDraggingShape}/>}
                                {state === "background" && (
                                    <Background setBackground={setBackground}/>
                                )}
                            </div>
                            <div
                                className="flex flex-col items-center justify-start gap-8 m-8 overflow-y-auto h-[calc(100%-50px)] scrollbar-hide">

                                {canvases.map((canvasData, index) => (
                                    <div
                                        onClick={() => {
                                            if (currentCanvas !== canvasData.id) {
                                                setCurrentCanvas(canvasData.id);
                                            }
                                        }}>
                                        <Canvas
                                            key={canvasData.id}
                                            id={`drop-area-${canvasData.id}`}
                                            title={`${index + 1}`}
                                            width={width}
                                            height={height}
                                            name={canvasData.name}
                                            shapes={shapes.filter(
                                                (shape) => shape.testId === `drop-area-${canvasData.id}`
                                            )}
                                            bgLink={
                                                backgrounds[canvasData.id] || canvasData.background
                                            }
                                            removeElement={removeElement}
                                            removeButton={() => removeCanvas(canvasData.id)}
                                            upButton={() => scrollToCanvas(index - 1)}
                                            downButton={() => scrollToCanvas(index + 1)}
                                            ref={(el) => (canvasRef.current[index] = el)}
                                        />
                                    </div>
                                ))}
                                <div>
                                    <AddCanvasButton addCanvas={addCanvas}/>
                                </div>
                            </div>
                        </div>
                        <ButtonMessage toggleChatBox={toggleChatBox}/>
                        {showChatBox && <ChatBox toggleChatBox={toggleChatBox}/>}
                    </div>
                    <ButtonMessage toggleChatBox={toggleChatBox}/>
                    {showChatBox && <ChatBox toggleChatBox={toggleChatBox}/>}
                </div>
            </DndContext>
        );
    }
;

export default WorkplacePage;
