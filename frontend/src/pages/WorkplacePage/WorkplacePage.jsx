import React, {useRef, useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import WorkplaceHeader from "../../components/WorkplaceHeader/WorkplaceHeader";
import {
    LuLayoutTemplate,
    LuShapes,
    LuUpload,
    LuFolder,
    LuImage,
} from "react-icons/lu";
import {RiText} from "react-icons/ri";
import {RxTransparencyGrid} from "react-icons/rx";
import {MdKeyboardArrowLeft} from "react-icons/md";
import TemplateDesign from "../../components/Template/TemplateDesign";
import UploadImage from "../../components/Image/Upload";
import Project from "../../components/Template/Project";
import Image from "../../components/Image/Image";
import Shape from "../../components/Shape/Shape";
import AddPageButton from "./../../components/Button/AddPageButton";
import Page from "./../../components/Page/Page";
import Background from "../../components/Background/Background";
import ChatBox from "../../components/ChatBox/ChatBox";
import ButtonMessage from "../../components/ChatBox/ButtonMessage";
import CreateComponent from "../../components/CreateComponent";
import ImageToolbar from "../../components/SharedComponents/ToolBars/ImageToolBar.jsx";
import TextToolbar from "../../components/SharedComponents/ToolBars/TextToolBar.jsx";
import {DndContext} from "@dnd-kit/core";

const WorkplacePage = () => {
    const [state, setState] = useState("");
    const pageRef = useRef([]);

    const [rotate, setRotate] = useState(0);

    const location = useLocation();
    const designData = location.state || {};

    const [pages, setPages] = useState([
        {...designData, id: 1, components: []},
    ]);
    const [current_page, setCurrentPage] = useState(1);

    const [isImageToolBarOpen, setOpenImageToolBar] = useState(false)
    const [isTextToolBarOpen, setOpenTextToolBar] = useState(false)
    const handleImageClick = () => {
        setOpenImageToolBar((prev) => !prev);
    }
    const handleTextClick = () => {
        setOpenTextToolBar((prev) => !prev);
    }

    const scrollToPage = (index) => {
        if (pageRef.current[index]) {
            pageRef.current[index].scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    const addPage = () => {
        setPages((prev) => {
            const newPages = [
                ...prev,
                {...designData, id: prev.length + 1, components: []},
            ];
            setCurrentPage(newPages.length);

            return newPages;
        });
    };
    const [draggingShape, setDraggingShape] = useState(null);
    const [shapes, setShapes] = useState([]);

    const updateShapes = (newItem, testId) => {
        setShapes((prevShapes) => {
            // Kiểm tra xem shape đã tồn tại trong danh sách chưa
            const existingShapeIndex = prevShapes.findIndex((shape) => shape.id === newItem.id);
            if (existingShapeIndex !== -1) {
                // Nếu shape đã tồn tại, cập nhật vị trí mới
                const updatedShapes = [...prevShapes];
                updatedShapes[existingShapeIndex] = {
                    ...updatedShapes[existingShapeIndex],
                    x: newItem.x,
                    y: newItem.y,
                };
                return updatedShapes;
            } else {
                // Nếu shape chưa tồn tại, thêm shape mới với id mới
                return [...prevShapes, {...newItem, testId, id: Date.now()}];
            }
        });
        const updateShapes = (newShape, testId) => {
            setShapes((prevShapes) => [...prevShapes, {...newShape, testId}]);
        };

        const handleDragEnd = (event) => {
            const {over, active} = event;
            const shapeRect = active.rect.current.translated;

            if (over && draggingShape) {
                const dropAreaRect = document.getElementById(over.id).getBoundingClientRect();
                const relativeX = shapeRect.left - dropAreaRect.left;
                const relativeY = shapeRect.top - dropAreaRect.top;

                updateShapes(
                    {
                        id: draggingShape.id, // Sử dụng id của shape đang kéo
                        shapeType: draggingShape.shapeType,
                        link: draggingShape.backgroundImage
                            ? draggingShape.backgroundImage
                            : "",
                        x: relativeX,
                        y: relativeY,
                    },
                    over.id
                );
            }
            setDraggingShape(null);
        };

        const removePage = (id) => {
            setPages((prev) => {
                const newPages = prev.filter((page) => page.id !== id);

                if (newPages.length < 1) {
                    return prev;
                }

                const pageIndex = prev.findIndex((page) => page.id === id);
                const nextPageIndex =
                    pageIndex < newPages.length ? pageIndex : pageIndex - 1;

                setCurrentPage(nextPageIndex + 1);

                return newPages;
            });
        };

        useEffect(() => {
            if (current_page > 0) {
                scrollToPage(current_page - 1);
            }
        }, [current_page]);

        const [current_component, setCurrentComponent] = useState("");
        const [show, setShow] = useState({
            status: true,
            name: "",
        });
        const [backgrounds, setBackgrounds] = useState({});
        const setBackground = (bgLink) => {
            if (current_page !== null) {
                setBackgrounds((prev) => ({
                    ...prev,
                    [current_page]: bgLink || "white",
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

        return (
            <DndContext onDragEnd={handleDragEnd}>
                <div
                    className="w-screen h-screen bg-no-repeat bg-cover bg-[#151318] flex flex-col scrollbar-hide overflow-hidden">
                    <WorkplaceHeader/>
                    <div className="flex h-[calc(100%-60px)] w-screen scrollbar-hide">
                        <div className="w-[80px] bg-black z-50 scrollbar-hide h-full text-white overflow-y-auto">
                            {[
                                {icon: <LuLayoutTemplate/>, label: "Design", type: "design"},
                                {icon: <LuShapes/>, label: "Shape", type: "shape"},
                                {icon: <LuUpload/>, label: "Upload", type: "upload"},
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
                                        show.name === label.toLowerCase() ? "bg-[#252627]" : ""
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
                                } bg-[#252627] h-full fixed transition-all w-[350px] z-30 duration-500`}>
                                <div
                                    onClick={() => setShow({name: "", status: true})}
                                    className="flex absolute justify-center items-center bg-[#252627] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded-full">
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
                                {state === "upload" && <UploadImage/>}
                                {state === "project" && <Project/>}
                                {state === "text" && (
                                    <div>
                                        <div className="grid grid-cols-1 gap-2">
                                            <div
                                                className="bg-[#3c3c3d] cursor-pointer font-bold p-3 text-white text-x1 rounded-sm">
                                                <h2>Add a text</h2>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {state === "image" && <Image drag={setDraggingShape}/>}
                                {state === "background" && (
                                    <Background setBackground={setBackground}/>

                                )}
                            </div>
                            <div className={''}>
                                <button className={'pr-4'} onClick={handleImageClick}>Image</button>
                                <button onClick={handleTextClick}>Text</button>
                            </div>
                            <div
                                className="flex flex-col items-center justify-start gap-8 m-8 overflow-y-auto h-[calc(100%-50px)] scrollbar-hide">
                                <div className={'z-50'}>
                                    {
                                        isImageToolBarOpen &&
                                        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 mt-20">
                                            <ImageToolbar/>
                                        </div>
                                    }
                                    {
                                        isTextToolBarOpen &&
                                        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 mt-20">
                                            <TextToolbar/>
                                        </div>
                                    }
                                </div>
                                {pages.map((pageData, index) => (
                                    <div
                                        key={pageData.id}
                                        id={`drop-area-${pageData.id}`}
                                        title={`${index + 1}`}
                                        width={pageData.width}
                                        height={pageData.height}
                                        name={pageData.name}
                                        shapes={shapes.filter(
                                            (shape) => shape.testId === `drop-area-${pageData.id}`
                                        )}
                                        bgLink={backgrounds[pageData.id] || "white"}
                                        removeElement={removeElement}
                                        removeButton={() => removePage(pageData.id)}
                                        upButton={() => scrollToPage(index - 1)}
                                        downButton={() => scrollToPage(index + 1)}
                                        onDragEnd={(event) => handleDragEnd(event, `drop-area-${pageData.id}`)}
                                        ref={(el) => (pageRef.current[index] = el)}
                                    />
                                ))}
                                <div>
                                    <AddPageButton addPage={addPage}/>
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
    };
}
export default WorkplacePage;
