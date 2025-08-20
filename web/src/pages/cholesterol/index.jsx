import React, { useState } from 'react';
import './styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Cholesterol() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [ldl, setLdl] = useState('');
    const [hdl, setHdl] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem("token")

    const isValidDate = (text) => {
        const [dd, mm, yyyy] = text.split('/');
        const d = parseInt(dd, 10), m = parseInt(mm, 10), y = parseInt(yyyy, 10);
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
        const h = parseInt(hh, 10), m = parseInt(mm, 10);
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
            ldl: parseInt(ldl),
            hdl: parseInt(hdl),
            data: dataFormatada,
            hora: time
        };

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8000/api/colesterol/', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('Colesterol registrado com sucesso!');
            setDate('');
            setTime('');
            setLdl('');
            setHdl('');
        } catch (error) {
            console.error('Erro ao registrar:', error.response?.data || error.message);
            alert('Erro ao registrar. Verifique os dados e tente novamente.');
        }
    };

    const handleBack = () => {
        navigate('/home');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/initial');
    };

    return (
        <div className="cholesterol-container">
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

            <h2 className="title_cholesterol">Registrar Colesterol</h2>
            <form className="cholesterol-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Data (ex: 16/07/2025)"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    maxLength={10}
                    required
                    className="input_cholesterol"
                />
                <input
                    type="text"
                    placeholder="Hora (ex: 14:30)"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    maxLength={5}
                    required
                    className="input_cholesterol"
                />
                <input
                    type="number"
                    placeholder="LDL (ex: 100)"
                    value={ldl}
                    onChange={(e) => setLdl(e.target.value)}
                    required
                    className="input_cholesterol"
                />
                <input
                    type="number"
                    placeholder="HDL (ex: 60)"
                    value={hdl}
                    onChange={(e) => setHdl(e.target.value)}
                    required
                    className="input_cholesterol"
                />
                <button type="submit" className="button_cholesterol">Registrar</button>

                <div className="chart_container">
                    <h2 className="chart_title">Gráfico de Colesterol</h2>
                    <div className="chart_placeholder">[Gráfico aqui]</div>
                </div>
            </form>


        </div>
    );
}
