import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { config, convertirFormatoFecha } from "../helpers/funciones";
import { Imprimir } from "../components/Iconos";
import { useForm } from "react-hook-form";
import axiosCapic from "../helpers/axios";

const Prestamos = () => {
  const { register, handleSubmit } = useForm();
  const [prestamos, setPrestamos] = useState([]);

  useEffect(() => {
    const obtenerPrestamos = async () => {
      try {
        const { data } = await axiosCapic("/obtenerPrestamos", config);
        setTimeout(() => {
          setPrestamos(data);
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPrestamos();
  }, []);

  const onSubmit = async (data) => {
    if (Object.values(data).includes("")) {
      Swal.fire({ title: "Todos Los Campos Son Obligatorios", icon: "info" });
      return;
    }
    console.log(data);

    try {
      const { data: respuesta } = await axiosCapic.post(
        "/obtenerPrestamos",
        data,
        config
      );

      setPrestamos(respuesta);
    } catch (error) {
      console.log(error);
      Swal.fire({ title: error.response.data.replyText, icon: "error" });
    }
    // console.log(data);
  };

  console.log(prestamos);

  return prestamos?.length > 0 ? (
    <>
      <div className="container mx-auto px-8 my-5 overflow-x-auto overflow-hidden">
        <h1 className="text-xl font-bold text-center my-5 uppercase">
          Prestamos
        </h1>
        <div className="flex justify-between items-center mb-5 px-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row">
              <input
                className="w-full px-28 mr-2  py-2 rounded-md bg-white border-gray-300"
                type="text"
                id="grupo"
                placeholder="Busqueda"
                {...register("miembro")}
              />
              <button
                className="w-full transition-colors duration-500 ease-in-out bg-white text-green-700 hover:text-white hover:bg-orange-800 py-2 rounded-md font-semibold"
                type="submit"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
        <table className="min-w-full text-white divide-y text-center divide-gray-200">
          <thead className="bg-green-700 text-white">
            <tr>
              <th scope="col" className="px-6 py-3  font-bold ">
                Miembro
              </th>
              <th scope="col" className="px-6 py-3  font-bold">
                A pagar en
              </th>
              <th scope="col" className="px-6 py-3  font-bold">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3  font-bold">
                Total
              </th>
              <th scope="col" className="px-6 py-3  font-bold">
                Imprimir Recibo
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {prestamos?.length > 0 ? (
              prestamos.map((prestamo, i) => (
                <tr className="bg-orange-700 text-white font-bold" key={i}>
                  <td className="px-6 py-4">{prestamo.miembro}</td>
                  <td className="px-6 py-4">{prestamo.plazo} Meses</td>
                  <td className="px-6 py-4">
                    {convertirFormatoFecha(prestamo.fecha)}
                  </td>
                  <td className="px-6 py-4">{prestamo.total}</td>

                  <td className="px-6 py-4 flex justify-center space-x-2 ">
                    <Imprimir />
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

export default Prestamos;
