import Card from "../components/Card";
import miembros from "../assets/miembros.png";
import aportaciones from "../assets/aportacion.png";
import prestamos from "../assets/prestamo.png";
import grupos from "../assets/grupos.png";

const Menu = () => {
  return (
    <div className="container mt-11 mx-auto px-11">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="max-w-md mx-auto  overflow-hidden">
          <Card titulo={"Miembros"} imagen={miembros} enlace={"/miembros"} />
        </div>
        <div className="max-w-md mx-auto  overflow-hidden">
          <Card
            titulo={"Aportaciones"}
            imagen={aportaciones}
            enlace={"/aportaciones"}
          />
        </div>
        <div className="max-w-md mx-auto  overflow-hidden">
          <Card titulo={"Prestamos"} imagen={prestamos} enlace={"/prestamos"} />
        </div>
        <div className="max-w-md mx-auto  overflow-hidden">
          <Card titulo={"Grupos"} imagen={grupos} enlace={"/grupos"} />
        </div>
      </div>
    </div>
  );
};

export default Menu;
