import { StyleSheet, View,Text } from "react-native"
import { CabecalhoPVS } from "../componentes/cabecalhoPVS"
import { EntradaTexto } from "../componentes/EntradaTexto"
import { Box, ScrollView, Select } from "native-base"
import { CheckBox } from 'react-native-elements';
import { useState } from "react";
import { Botao } from "../componentes/Botao";

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
    const [cadastroSelecionado, setCadastroSelecionado] = useState('');
    const [regiaoSelecionada, setRegiaoSelecionada] = useState('');
    const [acaoSelecionada, setAcaoSelecionada] = useState('');

    const [nome, setNome] = useState("")
    const [endereco, setEndereco] = useState("")
    const [numero, setNumero] = useState("")
    const [telefone, setTelefone] = useState("")
    const [proprietario, setProprietario] = useState("")
    const [nascimento, setNascimento] = useState("")
    const [rg, setRG] = useState("")
    const [telefoneProprietario, setTelefoneProprietario] = useState("")


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
                        <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="NOME DO COMÉRCIO"
                        placeholder="exp Loja do Mikão"
                        value=""
                        // onChangeText
                        />
                    </Box>
                    <Box style={estilos.container}>          
                        <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="ENDEREÇO DO COMÉRCIO"
                        placeholder="endereço sem número"
                        value=""
                        />
                    </Box>
                    <Box style={estilos.container}>          
                        <EntradaTexto
                        estiloTexto={estilos.texto}
                        label="NÚMERO DO COMÉRCIO"
                        placeholder="APENAS O NÚMERO"
                        value=""
                        />
                    </Box>
                <Box style={estilos.container}>
                <EntradaTexto
                    estiloTexto={estilos.texto}
                    label="TELEFONE DO COMÉRCIO PARA WHATSAPP"
                    placeholder="exp: (XX)91234-5678"
                    value=""
                    //   onChangeText=""
                /> 
                </Box>
                <Box style={estilos.container}>
                    <EntradaTexto
                    estiloTexto={estilos.texto}
                    label="NOME COMPLETO DO PROPRIETÁRIO OU RESPONSÁVEL"
                    placeholder="NÃO ABREVIAR'"
                    value=""
                    //   onChangeText=""
                /> 
                </Box>
                <Box style={estilos.container}>
                    <EntradaTexto
                    estiloTexto={estilos.texto}
                    label="DATA DE NASCIMENTO DO PROPRIETÁRIO / RESPONSÁVEL"
                    placeholder="exp: 01/01/2000"
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
                    placeholder="exp: (XX)91234-5678"
                    value=""
                    //   onChangeText=""
                /> 
                </Box>

                
                <Botao>Enviar</Botao>
            </View>  

        </ScrollView>
    )
}
