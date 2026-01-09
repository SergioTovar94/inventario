import { useEffect, useState } from 'react';

export default function InventoryPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://backend:8000/api/inventory/', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inventario</h1>
      <ul>
        {items.map(item => (
          <li key={item.id} className="border p-2 mb-2">{item.name} - {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
}
