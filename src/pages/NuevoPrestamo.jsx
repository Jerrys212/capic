import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { calcultarInteres, calcularTotal } from "../helpers/funciones";
import { useEffect } from "react";
import axiosCapic from "../helpers/axios";

const NuevoPrestamo = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerMiembro = async () => {
      try {
        const { data } = await axiosCapic.get(`/obtenerMiembro/${id}`);
        console.log(data);
        setValue("curp", data.curp);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerMiembro();
  }, []);

  useEffect(() => {
    const total = calcularTotal(
      Number(watch("cantidad")),
      Number(watch("plazo"))
    );
    const interes = calcultarInteres(
      Number(watch("cantidad")),
      Number(watch("plazo"))
    );
    setValue("total", total);
    setValue("interes", interes);
  }, [watch("cantidad"), watch("plazo")]);

  const onSubmit = async (data) => {
    if (Object.values(data).includes("")) {
      Swal.fire({ title: "Todos Los Campos Son Obligatorios", icon: "info" });
      return;
    }
    console.log(data);
    try {
      const { data: respuesta } = await axios.post(
        "http://localhost:4500/capic/prestamoValido",
        { miembro: data.curp, prestamo: data.total }
      );
      console.log(respuesta);

      if (respuesta.valido) {
        const { data: response } = await axios.post(
          "http://localhost:4500/capic/nuevoPrestamo",
          { ...data, miembro: data.curp }
        );

        Swal.fire({
          title: "Prestamo Solicitado Correctamente",
          icon: "success",
        });

        setTimeout(() => {
          navigate("/prestamos");
        }, 1500);
        return response;
      } else {
        Swal.fire({
          title:
            "No Cuentas Con Los Fondos Suficientes Para Solicitar El Prestamo",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({ title: error.response.data.replyText, icon: "error" });
    }
    // console.log(data);
  };

  return (
    <div className="px-4 my-10 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-green-700 p-6 rounded-lg shadow-xl w-full md:w-2/3 lg:w-1/2"
      >
        <h2 className="text-2xl font-semibold mb-8 text-white">
          Registrar Nuevo Prestamo
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
              className="w-full px-4 py-2 rounded-md bg-gray-300"
              type="text"
              id="miembro"
              placeholder="Miembro "
              {...register("curp")}
              readOnly
            />
          </div>
          <div className="flex-grow">
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="aporte"
            >
              Prestamo
            </label>
            <input
              className="w-full px-4 py-2 rounded-md bg-white"
              type="text"
              id="cantidad"
              placeholder="Cantidad"
              {...register("cantidad")}
            />
          </div>
        </div>
        <div className="mb-8 flex flex-col md:flex-row md:space-x-4">
          <div className="flex-grow mb-8 md:mb-0">
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="fecha"
            >
              Fecha
            </label>
            <input
              className="w-full px-11 py-2 rounded-md bg-white"
              type="date"
              id="fecha"
              {...register("fecha")}
            />
          </div>
          <div className="flex-grow">
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="semana"
            >
              Interes
            </label>
            <input
              className="w-full px-4 py-2 rounded-md bg-gray-300"
              type="text"
              id="interes"
              readOnly
              placeholder="Interes"
              {...register("interes")}
            />
          </div>
        </div>
        <div className="mb-8 flex flex-col md:flex-row md:space-x-4">
          <div className="flex-grow">
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="semana"
            >
              A pagar en:
            </label>
            <select
              className="w-full px-16 py-2 mb-4 rounded-md bg-white appearance-none"
              {...register("plazo")}
            >
              <option value="" disabled id="grupo">
                Seleccione
              </option>
              <option value="2">2 meses</option>
              <option value="3">3 meses</option>
              <option value="4">4 meses</option>
            </select>
          </div>
          <div className="flex-grow">
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="total"
            >
              Total a pagar:
            </label>
            <input
              className="w-full px-2 py-2 rounded-md bg-gray-300"
              type="text"
              id="total"
              readOnly
              placeholder="Total"
              {...register("total")}
            />
          </div>
        </div>

        <button
          className="w-full transition-colors duration-500 ease-in-out bg-white text-green-700 hover:text-white hover:bg-orange-800 py-2 rounded-md font-semibold"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default NuevoPrestamo;
