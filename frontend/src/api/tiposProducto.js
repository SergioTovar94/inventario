import { authFetch } from "./authFetch";

const ENDPOINT = "/api/tipos-producto/";

export async function getTiposProducto() {
  return authFetch(ENDPOINT);
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
