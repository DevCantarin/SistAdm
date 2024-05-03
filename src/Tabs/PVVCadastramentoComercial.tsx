import { StyleSheet, View,Text } from "react-native"
import { Box, ScrollView, Select, useToast } from "native-base"
import { useState, useEffect } from "react";
import { CheckBox } from 'react-native-elements';
import AsyncStorage from "@react-native-async-storage/async-storage";

import apiViaCep from "../servicos/apiViaCep";
import { pegarDadosUsuarios } from "../servicos/UsuarioServico";
import { CabecalhoPVS } from "../componentes/cabecalhoPVS"
import { EntradaTexto } from "../componentes/EntradaTexto"
import { Botao } from "../componentes/Botao";
import { cadastrarComercial } from "../servicos/PvsCadastramentoComercialServico";


const cadastoOpçcoes = ["NOVO CADASTRO", "EXCLUSÃO DE CADASTRO"];
const regiao = ["CPP-1 (ÁREA DA CIA)", "CPP-2 (CONJ METALÚGICOS)"];
const acao = ["CADASTRO COMERCIAL","CADASTRO RESIDENCIAL","CADASTRO ESCOLAR"]
const aceita = ["SIM","NÃO"]
const OPM = ["BATALHÃO PM","1ª CIA PM", "1ª CIA PM", "2ª CIA PM", "3ª CIA PM", "4ª CIA PM", "5ª CIA PM", "FORÇA TÁTICA"]



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

})

