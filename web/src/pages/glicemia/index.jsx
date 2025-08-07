import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

export default function Glicemia() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [glic, setGlic] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Data: ${date}, Hora: ${time}, Glicemia: ${glic}`);
    setDate('');
    setTime('');
    setGlic('');
  };

  const handleBack = () => {
    navigate('/home'); 
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/initial'); 
  };

  return (
    <div className="wrapper_glicemia">
      <div className="container_glicemia">
        <div className="top_buttons_gli">
          <button className="icon_button" onClick={handleBack} title="Voltar">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="icon_button" onClick={handleLogout} title="Logout">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 17l5-5-5-5M21 12H9M13 5v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <h1 className="title_glicemia">Registrar Glicemia</h1>
        <form onSubmit={handleSubmit} className="form_glicemia">
          <input
            type="text"
            placeholder="Data (ex: 16/07/2025)"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input_glicemia"
          />
          <input
            type="text"
            placeholder="Hora (ex: 14:30)"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="input_glicemia"
          />
          <input
            type="text"
            placeholder="Glicemia (ex: 85)"
            value={glic}
            onChange={(e) => setGlic(e.target.value)}
            className="input_glicemia"
          />
          <button type="submit" className="button_glicemia">Registrar</button>
        </form>

        <div className="chart_container">
          <h2 className="chart_title">Gráfico de Glicemia</h2>
          <div className="chart_placeholder">[Gráfico aqui]</div>
        </div>
      </div>
    </div>
  );
}
