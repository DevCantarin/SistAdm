import { VStack, Box, ScrollView } from "native-base";
import { Botao } from "../componentes/Botao";
import { CardEscala } from "../componentes/CardEscala";
import { EntradaTexto } from "../componentes/EntradaTexto";
import { Titulo } from "../componentes/Titulo";
import React, { useEffect, useState } from "react";
import { NavigationProps } from "../@types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { pegarDadosUsuarios, pegarFolgasUsuario } from "../servicos/UsuarioServico";
import { Usuario } from "../interfaces/Usuario";
import { pegaTodoEfetivo } from "../servicos/EfetivoServico";
import { Efetivo } from "../interfaces/Efetivo";
import { useFocusEffect } from "@react-navigation/native";
import { pegarTodasAsFolgas } from "../servicos/FolgasServico";
import { Folga } from "../interfaces/Folga";

export default function Explorar({ navigation }: NavigationProps<'Explorar'>){
  const [dadosUsuarios, setDadosUsuarios] = useState({} as Usuario);
  const [funcao, setFuncao] = useState([] as Efetivo[]);
  const [mikeId, setMikeId] = useState("");
  const [dadosEfetivo, setDadosEfetivo] = useState([] as Efetivo[]); 
  const [efetivo1Pel, setEfetivo1Pel] = useState([] as Efetivo[]);
  const [efetivo2Pel, setEfetivo2Pel] = useState([] as Efetivo[]);
  const [efetivo3Pel, setEfetivo3Pel] = useState([] as Efetivo[]);
  const [efetivo4Pel, setEfetivo4Pel] = useState([] as Efetivo[]);
  const [folga, setFolga] = useState([] as Folga[])

  useFocusEffect(
    React.useCallback(() => {
      async function folgaData() {
        try {
          const resultado = await pegarTodasAsFolgas();
          setFolga(resultado);
        } catch (error) {
          console.error("Erro ao pegar as folgas:", error);
          // Lidar com o erro, talvez definindo um estado de erro ou exibindo uma mensagem de erro para o usuário.
        }
      }
      folgaData();
    }, [dadosUsuarios.re, dadosUsuarios.dig])
  );
  

  useEffect(() => {
    async function fetchData() {
      const storedMikeId = await AsyncStorage.getItem('mikeId');
      if (!storedMikeId) return null;

      setMikeId(storedMikeId);

      const resultado = await pegarDadosUsuarios(storedMikeId);
      if (resultado) {
        setDadosUsuarios(resultado);

        // Verificar a função do usuário e definir a função correspondente
        if (resultado.funcao === "CGP-1") {
          setFuncao(efetivo1Pel);
        } 
        if(resultado.funcao === "CGP-2") {
          setFuncao(efetivo2Pel);
        }
        if(resultado.funcao === "CGP-3") {
          setFuncao(efetivo3Pel);
        }
        if(resultado.funcao === "CGP-4") {
          setFuncao(efetivo4Pel);
        }
      }
    }
    fetchData();
  }, [efetivo1Pel, efetivo2Pel, efetivo3Pel, efetivo4Pel]);

  useEffect(()=> {
    async function fetchData() {
      const resultado = await pegaTodoEfetivo();
      if(!resultado){
        console.log(`dados do efetivo não localizados`);
        return null;  
      }
      setDadosEfetivo(resultado);
      

      const efetivoFiltrado1: Efetivo[] = resultado.filter((mike: Efetivo) => mike.equipe === "1º PEL");
      setEfetivo1Pel(efetivoFiltrado1);

      const efetivoFiltrado2: Efetivo[] = resultado.filter((mike: Efetivo) => mike.equipe === "2º PEL");
      setEfetivo2Pel(efetivoFiltrado2);

      const efetivoFiltrado3: Efetivo[] = resultado.filter((mike: Efetivo) => mike.equipe === "3º PEL");
      setEfetivo3Pel(efetivoFiltrado3);

      const efetivoFiltrado4: Efetivo[] = resultado.filter((mike: Efetivo) => mike.equipe === "4º PEL");
      setEfetivo4Pel(efetivoFiltrado4);

      
    } 
    fetchData();
  }, []); 
  
  // const Pendencias = funcao.filter((mike)=> )

  return(
    <ScrollView>
      <Botao>EFETIVO SOB SEU COMANDO</Botao>
      <Titulo color="blue.500" alignSelf="center" paddingBottom={1}>{dadosUsuarios.funcao}</Titulo>
      <Titulo color="blue.500" alignSelf="center" paddingBottom={5}>PENDÊNCIAS</Titulo>
      {funcao.map((mike, index) => (
        <Box key={index} >
        <CardEscala nome={`${mike.nome} ${mike.equipe}`}/>
        </Box>
      ))}
    </ScrollView>
  );
}
