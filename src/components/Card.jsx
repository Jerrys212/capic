import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ titulo, texto, imagen, enlace }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-3xl overflow-hidden md:max-w-2xl">
      <img
        className="w-full h-auto object-cover "
        src={imagen}
        alt="Imagen de la tarjeta"
      />
      <div className="p-4 ">
        <h2 className="text-xl text-center font-semibold mb-2">{titulo}</h2>
        <div className="mt-4">
          <button
            onClick={() => navigate(enlace)}
            className=" w-full px-4 py-2 bg-orange-700 text-white rounded-md hover:bg-orange-800 mr-2"
          >
            Ir
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
