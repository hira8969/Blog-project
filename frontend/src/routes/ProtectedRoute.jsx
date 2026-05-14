import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ adminOnly = false }) {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}
