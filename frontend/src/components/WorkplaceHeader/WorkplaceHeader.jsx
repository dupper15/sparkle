import { FaPlus } from "react-icons/fa6";
import avt from "../../assets/default-profile-icon.png";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useEffect, useReducer } from "react";
import AddEditorForm from "../AddEditorForm/AddEditorForm";
import { useMutation } from "@tanstack/react-query";
import * as ProjectService from "../../services/ProjectService";

const initialState = {
  isShow: false,
  errorMessage: "",
  avatars: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_SHOW":
      return { ...state, isShow: !state.isShow };
    case "SET_ERROR":
      return { ...state, errorMessage: action.payload };
    case "SET_AVATARS":
      return { ...state, avatars: action.payload };
    default:
      return state;
  }
}

const WorkplaceHeader = ({ usersInRoom }) => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const mutation = useMutation({
    mutationFn: (data) => {
      return ProjectService.getAvatar(data.usersInRoom);
    },
    onError: (error) => {
      const apiErrorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      console.error(error);
      dispatch({ type: "SET_ERROR", payload: apiErrorMessage });
    },
    onSuccess: (data) => {
      console.log("Dữ liệu nhận được:", data);
      dispatch({ type: "SET_AVATARS", payload: data.avatars || [] });
    },
  });

  const toggleAddMember = () => {
    dispatch({ type: "TOGGLE_SHOW" });
  };

  const goHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    if (usersInRoom.length > 0) {
      mutation.mutate({ usersInRoom });
    }
  }, [usersInRoom]);

  return (
    <div
      className={`flex items-center justify-between w-full h-[50px] px-5 py-8 ${
        isDarkMode ? "bg-[#18191B]" : "bg-gray-200"
      }`}>
      <div className='flex items-center gap-2'>
        <div className="w-[40px] h-[40px] bg-[url('./assets/logo.png')] bg-cover bg-center" />
        <div
          onClick={goHome}
          className={`text-3xl font-bold cursor-pointer ${
            isDarkMode ? "text-white" : "text-black"
          }`}>
          Sparkle
        </div>
      </div>
      <div className='flex items-center gap-5 '>
        <div className='hidden md:flex md:items-center relative mr-6'>
          <div className='flex flex-row-reverse'>
            {state.avatars.map((value, index) => (
              <div
                key={index}
                className='w-[40px] h-[40px] rounded-full overflow-hidden border-2 border-white'
                style={{
                  marginLeft:
                    index !== state.avatars.length - 1 ? "-15px" : "0",
                  zIndex: state.avatars.length - index,
                }}>
                <img
                  src={value || avt}
                  alt='Avatar'
                  className='w-full h-full object-cover'
                />
              </div>
            ))}
          </div>

          <button
            onClick={toggleAddMember}
            className='w-[40px] h-[40px] bg-white font-semibold rounded-full
      border-2 shadow-sm cursor-pointer text-[#4335DE] flex justify-center
      items-center p-2 hover:bg-slate-200'
            style={{
              position: "absolute",
              top: "50%",
              left: "calc(100% - 15px)",
              zIndex: 50,
              transform: "translateY(-50%)",
            }}>
            <FaPlus className='w-[30px] h-[30px]' />
          </button>
        </div>

        {state.isShow && (
          <>
            <div
              className='fixed inset-0 bg-black bg-opacity-50 z-[9998]'
              onClick={toggleAddMember}></div>
            <div className='fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-[9999] animate-fade-in'>
              <AddEditorForm
                childCloseFormRequest={toggleAddMember}
                onCreate={(data) => console.log("Member added:", data)}
              />
            </div>
          </>
        )}

        <button className='w-[100px] h-[40px] bg-gradient font-semibold rounded-lg shadow-sm cursor-pointer border-black flex justify-center items-center p-2'>
          <span className='text-white'>Download</span>
        </button>

        <button
          onClick={() => console.log("userInRoom", usersInRoom)}
          className='w-[100px] h-[40px] bg-white font-semibold rounded-lg border-2 border-black shadow-sm cursor-pointer text-black flex justify-center items-center p-2 hover:bg-slate-200'>
          <span className='gradient'>Share</span>
        </button>
      </div>
    </div>
  );
};

export default WorkplaceHeader;
