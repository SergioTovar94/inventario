import { useState } from 'react';
import { login } from '../api/auth';

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(username, password);
    if (data.access) {
      localStorage.setItem('token', data.access);
      onLogin();
    } else {
      alert('Credenciales inválidas');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 max-w-sm mx-auto">
      <input className="border p-2" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
      <input className="border p-2" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white p-2" type="submit">Ingresar</button>
    </form>
  );
}
