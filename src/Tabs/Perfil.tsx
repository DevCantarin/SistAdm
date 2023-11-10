import { VStack, Text, ScrollView, Avatar, Divider } from 'native-base'
import { Titulo } from '../componentes/Titulo'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { pegarDadosUsuarios } from '../servicos/UsuarioServico'
import { Usuario } from '../interfaces/Usuario'
import { Botao } from '../componentes/Botao'
import { NavigationProps } from '../@types/navigation'

export default function Perfil({ navigation } : NavigationProps<'Perfil'>){
  const [dadosPaciente, setDadosPaciente] = useState({} as Usuario)

  useEffect(() => {
    async function dadosPaciente(){
      const mikeId = await AsyncStorage.getItem('mikeId')
      if(!mikeId) return null

      const resultado = await pegarDadosUsuarios(mikeId)
      if(resultado){
        setDadosPaciente(resultado)
        console.log(resultado)
      }
    }
    dadosPaciente()
  },[])

  function deslogar(){
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('mikeId')
    navigation.replace('Login')
  }

  return(
    <ScrollView flex={1}>
      <VStack flex={1} alignItems="center" p={5}>
        <Titulo color="blue.500">Meu Perfil</Titulo>

        <Avatar size="xl" source={{ uri: "https://github.com/devcantarin.png" }} mt={5} />

        <Titulo color="blue.500">Informações pessoais</Titulo>
        <Titulo fontSize="lg" mb={1}>{`${dadosPaciente.grad} ${dadosPaciente.nome}`}</Titulo>
        <Text>{dadosPaciente?.email}</Text>


        <Divider mt={5} />

        {/* <Titulo color="blue.500" mb={1}>Planos de saúde</Titulo>
        {
          dadosPaciente?.planosSaude?.map((plano, index) => (
            <Text key={index}>{plano}</Text>
          ))
        } */}

        <Botao onPress={deslogar}>
          Deslogar
        </Botao>
      </VStack>
    </ScrollView>
  )
}