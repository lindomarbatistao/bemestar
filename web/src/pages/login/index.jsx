import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {BASE_URL} from '../../../config/api'
import axios from 'axios';
import './styles.css';

export default function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/token/`, {
                username: user,
                password,
            });
            localStorage.setItem('token', response.data.access);
            console.log('Token Login: ', response.data.access);
            localStorage.setItem('username', user);
            navigate('/home');
        } catch (error) {
            alert('E-mail ou senha inválidos.');
        }
    };

    return (
        <div className="login-wrapper">
            <form className="login-box" onSubmit={handleSubmit}>
                <h2 className="login-title">Login</h2>

                <label>Usuário</label>
                <input
                    type="user"
                    placeholder="usuário"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                    className='input_login'
                />

                <label>Senha</label>
                <input
                    type="password"
                    placeholder="senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='input_login'
                />


                <div className='center_login'>
                    <button type="submit" className="login-button">Entrar</button>
                </div>

                <div className="signup-text">
                    Ainda não tem conta? <Link to="/signup">Cadastre-se</Link>
                </div>
            </form>
        </div>
    );
}
