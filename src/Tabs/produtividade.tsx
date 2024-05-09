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
import { pegaVisitaPorRe } from '../servicos/visitaComunitariaServico';
import { Visita } from '../interfaces/Visita';

export default function Produtividade({ navigation }: NavigationProps<'Principal'>) {
  const [mikeId, setMikeId] = useState('');
  const [visitasAgendadas, setVisitasAgendadas] = useState<Visita[]>([]);
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
        const resultado = await pegaVisitaPorRe(`${dadosUsuarios.re}-${dadosUsuarios.dig}`);
        console.log(resultado)
        if (resultado) {
          setVisitasAgendadas(resultado);
          console.log(`Visitas Agendadas é ${JSON.stringify(visitasAgendadas.length)}`)
          console.log(``)
        }
      }
      visitaComunitaria();
    }, [dadosUsuarios.re, dadosUsuarios.dig, forceUpdate])
  );

   

  return (
    <ScrollView p="5">
      <Titulo color="blue.500">Produtividade</Titulo>
      {/* {dadosEscalas.length > 0 &&
        dadosEscalas.map((escala) => {
          const dataEscala = new Date(escala.data);

          if (dataEscala > new Date()) {
            return (
              <CardEscala key={escala.id} nome={`${escala.nome} ${escala.funcao}`} 
               data={`${format(dataEscala, 'dd/MM/yyyy')}   ${escala.inicio} - ${escala.termino}`} />
            );
          }

          return null;
        })} */}

      <Divider mt={5} />

      <Titulo color="blue.500" fontSize="lg" alignSelf="flex-start" mb={2}>
        Visitas Realizadas
      </Titulo>
      {visitasAgendadas.length > 0 &&
        visitasAgendadas.map((visita) => {
              <CardEscala key={visita.id} nome={`${visita.visitado} ${visita.updatedAt}`} 
               />
        })}


    </ScrollView>
);
}
