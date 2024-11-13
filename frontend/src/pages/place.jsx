import React, { useState } from "react";
import { LuShapes } from "react-icons/lu";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { DndContext } from "@dnd-kit/core";
import WorkplaceHeader from "../components/WorkplaceHeader/WorkplaceHeader";
import TemplateDesign from "../components/Template/TemplateDesign";
import Shape from "./../components/Shape/Shape";
import Test from "../components/test";

const Place = () => {
  const [draggingShape, setDraggingShape] = useState(null);
  const [shapes, setShapes] = useState([]);
  const [tests, setTests] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]); // Tạo 3 trang Test mẫu

  const updateShapes = (newItem, testId) => {
    setShapes((prevShapes) => [...prevShapes, { ...newItem, testId }]);
  };

  const [show, setShow] = useState({
    status: true,
    name: "",
  });
  const [state, setState] = useState("");
  const setElements = (type, name) => {
    setState(type);
    setShow({
      status: false,
      name,
    });
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

      // Lưu hình mới vào trang Test tương ứng với vùng thả
      updateShapes(
        {
          id: Date.now(),
          shapeType: draggingShape.shapeType,
          x: relativeX,
          y: relativeY,
        },
        over.id // Lưu testId là ID của vùng thả
      );
    }
    setDraggingShape(null);
  };
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className='w-screen h-screen bg-no-repeat bg-cover bg-[#151318] flex flex-col scrollbar-hide overflow-hidden'>
        <WorkplaceHeader />
        <div className='flex h-[calc(100%-60px)] w-screen scrollbar-hide'>
          <div className='w-[80px] bg-black z-50 scrollbar-hide h-full text-white overflow-y-auto'>
            {[{ icon: <LuShapes />, label: "Shape", type: "shape" }].map(
              ({ icon, label, type }) => (
                <div
                  key={type}
                  onClick={() => setElements(type, label.toLowerCase())}
                  className={`${
                    show.name === label.toLowerCase() ? "bg-[#252627]" : ""
                  } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF]`}>
                  <span className='text-2xl'>{icon}</span>
                  <span className='text-xs font-medium'>{label}</span>
                </div>
              )
            )}
          </div>

          <div className='h-full w-[calc(100%-75px)]'>
            <div
              className={`${
                show.status ? "py-5 -left-[350px]" : "px-8 left-[75px] py-5"
              } bg-[#252627] h-full fixed transition-all w-[350px] z-30 duration-500`}>
              <div
                onClick={() => setShow({ name: "", status: true })}
                className='flex absolute justify-center items-center bg-[#252627] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded-full'>
                <MdKeyboardArrowLeft />
              </div>
              {state === "design" && (
                <div className='grid grid-cols-2 gap-2'>
                  <TemplateDesign />
                </div>
              )}
              {state === "shape" && (
                <Shape addNewShape={updateShapes} drag={setDraggingShape} />
              )}
            </div>
            <div className='flex flex-col items-center justify-start gap-8 m-8 overflow-y-auto h-[calc(100%-50px)] scrollbar-hide'>
              {tests.map((test) => (
                <Test
                  key={test.id}
                  id={`drop-area-${test.id}`}
                  shapes={shapes.filter(
                    (shape) => shape.testId === `drop-area-${test.id}`
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default Place;
