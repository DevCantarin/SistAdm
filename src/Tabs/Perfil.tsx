import { VStack, Text, ScrollView, Avatar, Divider } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Titulo } from '../componentes/Titulo'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { editarFotoUsuario, pegarDadosUsuarios } from '../servicos/UsuarioServico'
import { Usuario } from '../interfaces/Usuario'
import { Botao } from '../componentes/Botao'
import { NavigationProps } from '../@types/navigation'
import * as ImagePicker from 'expo-image-picker';

export default function Perfil({ navigation }: NavigationProps<'Perfil'>) {
  const [dadosUsuarios, setDadosUsuarios] = useState({} as Usuario);
  const [mikeId, setMikeId] = useState("");
  const [image, setImage] = useState(`${dadosUsuarios.imagem}`);
 

  useEffect(() => {
    async function fetchData() {
      const storedMikeId = await AsyncStorage.getItem('mikeId');
      if (!storedMikeId) return null;

      setMikeId(storedMikeId);

      const resultado = await pegarDadosUsuarios(storedMikeId);
      if (resultado) {
        setDadosUsuarios(resultado);
        setImage(resultado.imagem); 
      }
    }
    fetchData();
  }, []);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 4],
      allowsEditing: true,
      base64: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      const imagemTrocada = result.assets[0].uri;
      console.log(`Mike ID eh ${mikeId}`);
  
      if (dadosUsuarios) {
        console.log(`A imagem selecionada foi ${imagemTrocada}`);
        editarFotoUsuario(mikeId, imagemTrocada); 
        setImage(imagemTrocada)
      } else {
        console.log('Imagem ou dados do usuário não definidos.');
      }
    } else {
      alert('Você não selecionou nenhuma imagem.');
    }
  };

  function deslogar() {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('mikeId');
    navigation.replace('Login');
  }

  return (
    <ScrollView flex={1}>
      <VStack flex={1} alignItems="center" p={5}>
        <Titulo color="blue.500">Meu Perfil</Titulo>
        <TouchableOpacity onPress={pickImageAsync}>
          <Avatar size="xl" source={{ uri: image }} mt={5} />
        </TouchableOpacity>

        <Titulo color="blue.500">Informações pessoais</Titulo>
        <Titulo fontSize="lg" mb={1}>{`${dadosUsuarios.grad} ${dadosUsuarios.nome}`}</Titulo>
        <Text>{dadosUsuarios?.email}</Text>

        <Divider mt={5} />

        <Botao onPress={deslogar}>Deslogar</Botao>
      </VStack>
    </ScrollView>
  );
}
