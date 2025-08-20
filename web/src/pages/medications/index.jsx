// src/pages/Medications.jsx
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

export default function Medications() {
  const [calendarId, setCalendarId] = useState(null);
  const [nameMedic, setNameMedic] = useState('');
  const [time1, setTime1] = useState('');
  const [time2, setTime2] = useState('');
  const [time3, setTime3] = useState('');
  const [time4, setTime4] = useState('');
  const [time5, setTime5] = useState('');
  const [daysOfWeek, setDaysOfWeek] = useState([
    { day: 'Dom', selected: false },
    { day: 'Seg', selected: false },
    { day: 'Ter', selected: false },
    { day: 'Qua', selected: false },
    { day: 'Qui', selected: false },
    { day: 'Sex', selected: false },
    { day: 'Sáb', selected: false },
  ]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const toggleDay = (index) => {
    const updated = [...daysOfWeek];
    updated[index].selected = !updated[index].selected;
    setDaysOfWeek(updated);
  };

  const maskTime = (value) => {
    const text = value.replace(/\D/g, '');
    let formatted = text;
    if (text.length > 2) formatted = text.slice(0, 2) + ':' + text.slice(2, 4);
    return formatted.slice(0, 5);
  };

  const handleTimeChange1 = (v) => setTime1(maskTime(v));
  const handleTimeChange2 = (v) => setTime2(maskTime(v));
  const handleTimeChange3 = (v) => setTime3(maskTime(v));
  const handleTimeChange4 = (v) => setTime4(maskTime(v));
  const handleTimeChange5 = (v) => setTime5(maskTime(v));

  const isValidTime = (text) => {
    if (!text) return true;
    if (!/^\d{2}:\d{2}$/.test(text)) return false;
    const [hh, mm] = text.split(':');
    const h = parseInt(hh, 10), m = parseInt(mm, 10);
    return h >= 0 && h <= 23 && m >= 0 && m <= 59;
  };

  const toApiTime = (t) => (t && t.length === 5 ? `${t}:00` : t || null);

  const resetAll = useCallback(() => {
    setNameMedic('');
    setTime1('');
    setTime2('');
    setTime3('');
    setTime4('');
    setTime5('');
    setDaysOfWeek([
      { day: 'Dom', selected: false },
      { day: 'Seg', selected: false },
      { day: 'Ter', selected: false },
      { day: 'Qua', selected: false },
      { day: 'Qui', selected: false },
      { day: 'Sex', selected: false },
      { day: 'Sáb', selected: false },
    ]);
    setCalendarId(null);
  }, []);

  useEffect(() => {
    const fetchCalendario = async () => {
      try {
        if (!token) {
          resetAll();
          return;
        }
        const res = await axios.get('http://localhost:8000/api/calendario/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (Array.isArray(res.data) && res.data.length > 0) {
          const c = res.data[0];
          setCalendarId(c.id);
          setNameMedic(c.nome || '');
          setTime1(c.hora1 ? c.hora1.slice(0, 5) : '');
          setTime2(c.hora2 ? c.hora2.slice(0, 5) : '');
          setTime3(c.hora3 ? c.hora3.slice(0, 5) : '');
          setTime4(c.hora4 ? c.hora4.slice(0, 5) : '');
          setTime5(c.hora5 ? c.hora5.slice(0, 5) : '');
          setDaysOfWeek([
            { day: 'Dom', selected: !!c.dom },
            { day: 'Seg', selected: !!c.seg },
            { day: 'Ter', selected: !!c.ter },
            { day: 'Qua', selected: !!c.qua },
            { day: 'Qui', selected: !!c.qui },
            { day: 'Sex', selected: !!c.sex },
            { day: 'Sáb', selected: !!c.sab },
          ]);
        }
      } catch {}
    };
    fetchCalendario();
  }, [token, resetAll]);

  const handleRegister = async () => {
    if (!token) {
      alert('Faça login para continuar.');
      return;
    }
    if (![time1, time2, time3, time4, time5].every(isValidTime)) {
      alert('Hora inválida. Use o formato hh:mm.');
      return;
    }
    try {
      const payload = {
        nome: nameMedic,
        dom: daysOfWeek[0].selected,
        seg: daysOfWeek[1].selected,
        ter: daysOfWeek[2].selected,
        qua: daysOfWeek[3].selected,
        qui: daysOfWeek[4].selected,
        sex: daysOfWeek[5].selected,
        sab: daysOfWeek[6].selected,
        hora1: toApiTime(time1),
        hora2: toApiTime(time2),
        hora3: toApiTime(time3),
        hora4: toApiTime(time4),
        hora5: toApiTime(time5),
      };
      if (calendarId) {
        await axios.put(`http://localhost:8000/api/calendario/${calendarId}/`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Dados atualizados com sucesso!');
      } else {
        const res = await axios.post('http://localhost:8000/api/calendario/', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCalendarId(res.data?.id || null);
        alert('Dados registrados com sucesso!');
      }
    } catch {
      alert('Falha ao registrar/atualizar. Verifique os dados ou o login.');
    }
  };

  const handleBack = () => navigate('/home');
  const handleLogout = () => {
    localStorage.removeItem('token');
    resetAll();
    navigate('/initial');
  };

  return (
    <div className="meds_wrapper">
      <div className="meds_container">
        <div className="top_buttons">
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

        <h1 className="title_meds">Medicamento</h1>

        <div className="meds_form">
          <input
            type="text"
            className="input_meds"
            placeholder="Nome do medicamento"
            value={nameMedic}
            onChange={(e) => setNameMedic(e.target.value)}
          />

          <h3 className="meds_label">Dias da semana</h3>
          <div className="days_grid">
            {daysOfWeek.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => toggleDay(idx)}
                className={`day_box ${item.selected ? 'day_box_selected' : ''}`}
              >
                {item.day}
              </button>
            ))}
          </div>

          <h3 className="meds_label">Horários</h3>
          <input type="text" className="input_meds" placeholder="1º Remédio (ex: 06:30)" value={time1} onChange={(e) => handleTimeChange1(e.target.value)} maxLength={5} inputMode="numeric" />
          <input type="text" className="input_meds" placeholder="2º Remédio (ex: 10:30)" value={time2} onChange={(e) => handleTimeChange2(e.target.value)} maxLength={5} inputMode="numeric" />
          <input type="text" className="input_meds" placeholder="3º Remédio (ex: 14:30)" value={time3} onChange={(e) => handleTimeChange3(e.target.value)} maxLength={5} inputMode="numeric" />
          <input type="text" className="input_meds" placeholder="4º Remédio (ex: 18:30)" value={time4} onChange={(e) => handleTimeChange4(e.target.value)} maxLength={5} inputMode="numeric" />
          <input type="text" className="input_meds" placeholder="5º Remédio (ex: 22:30)" value={time5} onChange={(e) => handleTimeChange5(e.target.value)} maxLength={5} inputMode="numeric" />

          <button className="button_meds" onClick={handleRegister}>{calendarId ? 'Atualizar' : 'Registrar'}</button>
          <p className="meds_footer">Gerenciar e Melhorar o Seu Bem-Estar</p>
        </div>
      </div>
    </div>
  );
}
