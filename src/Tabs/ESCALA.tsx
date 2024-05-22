import React, { useEffect, useState } from 'react';
import { Divider, ScrollView, useToast } from 'native-base';
import { Botao } from '../componentes/Botao';
import { CardEscala } from '../componentes/CardEscala';
import { Titulo } from '../componentes/Titulo';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export default function ESCALA({ navigation }: NavigationProps<'Principal'>) {
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
          console.log(`folgas agendadas é ${JSON.stringify(resultado)}`)
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
    <ScrollView p="5">
      <Titulo color="blue.500">Minhas Escalas</Titulo>
      {/* <Botao mt={5} mb={5} onPress={() => navigation.navigate('Agendamento')}>
        Agendar nova Folga
      </Botao> */}

      <Titulo color="blue.500" fontSize="lg" alignSelf="flex-start" mb={2}>
        Previsão de Próximas Escalas
      </Titulo>

      {dadosEscalas.length > 0 &&
        dadosEscalas.map((escala) => {
          const dataEscala = new Date(escala.data);

          if (dataEscala > new Date()) {
            return (
              <CardEscala key={escala.id} nome={`${escala.nome} ${escala.funcao}`} 
               data={`${format(dataEscala, 'dd/MM/yyyy')}   ${escala.inicio} - ${escala.termino}`} />
            );
          }

          return null;
        })}

      <Divider mt={5} />

      <Titulo color="blue.500" fontSize="lg" alignSelf="flex-start" mb={2}>
        Folgas Agendadas
      </Titulo>
      {folgasAgendadas.length > 0 &&
        folgasAgendadas.map((folga) => {
          const dataFolga = new Date(folga.data_inicial);

          if (dataFolga.setDate(dataFolga.getDate())  >= new Date().setDate(new Date().getDate())) {
            return (
              <CardEscala
                key={folga.id}
                nome={`${dadosUsuarios?.nome}  ${folga.motivo}`}
                data={converterDataParaString(folga.data_inicial)}
                status= {`${folga.aprovacao=="SIM"? "FOLGA APROVADA": folga.aprovacao == "NÃO"? "FOLGA REPROVADA": ""}`}
                foiAtendido = {folga.aprovacao=="SIM"? true : false}
                foiNegado = {folga.aprovacao=="NÃO"? true : false}
                foiPedido={folga.aprovacao == null ? true : false} 
                onPress={() => handleCancelarFolga(folga)}
                folga={folga}
              />
            );
          }

          return null;
        })}
    </ScrollView>
);
}
