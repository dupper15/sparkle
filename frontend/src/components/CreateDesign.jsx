import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import CreateComponent from "../components/CreateComponent";

const CreateDesign = () => {
  const ref = useRef();
  const location = useLocation();
  const state = location.state || {};

  const object = {
    name: "main_frame",
    type: "rect",
    id: Math.floor(Math.random() * 100 + 1),
    nameProject: state.nameProject,
    height: state.height,
    width: state.width,
    z_index: 1,
    color: "red",
    image: "",
  };

  console.log(state);
  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <div ref={ref} className="relative w-auto h-auto overflow-auto">
        <CreateComponent infor={object} current_component={{}} />
      </div>
    </div>
  );
};

export default CreateDesign;
