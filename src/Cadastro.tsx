import { Image, Text, Box, Checkbox, ScrollView, useToast } from 'native-base'
import { useState } from 'react';
import Logo from './assets/Logo.png'
import { Botao } from './componentes/Botao';
import { EntradaTexto } from './componentes/EntradaTexto';
import { Titulo } from './componentes/Titulo';
import { secoes } from './utils/CadastroEntradaTexto';
import { cadastrarUsuario } from './servicos/UsuarioServico';
import { NavigationProps } from './@types/navigation';

export default function Cadastro({ navigation }: NavigationProps<'Cadastro'>) {
  const [numSecao, setNumSecao] = useState(0);
  const [dados, setDados] = useState({} as any);
  const toast = useToast()

  function avancarSecao(){
    if(numSecao < secoes.length - 1){
      setNumSecao(numSecao+1)
    }
    else{
      console.log(dados)
      console.log(`a senha é:${dados.senha}`)
      cadastrar()
    }
  }

  function voltarSecao(){
    if(numSecao > 0){
      setNumSecao(numSecao - 1)
    }
  }

  function atualizarDados(id: string, valor: string){
    setDados({...dados, [id]: valor})
  }

  async function cadastrar(){
    const resultado = await cadastrarUsuario({
      cpf: dados.cpf,
      nome: dados.nome,
      email: dados.email,
      senha: dados.senha,
      telefone: dados.telefone,
      imagem: dados.imagem,
      admissao: dados.admissao,
      bairro: dados.bairro,
      bigodes: dados.bigodes,
      cabelos: dados.cabelos,
      carteira_trabalho: dados.carteira_trabalho,
      cat: dados.cat,
      cep: dados.cep,
      cidade: dados.cidade,
      cnh: dados.cnh,
      conjuge: dados.conjuge,
      cor: dados.cor,
      dependentes: dados.dependentes,
      dig: dados.dig,
      estado: dados.estado,
      funcao: dados.funcao,
      grad: dados.grad,
      mae: dados.mae,
      nascimento: dados.nascimento,
      nome_completo: dados.nome_completo,
      olhos: dados.olhos,
      pai: dados.pai,
      pasep: dados.pasep,
      pis: dados.pis,
      re: dados.re,
      residencia: dados.residencia,
      rg: dados.rg,
      sangue: dados.sangue,
      sat: dados.sat,
      val: dados.val
    })

    if (resultado) {
      toast.show({
        title: 'Cadastro realizado com sucesso',
        description: 'Você já pode fazer login',
        backgroundColor: 'green.500',
      })
      navigation.replace('Login');
    }
    else {
      toast.show({
        title: 'Erro ao cadastrar',
        description: 'Verifique os dados e tente novamente',
        backgroundColor: 'red.500',
      })
    }
  }

  return (
    <ScrollView flex={1} p={5}>
    <Image source={Logo} alt="Logo PMES" alignSelf="center" w="75" height="75" />

      <Titulo>
        {secoes[numSecao].titulo}
      </Titulo>
      <Box>
        {
          secoes[numSecao]?.entradaTexto?.map(entrada => {
            return (
              <EntradaTexto 
                label={entrada.label} 
                placeholder={entrada.placeholder} 
                key={entrada.id} 
                secureTextEntry={entrada.secureTextEntry}
                value={dados[entrada.name]}
                onChangeText={(text) => atualizarDados(entrada.name, text)}
              />
            )
          })
        }
      </Box>
      {/* <Box>
        {numSecao == 2 && <Text color="blue.800" fontWeight="bold" fontSize="md" mt="2" mb={2}>
          Selecione o plano:
        </Text>}
        {
          secoes[numSecao].checkbox.map(checkbox => {
            return (
              <Checkbox 
                key={checkbox.id} 
                value={checkbox.value}
                onChange={() => {
                  setPlanos((planosAnteriores) => {
                    if(planosAnteriores.includes(checkbox.id)){
                      return planosAnteriores.filter((id) => id !== checkbox.id)
                    }
                    return [...planosAnteriores, checkbox.id]
                  })
                }}
                isChecked={planos.includes(checkbox.id)}
              >
              {checkbox.value}
            </Checkbox>)
          })
        }
      </Box> */}
      {numSecao > 0 && <Botao onPress={() => voltarSecao()} bgColor="gray.400">Voltar</Botao>}
      <Botao onPress={() => avancarSecao()} mt={4} mb={20}>
        {numSecao < secoes.length - 1?  'Avancar':  'Finalizar'}
      </Botao>
    </ScrollView>
  );
}