import { StyleSheet, View, Text, TextInput } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, ScrollView, Select, useToast } from "native-base"
import { useEffect, useState } from "react";


import apiViaCep from "../servicos/apiViaCep";
import { Botao } from "../componentes/Botao";
import { cadastrarResidencia } from "../servicos/PvsCadastramentoResisdencialServico";
import { pegarDadosUsuarios } from "../servicos/UsuarioServico";
import { Usuario } from "../interfaces/Usuario";
import { CabecalhoPVS } from "../componentes/cabecalhoPVS"
import { EntradaTexto } from "../componentes/EntradaTexto"
import { NavigationProps } from "../@types/navigation";

const cadastoOpçcoes = ["NOVO CADASTRO", "EXCLUSÃO DE CADASTRO"];
const regiao = ["CPP-1 (ÁREA DA CIA)", "CPP-2 (CONJ METALÚGICOS)"];
const acao = ["CADASTRO COMERCIAL","CADASTRO RESIDENCIAL","CADASTRO ESCOLAR"]
const aceita = ["SIM","NÃO"]
const OPM = ["BATALHÃO PM", "1ª CIA PM", "2ª CIA PM", "3ª CIA PM", "4ª CIA PM", "5ª CIA PM", "FORÇA TÁTICA"]

const estilos = StyleSheet.create({
    container:{
        margin:10,
        backgroundColor:"white",
        borderRadius:20,
        textAlign: "center",
        padding:10
    },
    texto:{
        marginTop: 5,
        textAlign: "center",
        backgroundColor:"#B0C4DE",
        borderRadius:20,
        fontWeight: "bold"
    },
    selecao:{
        borderWidth:0,
        textAlign: "center"
    }
});

