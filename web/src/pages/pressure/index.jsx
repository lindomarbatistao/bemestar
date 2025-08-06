import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

export default function PressureForm() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');

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
    const [dd, mm, yyyy] = text.split('/');
    const d = parseInt(dd), m = parseInt(mm), y = parseInt(yyyy);
    const dateObj = new Date(`${yyyy}-${mm}-${dd}`);
    return d > 0 && m > 0 && y > 1000 && d <= 31 && m <= 12 && dateObj.getDate() === d && dateObj.getMonth() + 1 === m && dateObj.getFullYear() === y;
  };

  const isValidTime = (text) => {
    const [hh, mm] = text.split(':');
    const h = parseInt(hh), m = parseInt(mm);
    return h >= 0 && h <= 23 && m >= 0 && m <= 59;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidDate(date)) {
      return alert('Data inválida. Use o formato dd/mm/aaaa.');
    }

    if (!isValidTime(time)) {
      return alert('Hora inválida. Use o formato hh:mm.');
    }

    try {
      const [dd, mm, yyyy] = date.split('/');
      const dataFormatada = `${yyyy}-${mm}-${dd}`;

      const payload = {
        data: dataFormatada,
        hora: time,
        alta: parseInt(systolic),
        baixa: parseInt(diastolic),
      };

      await axios.post('http://localhost:8000/api/pressao/', payload);
      alert('Pressão registrada com sucesso!');
      setDate('');
      setTime('');
      setSystolic('');
      setDiastolic('');
    } catch (error) {
      console.error('Erro ao registrar:', error);
      alert('Erro ao registrar. Verifique os dados ou tente novamente.');
    }
  };

  return (

    <div className="wrapper_pressure">
      <div className="container_pressure">
        <h1 className="title_pressure">Registrar Pressão Arterial</h1>
        <form onSubmit={handleSubmit} className="form_pressure">
          <input
            type="text"
            placeholder="Data (ex: 16/07/2025)"
            value={date}
            onChange={handleDateChange}
            maxLength={10}
            className='input_pressure'
            />
          <input
            type="text"
            placeholder="Hora (ex: 14:30)"
            value={time}
            onChange={handleTimeChange}
            maxLength={5}
            className='input_pressure'
            />
          <input
            type="number"
            placeholder="Pressão Alta (ex: 120)"
            value={systolic}
            onChange={(e) => setSystolic(e.target.value)}
            className='input_pressure'
            />
          <input
            type="number"
            placeholder="Pressão Baixa (ex: 80)"
            value={diastolic}
            onChange={(e) => setDiastolic(e.target.value)}
            className='input_pressure'
          />
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>


  );
}