import { useEffect, useState } from "react";
import { getFuncionarios, deleteFuncionario, createFuncionario, updateFuncionario } from "../api/funcionarios"; // importa los CRUD completos
import { getAreas } from "../api/areas";

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formNombre, setFormNombre] = useState("");
  const [formApellido, setFormApellido] = useState("");
  const [formCargo, setFormCargo] = useState("");
  const [formArea, setFormArea] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [areas, setAreas] = useState([]);

  const loadFuncionarios = async () => {
    setLoading(true);
    const data = await getFuncionarios();
    setFuncionarios(data);
    setLoading(false);
  };

  useEffect(() => {
    const loadData = async () => {
      const areasData = await getAreas();

      setAreas(areasData);

      if (areasData.length > 0) setFormArea(areasData[0].id);
    };

    loadData();
  }, []);

  useEffect(() => {
    loadFuncionarios();
  }, []);

  const handleDelete = async (id) => {
    const success = await deleteFuncionario(id);
    if (success) loadFuncionarios();
  };

  const handleEdit = (funcionario) => {
    setFormNombre(funcionario.nombre);
    setFormApellido(funcionario.apellido)
    setFormCargo(funcionario.cargo)
    setEditingId(funcionario.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nombre: formNombre,
      apellido: formApellido,
      cargo: formCargo,
      area: formArea,
    };

    if (editingId) {
      await updateFuncionario(editingId, payload);
    } else {
      await createFuncionario(payload);
    }

    setFormNombre("");
    setFormApellido("");
    setFormCargo("");
    setEditingId(null);
    loadFuncionarios();
  };


  return (
    <div>
      <h1>Funcionarios</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          required
          type="text"
          value={formNombre}
          onChange={(e) => setFormNombre(e.target.value)}
          placeholder="Nombre del funcionario"
          className="border px-2 py-1 w-full md:w-auto"
        />
        <input
          required
          type="text"
          value={formApellido}
          onChange={(e) => setFormApellido(e.target.value)}
          placeholder="Apellido del funcionario"
          className="border px-2 py-1 w-full md:w-auto"
        />
        <input
          required
          type="text"
          value={formCargo}
          onChange={(e) => setFormCargo(e.target.value)}
          placeholder="Cargo del funcionario"
          className="border px-2 py-1 w-full md:w-auto"
        />
        <select
          required
          value={formArea ?? ""}
          onChange={(e) => setFormArea(Number(e.target.value))}
          className="border px-2 py-1 w-full md:w-auto"
        >
          <option value="" disabled>
            Seleccione un área
          </option>

          {areas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.nombre}
            </option>
          ))}
        </select>
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
            setFormApellido("");
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
          <li className="hidden md:grid grid-cols-5 items-center text-center font-semibold bg-gray-100 border p-2 rounded">
            <span>Funcionario</span>
            <span>Apellido</span>
            <span>Cargo</span>
            <span>Área</span>
            <span>Acciones</span>
          </li>
          {funcionarios.map((funcionario) => (

            <li
              key={funcionario.id}
              className="grid grid-cols-1 md:grid-cols-5 items-center text-center mb-2 border p-2 rounded"
            >
              <span>{funcionario.nombre}</span>
              <span>{funcionario.apellido}</span>
              <span>{funcionario.cargo}</span>
              <span>{funcionario.area_nombre}</span>
              <div>
                <button
                  className="bg-[#55b5b1] hover:bg-[#61438F]  text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(funcionario)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-[#61438F]"
                  onClick={() => handleDelete(funcionario.id)}
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