export default function PVSCadastroResidencial({ navigation }: NavigationProps<'PVS'>) {
    const [regiaoSelecionada, setRegiaoSelecionada] = useState('');
    const [termoSelecionado, setTermoSelecionado] = useState('');
    const [unidadeSelecionada, setUnidadeSelecionada] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [morador, setMorador] = useState('');
    const [usuario, setUsuario] = useState({} as Usuario);
    const [rg, setRG] = useState('');
    const [telefone, setTelefone] = useState(''); 

    const toast = useToast();

    const [grad, setGrad] = useState('');
    const [re, setRe] = useState('');
    const [qra, setQra] = useState('');

    useEffect(() => {
        async function dadosUsuarios() {
          const mikeId = await AsyncStorage.getItem('mikeId');
          if (!mikeId) { 
            console.log("nao achou mikeId")
            return null;
          }
    
          const resultadoMike = await pegarDadosUsuarios(mikeId);
          if (resultadoMike) {
            setUsuario(resultadoMike);
            setGrad(resultadoMike.grad);
            setRe(`${resultadoMike.re}-${resultadoMike.dig}`);
            setQra(resultadoMike.nome);
          }
        }
    
        dadosUsuarios();
    }, []);
    
    async function buscarCep(){
      if(cep == ""){
        toast.show({
          title: 'CEP NÃO DIGITADO',
          description: 'Digite um CEP valido para consulta',
          backgroundColor: 'red.500',
        });
        return;
      }
      try {
          const resposta : any = await apiViaCep.get(`/${cep}/json/`)
          setEndereco(resposta.data.logradouro)
      } catch (error) {
        console.log("ERRO" + error)
        toast.show({
          title: 'CEP invalido',
          description: 'Digite o cep sem "-" ou "." apenas numeros',
          backgroundColor: 'red.500',
        });
        setCep("")
        return;
      }
    }
    
    async function cadastrar() {
        if (isNaN(parseFloat(numero))) {
          toast.show({
            title: 'Erro ao agendar consulta',
            description: 'A número da residência deve ser um número válido',
            backgroundColor: 'red.500',
          });
          return;
        }
    
        if (!regiaoSelecionada || !termoSelecionado || !unidadeSelecionada || !endereco || !numero || !complemento || !morador || !rg || !telefone ) {
          toast.show({
            title: 'Erro ao agendar consulta',
            description: 'Preencha todos os campos',
            backgroundColor: 'red.500',
          });
          return;
        }
    
        try {
          const resultado = await cadastrarResidencia(regiaoSelecionada, termoSelecionado, unidadeSelecionada, endereco, numero, complemento, morador, rg, re, telefone);
          if (resultado) {
            toast.show({
              title: 'CADASTRO REALIZADO',
              backgroundColor: 'green.500',
            });
            setRegiaoSelecionada("")
            setTermoSelecionado("")
            setUnidadeSelecionada("")
            setEndereco("")
            setNumero("")
            setComplemento('')
            setMorador("")
            setRG("")
            setTelefone('')

            navigation.goBack();
          } else {
            toast.show({
              title: 'Erro ao agendar Folga',
              description: 'Horário indisponível',
              backgroundColor: 'red.500',
            });
          }
        } catch (error) {
          console.log(error);
        }
    }
    
    // Função para formatar o número de telefone
    // Função para formatar o número de telefone
  const formatarTelefone = (input:any) => {
    // Remove todos os caracteres não numéricos do número de telefone
    const cleaned = ('' + input).replace(/\D/g, '');
    
    // Formatação específica do número de telefone, por exemplo: (XX) 91234-5678
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return input;
  };

    
    // Atualização do estado do número de telefone com formatação
    const atualizarTelefone = (input:any) => {
        setTelefone(formatarTelefone(input));
    };

    return(
        <ScrollView>
            <View>
                <CabecalhoPVS/>
                <Box style={estilos.container}>
                    <Text style={estilos.texto}>REGIÃO</Text>
                    <Select
                        style={estilos.selecao}
                        marginTop={2}
                        selectedValue={regiaoSelecionada}
                        minWidth={200}
                        accessibilityLabel="Selecione cadastro ou exclusão"
                        placeholder="Selecione a REGIÃO"
                        onValueChange={(itemValue) => setRegiaoSelecionada(itemValue)}>
                        {regiao.map((opcao, index) => (
                            <Select.Item key={index} label={opcao} value={opcao} />
                        ))}
                    </Select>
                </Box>
                <Box style={estilos.container}>
                    <Text style={estilos.texto}>TUTOR?</Text>
                    <Select
                        style={estilos.selecao}
                        marginTop={2}
                        selectedValue={termoSelecionado}
                        minWidth={200}
                        accessibilityLabel="TUTOR?"
                        placeholder="TUTOR?"
                        onValueChange={(itemValue) => setTermoSelecionado(itemValue)}>
                        {aceita.map((opcao, index) => (
                            <Select.Item key={index} label={opcao} value={opcao} />
                        ))}
                    </Select>
                </Box>
                <Box style={estilos.container}>
                    <Text style={estilos.texto}>UNIDADE OPERACIONAL</Text>
                    <Select
                        style={estilos.selecao}
                        marginTop={2}
                        selectedValue={unidadeSelecionada}
                        minWidth={200}
                        accessibilityLabel="Selecione cadastro ou exclusão"
                        placeholder="Selecione cadastro ou exclusão"
                        onValueChange={(itemValue) => setUnidadeSelecionada(itemValue)}>
                        {OPM.map((opcao, index) => (
                            <Select.Item key={index} label={opcao} value={opcao} />
                        ))}
                    </Select>
                </Box>
                <Box style={estilos.container}>          
                    <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="CEP DA RESIDÊNDIA"
                        placeholder="DIGITE O CEP DA RESIDÊNCIA"
                        value = {cep}
                        onChangeText={setCep}
                        onBlur = {buscarCep}
                    />
                </Box>
                <Box style={estilos.container}>          
                    <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="ENDEREÇO DA RESIDÊNDIA"
                        placeholder="ENDEREÇO SEM Nº"
                        value = {endereco}
                        onChangeText={setEndereco}
                    />
                </Box>
                <Box style={estilos.container}>          
                    <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="NÚMERO DA RESIDÊNCIA"
                        placeholder="APENAS O NÚMERO"
                        value={numero}
                        onChangeText={setNumero}
                    />
                </Box>
                <Box style={estilos.container}>
                    <EntradaTexto
                        estiloTexto={estilos.texto}    
                        label="COMPEMENTO DA RESIDÊNCIA"
                        placeholder="EXEMPLO 'CASA-1', 'APTO 02'"
                        value={complemento}
                        onChangeText={setComplemento}
                    /> 
                </Box>
                <Box style={estilos.container}>
                    <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="NOME COMPLETO DO MORADOR"
                        placeholder="exp: Fulando de Tal"
                        value={morador}
                        onChangeText={setMorador}
                    /> 
                </Box>
                <Box style={estilos.container}>
                    <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="RG DO MORADOR"
                        placeholder="exp: '01.123.456-0' OU '01.123.456-X'"
                        value= {rg}
                        onChangeText= {setRG}
                    /> 
                </Box>
                <Box style={estilos.container}>
                    <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="TELEFONE PESSOAL DO MORADOR"
                        placeholder="exp: '(XX)91234-5678'"
                        value={telefone}
                        onChangeText={atualizarTelefone}
                    /> 
                </Box>
                <Box style={estilos.container}>
                    <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="RE do Cadastrador"
                        placeholder=""
                        value= {re}
                    /> 
                </Box>
                <Botao onPress={cadastrar} >Enviar</Botao>
            </View>  
        </ScrollView>
    );
}
