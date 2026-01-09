import { useEffect, useState } from "react";
import { getMarcas, deleteMarca, createMarca, updateMarca } from "../api/marcas"; // importa los CRUD completos

export default function Marcas() {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formNombre, setFormNombre] = useState(""); // para agregar/modificar
  const [formDesc, setFormDesc] = useState(""); // para agregar/modificar
  const [editingId, setEditingId] = useState(null); // null = creando, id = editando

  const loadMarcas = async () => {
    setLoading(true);
    const data = await getMarcas();
    setMarcas(data);
    setLoading(false);
  };

  useEffect(() => {
    loadMarcas();
  }, []);

  const handleDelete = async (id) => {
    const success = await deleteMarca(id);
    if (success) loadMarcas();
  };

  const handleEdit = (marca) => {
    setFormNombre(marca.nombre);
    setFormDesc(marca.descripcion)
    setEditingId(marca.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateMarca(editingId, { nombre: formNombre, descripcion: formDesc });
    } else {
      await createMarca({ nombre: formNombre, descripcion: formDesc });
    }
    setFormNombre("");
    setFormDesc("");
    setEditingId(null);
    loadMarcas();
  };

  return (
    <div>
      <h1>Marcas</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          required
          type="text"
          value={formNombre}
          onChange={(e) => setFormNombre(e.target.value)}
          placeholder="Nombre del marca"
          className="border px-2 py-1 w-full md:w-auto"
        />
        <input
          required
          type="text"
          value={formDesc}
          onChange={(e) => setFormDesc(e.target.value)}
          placeholder="Descripción de la marca"
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
            setFormDesc("");
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
          <li className="hidden md:grid grid-cols-3 items-center text-center font-semibold bg-gray-100 border p-2 rounded">
            <span>Marca</span>
            <span>Descripción</span>
            <span>Acciones</span>
          </li>
          {marcas.map((marca) => (

            <li
              key={marca.id}
              className="grid grid-cols-1 md:grid-cols-3 items-center text-center mb-2 border p-2 rounded"
            >
              <span>{marca.nombre}</span>
              <span>{marca.descripcion}</span>
              <div>
                <button
                  className="bg-[#55b5b1] hover:bg-[#61438F]  text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(marca)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-[#61438F]"
                  onClick={() => handleDelete(marca.id)}
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
