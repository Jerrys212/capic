import React, { useEffect, useState } from "react";
import {
  NuevaAportacionIcono,
  NuevoPrestamoIcono,
  EditarMiembroIcono,
  BorrarMiembroIcono,
  NuevoMiembroIcono,
} from "../components/Iconos";
import { useNavigate } from "react-router-dom";
import { eliminarMiembro } from "../helpers/funciones";
import Spinner from "../components/Spinner";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axiosCapic from "../helpers/axios";

const Miembros = () => {
  const { register, handleSubmit } = useForm();
  const [miembros, setMiembros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerMiembros = async () => {
      try {
        const { data } = await axiosCapic("/obtenerMiembros");
        setTimeout(() => {
          setMiembros(data);
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerMiembros();
  }, []);

  const onSubmit = async (data) => {
    if (Object.values(data).includes("")) {
      Swal.fire({ title: "Todos Los Campos Son Obligatorios", icon: "info" });
      return;
    }
    console.log(data);

    try {
      const { data: respuesta } = await axiosCapic.post(
        "/obtenerMiembro",
        data
      );

      setMiembros([respuesta]);
    } catch (error) {
      console.log(error);
      Swal.fire({ title: error.response.data.replyText, icon: "error" });
    }
    // console.log(data);
  };

  console.log(miembros);

  return miembros?.length > 0 ? (
    <>
      <div className="container mx-auto px-8 my-5 overflow-x-auto overflow-hidden">
        <h1 className="text-xl font-bold text-center my-5 uppercase">
          Miembros
        </h1>

        <div className="flex justify-between items-center mb-5 px-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row">
              <input
                className="w-full px-28 mr-2  py-2 rounded-md bg-white border-gray-300"
                type="text"
                id="grupo"
                placeholder="Busqueda"
                {...register("curp")}
              />
              <button
                className="w-full transition-colors duration-500 ease-in-out bg-white text-green-700 hover:text-white hover:bg-orange-800 py-2 rounded-md font-semibold"
                type="submit"
              >
                Buscar
              </button>
            </div>
          </form>
          <NuevoMiembroIcono onClick={() => navigate("/nuevoMiembro")} />
        </div>

        <table className="min-w-full text-white divide-y text-center divide-gray-200">
          <thead className="bg-green-700 text-white">
            <tr>
              <th scope="col" className="px-6 py-3  font-bold ">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3  font-bold">
                Curp
              </th>
              <th scope="col" className="px-6 py-3  font-bold">
                Celular
              </th>
              <th scope="col" className="px-6 py-3  font-bold">
                Grupo
              </th>
              <th scope="col" className="px-6 py-3  font-bold">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {miembros?.length > 0 ? (
              miembros.map((miembro, i) => (
                <tr className="bg-orange-700 text-white font-bold" key={i}>
                  <td className="px-6 py-4">
                    {miembro.nombre} {miembro.ap} {miembro.am}
                  </td>
                  <td className="px-6 py-4">{miembro.curp}</td>
                  <td className="px-6 py-4">{miembro.celular}</td>
                  <td className="px-6 py-4">{miembro.grupo}</td>
                  <td className="px-6 py-4 flex justify-center space-x-2 ">
                    <NuevaAportacionIcono
                      onClick={() =>
                        navigate(`/nuevaAportacion/${miembro._id}`)
                      }
                    />
                    <NuevoPrestamoIcono
                      onClick={() => navigate(`/nuevoPrestamo/${miembro._id}`)}
                    />
                    <EditarMiembroIcono
                      onClick={() => navigate(`/editarMiembro/${miembro._id}`)}
                    />
                    <BorrarMiembroIcono
                      onClick={() => {
                        eliminarMiembro(miembro._id);
                        setMiembros([]);
                      }}
                    />
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

export default Miembros;
