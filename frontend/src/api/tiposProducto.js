import { authFetch } from "./authFetch";

const ENDPOINT = "/api/tipos-producto/";

export async function getTiposProducto() {
  const res = await authFetch("/api/tipos-producto/");
  return res.json();
}

export async function createTipoProducto(data) {
  return authFetch(ENDPOINT, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateTipoProducto(id, data) {
  return authFetch(`${ENDPOINT}${id}/`, {
    method: "PATCH", // PATCH es lo ideal
    body: JSON.stringify(data),
  });
}

export async function deleteTipoProducto(id) {
  return authFetch(`${ENDPOINT}${id}/`, {
    method: "DELETE",
  });
}
