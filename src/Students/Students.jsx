import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Students = () => {
  const active = "tab tab-bordered tab-active";
  const inActive = "tab tab-bordered";
  return (
    <div>
      <div className="bgColor ">
        <h5 className="text-white text-center text-2xl font-bold py-20">
          Students
        </h5>
      </div>
      <div className=" flex justify-center my-5 ">
        <div className="tabs">
          <NavLink
            to="cart"
            className={({ isActive }) => (isActive ? active : inActive)}
          >
            My Selected CLass
          </NavLink>
          <NavLink
            to="classes"
            className={({ isActive }) => (isActive ? active : inActive)}
          >
            Payment History
          </NavLink>
          <NavLink
            to="profile"
            className={({ isActive }) => (isActive ? active : inActive)}
          >
            My Enroll Classes
          </NavLink>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Students;
