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
import CarouselTemplate from "../../components/SharedComponents/Carousel/CarouselTemplate.jsx";
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
      <header className='z-40'>
        <Header />
      </header>

      <div
        className={`flex flex-col md:flex-row w-full ${
          isDarkMode ? "bg-[#101010] text-white" : "bg-white text-black"
        }`}>
        {/* Sidebar */}
        <Sidebar className='hidden md:block' />

        {/* Nội dung chính */}
        <div className='w-full md:w-[calc(100%-80px)] flex flex-col h-full pb-5'>
          {/* SlideBanner */}
          <div className='w-full md:mt-2 md:mb-4 px-4 md:pr-10 md:pl-12'>
            <SlideBanner />
          </div>

          {/* Recent Designs */}
          <div className='px-4 md:px-8'>
            <div className='flex justify-between items-center my-2 md:ml-2'>
              <div className='text-lg md:text-2xl font-bold pointer-events-none'>
                Your recent design
              </div>
              <Link
                to='../project'
                className='text-sm md:text-right underline font-bold hover:text-[#4335DE]'>
                See all
              </Link>
            </div>
            <CustomCarousel onDelete={(projectId) => handleDelete(projectId)} />
          </div>

          {/* Hot Trending */}
          <div className='px-4 md:px-8'>
            <div className='flex justify-between items-center my-2 md:ml-2'>
              <div className='text-lg md:text-2xl font-bold pointer-events-none'>
                Hot Trending
              </div>
              <Link
                to='../template'
                className='text-sm md:text-right underline font-bold hover:text-[#4335DE]'>
                See all
              </Link>
            </div>
            <CarouselTemplate />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Delete Confirmation */}
      {isDelete && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white p-4 md:p-6 rounded shadow-lg w-11/12 md:w-96'>
            <h2 className='text-lg font-bold mb-4'>Confirm delete</h2>
            <p className='mb-4'>
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
            <div className='flex justify-end space-x-4'>
              <button
                onClick={() => setDelete(!isDelete)}
                className='px-4 py-2 bg-gray-200 rounded text-gray-800 hover:bg-gray-300'>
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
