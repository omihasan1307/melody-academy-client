import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Login from "../Authentication/Login";
import Registration from "../Authentication/Registration";
import NotFound from "../Shared/NotFound";
import Home from "../Pages/Home/Home";
import Admin from "../Admin/Admin";
import AllUsers from "../Admin/AllUsers";
import Instructor from "../Instructor/Instructor";
import AddClasses from "../Instructor/AddClasses";
import Profile from "../Instructor/Profile";
import Classes from "../Instructor/Classes";
import PrivateRoutes from "./PrivateRoutes";
import AllClass from "../Admin/AllClass";
import PrivateAdminRouter from "./PrivateAdminRouter";
import AllClasses from "../Students/AllClasses";
import Students from "../Students/Students";
import Cart from "../Students/Cart";
import Payment from "../Students/Payment";
import PrivateInstructorRouter from "./PrivateInstructorRoute";
import PrivateStudentRouter from "./PrivateStudentRoute";

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
        path: "classes",
        element: <AllClasses />,
      },
      {
        path: "registration",
        element: <Registration />,
      },
      {
        path: "student",
        element: (
          <PrivateStudentRouter>
            <Students />
          </PrivateStudentRouter>
        ),
        children: [
          {
            path: "cart/payment",
            element: <Payment />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
        ],
      },
      {
        path: "instructor",
        element: (
          <PrivateInstructorRouter>
            <Instructor />
          </PrivateInstructorRouter>
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
      <PrivateAdminRouter>
        <Admin />
      </PrivateAdminRouter>
    ),
    children: [
      {
        path: "users",
        element: <AllUsers />,
      },
      {
        path: "classes",
        element: <AllClass />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
