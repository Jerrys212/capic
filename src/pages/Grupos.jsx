import React, { useEffect, useState } from "react";
import axiosCapic from "../helpers/axios.js";
import { NuevoMiembroIcono } from "../components/Iconos";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { config } from "../helpers/funciones.js";

const Grupos = () => {
  const [grupos, setGrupos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerGrupos = async () => {
      try {
        const { data } = await axiosCapic("/obtenerGrupos", config);
        setTimeout(() => {
          setGrupos(data);
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerGrupos();
  }, []);

  return grupos?.length > 0 ? (
    <>
      <div className="container mx-auto px-8 my-5 overflow-x-auto overflow-hidden">
        <h1 className="text-xl font-bold text-center my-5 uppercase">Grupos</h1>

        <div className="flex justify-between items-center mb-5 px-5">
          <form>
            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row">
              <input
                className="w-full px-28 mr-2  py-2 rounded-md bg-white border-gray-300"
                type="text"
                id="grupo"
                placeholder="Busqueda"
              />
              <button
                className="w-full transition-colors duration-500 ease-in-out bg-white text-green-700 hover:text-white hover:bg-orange-800 py-2 rounded-md font-semibold"
                type="submit"
              >
                Buscar
              </button>
            </div>
          </form>
          <NuevoMiembroIcono onClick={() => navigate("/admin/nuevoGrupo")} />
        </div>

        <table className="min-w-full text-white divide-y text-center divide-gray-200">
          <thead className="bg-green-700 text-white">
            <tr>
              <th scope="col" className="px-6 py-3  font-bold ">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3  font-bold">
                Semanas
              </th>
              <th scope="col" className="px-6 py-3  font-bold">
                Cantidad
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {grupos?.length > 0 ? (
              grupos.map((grupo, i) => (
                <tr className="bg-orange-700 text-white font-bold" key={i}>
                  <td className="px-6 py-4">{grupo.nombre}</td>
                  <td className="px-6 py-4">{grupo.semanas}</td>

                  <td className="px-6 py-4 flex justify-center space-x-2 ">
                    {grupo.cantidad}
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <div className="container flex justify-center my-11">
      <Spinner />
    </div>
  );
};

export default Grupos;
