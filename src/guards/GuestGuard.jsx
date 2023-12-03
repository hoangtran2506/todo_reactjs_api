import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { PATH_DASHBOARD } from "../routes/paths";


const GuestGuard = ({ children }) => {
  const { isAuthenticated } = {
    isAuthenticated: false
  };

  if (isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return <>{children}</>;
};

export default GuestGuard;
