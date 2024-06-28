import React, { useEffect, useState } from 'react';
import { Divider, ScrollView, useToast } from 'native-base';
import { CardEscala } from '../componentes/CardEscala';
import { Titulo } from '../componentes/Titulo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pegarDadosUsuarios} from '../servicos/UsuarioServico';
import { NavigationProps } from '../@types/navigation';
import { useIsFocused } from '@react-navigation/native';
import { converterDataParaString } from '../utils/conversoes';
import { Usuario } from '../interfaces/Usuario';
import { Escala } from '../interfaces/Escala';
import { Folga } from '../interfaces/Folga';
import { useFocusEffect } from '@react-navigation/native';
import { pegarEscalasUsuario } from '../servicos/escalaServico';
import { format } from 'date-fns';
import { cancelarFolgas, pegarFolgasUsuario } from '../servicos/FolgasServico';
import { es } from 'date-fns/locale';

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
        // Verifica se dadosUsuarios.re e dadosUsuarios.dig estão definidos
        if (!dadosUsuarios.re || !dadosUsuarios.dig) {
          return;
        }

        const resultado = await pegarFolgasUsuario(`${dadosUsuarios.re}-${dadosUsuarios.dig}`);
        if (resultado) {
          // console.log(`folgas agendadas são ${JSON.stringify(resultado)}`);
          setFolgasAgendadas(resultado);
        }
      }
      folgaData();
    }, [dadosUsuarios.re, dadosUsuarios.dig, forceUpdate])
  );

  useFocusEffect(
    React.useCallback(() => {
      async function escalaData() {
        // Verifica se dadosUsuarios.re e dadosUsuarios.dig estão definidos
        if (!dadosUsuarios.re || !dadosUsuarios.dig) {
          return;
        }

        const resultado = await pegarEscalasUsuario(`${dadosUsuarios.re}-${dadosUsuarios.dig}`);
        if (!resultado) {
          console.log('Nenhum resultado retornado de pegarEscalasUsuario');
          return;
        }

        // console.log(`Dados das escalas: ${JSON.stringify(resultado)}`);
        setDadosEscalas(resultado);
      }
      escalaData();
    }, [dadosUsuarios.re, dadosUsuarios.dig, forceUpdate])
  );

  const handleCancelarFolga = async (folga: Folga) => {
    try {
      const resultado = await cancelarFolgas(folga.ID);

      if (resultado) {
        console.log('Folga cancelada com sucesso');

        // Atualiza as folgas agendadas removendo a folga cancelada
        setFolgasAgendadas((prevFolgas) => prevFolgas.filter((f) => f.ID !== folga.ID));

        // Incrementa 'forceUpdate' para forçar a atualização da lista de folgas
        setForceUpdate((prev) => prev + 1);
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

      <Titulo color="blue.500" fontSize="lg" alignSelf="flex-start" mb={2}>
        Previsão de Próximas Escalas
      </Titulo> 

      {
      dadosEscalas.length > 0 &&
        dadosEscalas.map((escala) => (
          <CardEscala
            key={escala.Id} 
            nome={`${escala.Funcao}`}
            data={escala.Data?`${format(new Date(escala.Data), 'dd/MM/yyyy')} ${escala.Inicio} - ${escala.Termino}`:""}
          />
          
        ))       
        }

       {dadosEscalas.length > 0 &&
        dadosEscalas.map((escala) => (
          <CardEscala
            key={escala.Id2} 
            nome={`${escala.Funcao2}`}
            data={escala.Data?`${format(new Date(escala.Data2), 'dd/MM/yyyy')} ${escala.Inicio2} - ${escala.Termino2}`:""}
          />
          
        ))       
        }

      {dadosEscalas.length > 0 &&
        dadosEscalas.map((escala) => (
          <CardEscala
            key={escala.Id3} 
            nome={`${escala.Funcao3}`}
            data={escala.Data?`${format(new Date(escala.Data3), 'dd/MM/yyyy')} ${escala.Inicio3} - ${escala.Termino3}`:""}
          />
          
        ))       
        }

{dadosEscalas.length > 0 &&
        dadosEscalas.map((escala) => (
          <CardEscala
            key={escala.Id4} 
            nome={`${escala.Funcao4}`}
            data={escala.Data?`${format(new Date(escala.Data4), 'dd/MM/yyyy')} ${escala.Inicio4} - ${escala.Termino4}`:""}
          />
          
        ))       
        } 

      <Divider mt={5} />

      <Titulo color="blue.500" fontSize="lg" alignSelf="flex-start" mb={2}>
        Folgas Agendadas
      </Titulo>
      {folgasAgendadas.length > 0 &&
        folgasAgendadas.map((folga) => {
          const dataFolga = new Date(folga.DATA);

          if (dataFolga >= new Date()) {
            return (
              <CardEscala
                key={folga.ID}
                nome={`${dadosUsuarios?.nome}  ${folga.MOTIVO  }`}
                data={converterDataParaString(folga.DATA)}
                status={
                  folga.APROVACAO === 'SIM'
                    ? 'FOLGA APROVADA'
                    : folga.APROVACAO === 'NÃO'
                    ? 'FOLGA REPROVADA'
                    : ''
                }
                foiAtendido={folga.APROVACAO === 'SIM'}
                foiNegado={folga.APROVACAO === 'NÃO'}
                foiPedido={!folga.APROVACAO}
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
