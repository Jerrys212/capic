import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axiosCapic from "../helpers/axios";
import { config } from "../helpers/funciones";

const EditarMiembro = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    const obtenerMiembro = async () => {
      try {
        const { data } = await axiosCapic(`/obtenerMiembro/${id}`, config);

        const { createdAt, updatedAt, rol, ...nuevoObjeto } = data;
        Object.keys(nuevoObjeto).forEach((key) => {
          setValue(key, nuevoObjeto[key]);
        });
      } catch (error) {
        console.log(error);
      }
    };

    const obtenerGrupos = async () => {
      try {
        const { data } = await axiosCapic(`/obtenerGrupos`, config);
        setGrupos(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerMiembro();
    obtenerGrupos();
  }, []);

  const onSubmit = async (data) => {
    if (Object.values(data).includes("")) {
      Swal.fire({ title: "Todos Los Campos Son Obligatorios", icon: "info" });
      return;
    }

    try {
      const { data: respuesta } = await axiosCapic.put(
        `/editarMiembro`,
        {
          ...data,
          id: data._id,
        },
        config
      );
      Swal.fire({
        title: "Miembro Modificado Correctamente",
        icon: "success",
        text: respuesta.replyText,
      });
      setTimeout(() => {
        navigate("/admin/miembros");
      }, 1500);
    } catch (error) {
      console.log(error);
      Swal.fire({ title: error.response.data.replyText, icon: "error" });
    }
    console.log(data);
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
              placeholder="Nombre"
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
            <input
              className="w-full px-4 py-2 rounded-md bg-gray-300"
              type="text"
              id="grupo"
              placeholder="Grupo"
              {...register("grupo")}
              readOnly
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

export default EditarMiembro;
