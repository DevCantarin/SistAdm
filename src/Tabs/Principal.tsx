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
import { useFocusEffect } from '@react-navigation/native';


interface Especialista {
  especialidade: string;
  id: string;
  nome: string;
  imagem: string;
}

interface Escala {
  data_inicial: string;
  especialista: Especialista;
  id: string;
  name: String;
  component: String;
}

export default function Escalas({ navigation }: NavigationProps<'Escalas'>){
  const [mikeId, setMikeId] = useState("");
  const [folgasAgendadas, setFolgasAgendadas]= useState<Escala[]>([])
  const [dadosUsuarios, setDadosUsuarios] = useState({} as Usuario);
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
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      async function folgaData() {
        const resultado = await pegarFolgasUsuario(`${dadosUsuarios.re}-${dadosUsuarios.dig}`);
        console.log(`dadosUsuarios é ${dadosUsuarios.re}-${dadosUsuarios.dig}`)
        console.log(`o resultado é ${JSON.stringify(resultado)}`)
        if (resultado) {
          setFolgasAgendadas(resultado);
        }
      }
      folgaData();
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

      <Titulo color="blue.500" fontSize="lg" alignSelf="flex-start" mb={2}>Próximas Escalas</Titulo>

        <CardEscala 
          nome= "Aux Escalante"
          data="01/01/2024 das 07:00 às 18:00"
          // onPress={() => cancelar(escala.id)}
        />


      <Divider mt={5} />

      <Titulo color="blue.500" fontSize="lg" alignSelf="flex-start" mb={2}>Folgas Agendadas</Titulo>
      {folgasAgendadas?.map((folga) => (
        <CardEscala 
          nome={dadosUsuarios?.nome}
          data={converterDataParaString(folga.data_inicial)}
          foiAtendido
          foiAgendado
          key={folga.id}
        />
      )) }

       
    </ScrollView>
  )
}