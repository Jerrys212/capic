import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosCapic from "../helpers/axios";

const NuevoMiembro = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    if (Object.values(data).includes("")) {
      Swal.fire({ title: "Todos Los Campos Son Obligatorios", icon: "info" });
      return;
    }

    try {
      const { data: respuesta } = await axiosCapic.post("nuevoMiembro", data);
      Swal.fire({
        title: "Miembro Creado Correctamente",
        icon: "success",
        text: respuesta.replyText,
      });
      setTimeout(() => {
        navigate("/miembros");
      }, 2000);
    } catch (error) {
      Swal.fire({ title: error.response.data.replyText, icon: "error" });
    }
  };

  return (
    <div className="px-4 my-10 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-green-700 p-6 rounded-lg shadow-xl w-full md:w-2/3 lg:w-1/2"
      >
        <h2 className="text-2xl font-semibold mb-8 text-white">
          Registrar Nuevo Miembro
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
              placeholder="Nombre "
              {...register("nombre")}
            />
          </div>
          <div className="flex-grow">
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="email"
            >
              Apellido Paterno
            </label>
            <input
              className="w-full px-4 py-2 rounded-md bg-white"
              type="text"
              id="email"
              placeholder="Apellido Paterno"
              {...register("ap")}
            />
          </div>
        </div>
        <div className="mb-8 flex flex-col md:flex-row md:space-x-4">
          <div className="flex-grow mb-8 md:mb-0">
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="nombre"
            >
              Apellido Materno
            </label>
            <input
              className="w-full px-4 py-2 rounded-md bg-white"
              type="text"
              id="nombre"
              placeholder="Apellido Materno"
              {...register("am")}
            />
          </div>
          <div className="flex-grow">
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="curp"
            >
              Curp
            </label>
            <input
              className="w-full px-4 py-2 rounded-md bg-white"
              type="text"
              id="curp"
              placeholder="CURP"
              {...register("curp")}
            />
          </div>
        </div>
        <div className="mb-8 flex flex-col md:flex-row md:space-x-4">
          <div className="flex-grow mb-8 md:mb-0">
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="celular"
            >
              Celular
            </label>
            <input
              className="w-full px-4 py-2 rounded-md bg-white"
              type="text"
              id="celular"
              placeholder="Celular"
              {...register("celular")}
            />
          </div>
          <div className="flex-grow">
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="grupo"
            >
              Grupo
            </label>
            <select
              className="w-full px-10 py-2 rounded-md bg-white appearance-none"
              {...register("grupo")}
            >
              <option value="" disabled id="grupo">
                Selecciona un grupo
              </option>
              <option value="mexico">A</option>
              <option value="espana">B</option>
              <option value="otros">C</option>
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

export default NuevoMiembro;
