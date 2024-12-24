import React, { useEffect, useState } from "react";
import { useDarkMode } from "../../../contexts/DarkModeContext";
import { useDispatch, useSelector } from "react-redux";
import { useMutationHooks } from "../../../hooks/useMutationHook";
import * as UserService from "../../../services/UserService";
import * as Alert from "../../Alert/Alert";
import { useMutation } from "@tanstack/react-query";

const FormChangePassword = ({ closeForm }) => {
  const user = useSelector((state) => state.user);
  const { isDarkMode } = useDarkMode();
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // const mutation = useMutationHooks((data) => {
  //     const { id, access_token, ...rests } = data;
  //     UserService.changePassword(id, rests, access_token);
  // });

  const mutation = useMutation({
    mutationFn: (data) => {
      const { id, access_token, ...rests } = data;
      return UserService.changePassword(id, rests, access_token);
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
    },
  });

  const { data, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      Alert.success(successMessage);
      closeForm();
    }
  }, [isSuccess, successMessage, closeForm]);

  const handleOnPasswordCurrent = (e) => {
    setPasswordCurrent(e.target.value);
  };
  const handleOnPasswordNew = (e) => {
    setPasswordNew(e.target.value);
  };
  const handleOnPasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleUpdatePassword = () => {
    try {
      mutation.mutate({
        id: user?.id,
        passwordCurrent,
        passwordNew,
        passwordConfirm,
        access_token: user?.access_token,
      });
    } catch (error) {
      Alert.error("Failed to change password");
      console.error(error);
    }
  };

  return (
    <div
      className={`relative h-[400px] w-[600px] flex-column items-center justify-center p-6 rounded-lg shadow-lg text-center ${
        isDarkMode ? "bg-gray-800" : "bg-gray-100"
      }`}>
      <button
        onClick={closeForm}
        className='absolute top-2 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl'>
        ×
      </button>
      <h2
        className={`text-lg font-semibold mb-6 ${
          isDarkMode ? "text-white" : "text-black"
        }`}>
        Change password
      </h2>
      <div>
        <input
          name='password'
          type='text'
          value={passwordCurrent}
          onChange={handleOnPasswordCurrent}
          placeholder='Enter current password...'
          className={`w-full p-3 mb-4 border-2 border-indigo-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        />
      </div>
      <div>
        <input
          name='new_password'
          type='password'
          value={passwordNew}
          onChange={handleOnPasswordNew}
          placeholder='Enter new password...'
          className={`w-full p-3 mb-4 border-2 border-indigo-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        />
      </div>
      <div>
        <input
          name='confirm_password'
          type='password'
          value={passwordConfirm}
          onChange={handleOnPasswordConfirm}
          placeholder='Enter confirm password...'
          className={`w-full p-3 mb-4 border-2 border-indigo-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        />
      </div>
      {errorMessage && typeof errorMessage === "string" && (
        <div className='text-red-500'>{errorMessage}</div>
      )}
      <button
        onClick={handleUpdatePassword}
        className='w-[120px] py-3 mt-4 font-bold text-white rounded-md bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90'>
        Save
      </button>
    </div>
  );
};

export default FormChangePassword;
