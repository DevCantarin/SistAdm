import { Image} from "native-base";
import { StyleSheet } from 'react-native';
const estilos = StyleSheet.create({
  cabecalho:{
    width: "100%",
    height: 200,
    borderColor: "black", // Cor da borda
    borderWidth: 2
  }
}
)

export function CabecalhoPVS() {
  return (
    <>
      <Image style={estilos.cabecalho} alt="logo da Vizinhança Solidária" source={require("../../assets/pvs.png")} />
    </>
  );
}
