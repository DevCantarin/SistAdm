import { useFocusEffect } from "@react-navigation/native";
import { Button, ScrollView, Modal, View, Text, Pressable, Box, Image } from "native-base";
import React, { useEffect, useState } from "react";
import { editarUsuario, pegaTodosUsuarios } from "../servicos/UsuarioServico";
import { CardEscala } from "../componentes/CardEscala";
import { Usuario } from "../interfaces/Usuario";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Folga } from "../interfaces/Folga";
import { pegarTodasAsFolgas } from "../servicos/FolgasServico";
import { NavigationProps } from "../@types/navigation";

export default function Administrador({ navigation }: NavigationProps<'Principal'>) {
  const funcoes = ["ADMINISTRADOR","COMANDANTE", "ESCALANTE", "PJMD", "ADM", "RP", "CGP-1", "CGP-2", "CGP-3", "CGP-4",];

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [folgas, setFolgas] = useState<Folga[]>([])
  const [isModalVisible, setModalVisible] = useState(false);

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
        nome: "Pendencias",
        imagem: require('../../assets/pendencia.png')
    },
    {
      nome: "Administrar",
      imagem: require('../../assets/adm.png')
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
      async function folgaData() {
        const resultado = await pegarTodasAsFolgas();
        console.log(`fogas é ${JSON.stringify(resultado)}`)
        setUsuarios(resultado);
        return resultado.data;
      }
      folgaData();
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
      <View style={estilos.container}>
        <Box style={estilos.div}>
          {icone.map((fig, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate(fig.nome)}>
              <View style={estilos.icone}>
                <Text style={estilos.nomeIcone}>{fig.nome}</Text>
                <Image style={estilos.iconeImagem} source={fig.imagem} alt="Pendencias"/>
              </View>
            </TouchableOpacity>
          ))}
        </Box>
      </View>
    </ScrollView>
  );
}
