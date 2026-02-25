import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, token, loading } = useSelector((state) => state.auth);

  if (loading === "pending") {
    return <div>Loading...</div>;
  }

  if (token && !user) {
    return <div>Loading...</div>;
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (children) {
    return <>{children}</>;
  }

  return <Outlet />;
}
