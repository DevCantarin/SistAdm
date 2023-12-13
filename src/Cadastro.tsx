import { Image, Text, Box, Checkbox, ScrollView, useToast } from 'native-base'
import { useState } from 'react';
// import Logo from './assets/Logo.png'
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
      if(dados.senha != dados.confirmaSenha){
        toast.show({
          title: 'Senha não Bate',
          description: 'Stive, a Confirmação de senha deve ser igual a senha',
          backgroundColor: 'red.500',
        })
        return
      }
      setNumSecao(numSecao+1)
    }
    else{
      console.log(dados)
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

  function formatarData(valor: string) {
    // Remove caracteres não numéricos
    const cleanedValue = valor.replace(/\D/g, '');
  
    // Adiciona barras conforme o formato DD/MM/YYYY
    const day = cleanedValue.substring(0, 2);
    const month = cleanedValue.substring(2, 4);
    const year = cleanedValue.substring(4, 8);
  
    const formattedValue = day + (month ? `/${month}` : '') + (year ? `/${year}` : '');
  
    return formattedValue;
  }
  function formatarCPF(valor:string) {
    const cleanedValue = valor.replace(/\D/g, '');
    const part1 = cleanedValue.substring(0, 3);
    const part2 = cleanedValue.substring(3, 6);
    const part3 = cleanedValue.substring(6, 9);
    const part4 = cleanedValue.substring(9, 11);
  
    const formattedValue = `${part1}.${part2}.${part3}-${part4}`;
  
    return formattedValue;
  }
  function formatarCEP(valor: string) {
    const cleanedValue = valor.replace(/\D/g, '');
  
    const part1 = cleanedValue.substring(0, 5);
    const part2 = cleanedValue.substring(5, 8);
  
    const formattedValue = `${part1}-${part2}`;
  
    return formattedValue;
  }
  function formatarTelefone(valor: string) {
    const cleanedValue = valor.replace(/\D/g, '');

    const part1 = cleanedValue.substring(0, 2); // Código de área
    const part2 = cleanedValue.substring(2, 6); // Primeira parte do número
    const part3 = cleanedValue.substring(6, 10); // Segunda parte do número

    const formattedValue = `(${part1}) ${part2}-${part3}`;

    return formattedValue;
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
      cabelo: dados.cabelo,
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
    {/* <Image source={Logo} alt="Logo PMES" alignSelf="center" w="75" height="75" /> */}

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
              onChangeText={(text) => {
                const valorFormatado =
                  entrada.name === 'cep'
                    ? formatarCEP(text)
                    : entrada.name === 'nascimento' || entrada.name === 'admissao' || entrada.name === 'val'
                    ? formatarData(text)
                    : entrada.name === 'cpf'
                    ? formatarCPF(text)
                    : entrada.name === 'telefone'
                    ? formatarTelefone(text)
                    : text;

                atualizarDados(entrada.name, valorFormatado);
              }}
            />

            )
          })
        }
      </Box>
      {numSecao > 0 && <Botao onPress={() => voltarSecao()} bgColor="gray.400">Voltar</Botao>}
      <Botao onPress={() => avancarSecao()} mt={4} mb={20}>
        {numSecao < secoes.length - 1?  'Avancar':  'Finalizar'}
      </Botao>
    </ScrollView>
  );
}