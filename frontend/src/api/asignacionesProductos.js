import { authFetch } from "./authFetch";

// Crear asignación
export const asignarProducto = async ({ producto, funcionario }) => {
  const res = await authFetch("/api/asignaciones-productos/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ producto, funcionario }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return await res.json();
};

// Devolver producto
export const devolverProducto = async (asignacionId) => {
  const res = await authFetch(`/api/asignaciones-productos/${asignacionId}/`, {
    method: "PATCH",
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return await res.json();
};

