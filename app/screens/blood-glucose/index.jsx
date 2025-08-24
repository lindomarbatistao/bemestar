import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import { BASE_URL } from "../../config/api";
import styles from './styles';
import axios from 'axios';


export default function Bloodglic({ navigation }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [glic, setiGlic] = useState('');

  const handleDateChange = (text) => {
    const cleaned = text.replace(/\D/g, '');

    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    if (cleaned.length > 4) {
      formatted = formatted.slice(0, 5) + '/' + cleaned.slice(4, 8);
    }

    if (formatted.length <= 10) {
      setDate(formatted);
    }
  };

  const handleTimeChange = (text) => {
    const cleaned = text.replace(/\D/g, '');

    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = cleaned.slice(0, 2) + ':' + cleaned.slice(2, 4);
    }

    if (formatted.length <= 5) {
      setTime(formatted);
    }
  };

  const isValidDate = (text) => {
    const [dd, mm, yyyy] = text.split('/');
    const d = parseInt(dd), m = parseInt(mm), y = parseInt(yyyy);
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
    const h = parseInt(hh), m = parseInt(mm);
    return h >= 0 && h <= 23 && m >= 0 && m <= 59;
  };

  const handleRegister = async () => {
  if (!isValidDate(date)) {
    return Alert.alert('Erro', 'Data inválida. Use o formato dd/mm/aaaa.');
  }

  if (!isValidTime(time)) {
    return Alert.alert('Erro', 'Hora inválida. Use o formato hh:mm.');
  }

  const glicValue = parseInt(glic);
  if (isNaN(glicValue)) {
    return Alert.alert('Erro', 'Informe um valor de glicemia válido.');
  }

  try {
    const token = await AsyncStorage.getItem('token');

    const [dd, mm, yyyy] = date.split('/');
    const dataFormatada = `${yyyy}-${mm}-${dd}`; 

    const payload = {
      glic: glicValue,
      data: dataFormatada,
      hora: time,
    };

    console.log('Payload enviado:', payload); 

    await axios.post(`${BASE_URL}/api/glicemia/`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Alert.alert('Sucesso', 'Glicemia registrada com sucesso!');
    setDate('');
    setTime('');
    setiGlic('');
  } catch (error) {
    console.error('Erro ao registrar glicemia:', error.response?.data || error.message);
    Alert.alert('Erro', 'Não foi possível registrar. Verifique os dados ou tente novamente.');
  }
};



  return (
    <View style={styles.container}>

      <Text style={styles.title}>Glicemia</Text>

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
        placeholder="Glicemia (ex: 85)"
        value={glic}
        onChangeText={setiGlic}
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
