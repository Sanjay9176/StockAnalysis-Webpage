import { useEffect, useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute() {
  let token = localStorage.getItem("token")
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!token && !hasShownToast.current) {
      toast.error("PLEASE DO LOGIN");
      hasShownToast.current = true;
    }
  }, [token]);

  return token ? <Outlet /> : <Navigate to="/" replace />;
}