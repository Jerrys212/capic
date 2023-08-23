import { useState, useEffect, createContext } from "react";
import axiosCapic from "../helpers/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});
  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axiosCapic("/obtenerPerfil", config);
        console.log(data);
        setAuth(data);
      } catch (error) {
        console.log(error);
        setAuth({});
      }

      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, cargando, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
