import React from "react";
import { Helmet } from "react-helmet";
import { NavLink, Outlet } from "react-router-dom";

const Instructor = () => {
  const active = "tab tab-bordered tab-active";
  const inActive = "tab tab-bordered";
  return (
    <div>
      <Helmet>
        <title>Melody Academy || Instructor Dashboard</title>
      </Helmet>
      <div className="bgColor ">
        <h5 className="text-white text-center text-2xl font-bold py-20">
          Instructor
        </h5>
      </div>
      <div className=" flex justify-center my-5 ">
        <div className="tabs">
          <NavLink
            to="addClasses"
            className={({ isActive }) => (isActive ? active : inActive)}
          >
            Add Classes
          </NavLink>
          <NavLink
            to="classes"
            className={({ isActive }) => (isActive ? active : inActive)}
          >
            Classes
          </NavLink>
          <NavLink
            to="profile"
            className={({ isActive }) => (isActive ? active : inActive)}
          >
            Profile
          </NavLink>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Instructor;
