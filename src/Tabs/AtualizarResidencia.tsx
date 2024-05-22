import { StyleSheet, View, Text, TextInput } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, ScrollView, Select, useToast } from "native-base"
import { useEffect, useState } from "react";
import { NavigationProps } from "../@types/navigation";
import ResidenciaStorege from '@react-native-async-storage/async-storage'



import apiViaCep from "../servicos/apiViaCep";
import { Botao } from "../componentes/Botao";
import { cadastrarResidencia, pegaResisdenciaPorID, pegaTodasAsResidencias } from "../servicos/PvsCadastramentoResisdencialServico";
import { pegarDadosUsuarios } from "../servicos/UsuarioServico";
import { Usuario } from "../interfaces/Usuario";
import { EntradaTexto } from "../componentes/EntradaTexto"
import { Titulo } from "../componentes/Titulo";
import { useFocusEffect } from "@react-navigation/native";
import { Residencia } from "../interfaces/Residencia";
import { CardEscala } from "../componentes/CardEscala";
import api from "../servicos/api";


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

export default function AtualizarResidencia({ navigation }: NavigationProps<'PVS'>) {
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
    const [IDResidencia, setIDResidencia] = useState('')

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
    
    useEffect(() => {
      async function residencias() {
        const residenciaID:any = await ResidenciaStorege.getItem('id');
        setIDResidencia(residenciaID)
        if (!residenciaID) { 
          console.log("nao achou id de ResidenciaStorege")
          return null;
        }
  
        try {
            const resultado:Residencia = await pegaResisdenciaPorID(residenciaID);
            console.log(`resuldado das residencias é ${resultado}`)
            setRegiaoSelecionada(resultado.regiao)
            setTermoSelecionado(resultado.termo);
            setUnidadeSelecionada(resultado.opm);
            setEndereco(resultado.endereco);
            setNumero(resultado.numero);
            setComplemento(resultado.complemento);
            setMorador(resultado.morador);
            setTelefone(resultado.telefone)
            setRG(resultado.rg);
          
        } catch (error: any) {
          console.error(`Erro ao armazenar o ID: ${error.message}`);
        }
      }
  
      residencias();
  }, []);
    
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

      async function atualizaTutorResidencias(residenciaID:string, termoNovo:string){
      const token = await AsyncStorage.getItem('token');
      console.log('Token:', token);
    
      if (!token) {
        console.log('Token não encontrado no armazenamento local.');
        return null;
      }
      try {
        const resultado = await api.put(`/pvsresidencial/id/${residenciaID}`, {
    
          termo: termoNovo,
    
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTermoSelecionado(termoNovo)
        console.log(`o residenciaID novo é ${residenciaID}`)
        console.log(`o termo novo é ${termoNovo}`)
        console.log(`Tutor Alterado com sucesso`)
        return resultado.data
    
      }
      catch(error){
        console.log(error);
        return null;
      }
    }

    return(
        <ScrollView>
            <View>
              <Titulo> SistADN</Titulo>
                    <CardEscala
                      nome="Região:"
                      funcao ={regiaoSelecionada}
                    />
                <Box style={estilos.container}>
                    <Text style={estilos.texto}>TUTOR?</Text>
                    <Select
                        style={estilos.selecao}
                        marginTop={2}
                        selectedValue={termoSelecionado}
                        minWidth={200}
                        accessibilityLabel="TUTOR?"
                        placeholder="TUTOR?"
                        onValueChange={(itemValue) => atualizaTutorResidencias(IDResidencia, itemValue)}>
                        {aceita.map((opcao, index) => (
                            <Select.Item key={index} label={opcao} value={opcao} />
                        ))}
                    </Select>
                </Box>
                <CardEscala
                      nome="Unidade Operacional:"
                      funcao ={unidadeSelecionada}
                    />
                <CardEscala
                      nome="Endereço Da Residência:"
                      funcao ={endereco}
                    />
                <CardEscala
                      nome="Número:"
                      funcao ={numero}
                    />
                <CardEscala
                      nome="Complemento:"
                      funcao ={complemento}
                    />
                <CardEscala
                      nome="Morador:"
                      funcao ={morador}
                    />
                <CardEscala
                      nome="RG do Morador:"
                      funcao ={rg}
                    />
                <CardEscala
                      nome="Telefone do Morador:"
                      funcao ={telefone}
                    />
                <Botao 
                  // onPress={cadastrar}
                 >Enviar</Botao>
            </View>  
        </ScrollView>
    );
}
