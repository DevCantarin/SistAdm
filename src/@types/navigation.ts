import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


export type ListaTelas = {
  Login: undefined;
  Cadastro: undefined;
  Perfil: undefined;
  Explorar: undefined;
  Escalas: undefined;
  Principal: undefined;
  Tabs: undefined;
  Agendamento: undefined;
  PVS:undefined
  ESCALA:undefined
  
}

export type NavigationProps< T extends keyof ListaTelas > = {
  navigation: NativeStackNavigationProp<ListaTelas, T>;
  route: RouteProp<ListaTelas, T>
}