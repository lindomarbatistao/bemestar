// PressureForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

export default function PressureForm() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleDateChange = (e) => {
    const text = e.target.value.replace(/\D/g, '');
    let formatted = text;
    if (text.length > 2) formatted = text.slice(0, 2) + '/' + text.slice(2);
    if (text.length > 4) formatted = formatted.slice(0, 5) + '/' + text.slice(4, 8);
    if (formatted.length <= 10) setDate(formatted);
  };

  const handleTimeChange = (e) => {
    const text = e.target.value.replace(/\D/g, '');
    let formatted = text;
    if (text.length > 2) formatted = text.slice(0, 2) + ':' + text.slice(2, 4);
    if (formatted.length <= 5) setTime(formatted);
  };

  const isValidDate = (text) => {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(text)) return false;
    const [dd, mm, yyyy] = text.split('/');
    const d = parseInt(dd, 10);
    const m = parseInt(mm, 10);
    const y = parseInt(yyyy, 10);
    if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1000) return false;
    const dateObj = new Date(y, m - 1, d);
    return (
      dateObj.getFullYear() === y &&
      dateObj.getMonth() + 1 === m &&
      dateObj.getDate() === d
    );
  };

  const isValidTime = (text) => {
    if (!/^\d{2}:\d{2}$/.test(text)) return false;
    const [hh, mm] = text.split(':');
    const h = parseInt(hh, 10), m = parseInt(mm, 10);
    return h >= 0 && h <= 23 && m >= 0 && m <= 59;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidDate(date)) return alert('Data inválida. Use o formato dd/mm/aaaa.');
    if (!isValidTime(time)) return alert('Hora inválida. Use o formato hh:mm.');

    try {
      const [dd, mm, yyyy] = date.split('/');
      const dataFormatada = `${yyyy}-${mm}-${dd}`;
      const horaApi = time.length === 5 ? `${time}:00` : time;

      const payload = {
        data: dataFormatada,
        hora: horaApi,
        alta: parseInt(systolic, 10),
        baixa: parseInt(diastolic, 10),
      };

      await axios.post('http://localhost:8000/api/pressao/', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Pressão registrada com sucesso!');
      setDate(''); setTime(''); setSystolic(''); setDiastolic('');
    } catch (error) {
      console.error('Erro ao registrar:', error);
      alert('Erro ao registrar. Verifique os dados ou tente novamente.');
    }
  };

  const handleBack = () => navigate('/home');
  const handleLogout = () => { localStorage.removeItem('token'); navigate('/initial'); };

  return (
    <div className="wrapper_pressure">
      <div className="container_pressure">
        <header className="header_bar">
          <button className="icon_button_pre" onClick={handleBack} title="Voltar" aria-label="Voltar">
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <h1 className="title_pressure">Registrar Pressão Arterial</h1>

          <button className="icon_button_pre" onClick={handleLogout} title="Logout" aria-label="Logout">
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path d="M16 17l5-5-5-5M21 12H9M13 5v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2"
                    stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </header>

        <form onSubmit={handleSubmit} className="form_pressure">
          <div className="grid grid-2">
            <input
              type="text"
              placeholder="Data (ex: 16/07/2025)"
              value={date}
              onChange={handleDateChange}
              maxLength={10}
              className="input_pressure"
            />
            <input
              type="text"
              placeholder="Hora (ex: 14:30)"
              value={time}
              onChange={handleTimeChange}
              maxLength={5}
              className="input_pressure"
            />
          </div>

          <div className="grid grid-2">
            <input
              type="number"
              placeholder="Pressão Alta (ex: 120)"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              className="input_pressure"
            />
            <input
              type="number"
              placeholder="Pressão Baixa (ex: 80)"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              className="input_pressure"
            />
          </div>

          <button type="submit" className="button_pressure">Registrar</button>

          <section className="chart_container">
            <h2 className="chart_title">Gráfico de Pressões Registradas</h2>
            <div className="chart_placeholder">[Gráfico aqui]</div>
          </section>
        </form>
      </div>
    </div>
  );
}
