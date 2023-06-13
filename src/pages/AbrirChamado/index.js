import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';

import { useNavigation } from "@react-navigation/native";

import { Picker } from "@react-native-community/picker";
import Menu from "../Menu";

class AbrirChamado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apt: 0,
      apts: [
        { key: 1, apartamento: '101', numero: 101 },
        { key: 2, apartamento: '102', numero: 102 },
        { key: 3, apartamento: '201', numero: 201 },
        { key: 4, apartamento: '202', numero: 202 },
        { key: 5, apartamento: '301', numero: 301 },
        { key: 6, apartamento: '302', numero: 302 }
      ],
      bloco: 0,
      local: "",
      descricao: ""
    };
  }

  enviarChamado = async () => {
    const { apt, bloco, local, descricao } = this.state;

    try {
      const response = await axios.post("http://localhost:8080/chamados", {
        apartamento: apt,
        bloco,
        local,
        descricao
      });

      // Lógica para tratar a resposta da API, se necessário

      alert("Chamado aberto com sucesso!");
      this.props.navigation.navigate("Menu");
    } catch (error) {
      console.error(error);
      // Lógica para tratar erros na requisição
      alert("Ocorreu um erro ao abrir o chamado. Tente novamente.");
    }
  };

  render() {
    let aptsItem = this.state.apts.map((v, k) => {
      return <Picker.Item key={k} value={k} label={v.apartamento} />
    })

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Abrir chamado</Text>

        <View style={styles.textArea}>
          <Text style={styles.text}>Local:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ local: text })}
          />

          <Text style={styles.text}>Apartamento:</Text>
          <Picker
            selectedValue={this.state.apt}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ apt: itemValue })
            }
            style={styles.picker}
          >
            {aptsItem}
          </Picker>
          <Text style={styles.text}>Bloco:</Text>
          <Picker
            selectedValue={this.state.bloco}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ bloco: itemValue })
            }
            style={styles.picker}
          >
            <Picker.Item key={1} value={1} label="Bloco A" />
            <Picker.Item key={2} value={2} label="Bloco B" />
            <Picker.Item key={3} value={3} label="Bloco C" />
          </Picker>
          <Text style={styles.text}>Ocorrência:</Text>
          <Picker
            selectedValue={this.state.oco}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ oco: itemValue })
            }
            style={styles.picker}
          >
            <Picker.Item key={1} value={1} label="Lâmpada queimada" />
            <Picker.Item key={2} value={2} label="Piso Molhado" />
            <Picker.Item key={3} value={3} label="Dejetos de pet" />
          </Picker>

          <Text style={styles.text}>Anexo</Text>

          <Text style={styles.text}>Descrição</Text>
          <TextInput
            style={styles.inputDescricao}
            multiline
            numberOfLines={4}
            onChangeText={(text) => this.setState({ descricao: text })}
          />

          <Enviar enviarChamado={this.enviarChamado} />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#a9a9a9'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#222',
    padding: 30
  },
  textArea: {
    padding: 20
  },
  text: {
    color: '#222',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10
  },
  input: {
    width: '100%',
    height: 30,
    backgroundColor: '#FFF',
    padding: 7,
    paddingTop: 5,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10
  },
  inputDescricao: {
    height: 120,
    width: '100%',
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    fontSize: 18,
    height: 40,
    width: 150,
    borderRadius: 8,
    padding: 7
  },
  btnArea: {
    alignItems: 'center',
    marginTop: 20
  },
  btn: {
    flex: 1,
    width: 100,
    height: 50,
    borderRadius: 8,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    padding: 7
  }
})

const Enviar = ({ enviarChamado }) => {
  return (
    <View style={styles.btnArea}>
      <TouchableOpacity style={styles.btn} onPress={enviarChamado}>
        <Text style={styles.btnText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AbrirChamado;
