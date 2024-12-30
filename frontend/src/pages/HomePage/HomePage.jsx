import Header from "../../components/SharedComponents/Header/Header.jsx";
import Banner from "../../components/SharedComponents/Banner/Banner.jsx";
import CustomCarousel from "../../components/SharedComponents/Carousel/CustomCarousel.jsx";
import Footer from "../../components/SharedComponents/Footer/Footer.jsx";
import Sidebar from "../../components/SharedComponents/SideBar/Sidebar.jsx";
import { useDarkMode } from "../../contexts/DarkModeContext.jsx";
import ResponsiveGridTemplate from "../../components/SharedComponents/ResponsiveGrid/ResponsiveGridTemplate.jsx";
import { Link } from "react-router-dom";
import SlideBanner from "../../components/SlideBanner/SlideBanner.jsx";
import { useState } from "react";
import { useMutationHooks } from "../../hooks/useMutationHook.js";
import * as ProjectService from "../../services/ProjectService";
import * as Alert from "../../components/Alert/Alert.jsx";
import { CiWarning } from "react-icons/ci";

const HomePage = () => {
  const { isDarkMode } = useDarkMode();
  const [isDelete, setDelete] = useState(false);
  const [id, setId] = useState("");
  const [refresh, setRefresh] = useState(false);

  const handleDelete = (id) => {
    setId(id);
    setDelete(!isDelete);
    setRefresh(!refresh);
  };

  const handleConfirmDelete = async () => {
    try {
      mutationDelete.mutateAsync({
        projectId: id,
      });
      setDelete(!isDelete);
      Alert.success("Delete successfully");
    } catch (error) {
      console.error("Error saving renamed project:", error);
      // Bạn có thể thêm logic hiển thị thông báo lỗi ở đây
    }
  };

  const mutationDelete = useMutationHooks(
    async (data) => {
      const id = data.projectId;
      await ProjectService.deleteProject(id);
    },
    {
      onSuccess: () => {},
    }
  );

  return (
    <div
      className={`h-screen flex flex-col overflow-y-auto ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}>
      <header className="z-40">
        <Header />
      </header>
      <div
        className={`flex w-full ${
          isDarkMode ? "bg-[#101010] text-white" : "bg-white text-black"
        }`}>
        <Sidebar />
        <div className="w-[calc(100%-80px)] flex flex-col h-full pb-5">
          <div className=" w-full md:mt-2 md:mb-4 pr-10 pl-12">
            {/* <Banner></Banner> */}
            <SlideBanner></SlideBanner>
          </div>
          <div className="">
            <div className="flex justify-between items-center mx-10 my-2">
              <div className="ml-2 text-2xl font-bold w-max pointer-events-none">
                Recent designs
              </div>
              <Link
                to="../project"
                className="mr-2 text-right underline font-bold hover:text-orange-500"
                href="">
                See all
              </Link>
            </div>
            <div className="px-8">
              <CustomCarousel
                onDelete={(projectId) =>
                  handleDelete(projectId)
                }></CustomCarousel>
            </div>
          </div>
          <div className="">
            <div className="flex justify-between items-center mx-10 my-2">
              <div className="ml-2 text-2xl font-bold w-max pointer-events-none">
                Top trending
              </div>
              <Link
                to="../template"
                className="mr-2 text-right underline font-bold hover:text-orange-500"
                href="">
                See all
              </Link>
            </div>
            <div className="px-8">
              <ResponsiveGridTemplate />
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
      {isDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black dark:bg-[#181818] dark:text-white p-6 rounded-3xl shadow-lg w-96">
            <div className="flex flex-col items-center justify-center">
              <CiWarning className="text-red-500 text-5xl font-bold mt-2" />
              <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            </div>
            <p className="mb-4">This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDelete(!isDelete)}
                className="px-4 py-2 bg-gray-200 rounded-xl text-gray-800 hover:bg-gray-300">
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-2xl hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
