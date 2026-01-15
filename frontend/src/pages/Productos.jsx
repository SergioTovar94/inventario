import { useEffect, useState } from "react";
import { getProductos, deleteProducto, createProducto, updateProducto } from "../api/productos"; // importa los CRUD completos
import { getTiposProducto } from "../api/tiposProducto";
import { getMarcas } from "../api/marcas";
import { asignarProducto, devolverProducto } from "../api/asignacionesProductos";
import { getFuncionarios } from "../api/funcionarios";

const ESTADO_LABELS = {
  EXCELENTE: "Excelente",
  BUENO: "Bueno",
  REGULAR: "Regular",
  DANADO: "Dañado",
};

const USO_LABELS = {
  DISPONIBLE: "Disponible",
  ASIGNADO: "Asignado",
  EN_REPARACION: "En reparación",
  DADO_DE_BAJA: "Dado de baja",
  PRESTADO: "Prestado",
};

const PROPIEDAD_LABELS = {
  PROPIO: "Propio",
  PRESTADO: "Prestado",
  ALQUILADO: "Alquilado",
};


export default function Productos() {
  const DEFAULT_DATE = "2023-07-04";
  const [orden, setOrden] = useState("-id");
  const [filtroTipo, setFiltroTipo] = useState("");

  const [formCodigo, setFormCodigo] = useState("");
  const [formSerial, setFormSerial] = useState("");
  const [formTipo, setFormTipo] = useState(null);
  const [formMarca, setFormMarca] = useState(null);
  const [formPrecio, setFormPrecio] = useState("");
  const [formEstado, setFormEstado] = useState("BUENO");
  const [formUso, setFormUso] = useState("DISPONIBLE");
  const [formPropiedad, setFormPropiedad] = useState("PROPIO");
  const [formDetalles, setFormDetalles] = useState("");
  const [formFechaCompra, setFormFechaCompra] = useState(DEFAULT_DATE);
  const [funcionarioSeleccionado, setFuncionarioSeleccionado] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [tipos, setTipos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [funcionarios, setFuncionarios] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [modalAsignar, setModalAsignar] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);


  const loadProductos = async () => {
    setLoading(true);
    const data = await getProductos({
      ordering: orden,
      tipoId: filtroTipo,
    });
    setProductos(data);
    setLoading(false);
  };


  const handleSort = (field) => {
    setOrden((prev) => {
      if (prev === field) return `-${field}`;
      if (prev === `-${field}`) return field;
      return field;
    });
  };

  useEffect(() => {
    const loadData = async () => {
      const tiposData = await getTiposProducto();
      const marcasData = await getMarcas();

      setTipos(tiposData);
      setMarcas(marcasData);

      if (tiposData.length > 0) setFormTipo(tiposData[0].id);
      if (marcasData.length > 0) setFormMarca(marcasData[0].id);
    };

    loadData();
  }, []);

  useEffect(() => {
    getFuncionarios().then(setFuncionarios);
  }, []);

  useEffect(() => {
    loadProductos();
  }, [orden, filtroTipo]);


  const handleDelete = async (id) => {
    const success = await deleteProducto(id);
    if (success) loadProductos();
  };

  const handleEdit = (producto) => {
    setFormCodigo(producto.codigo);
    setFormSerial(producto.serial);
    setFormTipo(producto.tipo_id_value);
    setFormMarca(producto.marca_id_value);
    setFormPrecio(producto.precio);
    setFormUso(producto.uso || "DISPONIBLE");
    setFormPropiedad(producto.propiedad || "PROPIO");
    setFormDetalles(producto.detalles || "");

    // 🔥 FIX CRÍTICO
    setFormEstado(
      ["EXCELENTE", "BUENO", "REGULAR", "DANADO"].includes(producto.estado)
        ? producto.estado
        : "BUENO"
    );

    setFormFechaCompra(producto.fecha_compra);
    setEditingId(producto.id);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      codigo: formCodigo,
      serial: formSerial,
      tipo_id: formTipo,
      marca_id: formMarca,
      precio: formPrecio,
      estado: formEstado,
      uso: formUso,
      propiedad: formPropiedad,
      detalles: formDetalles,
      fecha_compra: formFechaCompra,
    };

    try {
      if (editingId) {
        await updateProducto(editingId, payload);
      } else {
        await createProducto(payload);
      }

      // limpiar SOLO si todo salió bien
      setFormCodigo("");
      setFormSerial("");
      if (tipos.length > 0) setFormTipo(tipos[0].id);
      if (marcas.length > 0) setFormMarca(marcas[0].id);
      setFormPrecio("");
      setFormEstado("BUENO");
      setFormUso("DISPONIBLE");
      setFormPropiedad("PROPIO");
      setFormDetalles("");
      setFormFechaCompra(DEFAULT_DATE);
      setEditingId(null);

      loadProductos();

    } catch (error) {
      setErrorMsg(error.codigo?.[0] || "Error inesperado");
    }
  };


  return (
    <div>
      <h1>Productos</h1>
      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-3">
          {errorMsg}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="
    mb-4
    flex flex-col
    gap-3
    md:flex-row
    md:flex-wrap
    md:gap-4
  "
      >
        <input
          required
          type="text"
          value={formCodigo}
          onChange={(e) => setFormCodigo(e.target.value.toUpperCase())}
          placeholder="Código"
          className="border px-2 py-1 w-full md:w-auto"
        />
        <input
          required
          type="text"
          value={formSerial}
          onChange={(e) => setFormSerial(e.target.value.toUpperCase())}
          placeholder="Serial"
          className="border px-2 py-1 w-full md:w-auto"
        />

        <select
          required
          value={formMarca ?? ""}
          onChange={(e) => setFormMarca(Number(e.target.value))}
          className="border px-2 py-1 w-full md:w-auto"
        >
          <option value="" disabled>
            Seleccione una marca
          </option>

          {marcas.map((marca) => (
            <option key={marca.id} value={marca.id}>
              {marca.nombre}
            </option>
          ))}
        </select>

        <select
          required
          value={formTipo ?? ""}
          onChange={(e) => setFormTipo(Number(e.target.value))}
        >
          <option value="" disabled>
            Seleccione un tipo
          </option>

          {tipos.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.tipo_producto}
            </option>
          ))}
        </select>


        <input
          required
          type="number"
          value={formPrecio}
          onChange={(e) => setFormPrecio(e.target.value)}
          placeholder="Precio"
          className="border px-2 py-1 w-full md:w-auto"
        />

        <input
          type="date"
          value={formFechaCompra}
          onChange={(e) => setFormFechaCompra(e.target.value)}
          className="border px-2 py-1 w-full md:w-auto"
        />

        <select
          required
          value={formEstado}
          onChange={(e) => setFormEstado(e.target.value)}
          className="border px-2 py-1 w-full md:w-auto"
        >
          {Object.entries(ESTADO_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <select
          value={formUso}
          onChange={(e) => setFormUso(e.target.value)}
          className="border px-2 py-1 w-full md:w-auto"
        >
          {Object.entries(USO_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        <select
          value={formPropiedad}
          onChange={(e) => setFormPropiedad(e.target.value)}
          className="border px-2 py-1 w-full md:w-auto"
        >
          {Object.entries(PROPIEDAD_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        <textarea
          value={formDetalles}
          onChange={(e) => setFormDetalles(e.target.value)}
          placeholder="Observaciones (ej: cargador dañado, sin cable, etc.)"
          className="border px-2 py-1 w-full"
          rows={2}
        />


        <button
          type="submit"
          className="bg-[#442f7f] hover:bg-[#61438F] text-white px-3 py-1 rounded"
        >
          {editingId ? "Guardar" : "Agregar"}
        </button>

        <button
          type="button"
          onClick={() => {
            setFormCodigo("");
            setFormSerial("");
            if (tipos.length > 0) setFormTipo(tipos[0].id);
            if (marcas.length > 0) setFormMarca(marcas[0].id);
            setFormPrecio("");
            setFormEstado("BUENO");
            setFormFechaCompra(DEFAULT_DATE);
            setEditingId(null);
          }}

          className="ml-2 px-3 py-1 border rounded"
        >
          Cancelar
        </button>

      </form>
      {/* CONTROLES SOLO PARA MÓVIL */}
      <div className="flex flex-col gap-2 mb-4">
        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          className="border px-2 py-2 rounded"
        >
          <option value="-id">Más recientes</option>
          <option value="codigo">Código A–Z</option>
          <option value="-codigo">Código Z–A</option>
          <option value="serial">Serial A–Z</option>
          <option value="-serial">Serial Z–A</option>
          <option value="precio">Precio ↑</option>
          <option value="-precio">Precio ↓</option>
          <option value="estado">Estado</option>
          <option value="fecha_compra">Fecha compra</option>
        </select>

        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          className="border px-2 py-2 rounded"
        >
          <option value="">Todos los tipos</option>
          {tipos.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.tipo_producto}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          <li className="hidden md:grid grid-cols-11 items-center text-center font-semibold bg-gray-100 border p-2 rounded">
            <span onClick={() => handleSort("codigo")}
              className="cursor-pointer hover:underline">
              Código {orden.includes("codigo") ? (orden.startsWith("-") ? "▼" : "▲") : ""}
            </span>
            <span
              onClick={() => handleSort("serial")}
              className="cursor-pointer hover:underline"
            >
              Serial {orden.includes("serial") ? (orden.startsWith("-") ? "▼" : "▲") : ""}
            </span>

            <span
              onClick={() => handleSort("tipo")}
              className="cursor-pointer hover:underline"
            >Tipo {orden.includes("tipo") ? (orden.startsWith("-") ? "▼" : "▲") : ""}
            </span>
            <span>Marca</span>

            <span
              onClick={() => handleSort("precio")}
              className="cursor-pointer hover:underline"
            >
              Precio {orden.includes("precio") ? (orden.startsWith("-") ? "▼" : "▲") : ""}
            </span>

            <span
              onClick={() => handleSort("estado")}
              className="cursor-pointer hover:underline"
            >Estado {orden.includes("estado") ? (orden.startsWith("-") ? "▼" : "▲") : ""}
            </span>
            <span
              onClick={() => handleSort("fecha_compra")}
              className="cursor-pointer hover:underline"
            >Fecha compra  {orden.includes("fecha_compra") ? (orden.startsWith("-") ? "▼" : "▲") : ""}
            </span>
            <span
              onClick={() => handleSort("uso")}
              className="cursor-pointer hover:underline"
            >Uso  {orden.includes("uso") ? (orden.startsWith("-") ? "▼" : "▲") : ""}
            </span>
            <span
              onClick={() => handleSort("propiedad")}
              className="cursor-pointer hover:underline"
            >Propiedad  {orden.includes("propiedad") ? (orden.startsWith("-") ? "▼" : "▲") : ""}
            </span>
            <span>Acciones</span>
          </li>

          {productos.map((p) => (
            <li
              key={p.id}
              className="
    border rounded p-3 mb-3
    grid gap-2
    sm:grid-cols-2
    md:grid-cols-11
    md:items-center md:text-center
  "
            >
              <span>
                <strong className="md:hidden">Código: </strong>
                {p.codigo}
              </span>

              <span>
                <strong className="md:hidden">Serial: </strong>
                {p.serial}
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
                <strong className="md:hidden">Precio: </strong>
                {p.precio}
              </span>

              <span>
                <strong className="md:hidden">Estado: </strong>
                {ESTADO_LABELS[p.estado] || "Desconocido"}
              </span>

              <span>
                <strong className="md:hidden">Compra: </strong>
                {p.fecha_compra}
              </span>
              <span>
                <strong className="md:hidden">Uso: </strong>
                {USO_LABELS[p.uso]}
              </span>

              <span>
                <strong className="md:hidden">Propiedad: </strong>
                {PROPIEDAD_LABELS[p.propiedad]}
              </span>
              {p.asignacion_activa && (
                <span className="col-span-full text-sm text-blue-600">
                  👤 Asignado a: {p.asignacion_activa.funcionario_nombre}
                </span>
              )}
              {p.detalles && (
                <span className="col-span-full text-sm text-gray-600">
                  📝 {p.detalles}
                </span>
              )}


              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  className="bg-[#55b5b1] text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(p)}
                >
                  Editar
                </button>

                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(p.id)}
                >
                  Eliminar
                </button>

                {/* ASIGNAR */}
                {p.uso === "DISPONIBLE" && (
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded"
                    onClick={() => {
                      setProductoSeleccionado(p);
                      setModalAsignar(true);
                    }}
                  >
                    Asignar
                  </button>
                )}

                {/* DEVOLVER */}
                {p.uso === "ASIGNADO" && p.asignacion_activa && (
                  <button
                    className="bg-yellow-600 text-white px-2 py-1 rounded"
                    onClick={async () => {
                      await devolverProducto(p.asignacion_activa.id);
                      loadProductos();
                    }}
                  >
                    Devolver
                  </button>
                )}

              </div>

            </li>
          ))}
        </ul>
      )}
      {modalAsignar && productoSeleccionado && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded w-96">
            <h2 className="font-semibold mb-3">
              Asignar producto {productoSeleccionado.codigo}
            </h2>

            <select
              className="border w-full mb-3 px-2 py-1"
              value={funcionarioSeleccionado}
              onChange={(e) => setFuncionarioSeleccionado(e.target.value)}
            >
              <option value="">Seleccione funcionario</option>
              {funcionarios.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nombre}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                className="border px-3 py-1 rounded"
                onClick={() => {
                  setModalAsignar(false);
                  setProductoSeleccionado(null);
                  setFuncionarioSeleccionado("");
                }}
              >
                Cancelar
              </button>

              <button
                className="bg-blue-600 text-white px-3 py-1 rounded"
                disabled={!funcionarioSeleccionado}
                onClick={async () => {
                  await asignarProducto({
                    producto: productoSeleccionado.id,
                    funcionario: funcionarioSeleccionado,
                  });

                  setModalAsignar(false);
                  setProductoSeleccionado(null);
                  setFuncionarioSeleccionado("");
                  loadProductos();
                }}
              >
                Asignar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
