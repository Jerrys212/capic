import Swal from "sweetalert2";

const eliminarMiembro = async (id) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:4500/capic/eliminarMiembro/${id}`
    );
    Swal.fire({ title: "Miembro Eliminado Correctamente", icon: "success" });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const eliminarGrupo = async (id) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:4500/capic/eliminarGrupo/${id}`
    );
    Swal.fire({ title: "Grupo Eliminado Correctamente", icon: "success" });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const convertirFormatoFecha = (fechaString) => {
  const anio = fechaString.slice(0, 4);
  const diaDelAnio = parseInt(fechaString.slice(4));

  const fecha = new Date(anio, 0); // Establecer el primer día del año
  fecha.setDate(diaDelAnio); // Establecer el día del año

  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDate();

  // Asegurarse de tener dos dígitos para mes y día
  const mesFormato = mes < 10 ? `0${mes}` : mes;
  const diaFormato = dia < 10 ? `0${dia}` : dia;

  return `${anio}/${mesFormato}/${diaFormato}`;
};

const convertirFechaSinGuiones = (fecha) => {
  return fecha.replace(/-/g, "");
};

const calcularTotal = (cantidad, plazo) => {
  let total = 0;

  switch (plazo) {
    case 2:
      total = cantidad * 0.05;
      break;

    case 3:
      total = cantidad * 0.1;
      break;

    case 4:
      total = cantidad * 0.15;
      break;

    default:
      break;
  }
  return total + cantidad;
};

const calcultarInteres = (cantidad, plazo) => {
  let total = 0;

  switch (plazo) {
    case 2:
      total = cantidad * 0.05;
      break;

    case 3:
      total = cantidad * 0.1;
      break;

    case 4:
      total = cantidad * 0.15;
      break;

    default:
      break;
  }
  console.log(total);
  return total;
};

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export {
  eliminarMiembro,
  eliminarGrupo,
  convertirFormatoFecha,
  calcularTotal,
  convertirFechaSinGuiones,
  calcultarInteres,
  config,
};
