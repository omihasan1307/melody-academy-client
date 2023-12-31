import { Navigate, useLocation } from "react-router-dom";
import useRole from "../hooks/useRole";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";

const PrivateAdminRouter = ({ children }) => {
  const { users, loading } = useContext(AuthContext);
  const [role, isLoading] = useRole();

  const location = useLocation();

  if (users || role?.role === "admin") {
    return children;
  }
  if (loading || isLoading) {
    return <progress className="progress w-56"></progress>;
  } else {
    {
      return (users && role?.role === "instructor") ||
        role?.role === "student" ? (
        <Navigate to="/" state={{ from: location }} replace />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      );
    }
  }
};

export default PrivateAdminRouter;
