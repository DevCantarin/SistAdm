import { NativeBaseProvider, StatusBar } from 'native-base';
import { usePushNotifications } from './src/servicos/usarPushNotificações';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

import { TEMAS } from './src/estilos/temas';
import Rotas from './src/Rotas';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldShowAlert: true,
    shouldSetBadge: true,
  })
});

export default function App() {
  async function handleCallNotification() {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      alert("É necessário permissão para notificações");
      return;
    }
    const tokenData = await Notifications.getExpoPushTokenAsync(); 
    const token = tokenData.data;
    console.log(token);
  }

  useEffect(() => {
    handleCallNotification();
  }, []);

  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);

  return (
    <NativeBaseProvider theme={TEMAS}>
      <StatusBar backgroundColor={TEMAS.colors.blue[800]} />
      <Rotas />
    </NativeBaseProvider>
  );
}
