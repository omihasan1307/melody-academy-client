import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const active =
    "bg-blue-500 px-4 py-2 rounded lg:mx-5 lg:inline inline-block lg:my-0 my-1 w-full text-white";
  const inActive =
    " mx-5 inline-block lg:inline inline-block lg:my-0 my-1 w-full";

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
          to="/about"
          className={({ isActive }) => (isActive ? active : inActive)}
        >
          Instructors
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/appoinment"
          className={({ isActive }) => (isActive ? active : inActive)}
        >
          Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/appoinment"
          className={({ isActive }) => (isActive ? active : inActive)}
        >
          Dashboard
        </NavLink>
      </li>
      {/* <li>
      {user ? (
        <div className="flex justify-center items-center ">
          <button onClick={handleLogout} className="me-5">
            LogOut
          </button>
          <div className="avatar">
            <div title={user?.displayName} className="w-10 rounded-full">
              <img src={user?.photoURL} />
            </div>
          </div>
        </div>
      ) : (
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? active : inActive)}
        >
          Login
        </NavLink>
      )}
    </li> */}
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
          <a className=" normal-case text-xl font-bold text-blue-600">
            Melody Academy
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className=" px-1">{navItem}</ul>
        </div>
        <div className="navbar-end">
          <a className="bg-blue-500 px-4 py-2 rounded  text-white">Log In</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
