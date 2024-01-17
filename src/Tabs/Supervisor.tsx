import { useFocusEffect } from "@react-navigation/native";
import { Button, ScrollView } from "native-base"
import React, { useEffect, useState } from "react"
import { Text } from "react-native-svg"
import { pegaTodosUsuarios } from "../servicos/UsuarioServico";
import { CardEscala } from "../componentes/CardEscala";
import { Usuario } from "../interfaces/Usuario";

export default function Supervisor(){ 

  const [usuarios, setUsuarios] =  useState<Usuario[]>([])


  useFocusEffect(
    React.useCallback(() => {
      async function folgaData() {
        const resultado = await pegaTodosUsuarios();
        setUsuarios (resultado)
        console.log(usuarios)
        return resultado.data
      }
      folgaData();
    }, [])
  );
  

  return(
    <ScrollView p={5}>
      {usuarios && usuarios.map((mike)=>{
        return(
          <CardEscala
            nome={mike.nome}
          />
        )
      })
        
      }
    </ScrollView>
   )
}