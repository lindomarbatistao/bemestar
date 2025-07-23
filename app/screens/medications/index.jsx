import React, { useState, useEffect } from 'react'; // ALTERADO: adicionado useEffect
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function Medications({ navigation }) {
  const [calendarId, setCalendarId] = useState(null); // ALTERADO: controle do ID para PUT
  const [date, setDate] = useState('');
  const [time1, setTime1] = useState('');
  const [time2, setTime2] = useState('');
  const [time3, setTime3] = useState('');
  const [time4, setTime4] = useState('');
  const [time5, setTime5] = useState('');
  const [nameMedic, setNameMedic] = useState('');

  useFocusEffect(
  useCallback(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        // Zera todos os campos
        setNameMedic('');
        setTime1('');
        setTime2('');
        setTime3('');
        setTime4('');
        setTime5('');
        setDaysOfWeek([
          { day: 'Dom', selected: false },
          { day: 'Seg', selected: false },
          { day: 'Ter', selected: false },
          { day: 'Qua', selected: false },
          { day: 'Qui', selected: false },
          { day: 'Sex', selected: false },
          { day: 'Sáb', selected: false },
        ]);
      }
    };
    checkToken();
  }, [])
);

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

  // ALTERADO: Novo useEffect para buscar dados existentes
  useEffect(() => {
    const fetchCalendario = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('http://192.168.15.6:8000/api/calendario/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.length > 0) {
          const calendar = response.data[0]; // Considera o primeiro registro
          setCalendarId(calendar.id);
          setNameMedic(calendar.nome);
          setTime1(calendar.hora1 || '');
          setTime2(calendar.hora2 || '');
          setTime3(calendar.hora3 || '');
          setTime4(calendar.hora4 || '');
          setTime5(calendar.hora5 || '');
          setDaysOfWeek([
            { day: 'Dom', selected: calendar.dom },
            { day: 'Seg', selected: calendar.seg },
            { day: 'Ter', selected: calendar.ter },
            { day: 'Qua', selected: calendar.qua },
            { day: 'Qui', selected: calendar.qui },
            { day: 'Sex', selected: calendar.sex },
            { day: 'Sáb', selected: calendar.sab },
          ]);
        }
      } catch (error) {
        console.log('Erro ao buscar calendário:', error.response?.data || error.message);
      }
    };

    fetchCalendario();
  }, []);

  const handleRegister = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const payload = {
        nome: nameMedic,
        dom: daysOfWeek[0].selected,
        seg: daysOfWeek[1].selected,
        ter: daysOfWeek[2].selected,
        qua: daysOfWeek[3].selected,
        qui: daysOfWeek[4].selected,
        sex: daysOfWeek[5].selected,
        sab: daysOfWeek[6].selected,
        hora1: time1 || null,
        hora2: time2 || null,
        hora3: time3 || null,
        hora4: time4 || null,
        hora5: time5 || null,
      };

      let response;
      if (calendarId) {
        // ALTERADO: Se existir ID, usa PUT
        response = await axios.put(
          `http://192.168.15.6:8000/api/calendario/${calendarId}/`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      } else {
        // ALTERADO: Caso contrário, usa POST
        response = await axios.post('http://192.168.15.6:8000/api/calendario/', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCalendarId(response.data.id); // Guarda o novo ID para futuros PUTs
        Alert.alert('Sucesso', 'Dados registrados com sucesso!');
      }

      console.log(response.data);
    } catch (error) {
      console.log('Erro ao registrar:', error.response?.data || error.message);
      Alert.alert('Erro', 'Falha ao registrar/atualizar. Verifique os dados ou o login.');
    }
  };

  // const handleDateChange = (text) => {
  //   const cleaned = text.replace(/\D/g, '');

  //   let formatted = cleaned;
  //   if (cleaned.length > 2) {
  //     formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
  //   }
  //   if (cleaned.length > 4) {
  //     formatted = formatted.slice(0, 5) + '/' + cleaned.slice(4, 8);
  //   }

  //   if (formatted.length <= 10) {
  //     setDate(formatted);
  //   }
  // };

  
  const handleTimeChange1 = (text) => {
    const cleaned = text.replace(/\D/g, '');

    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = cleaned.slice(0, 2) + ':' + cleaned.slice(2, 4);
    }

    if (formatted.length <= 5) {
      setTime1(formatted);
    }
  };
  
  const handleTimeChange2 = (text) => {
    const cleaned = text.replace(/\D/g, '');

    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = cleaned.slice(0, 2) + ':' + cleaned.slice(2, 4);
    }

    if (formatted.length <= 5) {
      setTime2(formatted);
    }
  };
  const handleTimeChange3 = (text) => {
    const cleaned = text.replace(/\D/g, '');

    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = cleaned.slice(0, 2) + ':' + cleaned.slice(2, 4);
    }

    if (formatted.length <= 5) {
      setTime3(formatted);
    }
  };
  const handleTimeChange4 = (text) => {
    const cleaned = text.replace(/\D/g, '');

    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = cleaned.slice(0, 2) + ':' + cleaned.slice(2, 4);
    }

    if (formatted.length <= 5) {
      setTime4(formatted);
    }
  };
  const handleTimeChange5 = (text) => {
    const cleaned = text.replace(/\D/g, '');

    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = cleaned.slice(0, 2) + ':' + cleaned.slice(2, 4);
    }

    if (formatted.length <= 5) {
      setTime5(formatted);
    }
  };

  // const isValidDate = (text) => {
  //   const [dd, mm, yyyy] = text.split('/');
  //   const d = parseInt(dd), m = parseInt(mm), y = parseInt(yyyy);
  //   const dateObj = new Date(`${yyyy}-${mm}-${dd}`);
  //   return (
  //     d > 0 &&
  //     m > 0 &&
  //     y > 1000 &&
  //     d <= 31 &&
  //     m <= 12 &&
  //     dateObj &&
  //     dateObj.getDate() === d &&
  //     dateObj.getMonth() + 1 === m &&
  //     dateObj.getFullYear() === y
  //   );
  // };

  // const isValidTime = (text) => {
  //   const [hh, mm] = text.split(':');
  //   const h = parseInt(hh), m = parseInt(mm);
  //   return h >= 0 && h <= 23 && m >= 0 && m <= 59;
  // };

  


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
        onChangeText={handleTimeChange1}
        maxLength={5}
      />

      <TextInput
        style={styles.input2}
        placeholder="2º Remédio (ex: 10:30)"
        keyboardType="numeric"
        value={time2}
        onChangeText={handleTimeChange2}
        maxLength={5}
      />

      <TextInput
        style={styles.input2}
        placeholder="3º Remédio (ex: 14:30)"
        keyboardType="numeric"
        value={time3}
        onChangeText={handleTimeChange3}
        maxLength={5}
      />

      <TextInput
        style={styles.input2}
        placeholder="4º Remédio (ex: 18:30)"
        keyboardType="numeric"
        value={time4}
        onChangeText={handleTimeChange4}
        maxLength={5}
      />

      <TextInput
        style={styles.input2}
        placeholder="5º Remédio (ex: 22:30)"
        keyboardType="numeric"
        value={time5}
        onChangeText={handleTimeChange5}
        maxLength={5}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>{calendarId ? 'Atualizar' : 'Registrar'}</Text> {/* ALTERADO: texto do botão */}

      </TouchableOpacity>

      <Text style={styles.footer}>Gerenciar e Melhorar o Seu Bem-Estar</Text>

      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Initial')}>
        <Icon name="home" size={28} color="#0077b6" />
        <Text style={styles.homeText}>Voltar à Tela Inicial</Text>
      </TouchableOpacity>
    </View>
  );
}
