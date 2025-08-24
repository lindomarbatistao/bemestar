import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import styles from './styles';


export default function Initial({ navigation }) {

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao remover o token:', error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monitor de Saúde</Text>

      <Text style={styles.description}>Acompanhe seus indicadores de saúde:</Text>

      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate('HeartPulse')}>
          <MaterialCommunityIcons name="heart-pulse" size={50} color="#0077b6" />
          <Text style={styles.iconLabel}>Pressão</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate('BloodGlucose')}>
          <FontAwesome5 name="tint" size={50} color="#f00" />
          <Text style={styles.iconLabel}>Glicemia</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate('Cholesterol')}>
          <FontAwesome5 name="vial" size={50} color="#0077b6" />
          <Text style={styles.iconLabel}>Colesterol</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate('Medications')}>
          <Entypo name="calendar" size={50} color="#0077b6" />
          <Text style={styles.iconLabel}>Medicamentos</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Gerenciar e Melhorar o Seu Bem-Estar</Text>
      <TouchableOpacity style={styles.homeButton} onPress={logout}>
        <Icon name="log-in" size={28} color="#0077b6" />
        <Text style={styles.homeText}>Voltar</Text>
      </TouchableOpacity>

    </View>
  );
}
