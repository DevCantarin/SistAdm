import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProps } from '../@types/navigation';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, View,  useToast } from 'native-base';
import { useIsFocused } from '@react-navigation/native';
import {Image, Text} from 'react-native'
import { TouchableOpacity } from 'react-native';

import { Titulo } from '../componentes/Titulo';
import { pegarDadosUsuarios, pegarFolgasUsuario } from '../servicos/UsuarioServico';
import { Usuario } from '../interfaces/Usuario';
import { Escala } from '../interfaces/Escala';
import { Folga } from '../interfaces/Folga';
import { pegarEscalasUsuario } from '../servicos/escalaServico';
import { cancelarFolgas } from '../servicos/FolgasServico';
import { icone } from '../componentes/icone';



const estilos = StyleSheet.create({
  principal:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor: 'blue'

  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderRadius: 10

  },

  elemento:{
    margin: 10

  },

  nomeIcone:{
    textAlign: 'center',
    color:'black',
    fontSize: 10,
    margin:10
  },
  icone:{
    width: 100,
    height: 100,
    margin: 5,
    alignItems: 'center'

  },
  titulo:{
    margin: 10,
    
  }

  

})

export default function Principal({ navigation }: NavigationProps<'Principal'>) {
  const [mikeId, setMikeId] = useState('');
  const [folgasAgendadas, setFolgasAgendadas] = useState<Folga[]>([]);
  const [dadosUsuarios, setDadosUsuarios] = useState({} as Usuario);
  const [dadosEscalas, setDadosEscalas] = useState<Escala[]>([]);
  const [forceUpdate, setForceUpdate] = useState(0); 
  const toast = useToast();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchData() {
      const storedMikeId = await AsyncStorage.getItem('mikeId');

      console.log(`storedMikeId ${storedMikeId}`);
      if (!storedMikeId) return null;

      setMikeId(storedMikeId);

      const resultado = await pegarDadosUsuarios(storedMikeId);
      if (resultado) {
        setDadosUsuarios(resultado);
      }
    }
    fetchData();
  }, [isFocused, forceUpdate]); 

  useFocusEffect(
    React.useCallback(() => {
      async function folgaData() {
        const resultado = await pegarFolgasUsuario(`${dadosUsuarios.re}-${dadosUsuarios.dig}`);
        if (resultado) {
          setFolgasAgendadas(resultado);
        }
      }
      folgaData();
    }, [dadosUsuarios.re, dadosUsuarios.dig, forceUpdate])
  );

  useFocusEffect(
    React.useCallback(() => {
      async function escalaData() {
        const resultado = await pegarEscalasUsuario(`${dadosUsuarios.re}`);
        if (resultado) {
          setDadosEscalas(resultado);
        }
      }
      escalaData();
    }, [dadosUsuarios.re, dadosUsuarios.dig, forceUpdate])
  );

  const handleCancelarFolga = async (folga: Folga) => {
    try {
      const resultado = await cancelarFolgas(folga.id);
  
      if (resultado) {
        console.log('Folga cancelada com sucesso');
  
        // Log antes da atualização
        console.log('folgasAgendadas antes da atualização:', folgasAgendadas);
  
        setFolgasAgendadas((prevFolgas) => prevFolgas.filter((f) => f.id !== folga.id));
  
        // Log depois da atualização
        console.log('folgasAgendadas após da atualização:', folgasAgendadas);
  
        setForceUpdate((prev) => prev + 1); // Incrementa 'forceUpdate' para forçar a atualização
      } else {
        console.log('Erro ao cancelar folga!!!');
      }
    } catch (error) {
      console.error('Erro ao cancelar folga:', error);
    }
  };
   

  return (
    <ScrollView p="5" contentContainerStyle={estilos.principal}>
      <Titulo style={estilos.titulo}>SistADM</Titulo>
      <View style={estilos.container}>
        {icone.map((fig, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate(fig.nome)}>
            <View> 
              <Text style={estilos.nomeIcone}>{fig.nome}</Text>
              <Image style={estilos.icone} source={fig.imagem} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
