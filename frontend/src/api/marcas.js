import { authFetch } from "../api/authFetch";

export const getMarcas = async () => {
  try {
    const data = await authFetch("/api/marcas/"); 
    return data;
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
  return authFetch("/api/marcas/", {
    method: "POST",
    body: JSON.stringify({ nombre, descripcion }),
  });
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