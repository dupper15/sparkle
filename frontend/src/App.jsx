import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClient và QueryClientProvider
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import WorkplacePage from "./pages/WorkplacePage/WorkplacePage";
import HomePage from "./pages/HomePage/HomePage";
import ProjectPage from "./pages/ProjectPage/ProjectPage.jsx";
import MyAccountPage from "./pages/MyAccountPage/MyAccountPage.jsx";
import SettingPage from "./pages/SettingPage/SettingPage.jsx";
import TemplatePage from "./pages/TemplatePage/TemplatePage.jsx";
import TestingPage from "./pages/TestingPage/TestingPage.jsx";
import CreateDesign from "./components/CreateDesign.jsx";
import Place from "./pages/place.jsx";
import HeroPage from "./pages/HeroPage/HeroPage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import { DarkModeProvider } from "./contexts/DarkModeContext.jsx";
import { useEffect } from "react";
import { isJsonString } from "./utils/utils.js";
import { jwtDecode } from 'jwt-decode';
import * as UserService from "../src/services/UserService.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import { decode } from "punycode";
import { updateUser } from "./redux/slides/userSlide.js";


// Tạo đối tượng queryClient
const queryClient = new QueryClient();

// Định nghĩa các route
const router = createBrowserRouter([
  {
    path: "/",
    element: <HeroPage/>
  },
  {
    path:  "/sign-up",
    element: <SignupPage/>
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/edit",
    element: <WorkplacePage />,
  },
  {
    path: "/template",
    element: <TemplatePage />,
  },
  {
    path: "/project",
    element: <ProjectPage />,
  },
  {
    path: "/my-account",
    element: <MyAccountPage />,
  },
  {
    path: "/settings",
    element: <SettingPage />,
  },
  {
    path: "/design/create",
    element: <CreateDesign />,
  },
  {
    path: "/te",
    element: <Place />,
  },
]);


export default function App() {
  

  const dispatch = useDispatch()

  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token)
    dispatch(updateUser({...res?.data, access_token: token}))
  }
  useEffect(() => {
    const {storageData, decoded} = handleDecoded()
    if (decoded?.id){
        handleGetDetailUser(decoded?.id, storageData)
    }
  }, [])

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData)){
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
    }
    return { decoded, storageData}
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const { decoded} = handleDecoded()
    if(decoded?.exp < currentTime.getTime()/1000){
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });   

  return (
   <DarkModeProvider>
     <QueryClientProvider client={queryClient}> 
      <RouterProvider router={router} />
    </QueryClientProvider>
   </DarkModeProvider>
  );
}
