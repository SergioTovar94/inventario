const API_URL = import.meta.env.VITE_API_URL;

export async function authFetch(endpoint, options = {}) {
  console.log("API_URL =", API_URL);
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  // 🔐 Token inválido
  if (response.status === 401) {
    localStorage.removeItem("access_token");
    throw new Error("Unauthorized");
  }

  // ✅ DELETE / 204 / sin contenido
  if (response.status === 204) {
    return null;
  }

  // leer body de forma segura
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Response is not valid JSON");
  }
}
