import { useState } from "react";

const ShareProject = ({ childCloseFormRequest }) => {
  const currentUrl = window.location.href;

  const [isCopied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setCopied(true);
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
  };

  return (
    <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] h-[150px] w-[500px] flex flex-col items-center justify-center p-6 rounded-lg shadow-lg text-center bg-gray-100 dark:bg-gray-800">
      <button
        className="absolute top-2 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl"
        onClick={() => childCloseFormRequest(false)}>
        ×
      </button>
      <h1 className="text-xl font-semibold text-black dark:text-white  ">
        Share your project
      </h1>
      <p>Anyone with the link can edit your project</p>
      <div className="w-[400px] flex flex-row">
        <input
          type="text"
          value={currentUrl}
          readOnly
          className="w-full p-1 mt-2 border-2 border-gray-300 rounded-lg text-gray-700 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleCopy}
          className="p-1 mt-2 ml-2 w-[100px] bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          {isCopied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
};

export default ShareProject;
