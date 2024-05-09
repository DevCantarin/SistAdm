import { StyleSheet, View,Text, } from "react-native"
import { Box, ScrollView, Select, useToast } from "native-base"
import { CheckBox } from 'react-native-elements';
import { useState,useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { EntradaTexto } from "../componentes/EntradaTexto"
import { Botao } from "../componentes/Botao";
import { pegarDadosUsuarios } from "../servicos/UsuarioServico";
import apiViaCep from "../servicos/apiViaCep";
import { Titulo } from "../componentes/Titulo";



const segurança = ["CÂMERA DE VIGILÂNCIA EXTERNA", "CÂMERA DE VIGILÂNCIA INTERNA", "ALARME DE SEGURANÇA", "CERCA DE SEGURANÇA", "PORTEIRO", "PORTEIRO ELETRÔNICO", "SEGURANÇA PARTICULAR", "MONITORAMENTO REMOTO", "ALARME CONTRA INCÊNCIO", "ENFERMARIA"];
const regiao = ["CPP-1 (ÁREA DA CIA)", "CPP-2 (CONJ METALÚGICOS)"];
const nivel = ["BERÇÁRIO","CADASTRO RESIDENCIAL","PRÉ-ESCOLA","PRÉ-ESCOLA II", "ENSINO INFANTIL", "ENSINO FUNDAMENTAL", "ENSINO MÉDIO", "ENSINO SUPERIOR", "EJA - EDUCAÇÃO DE JOVENS E ADULTOS", "ENSINO TÉCNICO"]
const aceita = ["SIM","NÃO"]
const OPM = ["BATALHÃO PM","CRECHE", "1ª CIA PM", "2ª CIA PM", "3ª CIA PM", "4ª CIA PM", "5ª CIA PM", "FORÇA TÁTICA"]



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

export default function PVSCadastroEscolar(){
    const [usuario, setUsuario] = useState('');
    const [grad, setGrad] = useState('');
    const [re, setRe] = useState('');
    const [qra, setQra] = useState('');
    const [cep, setCep] = useState('');
    const [opmSelecionada, setOPMSelecionada] = useState('');
    const [regiaoSelecionada, setRegiaoSelecionada] = useState('');
    const [acaoSelecionada, setAcaoSelecionada] = useState('');
    const [nivelSelecionado, setNivelSeleciona] = useState('');
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [telefone, setTelefone] = useState('');
    const [abertura, setAbertura] = useState('');
    const [fechamento, setFechamento] = useState('');

    

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

    return(
        <ScrollView>

            <View>
            <Titulo> SistADN</Titulo>
                <Box style={estilos.container}>
                        <Text style={estilos.texto}>REGIÃO</Text>
                            <Select style={estilos.selecao}
                                marginTop={2}
                                selectedValue={acaoSelecionada}
                                minWidth={200}
                                accessibilityLabel="Selecione cadastro ou exclusão"
                                placeholder="Selecione a Região "
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
                                selectedValue={acaoSelecionada}
                                minWidth={200}
                                accessibilityLabel="Selecione cadastro ou exclusão"
                                placeholder="Selecione cadastro ou exclusão"
                                onValueChange={(itemValue) => setAcaoSelecionada(itemValue)}
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
                                selectedValue={acaoSelecionada}
                                minWidth={200}
                                accessibilityLabel="Selecione cadastro ou exclusão"
                                placeholder="Selecione cadastro ou exclusão"
                                onValueChange={(itemValue) => setAcaoSelecionada(itemValue)}
                                >
                                {OPM.map((opcao, index) => (
                                    <Select.Item key={index} label={opcao} value={opcao} />
                                ))}
                            </Select>
                    </Box>
                    <Box style={estilos.container}>
                        <Text style={estilos.texto}>NÍVEIS DE ESCOLARIDADE OFERECIDOS</Text>
                            <Select style={estilos.selecao}
                                marginTop={2}
                                selectedValue={acaoSelecionada}
                                minWidth={200}
                                accessibilityLabel="Selecione cadastro ou exclusão"
                                placeholder="Selecione cadastro ou exclusão"
                                onValueChange={(itemValue) => setNivelSeleciona(itemValue)}
                                >
                                {nivel.map((opcao, index) => (
                                    <Select.Item key={index} label={opcao} value={opcao} />
                                ))}
                            </Select>
                    </Box>
                    <Box style={estilos.container}>          
                        <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="NOME DA ESCOLA"
                        placeholder="exp Escolinha da PM"
                        value={nome}
                        onChangeText={(itemValue) => setNome(itemValue)}
                        />
                    </Box>
                    <Box style={estilos.container}>          
                        <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="CEP"
                        placeholder="digite cep para preenchimento do endereço"
                        value={cep}
                        onChangeText={(itemValue) => setCep(itemValue)}
                        onBlur={buscarCep}
                        />
                    </Box>
                    <Box style={estilos.container}>          
                        <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="ENDEREÇO DA ESCOLA"
                        placeholder="preenchido automaticamente pelo cep"
                        value={endereco}
                        onChangeText={(itemValue) => setEndereco(itemValue)}
                        />
                    </Box>
                    <Box style={estilos.container}>          
                        <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="NÚMERO DO ESCOLA"
                        placeholder="APENAS O NÚMERO"
                        value={numero}
                        onChangeText={(itemValue) => setNumero(itemValue)}
                        />
                    </Box>
                    <Box style={estilos.container}>
                    <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="TELEFONE DA ESOLA"
                        placeholder="exp: (XX)91234-5678"
                        value={telefone}
                        onChangeText={(itemValue) => setTelefone(itemValue)}
                    /> 
                    </Box>
                    <Box style={estilos.container}>
                        <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="HORÁRIO DE ABERTURA DA ESCOLA"
                        placeholder="HORÁRIO DE INICIO DAS ATIVIDADES"
                        value={abertura}
                        onChangeText={(itemValue) => setAbertura(itemValue)}
                    /> 
                    </Box>
                    <Box style={estilos.container}>
                        <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="HORÁRIO DE FECHAMENTO DA ESCOLA"
                        placeholder="HORÁRIO DE TÉMINO DAS ATIVIDADES"
                        value={fechamento}
                        onChangeText={(itemValue) => setFechamento(itemValue)}
                    /> 
                    </Box>
                    <Box style={estilos.container}>
                        <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="RG DO PROPRIETÁRIO / RESPONSÁVEL"
                        placeholder="exp: 01.123.456-0 OU 01.123.456-X"
                        value=""
                        //   onChangeText=""
                    /> 
                    </Box>
                    <Box style={estilos.container}>
                        <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="TELEFONE DO PROPRIETÁRIO / RESPONSÁVEL"
                        placeholder="(XX)91234-5678"
                        value=""
                        //   onChangeText=""
                    /> 
                    </Box>
                    <Box style={estilos.container}>
                        <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="NOME COMPLETO DO DIRETOR(A)"
                        placeholder="exp: JOSÉ DA SILVA"
                        value=""
                        //   onChangeText=""
                    /> 
                    </Box>

                    <Box style={estilos.container}>
                        <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="DATA DE NASCIMENTO DO DIRETOR(A)"
                        placeholder="exp: 01/01/2000"
                        value=""
                        //   onChangeText=""
                    /> 
                    </Box>
                    <Box style={estilos.container}>
                        <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="RG DO DIRETOR(A)"
                        placeholder="exp: 01.123.456-0 OU 01.123.456-X"
                        value=""
                        //   onChangeText=""
                    /> 
                    </Box>
                    <Box style={estilos.container}>
                        <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="TELEFONE DO DIRETOR(A)"
                        placeholder="exp: (XX)91234-5678 OU(XX)1234-5678"
                        value=""
                        //   onChangeText=""
                    /> 
                    </Box>
                
                <Botao>Enviar</Botao>
            </View>  

        </ScrollView>
    )
}
