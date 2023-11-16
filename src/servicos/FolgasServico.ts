import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";



export async function agendarFolgas(data: Date, gradId:string, reId: string, nomeId: string, motivoId:string, quantidadeId:string){
  const token = await AsyncStorage.getItem('token');
  console.log('Token:', token);

  if (!token) {
    console.log('Token não encontrado no armazenamento local.');
    return null;
  }
  try {
    const resultado = await api.post('/folgas', {
      grad: gradId,
      re: reId,
      data_inicial: data,
      nome: nomeId,
      motivo: motivoId,
      quantidade: quantidadeId
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return resultado.data
  }
  catch(error){
    console.log(error);
    return null;
  }
}

export async function cancelarFolgas(consultaId: string){
  try {
    const resultado = await api.delete(`/folgas/${consultaId}`)
    console.log(resultado.data)
    return resultado.data
  }
  catch (error) {
    console.log(error)
    return null
  }
}
