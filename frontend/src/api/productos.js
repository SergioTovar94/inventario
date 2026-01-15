import { authFetch } from "../api/authFetch";

export const getProductos = async ({
  ordering = "-id",
  tipoId = "",
  marcaId = "",
  uso = "",
  propiedad = "",
} = {}) => {
  try {
    const params = new URLSearchParams();

    if (ordering) params.append("ordering", ordering);
    if (tipoId) params.append("tipo", tipoId);
    if (marcaId) params.append("marca", marcaId);
    if (uso) params.append("uso", uso);
    if (propiedad) params.append("propiedad", propiedad);

    const res = await authFetch(`/api/productos/?${params.toString()}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteProducto = async (id) => {
  try {
    await authFetch(`/api/productos/${id}/`, {
      method: "DELETE"
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
// Crear
export const createProducto = async ({
  codigo,
  serial,
  tipo_id,
  marca_id,
  precio,
  estado,
  fecha_compra,
}) => {
  const res = await authFetch("/api/productos/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      codigo: codigo.toUpperCase(),
      serial: serial.toUpperCase(),
      tipo_id,
      marca_id,
      precio,
      estado,
      fecha_compra,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw errorData; 
  }
  return await res.json();
};


// Actualizar
export const updateProducto = async (id, data) => {
  const res = await authFetch(`/api/productos/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify(data),
  });
  return res.ok;
};