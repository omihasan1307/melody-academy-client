import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Login from "../Authentication/Login";
import Registration from "../Authentication/Registration";
import Dashboard from "../Pages/Dashboard";
import NotFound from "../Shared/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
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
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
