import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import WorkplaceHeader from "../../components/WorkplaceHeader/WorkplaceHeader";
import {
  LuLayoutTemplate,
  LuShapes,
  LuUpload,
  LuFolder,
  LuImage,
} from "react-icons/lu";
import { RiText } from "react-icons/ri";
import { RxTransparencyGrid } from "react-icons/rx";
import { MdKeyboardArrowLeft } from "react-icons/md";
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
import { DndContext } from "@dnd-kit/core";
import Text from "../../components/Text/Text.jsx";
import { useDarkMode } from "../../contexts/DarkModeContext.jsx";

const WorkplacePage = () => {
  const { isDarkMode } = useDarkMode();

  const [state, setState] = useState("");
  const pageRef = useRef([]);

  const [rotate, setRotate] = useState(0);

  const location = useLocation();
  const designData = location.state || {};

  const [pages, setPages] = useState([
    { ...designData, id: 1, components: [] },
  ]);
  const [current_page, setCurrentPage] = useState(1);

  const [isImageToolBarOpen, setOpenImageToolBar] = useState(false);
  const [isTextToolBarOpen, setOpenTextToolBar] = useState(false);
  const handleImageClick = () => {
    setOpenImageToolBar((prev) => !prev);
  };
  const handleTextClick = () => {
    setOpenTextToolBar((prev) => !prev);
  };

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
        { ...designData, id: prev.length + 1, components: [] },
      ];
      setCurrentPage(newPages.length);

      return newPages;
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
  const handleDragEnd = (event) => {
    const { over, active } = event;
    const shapeRect = active.rect.current.translated;

    if (over && draggingShape) {
      const dropAreaRect = document
        .getElementById(over.id)
        .getBoundingClientRect();

      const relativeX = shapeRect.left - dropAreaRect.left;
      const relativeY = shapeRect.top - dropAreaRect.top;
      updateShapes(
        {
          id: Date.now(),
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

  const moveElement = () => {
    console.log("move element");
  };

  const resizeElement = () => {
    console.log("resize element");
  };

  const rotateElement = () => {
    console.log("rotate element");
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
                    ? "bg-white text-slate-700"
                    : "bg-[#252627] text-slate-300"
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
              <div className={"z-50"}>
                {isImageToolBarOpen && (
                  <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 mt-20">
                    <ImageToolbar />
                  </div>
                )}
                {isTextToolBarOpen && (
                  <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 mt-20">
                    <TextToolbar />
                  </div>
                )}
              </div>
              {pages.map((pageData, index) => (
                <div
                  key={pageData.id}
                  onClick={() => setCurrentPage(pageData.id)}>
                  <Page
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
          {showChatBox && <ChatBox toggleChatBox={toggleChatBox} />}
        </div>
        <ButtonMessage toggleChatBox={toggleChatBox} />
        {showChatBox && <ChatBox toggleChatBox={toggleChatBox} />}
      </div>
    </DndContext>
  );
};

export default WorkplacePage;
