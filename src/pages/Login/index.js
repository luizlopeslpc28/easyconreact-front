import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

import {useNavigation} from '@react-navigation/native'

export default function Login() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>
      <View style={styles.areaText}>
        <Text style={styles.text}>E-mail:</Text>
        <TextInput
          style={styles.input}
          placeholder='Insira o seu e-mail'
        />
        <Text style={styles.text}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder='Digite sua senha'
        />
      </View>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Menu')}>
          <Text style={styles.textBtn}>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { marginBottom: 13, marginTop: 13 }]} 
          onPress={() => navigation.navigate('Cadastrar')}>
          <Text style={styles.textBtn}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { marginBottom: 13 }]}
          onPress={() => navigation.navigate('RecuperarSenha')}>
          <Text style={styles.textBtn}>Recuperar Senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#131549'
  },
  title:{
    fontWeight: 'bold',
    fontSize: 25,
    color: '#FFF',
    padding: 30,
    marginTop: 150
  },
  areaText:{
    padding: 60
  },
  text: {
    color: '#FFF',
    fontSize: 18
  },
  input:{
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    padding: 7,
    paddingTop: 5,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10
  },
  btnArea:{
    height: 150,
    width: 200
  },
  btn:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e90ff',
    height: 40,
    borderRadius: 10,
  },
  textBtn:{
    fontSize: 18,
    fontWeight: 'bold',
    color: "#FFF"
  }
})