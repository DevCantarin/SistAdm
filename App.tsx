import { NativeBaseProvider, StatusBar } from 'native-base';
import { usePushNotifications } from './src/servicos/usarPushNotificações';

import { TEMAS } from './src/estilos/temas';
import Rotas from './src/Rotas';

export default function App() {
  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);
  return (
    <NativeBaseProvider theme={TEMAS}>
      <StatusBar backgroundColor={TEMAS.colors.blue[800]} />
      <Rotas />
    </NativeBaseProvider>
  );
}
