import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export async function pegaTodasAsResidencias(){
  const token = await AsyncStorage.getItem('token');
  try{
    const folgas = await api.get('/pvsresidencial',{
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


export async function cadastrarResidencia(regiao: string, termo: string, opm: string, endereco: string, numero:string, complemento:string, morador:string, rg:string, re:string, telefone:string){
  const token = await AsyncStorage.getItem('token');
  console.log('Token:', token);

  if (!token) {
    console.log('Token não encontrado no armazenamento local.');
    return null;
  }
  try {
    const resultado = await api.post('/pvsresidencial', {
      regiao: regiao,
      termo: termo,
      opm: opm,
      numero: numero,
      endereco: endereco,
      complemento: complemento,
      morador: morador,
      rg: rg,
      encarregado: re,
      telefone: telefone
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

export async function pegaResisdenciaPorID(id: string) {
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    console.log('Token não encontrado no armazenamento local.');
    return null;
  }

  try {
    const resultado = await api.get(`/pvsresidencial/id/${id}`, {
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

export async function atualizaTutorResidencia(residenciaID:string, termoNovo:string){
  const token = await AsyncStorage.getItem('token');
  console.log('Token:', token);

  if (!token) {
    console.log('Token não encontrado no armazenamento local.');
    return null;
  }
  try {
    const resultado = await api.put(`/folgas/id/${residenciaID}`, {

      termo: termoNovo,

    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`o residenciaID novo é ${residenciaID}`)
    console.log(`o termo novo é ${termoNovo}`)
    console.log(`Tutor Alterado`)
    return resultado.data

  }
  catch(error){
    console.log(error);
    return null;
  }
}



