import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import CreateComponent from "../../components/CreateComponent";
import { useDroppable } from "@dnd-kit/core";

const Page = React.forwardRef(
  (
    {
      id,
      title,
      bgLink,
      width,
      height,
      upButton,
      downButton,
      removeButton,
      shapes,
      removeElement,
      current_page,
    },
    ref
  ) => {
    const { isOver, setNodeRef } = useDroppable({
      id,
    });

    return (
      <div ref={ref} className='flex flex-col gap-4'>
        <div className='flex justify-between items-center'>
          <div className='text-white text-2xl font-bold'>Page {title}</div>
          <div className='flex gap-2'>
            <IoIosArrowUp
              className='text-slate-400 hover:text-red-600 cursor-pointer text-2xl'
              onClick={upButton}
            />
            <IoIosArrowDown
              className='text-slate-400 hover:text-red-600 cursor-pointer text-2xl'
              onClick={downButton}
            />
            <FaRegTrashCan
              className='text-slate-400 hover:text-red-600 cursor-pointer text-xl'
              onClick={removeButton}
            />
          </div>
        </div>
        <div
          id={id}
          ref={setNodeRef}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            border: isOver ? "2px solid blue" : "transparent",
            backgroundColor: !bgLink ? "white" : "white",
            backgroundImage: bgLink ? `url(${bgLink})` : "",
            backgroundSize: "cover",
            overflow: "hidden",
            zIndex: 0,
          }}
          className='bg-white border relative'>
          {shapes.map((info) => (
            <CreateComponent
              key={info.id}
              info={info}
              current_component={info}
              current_page={current_page}
              removeComponent={removeElement}
            />
          ))}
        </div>
      </div>
    );
  }
);
Page.displayName = "Page";
export default Page;
