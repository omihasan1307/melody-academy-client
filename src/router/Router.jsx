import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Login from "../Authentication/Login";
import Registration from "../Authentication/Registration";
import Dashboard from "../Pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
