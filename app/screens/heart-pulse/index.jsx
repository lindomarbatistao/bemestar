import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import Icon from 'react-native-vector-icons/Feather'; 

export default function HeartPulse({ navigation }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [pressure, setPressure] = useState('');

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

  const handleRegister = () => {
    if (!isValidDate(date)) {
      return Alert.alert('Erro', 'Data inválida. Use o formato dd/mm/aaaa.');
    }

    if (!isValidTime(time)) {
      return Alert.alert('Erro', 'Hora inválida. Use o formato hh:mm.');
    }

    console.log('Data:', date);
    console.log('Hora:', time);
    console.log('Pressão:', pressure);
    Alert.alert('Sucesso', 'Dados registrados com sucesso!');
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Pressão Arterial</Text>

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
        placeholder="Pressão (ex: 120/80)"
        value={pressure}
        onChangeText={setPressure}
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
