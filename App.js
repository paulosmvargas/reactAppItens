import React, {useState, useEffect, useMemo, useRef} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native';
import { Avatar, Button, IconButton, Card, Title, Paragraph } from 'react-native-paper';

export default function AppView(){

  const [qtd, setqtd] = useState('');
  const [input, setInput] = useState('');
  const qtdInput = useRef(null);

  useEffect(()=>{
    
    async function getStorage(){
      const qtdStorage = await AsyncStorage.getItem('qtds');
      if(qtdStorage !== null){
        setqtd(qtdStorage);
      }
    }

    getStorage();

  }, []);
  
  useEffect(()=>{
    async function saveStorage(){
      await AsyncStorage.setItem('qtds', qtd);
    }
    saveStorage();
  }, [qtd]);
  
  function addPlus(){
    setqtd(input);
    setInput('');
  };

  function realizarPedido(){
    qtdInput.current.focus();
  }

  return(

    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Iphone 5 32GB</Title>
          <Paragraph>Quantidade: {qtd}</Paragraph>
        </Card.Content>
        <Card.Cover style={styles.image} source={{ uri: 'https://i.zst.com.br/thumbs/12/12/f/187670820.jpg' }} />
        <TextInput
          placeholder="Adicionar"
          value={input}
          onChangeText={(quantidade)=> setInput(quantidade)}
        />
        <TouchableOpacity style={styles.btn} onPress={addPlus}>
         <Text style={styles.addBtn}>+</Text>
       </TouchableOpacity>
      </Card>
      <TouchableOpacity style={styles.btnfinalizar} onPress={realizarPedido}>
        <Text style={styles.btnText}>FINALIZAR</Text>
      </TouchableOpacity>
      
      <TouchableOpacity ref={this.qtdInput} style={styles.btnpedido}>
        <Text style={styles.textoPedido}>Realizar Pedido</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop:15
  },
  btnText:{
    color: '#FFF'
  },
  contador:{
    fontSize: 16
  },
  btnfinalizar:{
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: '5px',
    backgroundColor:'#b3b3b3',
    alignItems: 'center',
  },
  btnpedido:{
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 20,
    borderRadius: '5px',
    backgroundColor:'#29ff62',
    alignItems: 'center'
  },
  textoPedido:{
    fontSize: 22,
    color: '#FFF'
  },
  card: {
    fontSize:100,
    color:'#FFFFFF',
    fontFamily:'Times New Roman',
    paddingLeft:50,
    paddingRight:50,
    textShadowColor:'#585858',
    textShadowOffset:{width: 5, height: 5},
    textShadowRadius:10,
    borderRadius: '50px',
    textShadowOffset: {width: '5px', height: '5px'},
    marginLeft: 15,
    marginRight: 15
  },
  image:{
    height: '150px',
    width: '150px',
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 15
  },
  addBtn:{
    backgroundColor:'#29ff62',
    alignItems: 'center',
    textShadowColor:'#585858',
    borderRadius: '12px'
  },
  btn:{
    textAlign: 'center'
  }
});