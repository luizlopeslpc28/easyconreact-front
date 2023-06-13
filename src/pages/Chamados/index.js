import React, {Component} from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import axios from 'axios';

import { useNavigation } from "@react-navigation/native";

class Chamados extends Component{

    constructor(props){
        super(props);
        this.state = {
            visualizarChamado:[
                // {id: '1', descricao: 'Piso molhado', data: '10/01/23', status: 'Encerrado'},
                // {id: '2', descricao: 'Dejetos de  pet', data: '09/01/23', status: 'Em execução'},
                // {id: '3', descricao: 'Recolher lixo', data: '05/01/23', status: 'Encerrado'},
                // {id: '4', descricao: 'Lâmpada queimada', data: '30/12/22', status: 'Encerrado'}
            ]
        }
        
    }

    componentDidMount() {
        this.carregarChamados();
      }
    
      carregarChamados = async () => {
        try {
          const response = await axios.get('http://localhost:8080/chamados/lerChamados');
          const chamados = response.data.CHAMADOS;
          this.setState({ visualizarChamado: chamados });
        } catch (error) {
          console.error('Erro ao carregar chamados:', error);
        }
      }

    abrirChamado = () => {
        this.props.navigation.navigate('AbrirChamado');
    };


    render(){

        return(
            <SafeAreaView style={styles.container}>
                <ScrollView>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>Verificar chamados</Text>
                </View>
                <View style={styles.textArea}>
                    <Text style={styles.text}>Número</Text>
                    <Text style={styles.text}>Ocorrencia</Text>
                    <Text style={styles.text}>Descrição</Text>
                    <Text style={styles.text}>Data</Text>
                    <Text style={styles.text}>Status</Text>
                </View>
                <FlatList
                    data={this.state.visualizarChamado}
                    keyExtractor={(item) => item.idChamados.toString()}
                    renderItem={({item}) => <Visualizar data={item} />}
                />

                <OpenTicketButton />
                </ScrollView>
            </SafeAreaView>
           
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#131549'
    },
    titleArea:{
        alignItems: 'center'
    },
    title:{
        fontWeight: 'bold',
        fontSize: 25,
        color: '#FFF',
        padding: 30,
    },
    textArea:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    text:{
        color: '#FFF',
        fontSize: 22,
        marginBottom: 10
    },
    areaVisualizar:{
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        height: 70,
        marginBottom: 15,
        margin: 20
    },
    visualizar:{
        color: '#222',
        fontSize: 20
    },
    btnArea:{
        alignItems: 'center',
        marginTop: 20
    },
    btn:{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
    }
})


const OpenTicketButton = () => {
    const navigation = useNavigation();
  
    const abrirChamado = () => {
      navigation.navigate('AbrirChamado');
    };
  
    return (
      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={abrirChamado}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };

export default Chamados;

class Visualizar extends Component {
    render(){
        const{data}=this.props(
            <View style={styles.areaVisualizar}>
                <Text style={styles.visualizar}> {data.numero} </Text>
                <Text style={styles.visualizar}> {data.ocorrencia} </Text>
                <Text style={styles.visualizar}> {data.descricao} </Text>
                <Text style={styles.visualizar}> {data.data} </Text>
                <Text style={styles.visualizar}> {data.status} </Text>
            </View>
        )
    }
}