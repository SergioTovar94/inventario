import { useEffect, useState } from "react";
import { getReporteValor } from "../../api/reportes";
import { descargarReporteExcel, descargarReporteValorPDF } from "../../api/reportes";


export default function ReporteValor() {
  const [loading, setLoading] = useState(true);
  const [reporte, setReporte] = useState(null);

  const [filtros, setFiltros] = useState({
    estado: "",
    uso: "",
    propiedad: "",
  });

  const cargarReporte = async () => {
    setLoading(true);
    const data = await getReporteValor(filtros);
    setReporte(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarReporte();
  }, []);

  const handleChange = (e) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Reporte de Valor del Inventario
      </h1>

      {/* FILTROS */}
      <div className="bg-white p-4 rounded shadow mb-6 grid gap-4 md:grid-cols-3">
        <select
          name="estado"
          value={filtros.estado}
          onChange={handleChange}
          className="border px-2 py-1"
        >
          <option value="">Todos los estados</option>
          <option value="EXCELENTE">Excelente</option>
          <option value="BUENO">Bueno</option>
          <option value="REGULAR">Regular</option>
          <option value="DANADO">Dañado</option>
        </select>

        <select
          name="uso"
          value={filtros.uso}
          onChange={handleChange}
          className="border px-2 py-1"
        >
          <option value="">Todos los usos</option>
          <option value="DISPONIBLE">Disponible</option>
          <option value="ASIGNADO">Asignado</option>
          <option value="EN_REPARACION">En reparación</option>
          <option value="DADO_DE_BAJA">Dado de baja</option>
          <option value="PRESTADO">Prestado</option>
        </select>

        <select
          name="propiedad"
          value={filtros.propiedad}
          onChange={handleChange}
          className="border px-2 py-1"
        >
          <option value="">Todas las propiedades</option>
          <option value="PROPIO">Propio</option>
          <option value="PRESTADO">Prestado</option>
          <option value="ALQUILADO">Alquilado</option>
        </select>

        <button
          onClick={cargarReporte}
          className="bg-[#442f7f] hover:bg-[#61438F] text-white px-4 py-2 rounded md:col-span-3"
        >
          Aplicar filtros
        </button>
      </div>
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => descargarReporteExcel(filtros)}
          className="bg-[#55b5b1] text-white px-4 py-2 rounded hover:bg-[#61438F]"
        >
          Exportar Excel
        </button>

        <button
          onClick={() => descargarReporteValorPDF(filtros)}
          className="bg-[#a0c648] text-white px-4 py-2 rounded hover:bg-[#61438F]"
        >
          Exportar PDF
        </button>
      </div>
      {/* RESULTADO */}
      {loading ? (
        <p>Cargando reporte...</p>
      ) : reporte ? (
        <div className="bg-white p-6 rounded shadow grid gap-4 md:grid-cols-2">
          <div className="text-center">
            <p className="text-gray-500">Cantidad de activos</p>
            <p className="text-3xl font-bold hover:text-[#61438F]">
              {reporte.cantidad_activos}
            </p>
          </div>

          <div className="text-center">
            <p className="text-gray-500">Valor total del inventario</p>
            <p className="text-3xl font-bold text-[#55b5b1] hover:text-[#61438F] ">
              ${Number(reporte.valor_total).toLocaleString()}
            </p>
          </div>
        </div>
      ) : (
        <p>No hay datos</p>
      )}
    </div>
  );
}
