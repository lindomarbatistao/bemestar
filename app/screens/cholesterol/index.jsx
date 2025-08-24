import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather'; 
import { BASE_URL } from "../../config/api";
import styles from './styles';
import axios from 'axios';

export default function Cholesterol({ navigation }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [ldl, setLdl] = useState('');
  const [hdl, setHdl] = useState('');
  
  const handleDateChange = (text) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    if (cleaned.length > 4) {
      formatted = formatted.slice(0, 5) + '/' + cleaned.slice(4, 8);
    }
    if (formatted.length <= 10) setDate(formatted);
  };

  const handleTimeChange = (text) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = cleaned.slice(0, 2) + ':' + cleaned.slice(2, 4);
    }
    if (formatted.length <= 5) setTime(formatted);
  };

  const isValidDate = (text) => {
    const [dd, mm, yyyy] = text.split('/');
    const d = parseInt(dd, 10), m = parseInt(mm, 10), y = parseInt(yyyy, 10);
    if (!d || !m || !y) return false;
    const dateObj = new Date(`${yyyy}-${mm}-${dd}`);
    return (
      d > 0 &&
      m > 0 &&
      y > 1000 &&
      d <= 31 &&
      m <= 12 &&
      dateObj &&
      dateObj.getDate() === d &&
      dateObj.getMonth() + 1 === m &&
      dateObj.getFullYear() === y
    );
  };

  const isValidTime = (text) => {
    const [hh, mm] = text.split(':');
    const h = parseInt(hh, 10), m = parseInt(mm, 10);
    return !Number.isNaN(h) && !Number.isNaN(m) && h >= 0 && h <= 23 && m >= 0 && m <= 59;
  };

  const toApiDate = (ddmmyyyy) => {
    const [dd, mm, yyyy] = ddmmyyyy.split('/');
    return `${yyyy}-${mm}-${dd}`;
  };

  const toApiTime = (hhmm) => (hhmm.length === 5 ? `${hhmm}:00` : hhmm);

  const handleRegister = async () => {
    if (!isValidDate(date)) {
      return Alert.alert('Erro', 'Data inválida. Use o formato dd/mm/aaaa.');
    }
    if (!isValidTime(time)) {
      return Alert.alert('Erro', 'Hora inválida. Use o formato hh:mm.');
    }
    if (ldl.trim() === '' || hdl.trim() === '') {
      return Alert.alert('Erro', 'Preencha LDL e HDL.');
    }

    const payload = {
      data: toApiDate(date),   // YYYY-MM-DD
      hora: toApiTime(time),   // HH:MM:SS
      ldl: parseInt(ldl, 10),
      hdl: parseInt(hdl, 10),
    };

    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post(`${BASE_URL}/api/colesterol/`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert('Sucesso', 'Dados registrados com sucesso!');
      setDate('');
      setTime('');
      setLdl('');
      setHdl('');
    } catch (err) {
      console.log('Erro ao enviar colesterol:', err?.response?.data || err?.message);
      Alert.alert('Erro', 'Falha ao registrar. Verifique o login e os dados.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Colesterol</Text>

      <TextInput
        style={styles.input}
        placeholder="Data (ex: 16/07/2025)"
        keyboardType="numeric"
        value={date}
        onChangeText={handleDateChange}
        maxLength={10}
      />

      <TextInput
        style={styles.input}
        placeholder="Hora (ex: 14:30)"
        keyboardType="numeric"
        value={time}
        onChangeText={handleTimeChange}
        maxLength={5}
      />

      <TextInput
        style={styles.input}
        placeholder="LDL (ex: 100)"
        keyboardType="numeric"
        value={ldl}
        onChangeText={setLdl}
        maxLength={4}
      />

      <TextInput
        style={styles.input}
        placeholder="HDL (ex: 100)"
        keyboardType="numeric"
        value={hdl}
        onChangeText={setHdl}
        maxLength={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <View style={styles.graphPlaceholder}>
        <Text style={styles.graphText}>[ Gráfico será exibido aqui ]</Text>
      </View>

      <Text style={styles.footer}>Gerenciar e Melhorar o Seu Bem-Estar</Text>

      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Initial')}>
        <Icon name="home" size={28} color="#0077b6" />
        <Text style={styles.homeText}>Voltar à Tela Inicial</Text>
      </TouchableOpacity>
    </View>
  );
}
