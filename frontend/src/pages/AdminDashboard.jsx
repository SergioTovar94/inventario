import { useEffect, useState } from "react";
import { authFetch } from "../api/authFetch";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    authFetch("/api/users/all/")
      .then(res => res.json())
      .then(data => {
        setUsers(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error("Error cargando usuarios:", err);
        setUsers([]);
      });
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {users.length === 0 ? (
        <p>No hay usuarios</p>
      ) : (
        <ul>
          {users.map(u => (
            <li key={u.id}>{u.email}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminDashboard;
