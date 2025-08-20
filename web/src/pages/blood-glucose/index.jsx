import React, { useState } from 'react';
import './BloodGlucose.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function BloodGlucose() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [glucose, setGlucose] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem("token")

    const isValidDate = (text) => {
        const [dd, mm, yyyy] = text.split('/');
        const d = parseInt(dd, 10);
        const m = parseInt(mm, 10);
        const y = parseInt(yyyy, 10);

        if (isNaN(d) || isNaN(m) || isNaN(y)) return false;

        const dateObj = new Date(y, m - 1, d);

        return (
            d > 0 && m > 0 && y > 1000 &&
            d <= 31 && m <= 12 &&
            dateObj.getDate() === d &&
            dateObj.getMonth() + 1 === m &&
            dateObj.getFullYear() === y
        );
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

        const [dd, mm, yyyy] = date.split('/');
        const dataFormatada = `${yyyy}-${mm}-${dd}`;
        const payload = {
            glic: parseInt(glucose),
            data: dataFormatada,
            hora: time,
        };

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8000/api/glicemia/', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('Glicemia registrada com sucesso!');
            setDate('');
            setTime('');
            setGlucose('');
        } catch (error) {
            console.error('Erro ao registrar:', error.response?.data || error.message);
            alert('Erro ao registrar a glicemia. Verifique os dados.');
        }
    };

    return (
        <div className="blood-container">
            <h2>Registrar Glicemia</h2>
            <form className="blood-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Data (ex: 16/07/2025)"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    maxLength={10}
                    required
                />
                <input
                    type="text"
                    placeholder="Hora (ex: 14:30)"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    maxLength={5}
                    required
                />
                <input
                    type="number"
                    placeholder="Valor da Glicemia (ex: 85)"
                    value={glucose}
                    onChange={(e) => setGlucose(e.target.value)}
                    required
                />
                <button type="submit">Registrar</button>
            </form>
            <button className="back-button" onClick={() => navigate('/')}>Voltar</button>
        </div>
    );
}

