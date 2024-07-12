import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function Unprotected() {
  const user = useSelector((state) => state.user);

  return <>{user.isLogin ? <Navigate to={"/"} /> : <Outlet />}</>;
}
