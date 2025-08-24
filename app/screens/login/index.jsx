import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "../../config/api";
import styles from './styles';
import axios from 'axios';


export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/token/`, {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        const data = response.data;
        await AsyncStorage.setItem('token', data.access);
        console.log('Token armazenado:', data.access);
        navigation.navigate('Initial');
      }
    } catch (error) {
      if (error.response) {
        console.log('Erro ao fazer login:', error.response.data);
        alert('Usuário ou senha inválidos.');
      } else {
        console.error('Erro de rede:', error.message);
        alert('Erro ao conectar com o servidor.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
