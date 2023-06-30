import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Login from "../Authentication/Login";
import Registration from "../Authentication/Registration";
import Dashboard from "../Pages/Dashboard";
import NotFound from "../Shared/NotFound";
import Home from "../Pages/Home/Home";
import Admin from "../Admin/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "registration",
        element: <Registration />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
