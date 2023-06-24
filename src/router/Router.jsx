import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../layout/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
      },
    ],
  },
]);

export default router;
