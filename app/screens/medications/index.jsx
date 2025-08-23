import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';

const BASE_URL = 'http://192.168.1.66:8000'

export default function Medications({ navigation }) {
  const [editingId, setEditingId] = useState(null); 
  const [nameMedic, setNameMedic] = useState('');
  const [time1, setTime1] = useState('');
  const [time2, setTime2] = useState('');
  const [time3, setTime3] = useState('');
  const [time4, setTime4] = useState('');
  const [time5, setTime5] = useState('');

  const [daysOfWeek, setDaysOfWeek] = useState([
    { day: 'D', selected: false },
    { day: 'S', selected: false },
    { day: 'T', selected: false },
    { day: 'Q', selected: false },
    { day: 'Q', selected: false },
    { day: 'S', selected: false },
    { day: 'S', selected: false },
  ]);

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const maskTime = (text) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length > 2) formatted = cleaned.slice(0, 2) + ':' + cleaned.slice(2, 4);
    return formatted.slice(0, 5);
  };

  const onChangeT1 = (t) => setTime1(maskTime(t));
  const onChangeT2 = (t) => setTime2(maskTime(t));
  const onChangeT3 = (t) => setTime3(maskTime(t));
  const onChangeT4 = (t) => setTime4(maskTime(t));
  const onChangeT5 = (t) => setTime5(maskTime(t));

  const toggleDay = (index) => {
    const updated = [...daysOfWeek];
    updated[index].selected = !updated[index].selected;
    setDaysOfWeek(updated);
  };

  const resetForm = useCallback(() => {
    setEditingId(null);
    setNameMedic('');
    setTime1(''); setTime2(''); setTime3(''); setTime4(''); setTime5('');
    setDaysOfWeek([
      { day: 'D', selected: false },
      { day: 'S', selected: false },
      { day: 'T', selected: false },
      { day: 'Q', selected: false },
      { day: 'Q', selected: false },
      { day: 'S', selected: false },
      { day: 'S', selected: false },
    ]);
  }, []);

  const toApiTime = (t) => (t && t.length === 5 ? `${t}:00` : t || null);

  const fetchList = useCallback(async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`${BASE_URL}/api/calendario/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setList(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      setList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchList(); }, [fetchList]);

  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) resetForm();
      };
      checkToken();
    }, [resetForm])
  );

  const buildPayload = () => ({
    nome: nameMedic,
    dom: daysOfWeek[0].selected,
    seg: daysOfWeek[1].selected,
    ter: daysOfWeek[2].selected,
    qua: daysOfWeek[3].selected,
    qui: daysOfWeek[4].selected,
    sex: daysOfWeek[5].selected,
    sab: daysOfWeek[6].selected,
    hora1: toApiTime(time1),
    hora2: toApiTime(time2),
    hora3: toApiTime(time3),
    hora4: toApiTime(time4),
    hora5: toApiTime(time5),
  });

  const handleCreate = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post(`${BASE_URL}/api/calendario/`, buildPayload(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert('Sucesso', 'Medicamento cadastrado!');
      resetForm();
      fetchList();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao cadastrar. Verifique os dados ou o login.');
    }
  };

  const handleSaveEdit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.put(`${BASE_URL}/api/calendario/${editingId}/`, buildPayload(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert('Sucesso', 'Medicamento atualizado!');
      resetForm();
      fetchList();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao atualizar. Verifique os dados ou o login.');
    }
  };

  const handleDelete = async (id) => {
    Alert.alert('Excluir', 'Excluir este medicamento?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('token');
            await axios.delete(`${BASE_URL}/api/calendario/${id}/`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            fetchList();
          } catch {
            Alert.alert('Erro', 'Falha ao excluir.');
          }
        },
      },
    ]);
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setNameMedic(item.nome || '');
    setTime1(item.hora1 ? item.hora1.slice(0,5) : '');
    setTime2(item.hora2 ? item.hora2.slice(0,5) : '');
    setTime3(item.hora3 ? item.hora3.slice(0,5) : '');
    setTime4(item.hora4 ? item.hora4.slice(0,5) : '');
    setTime5(item.hora5 ? item.hora5.slice(0,5) : '');
    setDaysOfWeek([
      { day: 'D', selected: !!item.dom },
      { day: 'S', selected: !!item.seg },
      { day: 'T', selected: !!item.ter },
      { day: 'Q', selected: !!item.qua },
      { day: 'Q', selected: !!item.qui },
      { day: 'S', selected: !!item.sex },
      { day: 'S', selected: !!item.sab },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHead}>
        <Text style={styles.cardTitle}>{item.nome || 'Sem nome'}</Text>
        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.iconAction} onPress={() => startEdit(item)}>
            <Icon name="edit-2" size={18} color="#0f172a" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconAction, styles.danger]} onPress={() => handleDelete(item.id)}>
            <Icon name="trash-2" size={18} color="#b91c1c" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.chipsRow}>
        {['dom','seg','ter','qua','qui','sex','sab'].map((k, idx) => (
          <View key={k} style={[styles.chip, item[k] ? styles.chipOn : styles.chipOff]}>
            <Text style={[styles.chipText, item[k] ? styles.chipTextOn : styles.chipTextOff]}>
              {['D','S','T','Q','Q','S','S'][idx]}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.chipsRow}>
        {[item.hora1, item.hora2, item.hora3, item.hora4, item.hora5].filter(Boolean).length === 0 ? (
          <View style={[styles.chip, styles.chipOff]}>
            <Text style={[styles.chipText, styles.chipTextOff]}>Sem horários</Text>
          </View>
        ) : (
          [item.hora1, item.hora2, item.hora3, item.hora4, item.hora5]
            .filter(Boolean)
            .map((h, i) => (
              <View key={i} style={[styles.chip, styles.chipTime]}>
                <Text style={[styles.chipText, styles.chipTextTime]}>{h.slice(0,5)}</Text>
              </View>
            ))
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicamentos</Text>

      <TextInput
        style={styles.inputName}
        placeholder="Nome do medicamento"
        value={nameMedic}
        onChangeText={setNameMedic}
      />

      <Text style={styles.sectionLabel}>Dias da semana</Text>
      <View style={styles.daysContainer}>
        {daysOfWeek.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dayBox, item.selected && styles.dayBoxSelected]}
            onPress={() => toggleDay(index)}
          >
            <Text style={[styles.dayText, item.selected && styles.dayTextSelected]}>
              {item.day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Horários</Text>
      {/* inputs de horário menores, em grade flexível */}
      <View style={styles.timeGrid}>
        <TextInput
          style={styles.inputTime}
          placeholder="06:30"
          keyboardType="numeric"
          value={time1}
          onChangeText={onChangeT1}
          maxLength={5}
        />
        <TextInput
          style={styles.inputTime}
          placeholder="10:30"
          keyboardType="numeric"
          value={time2}
          onChangeText={onChangeT2}
          maxLength={5}
        />
        <TextInput
          style={styles.inputTime}
          placeholder="14:30"
          keyboardType="numeric"
          value={time3}
          onChangeText={onChangeT3}
          maxLength={5}
        />
        <TextInput
          style={styles.inputTime}
          placeholder="18:30"
          keyboardType="numeric"
          value={time4}
          onChangeText={onChangeT4}
          maxLength={5}
        />
        <TextInput
          style={styles.inputTime}
          placeholder="20:00"
          keyboardType="numeric"
          value={time4}
          onChangeText={onChangeT4}
          maxLength={5}
        />
        <TextInput
          style={styles.inputTime}
          placeholder="22:30"
          keyboardType="numeric"
          value={time5}
          onChangeText={onChangeT5}
          maxLength={5}
        />
      </View>

      {editingId ? (
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.buttonPrimary} onPress={handleSaveEdit}>
            <Text style={styles.buttonPrimaryText}>Salvar alterações</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSecondary} onPress={resetForm}>
            <Text style={styles.buttonSecondaryText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleCreate}>
          <Text style={styles.buttonPrimaryText}>Cadastrar</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.helperText}>Gerenciar e melhorar o seu bem-estar</Text>

      {/* Lista */}
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Meus medicamentos</Text>
      </View>

      <FlatList
        data={list}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>{loading ? 'Carregando...' : 'Nenhum medicamento cadastrado.'}</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 24 }}
        style={{ alignSelf: 'stretch' }}
      />

      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Initial')}>
        <Icon name="home" size={24} color="#0b72b9" />
        <Text style={styles.homeText}>Voltar à Tela Inicial</Text>
      </TouchableOpacity>
    </View>
  );
}
