import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function Protected() {
  const user = localStorage.getItem("isLogin");
  return <>{!user ? <Navigate to={"/"} /> : <Outlet />}</>;
}
