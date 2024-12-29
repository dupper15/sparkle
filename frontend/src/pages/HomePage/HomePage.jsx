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

const HomePage = () => {
  const { isDarkMode } = useDarkMode();
  const [isDelete, setDelete] = useState(false);
  const [id, setId] = useState("");

  const handleDelete = (id) => {
    setId(id);
    setDelete(!isDelete);
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
        className={`flex w-full ${
          isDarkMode ? "bg-[#101010] text-white" : "bg-white text-black"
        }`}>
        <Sidebar />
        <div className='w-[calc(100%-80px)] flex flex-col h-full pb-5'>
          <div className=' w-full md:mt-2 md:mb-4 pr-10 pl-12'>
            {/* <Banner></Banner> */}
            <SlideBanner></SlideBanner>
          </div>
          <div className=''>
            <div className='flex justify-between items-center mx-10 my-2'>
              <div className='ml-2 text-2xl font-bold w-max pointer-events-none'>
                Your recent design
              </div>
              <Link
                to='../project'
                className=' text-right underline font-bold hover:text-[#4335DE]'
                href=''>
                See all
              </Link>
            </div>
            <div className='px-8'>
              <CustomCarousel
                onDelete={(projectId) =>
                  handleDelete(projectId)
                }></CustomCarousel>
            </div>
          </div>
          <div className=''>
            <div className='flex justify-between items-center mx-10 my-2'>
              <div className='ml-2 text-2xl font-bold w-max pointer-events-none'>
                Hot Trending
              </div>
              <Link
                to='../template'
                className='mr-2 text-right underline font-bold hover:text-[#4335DE]'
                href=''>
                See all
              </Link>
            </div>
            <div className='px-8'>
              <ResponsiveGridTemplate />
            </div>
          </div>
        </div>
      </div>
      <div className=''>
        <Footer />
      </div>
      {isDelete && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white p-6 rounded shadow-lg w-96'>
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
