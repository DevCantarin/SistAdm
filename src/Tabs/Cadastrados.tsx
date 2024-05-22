import React, { useEffect, useState } from 'react';
import { Divider, ScrollView, useToast } from 'native-base';
import { Botao } from '../componentes/Botao';
import { CardEscala } from '../componentes/CardEscala';
import { Titulo } from '../componentes/Titulo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResidenciaStorege from '@react-native-async-storage/async-storage'
import { pegarDadosUsuarios, pegarFolgasUsuario } from '../servicos/UsuarioServico';
import { NavigationProps } from '../@types/navigation';
import { useIsFocused } from '@react-navigation/native';
import { converterDataParaString } from '../utils/conversoes';
import { Usuario } from '../interfaces/Usuario';
import { Escala } from '../interfaces/Escala';
import { Folga } from '../interfaces/Folga';
import { useFocusEffect } from '@react-navigation/native';
import { pegarEscalasUsuario } from '../servicos/escalaServico';
import { format } from 'date-fns';
import { cancelarFolgas } from '../servicos/FolgasServico';
import { pegaVisitaPorRe } from '../servicos/visitaComunitariaServico';
import { Visita } from '../interfaces/Visita';
import { Text, TouchableOpacity } from 'react-native';
import { Residencia } from '../interfaces/Residencia';
import { pegaTodasAsResidencias } from '../servicos/PvsCadastramentoResisdencialServico';

export default function Cadastrados({ navigation }: NavigationProps<'Principal'>) {
  const [mikeId, setMikeId] = useState('')
  const [visitasUsuario, setVisitasUsuario] = useState<Visita[]>()
  const [residenciasCadastradas, setresidenciasCadastradas] = useState<Residencia[]>([]);
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
      async function visitaComunitaria() {
        const resultado = await pegaTodasAsResidencias();
        console.log(`o resultado é ${resultado}`)
        if (resultado) {
          setresidenciasCadastradas
          (resultado);
          console.log(`Visitas Agendadas é ${JSON.stringify(residenciasCadastradas

          )}`)
          console.log(``)
        }
      }
      visitaComunitaria();
    }, [dadosUsuarios.re, dadosUsuarios.dig, forceUpdate])
  );

  async function irParaResidencia(id: any) {
    try {
      const idString = id.toString(); 
      await ResidenciaStorege.setItem("id", idString);
      console.log(`ID armazenado com sucesso: ${idString}`);
      navigation.navigate('AtualizarResidencia');
    } catch (error:any) {
      console.error(`Erro ao armazenar o ID: ${error.message}`);
    }
  }
  
   

  return (
    <ScrollView p="5">
      {/* <Titulo color="blue.500">Produtividade</Titulo>
      <Text>{`Você fez ${residenciasCadastradas
        .length} Cadastros de Residências`}</Text>
  
      <Divider mt={5} /> */}
  
      <Titulo color="blue.500" fontSize="lg" alignSelf="flex-start" mb={2}>
        Todas Residências Cadastradas 
      </Titulo>
      {residenciasCadastradas
      .length > 0 &&
        residenciasCadastradas
        .map((residencia) => (
          <TouchableOpacity onPress={() => irParaResidencia(residencia.id)}>
            <CardEscala 
              key={residencia.id} 
              nome={`${residencia.endereco}`} 
              data= {`Morador: ${residencia.morador}`}
            />
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
  
  
}
