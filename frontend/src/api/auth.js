const API_URL = 'http://backend:8000/api/auth/';

export async function login(username, password) {
  const res = await fetch(API_URL + 'login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function register(username, email, password) {
  const res = await fetch(API_URL + 'register/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  return res.json();
}
