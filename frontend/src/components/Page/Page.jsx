import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import CreateComponent from "../../components/CreateComponent";

const Page = React.forwardRef(
  (
    {
      title,
      width,
      height,
      upButton,
      downButton,
      removeButton,
      components,
      removeElement,
    },
    ref
  ) => {
    return (
      <div ref={ref} className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl font-bold">Page {title}</div>
          <div className="flex gap-2">
            <IoIosArrowUp
              className="text-slate-400 hover:text-red-600 hover:cursor-pointer text-2xl"
              onClick={upButton}
            />
            <IoIosArrowDown
              className="text-slate-400 hover:text-red-600 hover:cursor-pointer text-2xl"
              onClick={downButton}
            />
            <FaRegTrashCan
              className="text-slate-400 hover:text-red-600 hover:cursor-pointer text-xl"
              onClick={removeButton}
            />
          </div>
        </div>
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
          className="bg-white border border-gray-300 relative"
        >
          {components.map((info) => (
            <CreateComponent
              key={info.id}
              info={info}
              current_component={info} // Truyền component hiện tại
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
