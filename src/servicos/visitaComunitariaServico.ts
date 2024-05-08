import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export async function pegaTodasVisitas(){
  const token = await AsyncStorage.getItem('token');
  try{
    const folgas = await api.get('/visitacomunitaria',{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    console.log(folgas.data)
    return folgas.data
  }
  catch(error){
    console.log(error);
    return null;
  }
}



export async function cadastarVisita(visitado: string, encarregado: string, novidades: string){
  const token = await AsyncStorage.getItem('token');
  console.log('Token:', token);

  if (!token) {
    console.log('Token não encontrado no armazenamento local.');
    return null;
  }
  try {
    const resultado = await api.post('/visitacomunitaria', {
      visitado: visitado,
      encarregado: encarregado,
      novidades: novidades
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

export async function pegaVisitaPorRe(re: string) {
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    console.log('Token não encontrado no armazenamento local.');
    return null;
  }

  try {
    const resultado = await api.get(`/visitacomunitaria/encarregado/${re}`, {
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


