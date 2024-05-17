import { useFocusEffect } from "@react-navigation/native";
import { Button, ScrollView, Modal, View, Text, Pressable, Box, Image } from "native-base";
import React, { useEffect, useState } from "react";
import { editarUsuario, pegaTodosUsuarios } from "../servicos/UsuarioServico";
import { CardEscala } from "../componentes/CardEscala";
import { Usuario } from "../interfaces/Usuario";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Folga } from "../interfaces/Folga";
import { avaliaFolgas, cancelarFolgas, pegarTodasAsFolgas } from "../servicos/FolgasServico";
import { NavigationProps } from "../@types/navigation";
import { Titulo } from "../componentes/Titulo";
import { converterDataParaString } from "../utils/conversoes";
import { EntradaTexto } from "../componentes/EntradaTexto";


export default function Administrar({ navigation }: NavigationProps<'Principal'>) {
  const funcoes = ["ADMINISTRADOR","COMANDANTE", "ESCALANTE", "PJMD", "ADM", "RP", "CGP-1", "CGP-2", "CGP-3", "CGP-4",];

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [folgas, setFolgas] = useState<Folga[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [folgasAgendadas, setFolgasAgendadas] = useState<Folga[]>([]);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mike, setMike] = useState("");
  const [lista, setLista] = useState<Folga[]>([]);

  const handleAprovaFolga = async (folga: Folga) => {
    try {
      const resultado = await avaliaFolgas(folga.id, "SIM");
  
      if (resultado) {
        console.log('FOLGA APROVADA COM SUCESSO');
        setForceUpdate((prev) => prev + 1); // Incrementa 'forceUpdate' para forçar a atualização
      } else {
        console.log('Erro ao aprovar folga!!!');
      }
    } catch (error) {
      console.error('Erro ao aprovar folga:', error);
    }
  };

  const estilos = StyleSheet.create({
    principal: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    container: {
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: '#fff',
      borderRadius: 10,
      borderColor: 'black',
    },
  
    div: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: '#fff',
      borderRadius: 10,
      borderColor: 'black',
    },
  
    elemento: {
      margin: 10,
      borderColor: 'black',
    },
  
    nomeIcone: {
      textAlign: 'center',
      color: 'black',
      fontSize: 10,
      margin: 10,
    },
  
    icone: {
      alignItems: 'center',
    },
  
    iconeImagem: {
      width: 100,
      height: 100,
      margin: 5,
      alignItems: 'center',
      borderColor: 'black',
    },
  
    titulo: {
      margin: 10,
    },
  });

  const icone = [
    {
        nome: "Pendências",
        imagem: require('../../assets/pendencia.png')
    },
  ];

  useFocusEffect(
    React.useCallback(() => {
      async function buscaUsuarios() {
        const resultado = await pegaTodosUsuarios();
        setUsuarios(resultado);
        return resultado.data;
      }
      buscaUsuarios();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        setIsLoading(true);
        try {
          const resultado = await pegarTodasAsFolgas();
          const folgasAtuais = resultado.filter((folga: Folga) => new Date(folga.data_inicial) >= new Date());
          setFolgas(folgasAtuais);
          setLista(folgasAtuais); // Atualiza a lista inicial com todas as folgas
          return resultado;
        } catch (error) {
          console.error("Erro ao buscar folgas:", error);
        } finally {
          setIsLoading(false);
        }
      }
      
      fetchData();
    }, [forceUpdate])
  );

  useEffect(() => {
    // Atualiza o estado lista sempre que mike ou folgas mudarem
    if (mike) {
      setLista(folgas.filter(folga => folga.re.includes(mike)));
    } else {
      setLista(folgas);
    }
  }, [mike, folgas]);

  return (
    <ScrollView p={5}>
      <Titulo>TODAS AS FOLGAS</Titulo>
      <Box>          
        <EntradaTexto
          label="Pesquisa por RE"
          placeholder="Digite o RE do Mike"
          value={mike}
          onChangeText={(itemValue)=>setMike(itemValue)}
        />
      </Box>
      <View style={estilos.container}>
        {lista.length > 0 &&
          lista.map((folga) => {
            const dataFolga = new Date(folga.data_inicial);
            return (
              <CardEscala
                key={folga.id}
                nome={`${folga?.nome}  ${folga.motivo}`}
                data={converterDataParaString(folga.data_inicial)}
                foiAgendado
                onPress={() => handleAprovaFolga(folga)}
                folga={folga}
                status= {folga.aprovacao}
              />
            );
          })
        }
      </View>
    </ScrollView>
  );
}
