import { Helmet } from "react-helmet";
import { NavLink, Outlet } from "react-router-dom";

const Students = () => {
  const active = "tab tab-bordered tab-active";
  const inActive = "tab tab-bordered";
  return (
    <div>
      <Helmet>
        <title>Melody Academy || Student Dashboard</title>
      </Helmet>
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
            to="payment"
            className={({ isActive }) => (isActive ? active : inActive)}
          >
            Payment History
          </NavLink>
          <NavLink
            to="enroll"
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
