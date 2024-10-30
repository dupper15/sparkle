import React, { useState } from "react";
import WorkplaceHeader from "../../components/WorkplaceHeader/WorkplaceHeader";
import { LuLayoutTemplate } from "react-icons/lu";
import { LuShapes } from "react-icons/lu";
import { LuUpload } from "react-icons/lu";
import { LuFolder } from "react-icons/lu";
import { RiText } from "react-icons/ri";
import { LuImage } from "react-icons/lu";
import { RxTransparencyGrid } from "react-icons/rx";
import { MdKeyboardArrowLeft } from "react-icons/md";
import TemplateDesign from "../../components/Template/TemplateDesign";
import UploadImage from "../../components/Image/Upload";
import Project from "../../components/Template/Project";
import Image from "../../components/Image/Image";
import Shape from "../../components/Shape/Shape";
import Background from "../../components/Background/Background";
import ChatBox from "../../components/ChatBox/ChatBox";
import ButtonMessage from "../../components/ChatBox/ButtonMessage";

const WorkplacePage = () => {
  const [state, setState] = useState("");
  const [current_component, setCurrentComponent] = useState("");
  const [show, setShow] = useState({
    status: true,
    name: "",
  });

  const setElements = (type, name) => {
    setState(type);
    setShow({
      state: false,
      name,
    });
  };

  const [components, setComponents] = useState("");

  const [showChatBox, setShowChatBox] = useState(false);

  const toggleChatBox = () => {
    setShowChatBox((prev) => !prev);
  };

  return (
    <div className="w-screen h-screen scrollbar-hide bg-no-repeat bg-cover bg-[url('./assets/bg-dm.png')] flex flex-col">
      <WorkplaceHeader />

      <div className="flex h-[calc(100%-60px)] w-screen scrollbar-hide">
        <div className="w-[80px] bg-[#18191B] z-50 h-full text-white overflow-y-auto">
          <div
            onClick={() => setElements("design", "design")}
            className={`
                ${
                  show.name === "design" ? "bg-[#252627]" : ""
                } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF] `}
          >
            <span className="text-2x1">
              <LuLayoutTemplate />
            </span>
            <span className="text-xs font-medium">Design</span>
          </div>
          <div
            onClick={() => setElements("shape", "shape")}
            className={`
                ${
                  show.name === "shape" ? "bg-[#252627]" : ""
                } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF] `}
          >
            <span className="text-2x1">
              <LuShapes />
            </span>
            <span className="text-xs font-medium">Shape</span>
          </div>
          <div
            onClick={() => setElements("upload", "upload")}
            className={`
                ${
                  show.name === "upload" ? "bg-[#252627]" : ""
                } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF] `}
          >
            <span className="text-2x1">
              <LuUpload />
            </span>
            <span className="text-xs font-medium">Upload</span>
          </div>
          <div
            onClick={() => setElements("project", "project")}
            className={`
                ${
                  show.name === "project" ? "bg-[#252627]" : ""
                } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF] `}
          >
            <span className="text-2x1">
              <LuFolder />
            </span>
            <span className="text-xs font-medium">Project</span>
          </div>
          <div
            onClick={() => setElements("text", "text")}
            className={`
                ${
                  show.name === "text" ? "bg-[#252627]" : ""
                } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF] `}
          >
            <span className="text-2x1">
              <RiText />
            </span>
            <span className="text-xs font-medium">Text</span>
          </div>
          <div
            onClick={() => setElements("image", "image")}
            className={`
                ${
                  show.name === "image" ? "bg-[#252627]" : ""
                } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF] `}
          >
            <span className="text-2x1">
              <LuImage />
            </span>
            <span className="text-xs font-medium">Image</span>
          </div>
          <div
            onClick={() => setElements("background", "background")}
            className={`
                ${
                  show.name === "background" ? "bg-[#252627]" : ""
                } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF] `}
          >
            <span className="text-2x1">
              <RxTransparencyGrid />
            </span>
            <span className="text-xs font-medium">Background</span>
          </div>
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
            {state === "shape" && <Shape />}
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
        </div>
        <ButtonMessage toggleChatBox={toggleChatBox} />
        {showChatBox && <ChatBox toggleChatBox={toggleChatBox} />}
      </div>
    </div>
  );
};

export default WorkplacePage;
