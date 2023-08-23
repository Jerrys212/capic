import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosCapic from "../helpers/axios";
import { config } from "../helpers/funciones";

const NuevoGrupo = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (Object.values(data).includes("")) {
      console.log(data);
      Swal.fire({ title: "Todos Los Campos Son Obligatorios", icon: "info" });
      return;
    }

    try {
      const { data: respuesta } = await axiosCapic.post(
        "/nuevoGrupo",
        data,
        config
      );
      Swal.fire({ title: respuesta.replyText, icon: "success" });
      setTimeout(() => {
        navigate("/admin/grupos");
      }, 1500);
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
          Registrar Nuevo Grupo
        </h2>
        <div className="mb-8 flex flex-col md:flex-row md:space-x-4">
          <div className="flex-grow mb-8 md:mb-0">
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="nombre"
            >
              Nombre
            </label>
            <input
              className="w-full px-4 py-2 rounded-md bg-white"
              type="text"
              id="nombre"
              placeholder="Nombre"
              {...register("nombre")}
            />
          </div>
          <div className="flex-grow">
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="cantidad"
            >
              Aporte
            </label>
            <input
              className="w-full px-4 py-2 rounded-md bg-white"
              type="text"
              id="cantidad"
              placeholder="Aporte"
              {...register("cantidad")}
            />
          </div>
        </div>
        <div className="mb-8 flex flex-col md:flex-row md:space-x-4">
          <div className="flex-grow mb-8 md:mb-0">
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="semanas"
            >
              Semanas
            </label>
            <input
              className="w-full px-11 py-2 rounded-md bg-white"
              type="number"
              id="semanas"
              placeholder="Semanas"
              {...register("semanas")}
            />
          </div>
        </div>

        <button
          className="w-full transition-colors duration-500 ease-in-out bg-white text-green-700 hover:text-white hover:bg-orange-800 py-2 rounded-md font-semibold"
          type="submit"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default NuevoGrupo;
