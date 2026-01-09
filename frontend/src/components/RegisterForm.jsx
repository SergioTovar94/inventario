import { useState } from 'react';
import { register } from '../api/auth';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await register(username, email, password);
    alert('Usuario registrado: ' + data.username);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 max-w-sm mx-auto">
      <input className="border p-2" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
      <input className="border p-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="border p-2" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="bg-green-500 text-white p-2" type="submit">Registrar</button>
    </form>
  );
}
