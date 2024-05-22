import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Principal from "./Principal";
import Explorar from "./Explorar";
import Perfil from "./Perfil";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { pegarDadosUsuarios } from "../servicos/UsuarioServico";
import { Usuario } from "../interfaces/Usuario";
import { useToast } from "native-base";
import { useIsFocused } from "@react-navigation/native";
import Administrador from "./Administrador";


const Tab = createBottomTabNavigator()



const screenOptions = {
  tabBarStyle: {
    backgroundColor: "#002851"
  },
  tabBarActiveTintColor: "#339cff",
  tabBarInactiveTintColor: "#FFF"
}


export default function Tabs() {
  const [mikeId, setMikeId] = useState("");
  const [dadosUsuarios, setDadosUsuarios] = useState({} as Usuario);
  const [forceUpdate, setForceUpdate] = useState(0); 
  const toast = useToast();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchData() {
      const storedMikeId = await AsyncStorage.getItem('mikeId');
  
      console.log(`storedMikeId ${storedMikeId}`);
      if (!storedMikeId) return null;
  
      setMikeId(storedMikeId);
  
      const resultado = await pegarDadosUsuarios(storedMikeId);
      if (resultado) {
        console.log(`dados do usuario ${JSON.stringify(resultado)}`)
        setDadosUsuarios(resultado);
      }
    }
    fetchData();
  }, [isFocused, forceUpdate]);

  let tabs;
  if (
    dadosUsuarios.funcao === "CGP-1" ||
    dadosUsuarios.funcao === "CGP-2" ||
    dadosUsuarios.funcao === "CGP-3" ||
    dadosUsuarios.funcao === "CGP-4"
  ) {
    tabs = [
      {
        name: 'Principal',
        component: Principal,
        icon: 'home'
      },
      // {
      //   name: 'Supervisor',
      //   component: Supervisor,
      //   icon: 'calendar'
      // },
      {
        name: 'Explorar',
        component: Explorar,
        icon: 'search'
      },
      {
        name: 'Perfil',
        component: Perfil,
        icon: 'person'
      },
    ];
  } 
  else{
    if (
      dadosUsuarios.funcao === "ADMINISTRADOR" ||
      dadosUsuarios.funcao === "COMANDANTE" ||
      dadosUsuarios.funcao === "ESCALANTE" ||
      dadosUsuarios.funcao === "ADM"
    ) {
      tabs = [
        {
          name: 'Principal',
          component: Principal,
          icon: 'home'
        },
        {
          name: 'Administrador',
          component: Administrador,
          icon: 'calendar'
        },
        {
          name: 'Explorar',
          component: Explorar,
          icon: 'search'
        },
        {
          name: 'Perfil',
          component: Perfil,
          icon: 'person'
        },
      ];
    } 
    else {
      tabs = [
        {
          name: 'Principal',
          component: Principal,
          icon: 'home'
        },
        // {
        //   name: 'Supervisor',
        //   component: Supervisor,
        //   icon: 'calendar'
        // },
        {
          name: 'Perfil',
          component: Perfil,
          icon: 'person'
        },
      ];
    }

  }

 
  
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={tab.icon} color={color} size={size} />
            )
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
