import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './styles';

export default function SignUp({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSignUp = () => {
    console.log(username, password, email);
        
    axios.post('http://192.168.15.6:8000/api/signup/', {
      username: username,
      password: password,
      email: email
    })
    .then(response => {
      Alert.alert("Sucesso", "Usuário criado com sucesso!");
      AsyncStorage.setItem('token', response.data.access); // salva token
      navigation.navigate('Home');
    })
    .catch(error => {
      console.log(error);
      Alert.alert("Erro", "Falha ao criar usuário. Verifique os dados.");
      console.log(error.response.data);
      console.log("Erro", "Falha ao criar usuário. Verifique os dados.");
    });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignUp</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
