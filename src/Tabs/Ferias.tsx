import React, { useEffect, useState } from 'react';
import { Divider, ScrollView, useToast } from 'native-base';
import { Botao } from '../componentes/Botao';
import { CardEscala } from '../componentes/CardEscala';
import { Titulo } from '../componentes/Titulo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pegarDadosUsuarios, pegarFeriasUsuario } from '../servicos/UsuarioServico';
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
import { Ferias } from '../interfaces/Ferias';

export default function FERIAS({ navigation }: NavigationProps<'Principal'>) {
  const [mikeId, setMikeId] = useState('');
  const [ferias, setFerias] = useState<Ferias[]>([]);
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
        const resultado = await pegarFeriasUsuario(`${dadosUsuarios.re}-${dadosUsuarios.dig}`);
        if (resultado) {
          console.log(`ferias agendadas é ${JSON.stringify(resultado)}`)
          setFerias(resultado);
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
        console.log('ferias antes da atualização:', ferias);
  
        setFerias((prevFolgas) => prevFolgas.filter((f) => f.id !== folga.id));
  
        // Log depois da atualização
        console.log('ferias após da atualização:', ferias);
  
        setForceUpdate((prev) => prev + 1); // Incrementa 'forceUpdate' para forçar a atualização
      } else {
        console.log('Erro ao cancelar folga!!!');
      }
    } catch (error) {
      console.error('Erro ao cancelar folga:', error);
    }
  };
   

  return (
    <ScrollView p="5">
      <Titulo color="blue.500">Minhas Ferias</Titulo>
      {/* <Botao mt={5} mb={5} onPress={() => navigation.navigate('Agendamento')}>
        Agendar nova Folga
      </Botao> */}
  
      {ferias.length > 0 && ferias.map((feriasItem) => (
        <React.Fragment key={feriasItem.id}>
          <CardEscala
            nome={`${dadosUsuarios?.nome}  ${feriasItem.quantidade} dias`}
            data={`De ${converterDataParaString(feriasItem.data_inicial)} à ${converterDataParaString(feriasItem.data_final)}`}
          />
          {feriasItem.quantidade !==          
          "30"  && (
            <CardEscala
              nome={`${dadosUsuarios?.nome}  ${feriasItem.quantidade} dias`}
              data={`De ${converterDataParaString(feriasItem.data_inicial2)} à ${converterDataParaString(feriasItem.data_final2)}`}
            />
          )}
        </React.Fragment>
      ))}
    </ScrollView>
  );
  
}
