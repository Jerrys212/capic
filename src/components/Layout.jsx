import React from "react";
import Navbar from "./Navbar";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "./Spinner";

const Layout = () => {
  const { auth, cargando } = useAuth();

  console.log(auth);

  if (cargando) return <Spinner />;

  return (
    <>
      <Navbar />
      {auth?.rol === "admin" ? <Outlet /> : <Navigate to="/" />}
    </>
  );
};

export default Layout;
