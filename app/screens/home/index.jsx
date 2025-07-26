import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monitor de Saúde</Text>

      <Image
        source={require('../../assets/saude.png')} 
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.description}>
        Acompanhe seus indicadores de saúde:
      </Text>

      <View style={styles.listContainer}>
        <Text style={styles.item}>🩺 Pressão Arterial</Text>
        <Text style={styles.item}>🩸 Glicemia</Text>
        <Text style={styles.item}>💉 Colesterol</Text>
        <Text style={styles.item}>📅 Calendário de Medicamentos</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>
        Gerenciar e Melhorar o Seu Bem-Estar
      </Text>
    </View>
  );
}
