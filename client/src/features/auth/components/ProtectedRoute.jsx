import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { Loading } from "@/assets/icons";

export default function ProtectedRoute({ children }) {
  const { user, token, loading } = useSelector((state) => state.auth);

  if (loading === "pending") {
    return (
      <div className="flex min-h-lvh w-full items-center justify-center">
        <div>
          <img src={Loading} alt="loading..." className="h-40 w-40" />
        </div>
      </div>
    );
  }

  if (token && !user) {
    return (
      <div className="flex min-h-lvh w-full items-center justify-center">
        <div>
          <img src={Loading} alt="loading..." className="h-40 w-40" />
        </div>
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (children) {
    return <>{children}</>;
  }

  return <Outlet />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};
