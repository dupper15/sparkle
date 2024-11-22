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

  return (
   <DarkModeProvider>
     <QueryClientProvider client={queryClient}> 
      <RouterProvider router={router} />
    </QueryClientProvider>
   </DarkModeProvider>
  );
}
