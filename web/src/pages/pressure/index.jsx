import React, { useState } from 'react';
import './styles.css';

export default function Pressure() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Data: ${date}\nHora: ${time}\nPressão Alta: ${systolic}\nPressão Baixa: ${diastolic}`);
    // Aqui você pode adicionar chamada à API se desejar
  };

  return (
    <div className="container">
      <h1 className="title">Pressão Arterial</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Data (ex: 16/07/2025)"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Hora (ex: 14:30)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pressão Alta (ex: 120)"
          value={systolic}
          onChange={(e) => setSystolic(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pressão Baixa (ex: 80)"
          value={diastolic}
          onChange={(e) => setDiastolic(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
