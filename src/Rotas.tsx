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
import CadastroPVS from "./Tabs/CadastroPVS";
import PVSVisita from "./Tabs/PVSVisita";
import ESCALA from "./Tabs/ESCALA";
import Comunitaria from "./Tabs/visitaComunitaria";
import Produtividade from "./Tabs/produtividade";
import Mapa from "./Tabs/Mapa";
import Administrador from "./Tabs/Administrador"
import Pendencias from "./Tabs/Pendencias";
import Administrar from "./Tabs/Administrar";


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
        <Tab.Screen 
          name="CadastroPVS" component={CadastroPVS as React.FC} options={{ headerShown: false }}
        /><Tab.Screen 
        name="VisitaPVS" component={PVSVisita as React.FC} options={{ headerShown: false }}
        /><Tab.Screen 
        name="ESCALA" component={ESCALA as React.FC} options={{ headerShown: false }}
      /><Tab.Screen 
      name="Comunitaria" component={Comunitaria as React.FC} options={{ headerShown: false }}
    /><Tab.Screen 
    name="Produtividade" component={Produtividade as React.FC} options={{ headerShown: false }}
  /><Tab.Screen 
  name="Mapa" component={Mapa as React.FC} options={{ headerShown: false }}
/><Tab.Screen 
  name="Administrador" component={Administrador as React.FC} options={{ headerShown: false }}
/><Tab.Screen 
  name="Pendencias" component={Pendencias as React.FC} options={{ headerShown: false }}
/><Tab.Screen 
  name="Administrar" component={Administrar as React.FC} options={{ headerShown: false }}
/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}