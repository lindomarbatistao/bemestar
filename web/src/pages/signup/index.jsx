import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

export default function SignUp() {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 1) Cadastra usuário
            await axios.post('http://localhost:8000/api/users/', {
                username: user,
                email,
                password,
            });

            // 2) Faz login automático para pegar token
            const loginResponse = await axios.post('http://localhost:8000/api/token/', {
                username: user,
                password,
            });

            // 3) Salva token e usuário no localStorage
            localStorage.setItem('token', loginResponse.data.access);
            localStorage.setItem('username', user);

            // 4) Navega para a home
            navigate('/');
        } catch (error) {
            alert('Erro ao cadastrar. Tente novamente.');
            console.error(error.response?.data || error.message);
        }
    };

    return (
        <div className="login-wrapper">
            <form className="login-box" onSubmit={handleSubmit}>
                <h2 className="login-title">Cadastro</h2>

                <label>Usuário</label>
                <input
                    type="text"
                    placeholder="usuário"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                    className="input_login"
                />

                <label>E-mail</label>
                <input
                    type="email"
                    placeholder="email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input_login"
                />

                <label>Senha</label>
                <input
                    type="password"
                    placeholder="senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input_login"
                />

                <div className="center_login">
                    <button type="submit" className="login-button">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}
