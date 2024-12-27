import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as ProjectService from "../../services/ProjectService";
import * as Alert from "../Alert/Alert.jsx";
import { useSelector } from "react-redux";

const JoinForm = ({ childCloseFormRequest }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/home");
  };

  const urlPath = window.location.pathname;
  const id = urlPath.split("/")[1];

  const project = useSelector((state) => state.project);
  const user = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const mutation = useMutation({
    mutationFn: (data) => {
      return ProjectService.addEditor(data.id, data.email);
    },
    onError: (error) => {
      const apiErrorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      console.log(error);
      setErrorMessage(apiErrorMessage);
    },
    onSuccess: (data) => {
      setErrorMessage("");
      const apiSuccessMessage = data.message || "Editor added successfully!";
      Alert.success("Join successfully!");
      setSuccessMessage(apiSuccessMessage);
      childCloseFormRequest();
    },
  });

  const handleJoin = () => {
    mutation.mutate({ id: id, email: user.email });
    navigate("/project");
  };

  return (
    <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] h-[150px] w-[500px] flex flex-col items-center justify-center p-6 rounded-lg shadow-lg text-center bg-gray-100 dark:bg-gray-800">
      <h1 className="text-xl font-semibold text-black dark:text-white  ">
        Do you want to join this project?
      </h1>
      <div className="w-[400px] space-x-10 justify-around mt-4">
        <button
          onClick={handleCancel}
          className="p-2 w-[100px] bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition">
          Cancel
        </button>
        <button
          onClick={handleJoin}
          className="p-2 w-[100px] bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          Join
        </button>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="text-green-500 text-sm mb-2">{successMessage}</p>
      )}
    </div>
  );
};

export default JoinForm;
