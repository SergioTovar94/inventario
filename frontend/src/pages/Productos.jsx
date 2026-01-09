import { useEffect, useState } from "react";
import { getProductos, deleteProducto, createProducto, updateProducto } from "../api/productos"; // importa los CRUD completos
import { getTiposProducto } from "../api/tiposProducto";
import { getMarcas } from "../api/marcas";

const ESTADO_LABELS = {
  EXCELENTE: "Excelente",
  BUENO: "Bueno",
  REGULAR: "Regular",
  DANADO: "Dañado",
};

export default function Productos() {
  const DEFAULT_DATE = "2023-07-04";
  const [ordering, setOrdering] = useState("-id");

  const [formCodigo, setFormCodigo] = useState("");
  const [formSerial, setFormSerial] = useState("");
  const [formTipo, setFormTipo] = useState(null);
  const [formMarca, setFormMarca] = useState(null);
  const [formPrecio, setFormPrecio] = useState("");
  const [formEstado, setFormEstado] = useState("BUENO");
  const [formFechaCompra, setFormFechaCompra] = useState(DEFAULT_DATE);

  const [tipos, setTipos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const loadProductos = async () => {
    setLoading(true);
    const data = await getProductos(ordering);
    setProductos(data);
    setLoading(false);
  };


  const handleSort = (field) => {
    setOrdering((prev) => {
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

      if (tiposData.length > 0) {
        setFormTipo(tiposData[0].id);
      }
      if (marcasData.length > 0) {
        setFormMarca(marcasData[0].id);
      }
    };

    loadData();
    loadProductos();
  }, [ordering]);

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
    console.log("formMarca:", formMarca, typeof formMarca);
    console.log("formTipo:", formTipo, typeof formTipo);
    const payload = {
      codigo: formCodigo,
      serial: formSerial,
      tipo_id: formTipo,
      marca_id: formMarca,
      precio: formPrecio,
      estado: formEstado,
      fecha_compra: formFechaCompra,
    };

    if (editingId) {
      await updateProducto(editingId, payload);
    } else {
      await createProducto(payload);
    }

    // limpiar
    setFormCodigo("");
    setFormSerial("");
    if (tipos.length > 0) setFormTipo(tipos[0].id);
    if (marcas.length > 0) setFormMarca(marcas[0].id);
    setFormPrecio("");
    setFormEstado("BUENO");
    setFormFechaCompra(DEFAULT_DATE);
    setEditingId(null);
    loadProductos();
  };

  return (
    <div>
      <h1>Productos</h1>

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


        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded"
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

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          <li className="hidden md:grid grid-cols-8 items-center text-center font-semibold bg-gray-100 border p-2 rounded">
            <span>Código</span>

            <span
              onClick={() => handleSort("serial")}
              className="cursor-pointer hover:underline"
            >
              Serial {ordering.includes("serial") ? (ordering.startsWith("-") ? "▼" : "▲") : ""}
            </span>

            <span
              onClick={() => handleSort("tipo")}
              className="cursor-pointer hover:underline"
            >Tipo</span>
            <span>Marca</span>

            <span
              onClick={() => handleSort("precio")}
              className="cursor-pointer hover:underline"
            >
              Precio {ordering.includes("precio") ? (ordering.startsWith("-") ? "▼" : "▲") : ""}
            </span>

            <span
              onClick={() => handleSort("estado")}
              className="cursor-pointer hover:underline"
            >Estado</span>
            <span
              onClick={() => handleSort("fecha_compra")}
              className="cursor-pointer hover:underline"
            >Fecha compra</span>
            <span>Acciones</span>
          </li>

          {productos.map((p) => (
            <li
              key={p.id}
              className="
    border rounded p-3 mb-3
    grid gap-2
    sm:grid-cols-2
    md:grid-cols-8
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

              <div>
                <button className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(p)}>Editar</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(p.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
