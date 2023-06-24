import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../layout/Main";
import Login from "../Authentication/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
