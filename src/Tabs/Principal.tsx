import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProps } from '../@types/navigation';
import { useFocusEffect } from '@react-navigation/native';
import { Box, ScrollView, View, useToast } from 'native-base';
import { useIsFocused } from '@react-navigation/native';
import { Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';

import { Titulo } from '../componentes/Titulo';
import { pegarDadosUsuarios } from '../servicos/UsuarioServico';
import { Usuario } from '../interfaces/Usuario';
import { Escala } from '../interfaces/Escala';
import { Folga } from '../interfaces/Folga';
import { icone } from '../componentes/icone';

const estilos = StyleSheet.create({
  principal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: 'black',
  },

  div: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: 'black',
  },

  elemento: {
    margin: 10,
    borderColor: 'black',
  },

  nomeIcone: {
    textAlign: 'center',
    color: 'black',
    fontSize: 10,
    margin: 10,
  },

  icone: {
    alignItems: 'center',
  },

  iconeImagem: {
    width: 100,
    height: 100,
    margin: 5,
    alignItems: 'center',
    borderColor: 'black',
  },

  titulo: {
    margin: 10,
  },
});

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
      if (!storedMikeId) return null;

      setMikeId(storedMikeId);

      const resultado = await pegarDadosUsuarios(storedMikeId);
      if (resultado) {
        setDadosUsuarios(resultado);
      }
    }
    fetchData();
  }, [isFocused, forceUpdate]);
;


  return (
    <ScrollView p="5" contentContainerStyle={estilos.principal}>
      <Titulo style={estilos.titulo}>SistADM</Titulo>
      <View style={estilos.container}>
        <Box style={estilos.div}>
          {icone.map((fig, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate(fig.nome)}>
              <View style={estilos.icone}>
                <Text style={estilos.nomeIcone}>{fig.nome}</Text>
                <Image style={estilos.iconeImagem} source={fig.imagem} />
              </View>
            </TouchableOpacity>
          ))}
        </Box>
      </View>
    </ScrollView>
  );
}
