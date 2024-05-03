import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export async function pegaTodasAsResidencias(){
  const token = await AsyncStorage.getItem('token');
  try{
    const folgas = await api.get('/pvsComercial',{
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



export async function cadastrarComercial(regiao: string, termo: string, opm: string, nome:string, cep:string, endereco: string, numero:string, telefone:string, proprietario:string, nascimento:string, rg:string,  telefoneproprietario:string, re:string,){
  const token = await AsyncStorage.getItem('token');
  console.log('Token:', token);

  if (!token) {
    console.log('Token não encontrado no armazenamento local.');
    return null;
  }
  try {
    const resultado = await api.post('/pvscomercial', {
      regiao: regiao,
      termo: termo,
      opm: opm,
      nome: nome,
      cep: cep,
      numero: numero,
      endereco: endereco,
      proprietario: proprietario,
      nascimento: nascimento,
      rg: rg,
      re: re,
      telefone: telefone,
      telefoneproprietario: telefoneproprietario
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



