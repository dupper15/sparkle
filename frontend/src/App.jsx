import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import WorkplacePage from "./pages/WorkplacePage/WorkplacePage";
import HomePage from "./pages/HomePage/HomePage";
import ProjectPage from "./pages/ProjectPage/ProjectPage.jsx";
import MyAccountPage from "./pages/MyAccountPage/MyAccountPage.jsx";
import SettingPage from "./pages/SettingPage/SettingPage.jsx";
import TemplatePage from "./pages/TemplatePage/TemplatePage.jsx";
import TestingPage from "./pages/TestingPage/TestingPage.jsx";

//const userInfo = token_decode(localStorage.getItem("sparkle_token"));
const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
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
        path:"/testing",
        element: <TestingPage />,
    {
        path: "/projects",
        element: <ProjectPage />,
    },
    {
        path: "/my-account",
        element: <MyAccountPage />,
    },
    {
        path: "/setting",
        element: <SettingPage />,
    },
]);
export default function App() {
    return <RouterProvider router={router} />;
}
