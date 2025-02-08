import React, { useState } from "react";
import { useDarkMode } from "../../contexts/DarkModeContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import * as ProjectService from "../../services/ProjectService";
import { addEditor } from "../../redux/slides/projectSlide.js";
import * as Alert from "../Alert/Alert.jsx";

const AddEditorForm = ({ childCloseFormRequest }) => {
  const { isDarkMode } = useDarkMode();
  const [emailNewEditor, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const project = useSelector((state) => state.project);

  const mutation = useMutation({
    mutationFn: (data) => {
      return ProjectService.addEditor(data.id, data.email);
    },
    onError: (error) => {
      const apiErrorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      console.log(error);
      setErrorMessage(apiErrorMessage);
      Alert.error("An unexpected error occurred.");
    },
    onSuccess: (data) => {
      setErrorMessage("");
      const apiSuccessMessage = data.message || "Editor added successfully!";
      Alert.success("Add editor successfully!");
      setSuccessMessage(apiSuccessMessage);
      childCloseFormRequest();
    },
  });

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    if (!emailNewEditor.trim()) {
      setErrorMessage("Email cannot be empty.");
      return;
    }
    mutation.mutate({ id: project.id, email: emailNewEditor });
  };

  return (
    <div
      className={`fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-[5] h-[300px] w-[300px] flex flex-col items-center justify-center p-6 rounded-lg shadow-lg text-center ${
        isDarkMode ? "bg-gray-800" : "bg-gray-100"
      }`}>
      <button
        className='absolute top-2 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl'
        onClick={() => childCloseFormRequest(false)}>
        ×
      </button>
      <h1
        className={`text-xl font-semibold mb-6 ${
          isDarkMode ? "text-white" : "text-black"
        }`}>
        Add member for your project
      </h1>
      <div>
        <input
          name='email'
          value={emailNewEditor}
          onChange={handleOnChange}
          type='email'
          placeholder='Enter editor email...'
          className={`w-full p-3 mb-4 border-2 border-indigo-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        />
      </div>
      {errorMessage && (
        <p className='text-red-500 text-sm mb-2'>{errorMessage}</p>
      )}
      {successMessage && (
        <p className='text-green-500 text-sm mb-2'>{successMessage}</p>
      )}
      <button
        onClick={handleSubmit}
        className='w-[120px] py-3 mt-4 font-bold text-white rounded-md bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90'>
        Add
      </button>
    </div>
  );
};

export default AddEditorForm;
