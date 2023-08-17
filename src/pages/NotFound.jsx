import miembros from "../assets/miembros.png";

const NotFound = () => {
  return (
    <div className="bg-green-700 h-screen flex flex-col py-32 items-center">
      <h1 className="text-white text-center  text-4xl">
        404 Pagina No encontrada
      </h1>
      <img src={miembros} />
    </div>
  );
};

export default NotFound;
