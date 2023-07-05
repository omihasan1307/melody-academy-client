import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import logo from "../img/guitar.png";
import useRole from "../hooks/useRole";
import { MyContext } from "../providers/ThemeProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { users, loggedOut } = useContext(AuthContext);
  const { theme, setTheme } = useContext(MyContext);

  const [role] = useRole();

  const handleLoggedOut = () => {
    loggedOut()
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const active =
    "bgColor px-4 py-2 rounded lg:mx-5 lg:inline inline-block lg:my-0 my-1 w-full text-white";
  const inActive =
    " mx-5 inline-block lg:inline inline-block lg:my-0 my-1 w-full ";

  const navItem = (
    <div className=" lg:flex items-center ">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? active : inActive)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/popularInstructor"
          className={({ isActive }) => (isActive ? active : inActive)}
        >
          Instructors
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/classes"
          className={({ isActive }) => (isActive ? active : inActive)}
        >
          Classes
        </NavLink>
      </li>
      {users && (
        <li>
          {role?.role === "admin" ? (
            <NavLink
              to="admin/users"
              className={({ isActive }) => (isActive ? active : inActive)}
            >
              Dashboard
            </NavLink>
          ) : (
            <>
              {role?.role === "instructor" ? (
                <NavLink
                  to="instructor/classes"
                  className={({ isActive }) => (isActive ? active : inActive)}
                >
                  Dashboard
                </NavLink>
              ) : (
                <NavLink
                  to="student/cart"
                  className={({ isActive }) => (isActive ? active : inActive)}
                >
                  Dashboard
                </NavLink>
              )}
            </>
          )}
        </li>
      )}
    </div>
  );
  return (
    <div>
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className=" dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 "
            >
              {navItem}
            </ul>
          </div>
          <a className=" normal-case text-xl font-bold textColor flex items-center">
            <div>
              <img className="w-10 me-1" src={logo} alt="" />
            </div>
            Melody Academy
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className=" px-1">{navItem}</ul>
        </div>
        <div className="navbar-end">
          <button className="me-5 text-xl" onClick={() => setTheme(!theme)}>
            <FontAwesomeIcon icon={theme ? faSun : faMoon} />
          </button>

          {users ? (
            <div>
              {" "}
              <button
                onClick={handleLoggedOut}
                className="bgColor px-4 py-2 rounded  text-white"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link to="/login">
              {" "}
              <a className="bgColor px-4 py-2 rounded  text-white">Log In</a>
            </Link>
          )}
          {users && (
            <div className="avatar">
              <div
                title={users?.displayName}
                className="w-12 ms-3 rounded-full"
              >
                <img src={users?.photoURL} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
