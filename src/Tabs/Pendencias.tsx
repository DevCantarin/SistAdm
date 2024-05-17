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


export default function Pendencias({ navigation }: NavigationProps<'Principal'>) {
  const funcoes = ["ADMINISTRADOR","COMANDANTE", "ESCALANTE", "PJMD", "ADM", "RP", "CGP-1", "CGP-2", "CGP-3", "CGP-4",];

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [folgas, setFolgas] = useState<Folga[]>([])
  const [isModalVisible, setModalVisible] = useState(false);
  const [folgasAgendadas, setFolgasAgendadas] = useState<Folga[]>([]);
  const [forceUpdate, setForceUpdate] = useState(0);

  // const handleCancelarFolga = async (folga: Folga) => {
  //   try {
  //     const resultado = await cancelarFolgas(folga.id);
  
  //     if (resultado) {
  //       console.log('Folga cancelada com sucesso');
  
  //       // Log antes da atualização
  //       console.log('folgasAgendadas antes da atualização:', folgasAgendadas);
  
  //       setFolgasAgendadas((prevFolgas) => prevFolgas.filter((f) => f.id !== folga.id));
  
  //       // Log depois da atualização
  //       console.log('folgasAgendadas após da atualização:', folgasAgendadas);
  
  //       setForceUpdate((prev) => prev + 1); // Incrementa 'forceUpdate' para forçar a atualização
  //     } else {
  //       console.log('Erro ao cancelar folga!!!');
  //     }
  //   } catch (error) {
  //     console.error('Erro ao cancelar folga:', error);
  //   }
  // };

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
      // flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: '#fff',
      borderRadius: 10,
      borderColor: 'black',
    },
  
    div: {
      // flex: 1,
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

    

]


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
        try {
          const resultado = await pegarTodasAsFolgas();
          // console.log(`folgas são ${JSON.stringify(resultado)}`);
          
          const folgasPendentes = resultado.filter((folga:Folga) => folga.aprovacao == null);
          console.log(`folgas pendentes é ${JSON.stringify(folgasPendentes)}`)
          setFolgas(folgasPendentes);
          
          // Retorne os dados que deseja utilizar (neste caso, o array de folgas)
          return resultado;
        } catch (error) {
          console.error("Erro ao buscar folgas:", error);
        }
      }
      
      // Chame a função fetchData para buscar as folgas ao focar na tela
      fetchData();
  
      // Não há uma função de limpeza para retornar aqui, pois não há efeitos secundários a limpar
    }, [])
  );
  

  const handleCardPress = (mike: Usuario) => {
    setSelectedUser(mike);
    setModalVisible(true);
  };

  const handleFunctionSelection = (novaFuncao: string) => {
    setModalVisible(false);
    if (selectedUser) {
      // Chame a função para editar o usuário
      console.log('selectedUser:', JSON.stringify(selectedUser, null, 2));
      editarUsuario(selectedUser.id, novaFuncao ).then((resultadoEdicao) => {
        if (resultadoEdicao) {
          // Atualize o estado ou faça qualquer ação necessária após a edição bem-sucedida
          console.log(`Função do usuário ${selectedUser.nome} alterada para ${novaFuncao}`);

          // Atualize o estado de usuários após a edição
          const novosUsuarios = [...usuarios];
          const indexUsuario = novosUsuarios.findIndex((u) => u.re === selectedUser.re);

          if (indexUsuario !== -1) {
            novosUsuarios[indexUsuario] = { ...selectedUser, funcao: novaFuncao };
            setUsuarios(novosUsuarios);
          }
        } else {
          console.log(`Falha ao alterar a função do usuário ${selectedUser.nome}`);
        }
      });
    }
  };

  return (
    <ScrollView p={5}>
      <Titulo>Pendenciais</Titulo>
      <View style={estilos.container}>
      {folgas.length > 0 &&
        folgas.map((folga) => {
          const dataFolga = new Date(folga.data_inicial);
          return (
            <CardEscala
              key={folga.id}
              nome={`${folga?.nome}  ${folga.motivo}`}
              data={converterDataParaString(folga.data_inicial)}
              // foiAtendido
              foiAgendado
              onPress={() => handleAprovaFolga(folga)}
              folga={folga}
            />
          );

        })}
        
      </View>
    </ScrollView>
  );
}
