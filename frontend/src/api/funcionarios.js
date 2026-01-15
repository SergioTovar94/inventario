import { authFetch } from "../api/authFetch";

export const getFuncionarios = async () => {
  try {
    const res = await authFetch("/api/funcionarios/");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteFuncionario = async (id) => {
  try {
    await authFetch(`/api/funcionarios/${id}/`, {
      method: "DELETE"
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
// Crear
export const createFuncionario = async ({
  nombre,
  apellido,
  cargo,
  area,
}) => {
  const res = await authFetch("/api/funcionarios/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre,
      apellido,
      cargo,
      area, // 🔥 ID del área
    }),
  });

  return await res.json();
};
// Actualizar
export const updateFuncionario = async (id, data) => {
  const res = await authFetch(`/api/funcionarios/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify(data),
  });
  return res.ok;
};