export default function PVSCadastroComercial(){
    const [usuario, setUsuario] = useState('');
    const [grad, setGrad] = useState('');
    const [re, setRe] = useState('');
    const [qra, setQra] = useState('');
    const [cep, setCep] = useState('');
    const [regiaoSelecionada, setRegiaoSelecionada] = useState('');
    const [termoSelecionado, setTermoSelecionado] = useState('');
    const [unidadeSelecionada, setUnidadeSelecionada] = useState('');
    

    const [nome, setNome] = useState("")
    const [endereco, setEndereco] = useState("")
    const [numero, setNumero] = useState("")
    const [telefone, setTelefone] = useState("")
    const [proprietario, setProprietario] = useState("")
    const [nascimento, setNascimento] = useState("")
    const [rg, setRG] = useState("")
    const [telefoneProprietario, setTelefoneProprietario] = useState("")

    const toast = useToast();

    useEffect(() => {
        async function dadosUsuarios() {
          const mikeId = await AsyncStorage.getItem('mikeId');
          if (!mikeId) { 
            console.log("nao achou mikeId")
            return null} ;
    
          const resultadoMike = await pegarDadosUsuarios(mikeId);
          if (resultadoMike) {
            setUsuario(resultadoMike);
            setGrad(resultadoMike.grad);
            setRe(`${resultadoMike.re}-${resultadoMike.dig}`);
            setQra(resultadoMike.nome);

            console.log(`o re é ${re}`)
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
    
        if (!regiaoSelecionada || !termoSelecionado || !unidadeSelecionada ||!nome ||!cep ||!endereco ||!numero ||!telefone || proprietario ||  nascimento || rg || telefoneProprietario || re)   {
            console.log(`regiaoSelecionada e${regiaoSelecionada}`)
            console.log(`termoSelecionado e${termoSelecionado}`)
            console.log(`unidadeSelecionada e${unidadeSelecionada}`)
            console.log(`nome e${nome}`)
            console.log(`cep e${cep}`)
            console.log(`endereco e${endereco}`)
            console.log(`numero e${numero}`)
            console.log(`telefone e${telefone}`)
            console.log(`proprietario e${proprietario}`)
            console.log(`nascimento e${nascimento}`)
            console.log(`rg e${rg}`)
            console.log(`telefoneProprietario e${telefoneProprietario}`)
            console.log(`re e${re}`)



            toast.show({
            title: 'Erro ao agendar consulta',
            description: 'Preencha todos os campos',
            backgroundColor: 'red.500',
          });
          return;
        }
    
        try {
          const resultado = await cadastrarComercial(regiaoSelecionada, termoSelecionado, unidadeSelecionada,nome, cep,endereco, numero, telefone, proprietario,  nascimento, rg, telefoneProprietario, re);
          if (resultado) {
            toast.show({
              title: 'Folga agendada com sucesso',
              backgroundColor: 'green.500',
            });
            setRegiaoSelecionada("")
            setTermoSelecionado("")
            setUnidadeSelecionada("")
            setEndereco("")
            setCep("")
            setNumero("")
            setEndereco("")
            setNumero('')
            setProprietario("")
            setRG("")
            setTelefone('')
          } else {
            toast.show({
              title: 'Erro ao agendar Folga',
              description: 'VERIFIQUE OS DADOS',
              backgroundColor: 'red.500',
            });
          }
        } catch (error) {
          console.log(error);
        }
      }

    return(
        <ScrollView>

            <View>
                <CabecalhoPVS/>
                <Box style={estilos.container}>
                        <Text style={estilos.texto}>REGIÃO</Text>
                            <Select style={estilos.selecao}
                                marginTop={2}
                                selectedValue={regiaoSelecionada}
                                minWidth={200}
                                accessibilityLabel="Selecione cadastro ou exclusão"
                                placeholder="Selecione a REGIÃO"
                                onValueChange={(itemValue) => setRegiaoSelecionada(itemValue)}
                                >
                                {regiao.map((opcao, index) => (
                                    <Select.Item key={index} label={opcao} value={opcao} />
                                ))}
                            </Select>
                    </Box>
                    <Box style={estilos.container}>
                        <Text style={estilos.texto}>TERMO DE ACEITAÇÃO</Text>
                            <Select style={estilos.selecao}
                                marginTop={2}
                                selectedValue={termoSelecionado}
                                minWidth={200}
                                accessibilityLabel="Selecione cadastro ou exclusão"
                                placeholder="Selecione cadastro ou exclusão"
                                onValueChange={(itemValue) => setTermoSelecionado(itemValue)}
                                >
                                {aceita.map((opcao, index) => (
                                    <Select.Item key={index} label={opcao} value={opcao} />
                                ))}
                            </Select>
                    </Box>
                    <Box style={estilos.container}>
                        <Text style={estilos.texto}>UNIDADE OPERACIONAL</Text>
                            <Select style={estilos.selecao}
                                marginTop={2}
                                selectedValue={unidadeSelecionada}
                                minWidth={200}
                                accessibilityLabel="Selecione cadastro ou exclusão"
                                placeholder="Selecione cadastro ou exclusão"
                                onValueChange={(itemValue) => setUnidadeSelecionada(itemValue)}
                                >
                                {OPM.map((opcao, index) => (
                                    <Select.Item key={index} label={opcao} value={opcao} />
                                ))}
                            </Select>
                    </Box>
                    <Box style={estilos.container}>          
                        <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="NOME DO COMÉRCIO"
                        placeholder="exp Loja do Mikão"
                        value={nome}
                        onChangeText= {(itemValue)=> setNome(itemValue)}
                        />
                    </Box>
                    <Box style={estilos.container}>          
                        <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="CEP ENDEREÇO DO COMÉRCIO"
                        placeholder="digite cep para preenchimento do endereço "
                        value= {cep}
                        onChangeText={(itemValue)=>setCep(itemValue)}
                        />
                    </Box>
                    <Box style={estilos.container}>          
                        <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="ENDEREÇO DO COMÉRCIO"
                        placeholder="endereço buscado pelo CEP"
                        value= {endereco}
                        onChangeText={(itemValue)=>setEndereco(itemValue)}
                        onBlur={buscarCep}
                        />
                    </Box>
                    <Box style={estilos.container}>          
                        <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="NÚMERO DO COMÉRCIO"
                        placeholder="APENAS O NÚMERO"
                        value={numero}
                        onChangeText={(itemValue)=>setNumero(itemValue)}
                        />
                    </Box>
                <Box style={estilos.container}>
                <EntradaTexto
                    estiloTexto={estilos.texto}
                    label="TELEFONE DO COMÉRCIO PARA WHATSAPP"
                    placeholder="exp: (XX)91234-5678"
                    value={telefone}
                    onChangeText={(itemValue)=>setTelefone(itemValue)}
                /> 
                </Box>
                <Box style={estilos.container}>
                    <EntradaTexto
                    estiloTexto={estilos.texto}
                    label="NOME COMPLETO DO PROPRIETÁRIO OU RESPONSÁVEL"
                    placeholder="NÃO ABREVIAR'"
                    value={proprietario}
                    onChangeText={(itemValue)=>setProprietario(itemValue)}
                /> 
                </Box>
                <Box style={estilos.container}>
                    <EntradaTexto
                    estiloTexto={estilos.texto}
                    label="DATA DE NASCIMENTO DO PROPRIETÁRIO / RESPONSÁVEL"
                    placeholder="exp: 01/01/2000"
                    value={nascimento}
                    onChangeText={(itemValue)=>setNascimento(itemValue)}
                /> 
                </Box>
                <Box style={estilos.container}>
                    <EntradaTexto
                    estiloTexto={estilos.texto}
                    label="RG DO PROPRIETÁRIO / RESPONSÁVEL"
                    placeholder="exp: 01.123.456-0 OU 01.123.456-X"
                    value={rg}
                    onChangeText={(itemValue)=>setRG(itemValue)}
                /> 
                </Box>
                <Box style={estilos.container}>
                    <EntradaTexto
                    estiloTexto={estilos.texto}
                    label="TELEFONE DO PROPRIETÁRIO / RESPONSÁVEL"
                    placeholder="exp: (XX)91234-5678"
                    value={telefoneProprietario}
                    onChangeText={(itemValue)=>setTelefoneProprietario(itemValue)}
                /> 
                </Box>
                <Box style={estilos.container}>
                    <EntradaTexto
                    estiloTexto={estilos.texto}
                    label="ENCARREGADO"
                    placeholder=""
                    value={re}
                    onChangeText={(itemValue)=>setTelefoneProprietario(itemValue)}
                /> 
                </Box>

                
                <Botao onPress={cadastrar} >Enviar</Botao>
            </View>  

        </ScrollView>
    )
}
