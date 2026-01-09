import { useEffect, useState } from "react";
import {
  getTiposProducto,
  createTipoProducto,
  updateTipoProducto,
  deleteTipoProducto,
} from "../api/tiposProducto";

export default function TiposProducto() {
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tipoProducto, setTipoProducto] = useState("");
  const [editingId, setEditingId] = useState(null);

  const loadTipos = async () => {
    setLoading(true);
    const data = await getTiposProducto();
    setTipos(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTipos();
  }, []);

  const handleEdit = (tipo) => {
    setTipoProducto(tipo.tipo_producto);
    setEditingId(tipo.id);
  };

  const handleDelete = async (id) => {
    await deleteTipoProducto(id);
    loadTipos();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { tipo_producto: tipoProducto };

    if (editingId) {
      await updateTipoProducto(editingId, payload);
    } else {
      await createTipoProducto(payload);
    }

    setTipoProducto("");
    setEditingId(null);
    loadTipos();
  };

  return (
    <div className="pt-[1cm] px-2 md:px-6">
      {/* FORMULARIO */}
      <div className="mb-6">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:items-center gap-2">
          <input
            required
            type="text"
            value={tipoProducto}
            onChange={(e) => setTipoProducto(e.target.value)}
            placeholder="Tipo de producto"
            className="border px-2 py-1 flex-1"
          />
          <button type="submit" className="bg-[#442f7f] hover:bg-[#61438F] text-white px-3 py-1 rounded">
            {editingId ? "Guardar" : "Agregar"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => { setTipoProducto(""); setEditingId(null); }}
              className="border px-3 py-1 rounded"
            >
              Cancelar
            </button>
          )}
        </form>
      </div>

      {/* TABLA */}
      <div className="overflow-auto">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <ul className="space-y-2">
            <li className="hidden md:grid grid-cols-2 items-center text-center font-semibold bg-gray-100 border p-2 rounded">
              <span>Tipo</span>
              <span>Acciones</span>
            </li>
            {tipos.map((tipo) => (
              <li
                key={tipo.id}
                className="grid grid-cols-1 md:grid-cols-2 items-center text-center mb-2 border p-2 rounded"
              >
                <span className="mb-2 md:mb-0">{tipo.tipo_producto}</span>
                <div className="flex justify-center gap-2">
                  <button
                    className="bg-[#55b5b1] hover:bg-[#61438F]  text-white px-2 py-1 rounded"
                    onClick={() => handleEdit(tipo)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 hover:bg-[#61438F] text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(tipo.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>

  );
}
