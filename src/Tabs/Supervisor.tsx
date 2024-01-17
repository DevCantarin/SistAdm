import { useFocusEffect } from "@react-navigation/native";
import { Button, ScrollView, Modal, View, Text, Pressable } from "native-base";
import React, { useEffect, useState } from "react";
import { editarUsuario, pegaTodosUsuarios } from "../servicos/UsuarioServico";
import { CardEscala } from "../componentes/CardEscala";
import { Usuario } from "../interfaces/Usuario";
import { TouchableOpacity } from "react-native";

export default function Supervisor() {
  const funcoes = ["ADMINISTRADOR","COMANDANTE", "ESCALANTE", "PJMD", "ADM", "RP", "CGP-1", "CGP-2", "CGP-3", "CGP-4",];

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      async function folgaData() {
        const resultado = await pegaTodosUsuarios();
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
      {usuarios &&
        usuarios.map((mike) => (
          <TouchableOpacity key={mike.re} onPress={() => handleCardPress(mike)}>
            <CardEscala nome={mike.nome} funcao={mike.funcao} />
          </TouchableOpacity>
        ))}

      <Modal isOpen={isModalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Escolha a nova função</Modal.Header>
          <Modal.Body>
            {funcoes.map((funcao) => (
              <Pressable key={funcao} onPress={() => handleFunctionSelection(funcao)}>
                <Text>{funcao}</Text>
              </Pressable>
            ))}
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </ScrollView>
  );
}
