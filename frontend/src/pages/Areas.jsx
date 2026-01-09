import { useEffect, useState } from "react";
import { getAreas, deleteArea, createArea, updateArea } from "../api/areas"; // importa los CRUD completos

export default function Areas() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formNombre, setFormNombre] = useState(""); // para agregar/modificar
  const [editingId, setEditingId] = useState(null); // null = creando, id = editando

  const loadAreas = async () => {
    setLoading(true);
    const data = await getAreas();
    setAreas(data);
    setLoading(false);
  };

  useEffect(() => {
    loadAreas();
  }, []);

  const handleDelete = async (id) => {
    const success = await deleteArea(id);
    if (success) loadAreas();
  };

  const handleEdit = (area) => {
    setFormNombre(area.nombre);
    setEditingId(area.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateArea(editingId, { nombre: formNombre });
    } else {
      await createArea({ nombre: formNombre });
    }
    setFormNombre("");
    setEditingId(null);
    loadAreas();
  };

  return (
    <div>
      <h1>Áreas</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          required
          type="text"
          value={formNombre}
          onChange={(e) => setFormNombre(e.target.value)}
          placeholder="Nombre del área"
          className="border px-2 py-1 w-full md:w-auto"
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
            setFormNombre("");
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
          <li className="hidden md:grid grid-cols-2 items-center text-center font-semibold bg-gray-100 border p-2 rounded">
            <span>Área</span>
            <span>Acciones</span>
          </li>
          {areas.map((area) => (
            <li key={area.id}  className="grid grid-cols-1 md:grid-cols-2 items-center text-center mb-2 border p-2 rounded">
              <span>{area.nombre}</span>
              <div>
                <button
                  className="bg-[#55b5b1]  text-white px-2 py-1 rounded mr-2 hover:bg-[#61438F]"
                  onClick={() => handleEdit(area)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-[#61438F]"
                  onClick={() => handleDelete(area.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
