import { NavLink, Outlet } from "react-router-dom";

const Admin = () => {
  const active =
    "bgColor px-4 py-2 rounded lg:mx-5 lg:inline inline-block w-full text-white text-xl";
  const inActive =
    " mx-5 inline-block lg:inline inline-block lg:my-0 my-1 w-full  ";

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-square btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full text-white lg:text-base-content bg-slate-500   lg:bg-base-200 bg-opacity-20 backdrop-filter backdrop-blur-md">
            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) => (isActive ? active : inActive)}
              >
                users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ss"
                className={({ isActive }) => (isActive ? active : inActive)}
              >
                cons
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? active : inActive)}
              >
                Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;
