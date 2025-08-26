import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaTint, FaVial, FaCalendarAlt } from 'react-icons/fa';
import './styles.css';
import {BASE_URL} from '../../../config/api'

export default function Home() {
    return (
        <div className="container_home">
            <h1 className="title">Monitor de Saúde</h1>
            <p className="description">Acompanhe seus indicadores de saúde:</p>
            <p>Bem-vindo, {localStorage.getItem('username')}</p>
            <div className="gridContainer">
                <Link to="/pressao" className="iconBox">
                    <FaHeartbeat size={40} color="#e63946" />
                    <span className="iconLabel">Pressão</span>
                </Link>

                <Link to="/glicemia" className="iconBox">
                    <FaTint size={40} color="#0077b6" />
                    <span className="iconLabel">Glicemia</span>
                </Link>

                <Link to="/colesterol" className="iconBox">
                    <FaVial size={40} color="#f4a261" />
                    <span className="iconLabel">Colesterol</span>
                </Link>

                <Link to="/medications" className="iconBox">
                    <FaCalendarAlt size={40} color="#2a9d8f" />
                    <span className="iconLabel">Medicamentos</span>
                </Link>
            </div>

        
            <p className="footer">Gerenciar e Melhorar o Seu Bem-Estar</p>
        </div>
    );
}