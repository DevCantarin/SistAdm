import { VStack, Box, ScrollView, Text } from "native-base";
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
import { converterDataParaString } from "../utils/conversoes";
import { getDate } from "date-fns";

export default function DISPENSAS({ navigation }: NavigationProps<'Explorar'>){
  const [dadosUsuarios, setDadosUsuarios] = useState({} as Usuario);
  const [funcao, setFuncao] = useState([] as Efetivo[]);
  const [mikeId, setMikeId] = useState("");
  const [dadosEfetivo, setDadosEfetivo] = useState([] as Efetivo[]); 
  const [efetivo1Pel, setEfetivo1Pel] = useState([] as Efetivo[]);
  const [efetivo2Pel, setEfetivo2Pel] = useState([] as Efetivo[]);
  const [efetivo3Pel, setEfetivo3Pel] = useState([] as Efetivo[]);
  const [efetivo4Pel, setEfetivo4Pel] = useState([] as Efetivo[]);
  const [todoEfetivo, setTodoEfetivo] = useState([] as Efetivo[]);
  const [folga, setFolga] = useState([] as Folga[]);
  const [folgasFiltradas, setFolgasFiltradas] = useState([] as Folga[]);
  const [listaREs, setListaREs] = useState([] as string[]);
  const [mike, setMike] = useState("");
  const [lista, setLista] = useState<Folga[]>([]);
  const [dataInicial, setdDataInicial] = useState(new Date())
  const [dataFinal, setdDataFinal] = useState(new Date())


  useFocusEffect(
    React.useCallback(() => {
      async function folgaData() {
        try {
          const resultado = await pegarTodasAsFolgas();
          setFolga(resultado);
        } catch (error) {
          console.error("Erro ao pegar as folgas:", error);
        }
      }
      folgaData();
    }, [dadosUsuarios.re, dadosUsuarios.dig])
  );

  useEffect(() => {
    async function fetchData() {
      const storedMikeId = await AsyncStorage.getItem('mikeId');
      if (!storedMikeId) return;

      setMikeId(storedMikeId);

      const resultado = await pegarDadosUsuarios(storedMikeId);
      if (resultado) {
        setDadosUsuarios(resultado);

        if (resultado.funcao === "CGP-1") {
          setFuncao(efetivo1Pel);
          const rePelotao = efetivo1Pel.map(mike => `${mike.re}-${mike.dig}`);
          setListaREs(rePelotao);
        } else if (resultado.funcao === "CGP-2") {
          setFuncao(efetivo2Pel);
          const rePelotao = efetivo2Pel.map(mike => `${mike.re}-${mike.dig}`);
          setListaREs(rePelotao);
        } else if (resultado.funcao === "CGP-3") {
          setFuncao(efetivo3Pel);
          const rePelotao = efetivo3Pel.map(mike => `${mike.re}-${mike.dig}`);
          setListaREs(rePelotao);
        } else if (resultado.funcao === "CGP-4") {
          setFuncao(efetivo4Pel);
          const rePelotao = efetivo4Pel.map(mike => `${mike.re}-${mike.dig}`);
          setListaREs(rePelotao);
        }
        else if (resultado.funcao === "ADMINISTRADOR") {
          setFuncao(todoEfetivo);
          const rePelotao = todoEfetivo.map(mike => `${mike.re}-${mike.dig}`);
          setListaREs(rePelotao);      
        }
      }
    }
    fetchData();
  }, [efetivo1Pel, efetivo2Pel, efetivo3Pel, efetivo4Pel, todoEfetivo]);

  useEffect(() => {
    async function fetchData() {
      const resultado = await pegaTodoEfetivo();
      if (!resultado) {
        console.log("Dados do efetivo não localizados");
        return;
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

      const todoEfetivo: Efetivo[] = resultado.filter((mike: Efetivo) => mike.equipe  !="");
      setTodoEfetivo(todoEfetivo);
    }
    fetchData();
  }, []); 

  useEffect(() => {
    // Filtra as folgas cujos REs estejam na lista fornecida
    const folgasFiltradas = folga.filter(f => listaREs.includes(f.re));
    setFolgasFiltradas(folgasFiltradas);
  }, [folga, listaREs]);


    useEffect(() => {
    // Atualiza o estado lista sempre que mike ou folgas mudarem
    if (mike) {
      setLista(folgasFiltradas.filter(folga => folga.re.includes(mike)));
    } else {
      setLista(folgasFiltradas);
    }
  }, [mike, folgasFiltradas]);

  return (
    <ScrollView>
      <Botao>EFETIVO SOB SEU COMANDO</Botao>
      <Titulo color="blue.500" alignSelf="center" paddingBottom={1}>{dadosUsuarios.funcao}</Titulo>
      <Titulo color="blue.500" alignSelf="center" paddingBottom={5}>FOLGAS DO SEU PELOTÃO</Titulo>
      <Box>          
        <EntradaTexto
          label="Pesquisa por RE"
          placeholder="Digite o RE do Mike"
          value={mike}
          onChangeText={(itemValue)=>setMike(itemValue)}
        />
      </Box>
      <Box>          
      
      </Box>

      {lista.length === 0 ? (
        <Box alignSelf="center" padding={5}>
          <Titulo color="red.500">AGUARDE O CARREGAMENTO</Titulo>
        </Box>
        
      ) : (
        lista.map((folga, index) => (
          <Box key={index}>
            <CardEscala
              key={folga.id}
              nome={` ${folga.grad} ${folga.re} ${folga.nome}  ${folga.motivo}`}
              data={converterDataParaString(folga.data_inicial)}
              status={`${folga.aprovacao === "SIM" ? "FOLGA APROVADA" : folga.aprovacao === "NÃO" ? "FOLGA REPROVADA" : ""}`}
              foiAtendido={folga.aprovacao === "SIM"}
              foiNegado={folga.aprovacao === "NÃO"}
              foiPedido={folga.aprovacao == null}
              folga={folga}
            />
          </Box>
        ))
      )}
    </ScrollView>
  );
}
