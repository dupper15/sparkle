import { useEffect, useState } from "react";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useMutation } from "@tanstack/react-query";
import * as ProjectService from '../../services/ProjectService'
import * as Alert from '../Alert/Alert'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProject } from "../../redux/slides/projectSlide";

const CustomizeSizeDialogue = ({ childCloseFormRequest, onCreate  }) => {
  const { isDarkMode } = useDarkMode();
  const user = useSelector((state) => state.user)
  const project = useSelector((state) => state.project)
  const [projectName, setProjectName] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const mutation = useMutation(
    {
      mutationFn: (data) => {
        const { id, ...rests } = data; 
        return ProjectService.createProject(id, rests);
      },
      onError: (error) => {
        const apiErrorMessage = error.response?.data?.message || "An unexpected error occurred.";
        setErrorMessage(apiErrorMessage.message === undefined ? apiErrorMessage : apiErrorMessage.message);
      },
      onSuccess: (data) => {
        setErrorMessage(""); // Reset error message on success
        const apiSuccessMessage = data.message || "Operation successful!";
        setSuccessMessage(apiSuccessMessage);
        const projectId = data.data._id;
        console.log('project id', projectId)
        localStorage.setItem('projectId', projectId);

        dispatch(updateProject(data.data));
        navigate(`/${projectId}/edit`); 
        childCloseFormRequest(); 
      },
    }
  )
  
  const handleOnName = (e) => {
    setProjectName(e.target.value)
  }
  const handleOnWidth = (e) => {
    setWidth(e.target.value)
  }
  const handleOnHeight = (e) => {
    setHeight(e.target.value)
  }

  const createProject = () => {
      mutation.mutate({id: user?.id , projectName, width, height })
      onCreate({
        projectName: projectName,
        width: parseInt(width),
        height: parseInt(height),
      }); 
  };

  const { data, isSuccess, isError } = mutation;
    
  useEffect(() => {
      if(isSuccess){
        Alert.success(successMessage)
      } else if (isError){
        Alert.error(errorMessage)
      }
  },[isSuccess, isError, successMessage, errorMessage ])

  return (
    <div
      className={`relative h-[400px] w-[600px] flex-column items-center justify-center p-6 rounded-lg shadow-lg text-center ${
        isDarkMode ? "bg-gray-800" : "bg-gray-100"
      }`}>
      <button
        className="absolute top-2 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl"
        onClick={() => childCloseFormRequest(false)}>
        ×
      </button>
      <h2
        className={`text-lg font-semibold mb-6 ${
          isDarkMode ? "text-white" : "text-black"
        }`}>
        Customize size
      </h2>
      <div>
        <input
          name="name"
          onChange={handleOnName}
          type="text"
          placeholder="Enter name..."
          className={`w-full p-3 mb-4 border-2 border-indigo-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        />
      </div>
      <div>
        <input
          name="width"
          onChange={handleOnWidth}
          type="number"
          placeholder="Enter width..."
          className={`w-full p-3 mb-4 border-2 border-indigo-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        />
      </div>
      <div>
        <input
          name="height"
          onChange={handleOnHeight}
          type="number"
          placeholder="Enter height..."
          className={`w-full p-3 mb-4 border-2 border-indigo-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        />
      </div>
      <button
        onClick={createProject}
        className="w-[120px] py-3 mt-4 font-bold text-white rounded-md bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90">
        Create
      </button>
    </div>
  );
};

export default CustomizeSizeDialogue;
