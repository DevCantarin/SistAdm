import React from 'react'
import { Divider, ScrollView, useToast } from 'native-base'
import { Botao } from '../componentes/Botao'
import { CardEscala } from '../componentes/CardEscala'
import { Titulo } from '../componentes/Titulo'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { pegarDadosUsuarios,pegarFolgasUsuario } from '../servicos/UsuarioServico'
import { NavigationProps } from '../@types/navigation'
import { useIsFocused } from '@react-navigation/native'
import { converterDataParaString } from '../utils/conversoes'
import { Usuario } from '../interfaces/Usuario'
import { Escala } from '../interfaces/Escala'
import { Folga } from '../interfaces/Folga'
import { useFocusEffect } from '@react-navigation/native';
import { pegarEscalasUsuario } from '../servicos/escalaServico'
import { format } from 'date-fns';




export default function Pincipal({ navigation }: NavigationProps<'Principal'>){
  const [mikeId, setMikeId] = useState("");
  const [folgasAgendadas, setFolgasAgendadas]= useState<Folga[]>([])
  const [dadosUsuarios, setDadosUsuarios] = useState({} as Usuario);
  const [dadosEscalas, setDadosEscalas] = useState<Escala[]>([])
  const toast = useToast();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchData() {
      const storedMikeId = await AsyncStorage.getItem('mikeId');

      console.log(`storedMikeId ${storedMikeId}`)
      if (!storedMikeId) return null;

      setMikeId(storedMikeId);

      const resultado = await pegarDadosUsuarios(storedMikeId);
      if (resultado) {
        setDadosUsuarios(resultado);
  
      }
    }
    fetchData();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      async function folgaData() {
        const resultado = await pegarFolgasUsuario(`${dadosUsuarios.re}-${dadosUsuarios.dig}`);
        if (resultado) {
          setFolgasAgendadas(resultado);
        }
      }
      folgaData();
    }, [dadosUsuarios.re, dadosUsuarios.dig])
  );

  useFocusEffect(
    React.useCallback(() => {
      async function escalaData() {
        const resultado = await pegarEscalasUsuario(`${dadosUsuarios.re}`);
        console.log(`o re é ${dadosUsuarios.re}`)
        console.log(`o resultado de escalas é ${JSON.stringify(resultado)}`)
        if (resultado) {
          setDadosEscalas(resultado);
        }
      }
      escalaData();
    }, [dadosUsuarios.re, dadosUsuarios.dig])
  );


  // async function cancelar(consultaId: string) {
  //   const resultado = await cancelarConsulta(consultaId);
  //   if (resultado) {
  //     toast.show({
  //       title: 'Consulta cancelada com sucesso',
  //       backgroundColor: 'green.500',
  //     });
  //     setRecarregar(!recarregar);
  //   } else {
  //     toast.show({
  //       title: 'Erro ao cancelar consulta',
  //       backgroundColor: 'red.500',
  //     });
  //   }
  // }

  return(
    <ScrollView p="5">
      <Titulo color="blue.500">Minhas Escalas</Titulo>
      <Botao mt={5} mb={5} onPress={() => navigation.navigate('Agendamento')}>Agendar nova Folga</Botao>

      <Titulo color="blue.500" fontSize="lg" alignSelf="flex-start" mb={2}>Previsão de Próximas Escalas</Titulo>

      {dadosEscalas.length > 0 && (
        dadosEscalas.map((escala) => {
          const dataEscala = new Date(escala.data);

          // Verifica se a data da escala é maior que a data atual
          if (dataEscala > new Date()) {
            return (
              <CardEscala
                key={escala.id}
                nome={`${escala.nome} ${escala.funcao}`}
                data={format(dataEscala, 'dd/MM/yyyy')}
              />
            );
          }

          // Se a data da escala for igual ou menor que hoje, retorna null (não renderiza o card)
          return null;
        })
      )}


      <Divider mt={5} />

      <Titulo color="blue.500" fontSize="lg" alignSelf="flex-start" mb={2}>Folgas Agendadas</Titulo>
      {folgasAgendadas.length > 0 && (
        folgasAgendadas.map((folga) => {
          const dataFolga = new Date(folga.data_inicial);

          // Verifica se a data da escala é maior que a data atual
          if (dataFolga > new Date()) {
            return (
              <CardEscala 
                nome={`${dadosUsuarios?.nome}  ${folga.motivo}`}
                data={converterDataParaString(folga.data_inicial)}
                foiAtendido
                foiAgendado
                key={folga.id}
              />
            );
          }

          // Se a data da escala for igual ou menor que hoje, retorna null (não renderiza o card)
          return null;
        })
      )}

      {/* {folgasAgendadas?.map((folga) => (
        <CardEscala 
          nome={`${dadosUsuarios?.nome}  ${folga.motivo}`}
          data={converterDataParaString(folga.data_inicial)}
          foiAtendido
          foiAgendado
          key={folga.id}
        />
      )) } */}

       
    </ScrollView>
  )
}