import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/AdminDashboard";
import Funcionarios from "../pages/Funcionarios";
import Areas from "../pages/Areas";
import Marcas from "../pages/Marcas";
import Productos from "../pages/Productos";
import TiposProducto from "../pages/TiposProducto";
import ReporteValor from "../pages/reportes/ReporteValor";
import ProductosAsignados from "../pages/reportes/ProductosAsignados";

import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "../components/PrivateRoute";

function AppRouter() {
  const isAuth = !!localStorage.getItem("access_token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Root */}
        <Route
          path="/"
          element={
            isAuth
              ? <Navigate to="/dashboard" replace />
              : <Navigate to="/login" replace />
          }
        />

        {/* Privadas */}
        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/funcionarios" element={<Funcionarios />} />
          <Route path="/areas" element={<Areas />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/tipos-producto" element={<TiposProducto />} />

          {/* Reportes */}
          <Route path="/reportes/valor" element={<ReporteValor />} />
          <Route path="/reportes/productos-asignados" element={<ProductosAsignados  />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
