import AsyncStorage from '@react-native-async-storage/async-storage';
import apiSheets from './apiSheets';

export async function pegarEscalasUsuario(re: string) {
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    console.log('Token não encontrado no armazenamento local.');
    return null;
  }

  if (!re) {
    console.log("re Nulo");
    return null;
  }

  try {
    const url = `https://script.google.com/macros/s/AKfycbxnTVnngDBdRdOrUC4nC7C-446RfotrlbmuylPo2LRdqQmGZHUnvURCOYqj-mDAKSo/exec?re=${encodeURIComponent(re)}`;
    const resultado = await apiSheets.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(`Chamando o endpoint: ${url}`);
    console.log("O RE é  escalas" + re);
    console.log(`Resultado é ${JSON.stringify(resultado.data.reornoDaSaida[0])}`);
    console.log(`achou escala`)
    return resultado.data.reornoDaSaida;
  } catch (error) {
    console.log(error);
    return null;
  }
}
