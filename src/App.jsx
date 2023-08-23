import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Menu from "./pages/Menu";
import Miembros from "./pages/Miembros";
import NuevoMiembro from "./pages/NuevoMiembro";
import NotFound from "./pages/NotFound";
import EditarMiembro from "./pages/EditarMiembro";
import Grupos from "./pages/Grupos";
import Aportaciones from "./pages/Aportaciones";
import NuevaAportacion from "./pages/NuevaAportacion";
import Prestamos from "./pages/Prestamos";
import NuevoPrestamo from "./pages/NuevoPrestamo";
import NuevoGrupo from "./pages/NuevoGrupo";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthProvider";

const App = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
          </Route>

          <Route path="/admin" element={<Layout />}>
            <Route index element={<Menu />} />
            <Route path="miembros" element={<Miembros />} />
            <Route path="nuevoMiembro" element={<NuevoMiembro />} />
            <Route path="editarMiembro/:id" element={<EditarMiembro />} />
            <Route path="grupos" element={<Grupos />} />
            <Route path="aportaciones" element={<Aportaciones />} />
            <Route path="nuevaAportacion/:id" element={<NuevaAportacion />} />
            <Route path="prestamos" element={<Prestamos />} />
            <Route path="nuevoPrestamo/:id" element={<NuevoPrestamo />} />
            <Route path="nuevoGrupo" element={<NuevoGrupo />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
