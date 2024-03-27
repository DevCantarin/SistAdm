import { Box, ScrollView } from "native-base";

import { useEffect, useState } from "react";
import { NavigationProps } from "./@types/navigation";
import { Usuario } from "./interfaces/Usuario";
import { Efetivo } from "./interfaces/Efetivo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { pegarDadosUsuarios } from "./servicos/UsuarioServico";
import { pegaTodoEfetivo } from "./servicos/EfetivoServico";
import { Botao } from "./componentes/Botao";
import { Titulo } from "./componentes/Titulo";
import { CardEscala } from "./componentes/CardEscala";

export default function Explorar({ navigation }: NavigationProps<'Explorar'>){
  const [dadosUsuarios, setDadosUsuarios] = useState({} as Usuario);
  const [funcao, setFuncao] = useState([] as Efetivo[]);
  const [mikeId, setMikeId] = useState("");
  const [dadosEfetivo, setDadosEfetivo] = useState([] as Efetivo[]); 
  const [efetivo1Pel, setEfetivo1Pel] = useState([] as Efetivo[]);
  const [efetivo2Pel, setEfetivo2Pel] = useState([] as Efetivo[]);
  const [efetivo3Pel, setEfetivo3Pel] = useState([] as Efetivo[]);
  const [efetivo4Pel, setEfetivo4Pel] = useState([] as Efetivo[]);

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
  }, [efetivo1Pel, efetivo2Pel, efetivo3Pel, efetivo4Pel]); // Adicionado efetivo1Pel e efetivo2Pel como dependências

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

  return(
    <ScrollView>
      <Botao>EFETIVO SOB SEU COMANDO</Botao>
      <Titulo color="blue.500" alignSelf="center" paddingBottom={5}>{dadosUsuarios.funcao}</Titulo>
      {funcao.map((mike, index) => (
        <Box key={index} >
        <CardEscala nome={`${mike.nome} ${mike.equipe}`}/>
        </Box>
      ))}
    </ScrollView>
  );
}
