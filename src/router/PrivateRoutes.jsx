import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useRole from "../hooks/useRole";

const PrivateRoutes = ({ children }) => {
  const [role, isLoading] = useRole();
  console.log(role);
  const { users, loading } = useContext(AuthContext);
  const location = useLocation();

  if (users || role?.role !== "admin" || role?.role !== "instructor") {
    return children;
  }
  if (loading || isLoading) {
    return <progress className="progress w-56"></progress>;
  }

  {
    return (users && role?.role === "admin") || role?.role === "instructor" ? (
      <Navigate to="/" state={{ from: location }} replace />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }
};

export default PrivateRoutes;
