import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export async function pegarTodasAsFerias(){
  const token = await AsyncStorage.getItem('token');
  try{
    const ferias = await api.get('/ferias',{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    return ferias.data
  }
  catch(error){
    console.log(error);
    return null;
  }
}


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

export async function avaliaFolgas(folgaId:string, aprovacaoID:string){
  const token = await AsyncStorage.getItem('token');
  console.log('Token:', token);

  if (!token) {
    console.log('Token não encontrado no armazenamento local.');
    return null;
  }
  try {
    const resultado = await api.put(`/folgas/id/${folgaId}`, {

      aprovacao: aprovacaoID,

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

export async function cancelarFolgas(folgaId: string) {
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    console.log('Token não encontrado no armazenamento local.');
    return null;
  }

  try {
    const resultado = await api.delete(`/folgas/id/${folgaId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(resultado.data);
    return resultado.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}



