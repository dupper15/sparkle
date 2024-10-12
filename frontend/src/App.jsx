import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import WorkplacePage from "./pages/WorkplacePage/WorkplacePage";

//const userInfo = token_decode(localStorage.getItem("sparkle_token"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/edit",
    element: <WorkplacePage />,
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
