import { StyleSheet, View,Text } from "react-native"
import { CabecalhoPVS } from "../componentes/cabecalhoPVS"
import { EntradaTexto } from "../componentes/EntradaTexto"
import { Box, ScrollView, Select } from "native-base"
import { CheckBox } from 'react-native-elements';
import { useState } from "react";
import { Botao } from "../componentes/Botao";

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
    const [cadastroSelecionado, setCadastroSelecionado] = useState('');
    const [regiaoSelecionada, setRegiaoSelecionada] = useState('');
    const [acaoSelecionada, setAcaoSelecionada] = useState('');

    return(
        <ScrollView>

            <View>
                <CabecalhoPVS/>
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
                                onValueChange={(itemValue) => setAcaoSelecionada(itemValue)}
                                >
                                {nivel.map((opcao, index) => (
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
                                onValueChange={(itemValue) => setAcaoSelecionada(itemValue)}
                                >
                                {segurança.map((opcao, index) => (
                                    <Select.Item key={index} label={opcao} value={opcao} />
                                ))}
                            </Select>
                    </Box>
                    <Box style={estilos.container}>          
                        <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="NOME DA ESCOLA"
                        placeholder="exp Escolinha da PM"
                        value=""
                        />
                    </Box>
                    <Box style={estilos.container}>          
                        <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="ENDEREÇO DA ESCOLA"
                        placeholder="endereço sem número"
                        value=""
                        />
                    </Box>
                    <Box style={estilos.container}>          
                        <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="NÚMERO DO ESCOLA"
                        placeholder="APENAS O NÚMERO"
                        value=""
                        />
                    </Box>
                <Box style={estilos.container}>
                <EntradaTexto
                    estiloTexto={estilos.texto}
                    label="TELEFONE DA ESOLA"
                    placeholder="exp: (XX)91234-5678"
                    value=""
                    //   onChangeText=""
                /> 
                </Box>
                <Box style={estilos.container}>
                    <EntradaTexto
                    estiloTexto={estilos.texto}
                    label="HORÁRIO DE ABERTURA DA ESCOLA"
                    placeholder="HORÁRIO DE INICIO DAS ATIVIDADES"
                    value=""
                    //   onChangeText=""
                /> 
                </Box>
                <Box style={estilos.container}>
                    <EntradaTexto
                    estiloTexto={estilos.texto}
                    label="HORÁRIO DE FECHAMENTO DA ESCOLA"
                    placeholder="HORÁRIO DE TÉMINO DAS ATIVIDADES"
                    value=""
                    //   onChangeText=""
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
