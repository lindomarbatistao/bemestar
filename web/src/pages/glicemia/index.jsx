import React, { useState } from 'react';
import './styles.css';

export default function Glicemia() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [glic, setGlic] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Data: ${date}, Hora: ${time}, Glicemia: ${glic}`);
    // Aqui você pode adicionar chamada à API
  };

  return (
    <div className="container">
      <h1 className="title">Glicemia</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Data (ex: 16/07/2025)" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="text" placeholder="Hora (ex: 14:30)" value={time} onChange={(e) => setTime(e.target.value)} />
        <input type="text" placeholder="Glicemia (ex: 85)" value={glic} onChange={(e) => setGlic(e.target.value)} />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
