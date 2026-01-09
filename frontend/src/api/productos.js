import { authFetch } from "../api/authFetch";

export const getProductos = async (ordering = "-id") => {
  try {
    const res = await authFetch(`/api/productos/?ordering=${ordering}`);
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

  return await res.json(); // opcional pero correcto
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