import React from "react";
import { useForm } from "react-hook-form";
import axiosCapic from "../helpers/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const onSubmit = async (data) => {
    try {
      const { data: respuesta } = await axiosCapic.post("/login", data);
      localStorage.setItem("token", respuesta.token);
      setAuth(respuesta);
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4 mt-20 flex justify-center items-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-green-700 py-14 px-10 rounded-lg shadow-xl w-full md:w-2/3 lg:w-1/2"
      >
        <h2 className="text-2xl font-semibold mb-8 text-white">
          Iniciar Sesión
        </h2>
        <div className="mb-8 flex flex-col md:flex-row md:space-x-4">
          <div className="flex-grow mb-8 md:mb-0">
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="miembro"
            >
              Miembro
            </label>
            <input
              className="w-full px-4 py-2 rounded-md bg-white"
              type="text"
              id="miembro"
              placeholder="Miembro"
              {...register("curp")}
            />
          </div>
        </div>
        <div className="mb-8 flex flex-col md:flex-row md:space-x-4">
          <div className="flex-grow mb-8 md:mb-0">
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="w-full px-4 py-2 rounded-md bg-white"
              type="password"
              placeholder="Contraseña"
              id="password"
              {...register("password")}
            />
          </div>
        </div>

        <button
          className="w-full transition-colors duration-500 ease-in-out bg-white text-green-700 hover:text-white hover:bg-orange-800 py-2 rounded-md font-semibold"
          type="submit"
        >
          Acceder
        </button>
      </form>
    </div>
  );
};

export default Login;
