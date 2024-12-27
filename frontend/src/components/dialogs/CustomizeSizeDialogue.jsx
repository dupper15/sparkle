import { useEffect, useState } from "react";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useMutation } from "@tanstack/react-query";
import * as ProjectService from "../../services/ProjectService";
import * as Alert from "../Alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProject } from "../../redux/slides/projectSlide";

const CustomizeSizeDialogue = ({ childCloseFormRequest, onCreate }) => {
  const { isDarkMode } = useDarkMode();
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project);
  const [projectName, setProjectName] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false); // Thêm state isLoading

  const mutation = useMutation({
    mutationFn: (data) => {
      const { id, ...rests } = data;
      return ProjectService.createProject(id, rests);
    },
    onError: (error) => {
      const apiErrorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      setErrorMessage(
        apiErrorMessage.message === undefined
          ? apiErrorMessage
          : apiErrorMessage.message
      );
    },
    onSuccess: (data) => {
      setErrorMessage(""); // Reset error message on success
      const apiSuccessMessage = data.message || "Operation successful!";
      setSuccessMessage(apiSuccessMessage);
      const projectId = data.data._id;
      console.log("project id", projectId);
      localStorage.setItem("projectId", projectId);

      dispatch(updateProject(data.data));
      navigate(`/${projectId}/edit`);
      childCloseFormRequest();
    },
  });

  const handleOnName = (e) => {
    setProjectName(e.target.value);
  };
  const handleOnWidth = (e) => {
    setWidth(e.target.value);
  };
  const handleOnHeight = (e) => {
    setHeight(e.target.value);
  };

  const createProject = async () => {
    setIsLoading(true);
    try {
      await mutation.mutateAsync({ id: user?.id, projectName, width, height });

      onCreate({
        projectName: projectName,
        width: parseInt(width),
        height: parseInt(height),
      });
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const { data, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      Alert.success(successMessage);
    } else if (isError) {
      Alert.error(errorMessage);
    }
  }, [isSuccess, isError, successMessage, errorMessage]);

  return (
    <div
      className={`relative h-auto w-[400px] flex flex-col border-2 border-slate-500 items-center justify-center p-8 rounded-xl shadow-2xl ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}>
      {/* Nút Đóng */}
      <button
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 font-bold text-2xl"
        onClick={() => childCloseFormRequest(false)}>
        &times;
      </button>

      {/* Tiêu Đề */}
      <h2
        className={`text-2xl font-bold mb-6 ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}>
        Customize Size
      </h2>

      {/* Input Name */}
      <div className="w-full mb-4">
        <label
          className={`block mb-2 text-sm font-medium ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
          Project Name
        </label>
        <input
          name="name"
          onChange={handleOnName}
          type="text"
          placeholder="Enter name..."
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
            isDarkMode
              ? "bg-gray-800 text-white border-gray-700 focus:ring-indigo-400"
              : "bg-gray-100 text-gray-800 border-gray-300 focus:ring-indigo-500"
          }`}
        />
      </div>

      {/* Input Width */}
      <div className="w-full mb-4">
        <label
          className={`block mb-2 text-sm font-medium ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
          Width (px)
        </label>
        <input
          name="width"
          onChange={handleOnWidth}
          type="text"
          placeholder="Enter width..."
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
            isDarkMode
              ? "bg-gray-800 text-white border-gray-700 focus:ring-indigo-400"
              : "bg-gray-100 text-gray-800 border-gray-300 focus:ring-indigo-500"
          }`}
        />
      </div>

      {/* Input Height */}
      <div className="w-full mb-6">
        <label
          className={`block mb-2 text-sm font-medium ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
          Height (px)
        </label>
        <input
          name="height"
          onChange={handleOnHeight}
          type="text"
          placeholder="Enter height..."
          className={`w-full p-3 border rounded-lg focus:outline-none  ${
            isDarkMode
              ? "bg-gray-800 text-white border-gray-700 focus:ring-indigo-400"
              : "bg-gray-100 text-gray-800 border-gray-300 focus:ring-indigo-500"
          }`}
        />
      </div>

      {/* Nút Tạo */}
      <button
        onClick={createProject}
        disabled={isLoading}
        className="w-full py-3 font-bold text-white rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 focus:ring-4 focus:ring-blue-300">
        {isLoading ? "Creating..." : "Create Project"}
      </button>
    </div>
  );
};

export default CustomizeSizeDialogue;
