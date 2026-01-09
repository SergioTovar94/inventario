// src/api/publicFetch.js
const API_URL = import.meta.env.VITE_API_URL;

export async function publicFetch(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  return response.json();
}
