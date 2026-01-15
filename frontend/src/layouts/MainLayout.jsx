import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

function MainLayout() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* BOTÓN HAMBURGER - SOLO EN MÓVIL */}
      <button
        className="md:hidden absolute top-4 left-4 z-20 bg-[#442f7f] hover:bg-[#61438F] text-white p-2 rounded"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* MENÚ */}
      <aside
        className={`
          bg-[#442f7f] text-white p-4 w-64
          fixed md:static h-full md:h-auto top-0 left-0
          transform transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          z-10
        `}
      >
        <h2 className="text-xl font-bold mb-6 pt-[1cm]">Inventario</h2>

        <ul className="space-y-3">
          <li onClick={() => { navigate("/"); setMenuOpen(false) }} className="cursor-pointer hover:bg-[#61438F] ">Dashboard</li>
          <li onClick={() => { navigate("/funcionarios"); setMenuOpen(false) }} className="cursor-pointer hover:bg-[#61438F]">Funcionarios</li>
          <li onClick={() => { navigate("/areas"); setMenuOpen(false) }} className="cursor-pointer hover:bg-[#61438F]">Áreas</li>
          <li onClick={() => { navigate("/marcas"); setMenuOpen(false) }} className="cursor-pointer hover:bg-[#61438F]">Marcas</li>
          <li onClick={() => { navigate("/productos"); setMenuOpen(false) }} className="cursor-pointer hover:bg-[#61438F]">Productos</li>
          <li onClick={() => { navigate("/tipos-producto"); setMenuOpen(false) }} className="cursor-pointer hover:bg-[#61438F]">Tipo de Producto</li>
          <li onClick={() => { navigate("/reportes/valor"); setMenuOpen(false) }} className="cursor-pointer hover:bg-[#61438F]">Reporte de valor</li>
          <li onClick={() => { navigate("/reportes/productos-asignados"); setMenuOpen(false) }} className="cursor-pointer hover:bg-[#61438F]">Reporte asignaciones</li>
        </ul>

        <button
          className="mt-8 bg-red-500 hover:bg-[#ed7330] px-3 py-1 rounded w-full hover:bg-[#f9b733]" 
          onClick={logout}
        >
          Cerrar sesión
        </button>
      </aside>

      {/* CONTENIDO */}
      <main className="flex-1 p-6 bg-gray-100 pt-[2cm]">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
