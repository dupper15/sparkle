import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import WorkplacePage from "./pages/WorkplacePage/WorkplacePage";
import HomePage from "./pages/HomePage/HomePage";
import ProjectPage from "./pages/ProjectPage/ProjectPage.jsx";

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
]);
export default function App() {
  return <RouterProvider router={router} />;
}
