import React, { useRef, useState } from "react";
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

const WorkplacePage = () => {
  const [state, setState] = useState("");
  const [quantity, setQuantity] = useState([1]);
  const pageRef = useRef([]);

  const scrollToPage = (index) => {
    if (pageRef.current[index]) {
      pageRef.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const addPage = () => {
    setQuantity((prev) => {
      const newQuantity = [...prev, prev.length + 1];
      return newQuantity;
    });

    setTimeout(() => {
      scrollToPage(quantity.length);
    }, 0);
  };

  const removePage = (index) => {
    const updatedPages = quantity.filter((_, i) => i !== index);
    setQuantity(updatedPages);
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

  const [components, setComponents] = useState("");

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

          <div className="flex flex-col items-center justify-start gap-8 m-8 overflow-y-auto h-[calc(100%-50px)] scrollbar-hide">
            {quantity.map((_, index) => (
              <Page
                key={index}
                title={index + 1}
                removeButton={() => removePage(index)}
                upButton={() => scrollToPage(index - 1)}
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
