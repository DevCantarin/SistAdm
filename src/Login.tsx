import { VStack, Image, Text, Box, Link, useToast } from 'native-base'
import { TouchableOpacity } from 'react-native';
import Logo from './assets/Logo.png'
import { Botao } from './componentes/Botao';
import { EntradaTexto } from './componentes/EntradaTexto';
import { Titulo } from './componentes/Titulo';
import { useEffect, useState } from 'react';
import { fazerLogin } from './servicos/AutenticacaoServico';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { NavigationProps } from './@types/navigation';

export default function Login({ navigation } : NavigationProps<'Login'>) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [carregando, setCarregando] = useState(true)
  const toast = useToast()

  useEffect(() => {
    async function verificarLogin(){
      const token = await AsyncStorage.getItem('token');
      if(token){
        try {
          const decodedToken:any = jwtDecode(token);
          const exp = decodedToken.exp * 1000; 
          const currentTime = Date.now();
  
          if (exp > currentTime) {
 
            navigation.replace('Tabs');
          } else {
  
            await AsyncStorage.removeItem('token');
          }
        } catch (error) {
       
          console.error('Erro ao decodificar o token:', error);
          await AsyncStorage.removeItem('token');
        }
      }
      setCarregando(false);
    }
  
    verificarLogin();
  }, []);

  interface TokenProps {
    token: string;
    id: string;
  }

  async function login() {
    const resultado = await fazerLogin(email, senha);
    if (resultado) {
      const { accessToken } = resultado;
      await AsyncStorage.setItem('token', accessToken); 

      const tokenDecodificado = jwtDecode(accessToken) as any;
      const mikeId = tokenDecodificado.id;
      await AsyncStorage.setItem('mikeId', mikeId); 

      navigation.navigate('Tabs');
    } else {
      toast.show({
        title: 'Erro no login',
        description: 'Verifique email e senha, Steve!',
        backgroundColor: 'red.500',
      });
    }
  }

  if(carregando){
    return null
  }

  return (
    <VStack flex={1} alignItems="center" justifyContent="center" p={5}>
      <Image source={Logo} alt="Logo Voll" alignSelf="center" w="100" height="100"  mb="50px"/>

      <Titulo>
        Faça login em sua conta
      </Titulo>
      <Box>
        <EntradaTexto
          label="Email"
          placeholder="Insira seu endereço de e-mail"
          value={email}
          onChangeText={setEmail}
        />
        <EntradaTexto
          label="Senha"
          placeholder="Insira sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
      </Box>
      <Botao onPress={login}>Entrar</Botao>

      <Link href='https://www.alura.com.br' mt={2}>
        Esqueceu sua senha?
      </Link>

      <Box w="100%" flexDirection="row" justifyContent="center" mt={8}>
        <Text>Ainda não tem cadastro? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text color="blue.500">
            Faça seu cadastro!
          </Text>
        </TouchableOpacity>
      </Box>
    </VStack>
  );
}