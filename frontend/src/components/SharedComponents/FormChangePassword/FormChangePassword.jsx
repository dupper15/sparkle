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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
      <div
        className={`relative w-full max-w-md flex flex-col border border-slate-500 p-8 rounded-xl shadow-2xl ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}>
        <button
          onClick={closeForm}
          className="absolute top-2 right-4 text-gray-400 hover:text-red-500 font-bold text-2xl transition duration-200">
          ×
        </button>
        <h2 className="text-xl font-semibold mb-6 text-center text-transparent bg-gradient-to-r from-[#ffa500] to-[#fae500] bg-clip-text">
          Change Password
        </h2>
        <div className="space-y-4">
          <input
            name="password"
            type="password"
            value={passwordCurrent}
            onChange={handleOnPasswordCurrent}
            placeholder="Enter current password..."
            className={`w-full p-3 border-2 rounded-md focus:outline-none focus:ring-1 ${
              isDarkMode
                ? "bg-black text-white border-gray-700 focus:ring-orange-500"
                : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-orange-500"
            }`}
          />
          <input
            name="new_password"
            type="password"
            value={passwordNew}
            onChange={handleOnPasswordNew}
            placeholder="Enter new password..."
            className={`w-full p-3 border-2 rounded-md focus:outline-none focus:ring-1 ${
              isDarkMode
                ? "bg-black text-white border-gray-700 focus:ring-orange-500"
                : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-orange-500"
            }`}
          />
          <input
            name="confirm_password"
            type="password"
            value={passwordConfirm}
            onChange={handleOnPasswordConfirm}
            placeholder="Confirm new password..."
            className={`w-full p-3 border-2 rounded-md focus:outline-none focus:ring-1 ${
              isDarkMode
                ? "bg-black text-white border-gray-700 focus:ring-orange-500"
                : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-orange-500"
            }`}
          />
        </div>
        {errorMessage && typeof errorMessage === "string" && (
          <div className="mt-2 text-sm text-center text-red-500">
            {errorMessage}
          </div>
        )}
        <button
          onClick={handleUpdatePassword}
          className="w-full py-3 mt-6 font-semibold rounded-md bg-gradient text-white hover:opacity-90 transition duration-200">
          Save
        </button>
      </div>
    </div>
  );
};

export default FormChangePassword;
