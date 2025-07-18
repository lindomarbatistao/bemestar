import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Feather';

export default function Medications({ navigation }) {
  const [date, setDate] = useState('');
  const [time1, setTime1] = useState('');
  const [time2, setTime2] = useState('');
  const [time3, setTime3] = useState('');
  const [time4, setTime4] = useState('');
  const [time5, setTime5] = useState('');
  const [nameMedic, setNameMedic] = useState('');

  const [daysOfWeek, setDaysOfWeek] = useState([
    { day: 'Dom', selected: false },
    { day: 'Seg', selected: false },
    { day: 'Ter', selected: false },
    { day: 'Qua', selected: false },
    { day: 'Qui', selected: false },
    { day: 'Sex', selected: false },
    { day: 'Sáb', selected: false },
  ]);

  const toggleDay = (index) => {
    const updated = [...daysOfWeek];
    updated[index].selected = !updated[index].selected;
    setDaysOfWeek(updated);
  };



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

    if (!isValidTime(time1)) {
      return Alert.alert('Erro', 'Hora inválida. Use o formato hh:mm.');
    }


    Alert.alert('Sucesso', 'Dados registrados com sucesso!');
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Medicamento</Text>


      <TextInput
        style={styles.input1}
        placeholder="Nome do medicamento"
        value={nameMedic}
        onChangeText={setNameMedic}
      />

      <Text style={styles.footer}>Dias da semana</Text>
      <View style={styles.daysContainer}>
        {daysOfWeek.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayBox,
              item.selected && styles.dayBoxSelected
            ]}
            onPress={() => toggleDay(index)}
          >
            <Text style={[
              styles.dayText,
              item.selected && styles.dayTextSelected
            ]}>
              {item.day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.footer}>Horários</Text>
      
      <TextInput
        style={styles.input2}
        placeholder="1º Remédio (ex: 6:30)"
        keyboardType="numeric"
        value={time1}
        onChangeText={handleTimeChange}
        maxLength={5}
      />

      <TextInput
        style={styles.input2}
        placeholder="2º Remédio (ex: 10:30)"
        keyboardType="numeric"
        value={time2}
        onChangeText={handleTimeChange}
        maxLength={5}
      />

      <TextInput
        style={styles.input2}
        placeholder="3º Remédio (ex: 14:30)"
        keyboardType="numeric"
        value={time3}
        onChangeText={handleTimeChange}
        maxLength={5}
      />

      <TextInput
        style={styles.input2}
        placeholder="4º Remédio (ex: 18:30)"
        keyboardType="numeric"
        value={time4}
        onChangeText={handleTimeChange}
        maxLength={5}
      />

      <TextInput
        style={styles.input2}
        placeholder="5º Remédio (ex: 22:30)"
        keyboardType="numeric"
        value={time5}
        onChangeText={handleTimeChange}
        maxLength={5}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Gerenciar e Melhorar o Seu Bem-Estar</Text>

      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Initial')}>
        <Icon name="home" size={28} color="#0077b6" />
        <Text style={styles.homeText}>Voltar à Tela Inicial</Text>
      </TouchableOpacity>

    </View>
  );
}
