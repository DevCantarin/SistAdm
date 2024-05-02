import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const Tab = createNativeStackNavigator();

import Cadastro from "./Cadastro";
import Login from "./Login";
import Tabs from "./Tabs";
import Agendamento from "./Agendamento";
import PVS from "./Tabs/PVS"
import PVSCadastroResidencial from "./Tabs/PVVCadastramentoResidencial";
import PVSCadstroComercial from "./Tabs/PVVCadastramentoComercial"
import PVSCadastroEscolar from "./Tabs/PVVCadastramentoEscolar";

export default function Rotas(){
  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Login" component={Login as React.FC} options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="Cadastro" component={Cadastro as React.FC} options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="Tabs" component={Tabs as React.FC} options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="Agendamento" component={Agendamento as React.FC} options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="PVS" component={PVS as React.FC} options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="Residencial" component={PVSCadastroResidencial as React.FC} options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="Comercial" component={PVSCadstroComercial as React.FC} options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="Escolar" component={PVSCadastroEscolar as React.FC} options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}