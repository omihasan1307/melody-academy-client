import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Login from "../Authentication/Login";
import Registration from "../Authentication/Registration";
import Dashboard from "../Pages/Dashboard";
import NotFound from "../Shared/NotFound";
import Home from "../Pages/Home/Home";
import Admin from "../Admin/Admin";
import AllUsers from "../Admin/AllUsers";
import Instructor from "../Instructor/Instructor";
import AddClasses from "../Instructor/AddClasses";
import Profile from "../Instructor/Profile";
import Classes from "../Instructor/Classes";
import PrivateRoutes from "./PrivateRoutes";

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
        path: "instructor",
        element: (
          <PrivateRoutes>
            <Instructor />
          </PrivateRoutes>
        ),
        children: [
          {
            path: "addClasses",
            element: <AddClasses />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "classes",
            element: <Classes />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <PrivateRoutes>
        <Admin />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "users",
        element: <AllUsers />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
