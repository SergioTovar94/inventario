import { authFetch } from "../api/authFetch";

export const getMarcas = async () => {
  try {
    const res = await authFetch("/api/marcas/");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteMarca = async (id) => {
  try {
    await authFetch(`/api/marcas/${id}/`, {
      method: "DELETE"
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
// Crear
export const createMarca = async ({ nombre, descripcion }) => {
  const res = await authFetch("/api/marcas/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre, descripcion }),
  });

  return await res.json(); // opcional, pero correcto
};
// Actualizar
export const updateMarca = async (id, data) => {
  const res = await authFetch(`/api/marcas/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify(data),
  });
  return res.ok;
};