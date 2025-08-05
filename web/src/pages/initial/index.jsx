import React from 'react';
import { FaHeartbeat, FaTint, FaVial, FaCalendarAlt, FaUser, FaUserPlus } from 'react-icons/fa';
import './styles.css';
import { Link } from 'react-router-dom';


export default function Initial() {
    return (
        <div className="container_initial">
            <h1 className="title">Monitor de Saúde</h1>
            <p className="description">
                Conheça os principais indicadores que afetam seu bem-estar. Acompanhar esses dados é essencial para uma vida saudável.
            </p>

            <div className="gridContainer">
                <div className="iconBox">
                    <FaHeartbeat size={40} color="#e63946" />
                    <span className="iconLabel">Pressão Arterial</span>
                    <p className="infoText">
                        Monitorar a pressão ajuda a evitar doenças cardíacas, AVC e complicações renais.
                    </p>
                </div>

                <div className="iconBox">
                    <FaTint size={40} color="#0077b6" />
                    <span className="iconLabel">Glicemia</span>
                    <p className="infoText">
                        Controlar o nível de glicose no sangue é essencial para prevenir e gerenciar o diabetes.
                    </p>
                </div>

                <div className="iconBox">
                    <FaVial size={40} color="#f4a261" />
                    <span className="iconLabel">Colesterol</span>
                    <p className="infoText">
                        Níveis elevados podem causar obstrução das artérias e aumentar o risco de infarto.
                    </p>
                </div>

                <div className="iconBox">
                    <FaCalendarAlt size={40} color="#2a9d8f" />
                    <span className="iconLabel">Medicamentos</span>
                    <p className="infoText">
                        A adesão correta ao tratamento é fundamental para controlar doenças crônicas.
                    </p>
                </div>
            </div>

            <div className="iconRow">
                <Link to="/login" className="iconButton">
                    <FaUser size={24} />
                    <span>Conecte-se</span>
                </Link>

                <Link to="/signup" className="iconButton">
                    <FaUserPlus size={24} />
                    <span>Cadastro</span>
                </Link>
            </div>

            <p className="footer">Gerencie e melhore sua qualidade de vida com conhecimento e acompanhamento.</p>
        </div>
    );
}
