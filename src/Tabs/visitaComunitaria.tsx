import { StyleSheet, View,Text } from "react-native"
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
import { cadastarVisita } from "../servicos/visitaComunitariaServico";

const cadastoOpçcoes = ["NOVO CADASTRO", "EXCLUSÃO DE CADASTRO"];
const regiao = ["CPP-1 (ÁREA DA CIA)", "CPP-2 (CONJ METALÚGICOS)"];
const acao = ["CADASTRO COMERCIAL","CADASTRO RESIDENCIAL","CADASTRO ESCOLAR"]
const aceita = ["SIM","NÃO"]
const OPM = ["BATALHÃO PM", "1ª CIA PM", "2ª CIA PM", "3ª CIA PM", "4ª CIA PM", "5ª CIA PM", "FORÇA TÁTICA"]


const listaRuas = [
    { cep: "06150-130", nome: "Rua Paulo Kusma" },
    { cep: "06150-135", nome: "Rua Isaura Santachiara Lunardi" },
    { cep: "06150-140", nome: "Rua Valmir Pinto de Almeida" },
    { cep: "06150-142", nome: "Rua Fábio Renato Maciel" },
    { cep: "06150-150", nome: "Rua Júlio de Mesquita Filho" },
    { cep: "06150-160", nome: "Rua Fernando Ananias Cardoso" },
    { cep: "06150-170", nome: "Rua Sérgio Pompeo" },
    { cep: "06150-180", nome: "Rua João de Sá" },
    { cep: "06150-185", nome: "Rua João Salustiano Teixeira Bueno" },
    { cep: "06150-190", nome: "Rua Santo Dias da Silva" },
    { cep: "06150-200", nome: "Rua Ida Rebellato Garcia" },
    { cep: "06150-210", nome: "Rua Antônio Coutinho Neto" },
    { cep: "06150-220", nome: "Rua Antônio da Silva" },
    { cep: "06150-230", nome: "Rua Genoveva Soares Moreira" },
    { cep: "06150-240", nome: "Rua Jandira de Marins Peixoto" },
    { cep: "06150-250", nome: "Rua Maria Menck" },
    { cep: "06150-260", nome: "Rua Joichi Yamaji" },
    { cep: "06150-270", nome: "Rua Espedito Izidio Andrade" },
    { cep: "06150-390", nome: "Rua Manoel de Souza e Silva" },
    { cep: "06150-400", nome: "Rua João Vieira Cassiano Júnior" },
    { cep: "06150-560", nome: "Rua Firmino Martins" },
    { cep: "06150-570", nome: "Rua Virgilio Silva" },
    { cep: "06150-580", nome: "Rua Arnaldinha dos Santos Cordeiro" },
    { cep: "06150-600", nome: "Rua Walter Vieira Marques" },
    { cep: "06150-610", nome: "Rua Avelino Braz" },
    { cep: "06150-620", nome: "Rua Edson Hissnauer Adão" },
    { cep: "06150-665", nome: "Rua Nelson Vieira Lima" },
    { cep: "06150-740", nome: "Estrada das Palmas" }
  ];
  

  
  





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
export default function Comunitaria( navigation : any ){
    const [visitado, setVisitado] = useState('');
    const [encarregado, setEncarregado] = useState('');
    const [novidades, setNovidade] = useState('');
    const [usuario, setUsuario] = useState('')


    const toast = useToast();

    const [grad, setGrad] = useState('');
    const [re, setRe] = useState('');
    const [qra, setQra] = useState('');

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
    
    async function cadastrar() {
        if (!visitado || !novidades) {
          toast.show({
            title: 'Erro ao agendar consulta',
            description: 'Preencha todos os campos',
            backgroundColor: 'red.500',
          });
          return;
        }
    
        try {
          const resultado = await cadastarVisita(visitado, re, novidades);
          if (resultado) {
            toast.show({
              title: 'CADASTRO REALIZADO',
              backgroundColor: 'green.500',
            });
            setVisitado("")
            setNovidade("")

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
    

    return(
        <ScrollView>

            <View>
                <CabecalhoPVS/>
                    <Box style={estilos.container}>
                        <Text style={estilos.texto}>VISITADO</Text>
                            <Select style={estilos.selecao}
                                marginTop={2 }
                                selectedValue={visitado}
                                minWidth={200}
                                accessibilityLabel="Selecione cadastro ou exclusão"
                                placeholder="Selecione a REGIÃO"
                                onValueChange={(itemValue) => setVisitado(itemValue)}
                                >
                                {listaRuas.map((opcao, index) => (
                                    <Select.Item key={index} label={opcao.nome} value={opcao.nome} />
                                ))}
                            </Select>
                    </Box>
                    <Box style={estilos.container}>          
                        <EntradaTexto
                            estiloTexto={estilos.texto}
                            label="NOVIDADES"
                            placeholder="DIGITE AS NOVIDADES CONSTATADAS"
                            value = {novidades}
                            onChangeText={setNovidade}

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
    )
}
