import { useState } from "react";
import logo from "../assets/logo3.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-green-600 p-4">
      <div className="container mx-auto md:px-20 flex flex-col md:flex-row md:items-center justify-between">
        <div className="text-center mb-4 md:mb-0">
          <img
            src={logo}
            alt=""
            className="max-w-full object-cover h-auto md:h-14 mx-auto"
          />
        </div>
        <div className="md:hidden  text-center mb-5">
          <button onClick={toggleMenu} className="text-white p-2">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`${
            isMenuOpen
              ? "flex flex-col md:flex-row md:space-x-5 md:space-y-0 space-y-4 text-center"
              : "hidden"
          } `}
        >
          <Link to="/admin" className="text-white block hover:text-orange-400">
            Inicio
          </Link>
          <Link
            to={"/admin/miembros"}
            className="text-white block hover:text-orange-400"
          >
            Miembros
          </Link>
          <Link
            to="/admin/aportaciones"
            className="text-white block hover:text-orange-400"
          >
            Aportes
          </Link>
          <Link
            to="/admin/prestamos"
            className="text-white block hover:text-orange-400"
          >
            Prestamos
          </Link>
          <Link
            to="/admin/grupos"
            className="text-white block hover:text-orange-400"
          >
            Grupos
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
