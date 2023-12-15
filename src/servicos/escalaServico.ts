
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "./api";





export async function pegarEscalasUsuario(re: string) {
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    console.log('Token não encontrado no armazenamento local.');
    return null;
  }

  try {
    const resultado = await api.get(`/escalas/re/${re}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return resultado.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

