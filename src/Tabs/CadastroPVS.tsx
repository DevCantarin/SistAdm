import { StyleSheet, View,Text,Image,TouchableOpacity } from "react-native"
import { Box, ScrollView, Select } from "native-base"

import { iconeTipoPVS } from "../componentes/iconeTipoPVS"
import { NavigationProps } from '../@types/navigation';


const estilos = StyleSheet.create({
    principal:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      // backgroundColor: 'blue'
  
    },
  
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: '#fff',
      borderRadius: 10
  
    },
  
    elemento:{
      margin: 10
  
    },
  
    nomeIcone:{
      textAlign: 'center',
      color:'black',
      fontSize: 10,
      margin:10
    },
    icone:{
      width: 100,
      height: 100,
      margin: 5,
      alignItems: 'center'
  
    },
    titulo:{
      margin: 10,
      
    }
  
    
  
  })




export default function CadastroPVS({ navigation }: NavigationProps<'PVS'>){


    return(
        <ScrollView p="5" contentContainerStyle={estilos.principal}>
            <View style = {estilos.container}>
                {iconeTipoPVS.map((fig, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate(fig.nome)}>
            <View> 
              <Text style={estilos.nomeIcone}>{fig.nome}</Text>
              <Image style={estilos.icone} source={fig.imagem} />
            </View>   
          </TouchableOpacity>
        ))}
            </View>  

        </ScrollView>
    )
}
