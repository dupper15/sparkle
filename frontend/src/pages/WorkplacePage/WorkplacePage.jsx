import React, { useRef, useState } from "react";
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

const WorkplacePage = () => {
  const [state, setState] = useState("");
  const pageRef = useRef([]);

  const scrollToPage = (index) => {
    if (pageRef.current[index]) {
      pageRef.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const [rotate, setRotate] = useState(0);

  const location = useLocation();
  const designData = location.state || {};

  const [pages, setPages] = useState([{ ...designData, id: 1 }]);

  const addPage = () => {
    setPages((prev) => {
      const newPages = [...prev, { ...designData, id: prev.length + 1 }];

      setTimeout(() => {
        scrollToPage(newPages.length - 1);
      }, 0);

      return newPages;
    });
  };

  const removePage = (id) => {
    setPages((prev) => {
      const newPages = prev.filter((page) => page.id !== id);
      if (newPages.length > 0) {
        setTimeout(() => {
          scrollToPage(newPages.length - 1);
        }, 0);
      }

      return newPages;
    });
  };

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

  const createShape = (name, type) => {
    setComponents((prevComponents) => {
      const baseShape = {
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
        setCurrentComponent: (a) => setCurrentComponent(a),
      };

      const newShape = {
        ...baseShape,
        ...(type === "circle" && { borderRadius: "50%" }),
        ...(type === "rect" && {}),
        ...(type === "triangle" && {
          clipPath: "polygon(50% 0,100% 100%, 0 100%)",
        }),
      };

      return [...prevComponents, newShape];
    });
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
    const temp = components.filter((c) => c.id !== id);
    setCurrentComponent("");
    setComponents(temp);
  };

  const [showChatBox, setShowChatBox] = useState(false);

  const toggleChatBox = () => {
    setShowChatBox((prev) => !prev);
  };

  return (
    <div className="w-screen h-screen bg-no-repeat bg-cover bg-[#151318] flex flex-col scrollbar-hide overflow-hidden">
      <WorkplaceHeader />

      <div className="flex h-[calc(100%-60px)] w-screen scrollbar-hide">
        <div className="w-[80px] bg-black z-50 scrollbar-hide h-full text-white overflow-y-auto">
          {[
            { icon: <LuLayoutTemplate />, label: "Design", type: "design" },
            { icon: <LuShapes />, label: "Shape", type: "shape" },
            { icon: <LuUpload />, label: "Upload", type: "upload" },
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
                show.name === label.toLowerCase() ? "bg-[#252627]" : ""
              } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF]`}
            >
              <span className="text-2xl">{icon}</span>
              <span className="text-xs font-medium">{label}</span>
            </div>
          ))}
        </div>

        <div className="h-full w-[calc(100%-75px)]">
          <div
            className={`${
              show.status ? "py-5 -left-[350px]" : "px-8 left-[75px] py-5"
            } bg-[#252627] h-full fixed transition-all w-[350px] z-30 duration-500`}
          >
            <div
              onClick={() => setShow({ name: "", status: true })}
              className="flex absolute justify-center items-center bg-[#252627] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded-full"
            >
              <MdKeyboardArrowLeft />
            </div>
            {state === "design" && (
              <div className="grid grid-cols-2 gap-2">
                <TemplateDesign />
              </div>
            )}
            {state === "shape" && <Shape createShape={createShape} />}
            {state === "upload" && <UploadImage />}
            {state === "project" && <Project />}
            {state === "text" && (
              <div>
                <div className="grid grid-cols-1 gap-2">
                  <div className="bg-[#3c3c3d] cursor-pointer font-bold p-3 text-white text-x1 rounded-sm">
                    <h2>Add a text</h2>
                  </div>
                </div>
              </div>
            )}
            {state === "image" && (
              <div className="h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide">
                <Image />
              </div>
            )}
            {state === "background" && <Background />}
          </div>

          <div className="flex flex-col items-center justify-start gap-8 m-8 overflow-y-auto h-[calc(100%-50px)] scrollbar-hide">
            {pages.map((pageData, index) => (
              <Page
                key={pageData.id}
                title={`${index + 1}`}
                width={pageData.width}
                height={pageData.height}
                name={pageData.name}
                components={components}
                removeElement={removeElement}
                removeButton={() => removePage(pageData.id)}
                upButton={() => scrollToPage(index - 1)}
                s
                downButton={() => scrollToPage(index + 1)}
                ref={(el) => (pageRef.current[index] = el)}
              />
            ))}
            <AddPageButton addPage={addPage} />
          </div>
        </div>
        <ButtonMessage toggleChatBox={toggleChatBox} />
        {showChatBox && <ChatBox toggleChatBox={toggleChatBox} />}
      </div>
    </div>
  );
};

export default WorkplacePage;
