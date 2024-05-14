import { StyleSheet, View,Text,Image,TouchableOpacity } from "react-native"
import { Box, ScrollView, Select } from "native-base"


import { NavigationProps } from '../@types/navigation';
import { Titulo } from "../componentes/Titulo";


const visitas =[
  {
  nome: "Comunitaria",
  imagem: require('../../assets/visitaComunitaria.png')
  },
  {
    nome: "Solidaria",
    imagem: require('../../assets/visitaSolidaria.png')
  },
  {
    nome: "Mapa",
    imagem: require('../../assets/mapa.png')
  }
]

const estilos = StyleSheet.create({
  principal:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue'

  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "space-evenly",
    flexDirection: 'row',
    // flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderRadius: 10,
    // backgroundColor: 'blue'

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




export default function PVSVisita({ navigation }: NavigationProps<'PVS'>){
    

    return(
        <ScrollView>

            <View>
              <Titulo> SistADN</Titulo>
                <View style = {estilos.container}>
                {visitas.map((fig, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate(fig.nome)}>
            <View style ={estilos.container} > 
              <View>
                <Text style={estilos.nomeIcone}>{fig.nome}</Text>
                <Image style={estilos.icone} source={fig.imagem} />
              </View>
            </View>   
          </TouchableOpacity>
        ))}
            </View>
            </View>  

        </ScrollView>
    )
}
