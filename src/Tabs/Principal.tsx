import { VStack, Divider, ScrollView, useToast } from 'native-base'
import { Botao } from '../componentes/Botao'
import { CardEscala } from '../componentes/CardEscala'
import { Titulo } from '../componentes/Titulo'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { pegarConsultasPaciente } from '../servicos/UsuarioServico'
import { cancelarConsulta } from '../servicos/ConsultaServico'
import { NavigationProps } from '../@types/navigation'
import { useIsFocused } from '@react-navigation/native'
import { converterDataParaString } from '../utils/conversoes'

interface Especialista {
  especialidade: string;
  id: string;
  nome: string;
  imagem: string;
}

interface Escala {
  data: string;
  especialista: Especialista;
  id: string;
  name: String;
  component: String;
}

export default function Escalas({ navigation }: NavigationProps<'Escalas'>){
  const [EscalaProximas, setEscalasProximas] = useState<Escala[]>([])
  const [EscalaPassadas, setEscalasPassadas]= useState<Escala[]>([])
  const [recarregar, setRecarregar] = useState(false);
  const toast = useToast();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function carregarConsultas(){
      const pacienteId = await AsyncStorage.getItem('pacienteId')
      if(!pacienteId) return null
      const escalas: Escala[] = await pegarConsultasPaciente(pacienteId)

      const agora = new Date();
      const proximas = escalas.filter((escala) => new Date(escala.data) > agora)

      const passadas = escalas.filter((escala) => new Date(escala.data) <= agora)

      setEscalasProximas(proximas)
      setEscalasPassadas(passadas)
    }
    carregarConsultas()
  }, [isFocused, recarregar])

  async function cancelar(consultaId: string) {
    const resultado = await cancelarConsulta(consultaId);
    if (resultado) {
      toast.show({
        title: 'Consulta cancelada com sucesso',
        backgroundColor: 'green.500',
      });
      setRecarregar(!recarregar);
    } else {
      toast.show({
        title: 'Erro ao cancelar consulta',
        backgroundColor: 'red.500',
      });
    }
  }

  return(
    <ScrollView p="5">
      <Titulo color="blue.500">Minhas Escalas</Titulo>
      <Botao mt={5} mb={5}>Agendar nova Folga</Botao>

      <Titulo color="blue.500" fontSize="lg" alignSelf="flex-start" mb={2}>Próximas Escalas</Titulo>
      {EscalaProximas?.map((escala) => (
        <CardEscala 
          nome={escala?.especialista?.nome}
          especialidade={escala?.especialista?.especialidade}
          foto={escala?.especialista?.imagem}
          data={converterDataParaString(escala?.data)}
          foiAgendado
          key={escala.id}
          onPress={() => cancelar(escala.id)}
        />
      )) }

      <Divider mt={5} />

      <Titulo color="blue.500" fontSize="lg" alignSelf="flex-start" mb={2}>Escalas Passadas</Titulo>
      {EscalaPassadas?.map((escala) => (
        <CardEscala 
          nome={escala?.especialista?.nome}
          especialidade={escala?.especialista?.especialidade}
          foto={escala?.especialista?.imagem}
          data={converterDataParaString(escala?.data)}
          foiAtendido
          key={escala.id}
          onPress={() => navigation.navigate('Agendamento', { especialistaId: escala.especialista.id })}
        />
      )) }
    </ScrollView>
  )
}