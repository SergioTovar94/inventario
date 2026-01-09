import { useEffect, useState } from "react";
import { authFetch } from "../api/authFetch";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    authFetch("/api/users/all/")
      .then(data => setUsers(data))
      .catch(err => {
        console.error("Error cargando usuarios:", err);
      });
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
