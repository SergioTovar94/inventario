import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch("/api/users/register/", { // <-- usar proxy si configuras
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        alert("Usuario registrado correctamente");
        navigate("/");
      } else {
        alert("Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      alert("No se pudo conectar con el backend");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-4">
      <h1 className="text-3xl font-bold text-[#55b5b1]">Registro</h1>

      <input
        className="border p-2 rounded w-64"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 rounded w-64"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-[#55b5b1] text-white px-4 py-2 rounded w-64"
        onClick={handleRegister}
      >
        Registrarse
      </button>

      <p
        className="text-[#55b5b1] cursor-pointer"
        onClick={() => navigate("/")}
      >
        ¿Ya tienes cuenta? Inicia sesión
      </p>
    </div>
  );
}

export default Register;
