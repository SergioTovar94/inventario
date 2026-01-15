import { useEffect, useState } from "react";
import { getProductosAsignados } from "../../api/reportes";
import { getFuncionarios } from "../../api/funcionarios";

const ESTADO_LABELS = {
  EXCELENTE: "Excelente",
  BUENO: "Bueno",
  REGULAR: "Regular",
  DANADO: "Dañado",
};

export default function ProductosAsignados() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [funcionario, setFuncionario] = useState("");
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarProductos = async () => {
    setLoading(true);
    const data = await getProductosAsignados(
      funcionario ? { funcionario } : {}
    );
    setProductos(data);
    setLoading(false);
  };

  useEffect(() => {
    getFuncionarios().then(setFuncionarios);
    cargarProductos();
  }, []);

  useEffect(() => {
    cargarProductos();
  }, [funcionario]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Productos asignados por funcionario
      </h1>

      {/* FILTRO */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <label className="block text-sm font-medium mb-1">
          Filtrar por funcionario
        </label>
        <select
          value={funcionario}
          onChange={(e) => setFuncionario(e.target.value)}
          className="border px-3 py-2 w-full md:w-1/3"
        >
          <option value="">Todos los funcionarios</option>
          {funcionarios.map((f) => (
            <option key={f.id} value={f.id}>
              {f.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* TABLA */}
      {loading ? (
        <p>Cargando...</p>
      ) : productos.length === 0 ? (
        <p>No hay productos asignados</p>
      ) : (
        <ul>
          {/* HEADER DESKTOP */}
          <li className="hidden md:grid grid-cols-6 text-center font-semibold bg-gray-100 border p-2 rounded">
            <span>Funcionario</span>
            <span>Código</span>
            <span>Tipo</span>
            <span>Marca</span>
            <span>Estado</span>
            <span>Uso</span>
          </li>

          {productos.map((p, i) => (
            <li
              key={i}
              className="
                border rounded p-3 mb-3
                grid gap-2
                sm:grid-cols-2
                md:grid-cols-6
                md:items-center md:text-center
              "
            >
              <span>
                <strong className="md:hidden">Funcionario: </strong>
                {p.funcionario_nombre}
              </span>

              <span>
                <strong className="md:hidden">Código: </strong>
                {p.codigo}
              </span>

              <span>
                <strong className="md:hidden">Tipo: </strong>
                {p.tipo}
              </span>

              <span>
                <strong className="md:hidden">Marca: </strong>
                {p.marca}
              </span>

              <span>
                <strong className="md:hidden">Estado: </strong>
                {ESTADO_LABELS[p.estado] || p.estado}
              </span>

              <span>
                <strong className="md:hidden">Uso: </strong>
                {p.uso}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
