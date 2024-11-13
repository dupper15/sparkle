import React, { useState } from "react";
import { LuShapes } from "react-icons/lu";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { DndContext } from "@dnd-kit/core";
import WorkplaceHeader from "../components/WorkplaceHeader/WorkplaceHeader";
import TemplateDesign from "../components/Template/TemplateDesign";
import Shape from "./../components/Shape/Shape";
import Test from "../components/test";
import { RxTransparencyGrid } from "react-icons/rx";
import Background from "../components/Background/Background";
import Image from "../components/Image/Image";
import { LuLayoutTemplate, LuUpload, LuFolder, LuImage } from "react-icons/lu";
const Place = () => {
  const [draggingItem, setDraggingItem] = useState(null);
  const [items, setItems] = useState([]);
  const [tests] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]); // Mẫu trang
  const [backgrounds, setBackgrounds] = useState({});
  const [currentPage, setCurrentPage] = useState(null);
  const [panelState, setPanelState] = useState({ status: true, name: "" });
  const [currentTab, setCurrentTab] = useState("");

  const updateItems = (newItem, testId) => {
    setItems((prevShapes) => [...prevShapes, { ...newItem, testId }]);
  };

  const setBackground = (bgLink) => {
    if (currentPage !== null) {
      setBackgrounds((prev) => ({ ...prev, [currentPage]: bgLink || "white" }));
    }
  };

  const handleTabSelect = (type, name) => {
    setCurrentTab(type);
    setPanelState({ status: false, name });
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;
    const shapeRect = active.rect.current.translated;

    if (over && draggingItem) {
      const dropAreaRect = document
        .getElementById(over.id)
        .getBoundingClientRect();

      const relativeX = shapeRect.left - dropAreaRect.left;
      const relativeY = shapeRect.top - dropAreaRect.top;

      updateItems(
        {
          id: Date.now(),
          shapeType: draggingItem.shapeType,
          link: draggingItem.backgroundImage
            ? draggingItem.backgroundImage
            : null,
          x: relativeX,
          y: relativeY,
        },
        over.id
      );
    }
    setDraggingItem(null);
  };
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className='w-screen h-screen bg-no-repeat bg-cover bg-[#151318] flex flex-col overflow-hidden'>
        <WorkplaceHeader />
        <div className='flex h-[calc(100%-60px)] w-screen'>
          <div className='w-[80px] bg-black h-full text-white overflow-y-auto'>
            {[
              { icon: <LuShapes />, label: "Shape", type: "shape" },
              {
                icon: <RxTransparencyGrid />,
                label: "Background",
                type: "background",
              },
              { icon: <LuImage />, label: "Image", type: "image" },
            ].map(({ icon, label, type }) => (
              <div
                key={type}
                onClick={() => handleTabSelect(type, label.toLowerCase())}
                className={`${
                  panelState.name === label.toLowerCase() ? "bg-[#252627]" : ""
                } w-full h-[80px] cursor-pointer flex flex-col items-center gap-1 hover:text-[#610BEF]`}>
                <span className='text-2xl'>{icon}</span>
                <span className='text-xs font-medium'>{label}</span>
              </div>
            ))}
          </div>

          <div className='h-full w-[calc(100%-75px)]'>
            <div
              className={`${
                panelState.status
                  ? "py-5 -left-[350px]"
                  : "px-8 left-[75px] py-5"
              } bg-[#252627] h-full fixed transition-all w-[350px] z-30 duration-500`}>
              <div
                onClick={() => setPanelState({ name: "", status: true })}
                className='flex absolute justify-center items-center bg-[#252627] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded-full'>
                <MdKeyboardArrowLeft />
              </div>
              {currentTab === "design" && (
                <div className='grid grid-cols-2 gap-2'>
                  <TemplateDesign />
                </div>
              )}
              {currentTab === "background" && (
                <Background setBackground={setBackground} />
              )}
              {currentTab === "image" && <Image drag={setDraggingItem} />}
              {currentTab === "shape" && <Shape drag={setDraggingItem} />}
            </div>

            <div className='flex flex-col items-center gap-8 m-8 overflow-y-auto h-[calc(100%-50px)]'>
              {tests.map((test) => (
                <div
                  key={test.id}
                  onClick={() => setCurrentPage(test.id)}
                  style={{
                    border: currentPage === test.id ? "2px solid blue" : "none",
                  }}>
                  <Test
                    id={`drop-area-${test.id}`}
                    items={items.filter(
                      (item) => item.testId === `drop-area-${test.id}`
                    )}
                    bgLink={backgrounds[test.id] || "white"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default Place;
