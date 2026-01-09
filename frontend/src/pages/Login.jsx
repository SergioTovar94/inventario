import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // 🔥 ESTO ES CLAVE
    console.log("API:", import.meta.env.VITE_API_URL);
    try {
      const res = await fetch(`${API_URL}/api/users/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();

        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);

        if (email === "admin@correo.com") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      alert("No se pudo conectar con el backend");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-4"
    >
      <h1 className="text-3xl font-bold text-blue-600">Login</h1>

      <input
        name="email"
        type="email"
        autoComplete="username"
        className="border p-2 rounded w-64"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        name="password"
        className="border p-2 rounded w-64"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-64"
      >
        Login
      </button>
    </form>
  );
}

export default Login;
