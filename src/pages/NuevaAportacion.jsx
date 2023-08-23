import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { config, convertirFechaSinGuiones } from "../helpers/funciones";
import { useEffect } from "react";
import axiosCapic from "../helpers/axios";

const NuevaAportacion = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerMiembro = async () => {
      try {
        const { data } = await axiosCapic.get(`/obtenerMiembro/${id}`, config);
        console.log(data);
        setValue("miembro", data.curp);
        const { data: respuesta } = await axiosCapic.get(
          `obtenerGrupo/${data.grupo}`,
          config
        );
        console.log(respuesta);
        setValue("aporte", respuesta.cantidad);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerMiembro();
  }, []);

  const onSubmit = async (data) => {
    if (Object.values(data).includes("")) {
      Swal.fire({ title: "Todos Los Campos Son Obligatorios", icon: "info" });
      return;
    }
    console.log(Number(data.aporte));
    try {
      const { data: respuesta } = await axiosCapic.post(
        "nuevaAportacion",
        {
          ...data,
          fecha: convertirFechaSinGuiones(data.fecha),
          aporte: Number(data.aporte),
        },
        config
      );
      Swal.fire({
        title: "Aportacion Creada Correctamente",
        icon: "success",
        text: respuesta.replyText,
      });
      setTimeout(() => {
        navigate("/aportaciones");
      }, 2000);
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
          Registrar Nueva Aportación
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
              {...register("miembro")}
              readOnly
            />
          </div>
          <div className="flex-grow">
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="aporte"
            >
              Aporte
            </label>
            <input
              className="w-full px-4 py-2 rounded-md bg-white"
              type="number"
              id="aporte"
              placeholder="Aporte"
              {...register("aporte")}
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
              Semana
            </label>
            <select
              className="w-full px-7 py-2 rounded-md bg-white appearance-none"
              {...register("semana")}
              defaultValue={"def"}
            >
              <option value="def" disabled id="semana">
                Selecciona una semana
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
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

export default NuevaAportacion;
