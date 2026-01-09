import { authFetch } from "../api/authFetch";

export const getAreas = async () => {
  try {
    const data = await authFetch("/api/areas/"); 
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteArea = async (id) => {
  try {
    await authFetch(`/api/areas/${id}/`, {
      method: "DELETE"
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
// Crear
export const createArea = async ({ nombre, descripcion }) => {
  return authFetch("/api/areas/", {
    method: "POST",
    body: JSON.stringify({ nombre, descripcion }),
  });
};

// Actualizar
export const updateArea = async (id, data) => {
  const res = await fetch(`/api/areas/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify(data),
  });
  return res.ok;
};