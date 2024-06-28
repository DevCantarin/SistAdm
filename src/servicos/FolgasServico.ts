import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";
import apiDispensas from "./apiDispensass";

export async function pegarTodasAsFolgas(){
  const token = await AsyncStorage.getItem('token');
  try{
    const folgas = await apiDispensas.get("https://script.google.com/macros/s/AKfycbyLyLYwfc_PJSh9x3vJcgtCiB2271w2QLd-r55t53XMI3N4zZKGo8MCDIMkoVbxqEI/exec?",{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    return folgas.data.saida
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
    const resultado = await api.post('https://script.google.com/macros/s/AKfycbx14ryxxPommBuT-JlF0PjfX2rMCIYiuPMtCy1wm_EKBQUU1w0KBHhdr4dPdzrtMeM/exec', {
      GRAD: gradId,
      RE: reId,
      DATA: data,
      NOME: nomeId,
      MOTIVO: motivoId,
      QUANTIDADE: quantidadeId
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


export async function pegarFolgasUsuario(re: string) {
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
    const url = `https://script.google.com/macros/s/AKfycbyLyLYwfc_PJSh9x3vJcgtCiB2271w2QLd-r55t53XMI3N4zZKGo8MCDIMkoVbxqEI/exec?re=${encodeURIComponent(re)}`;
    const resultado = await apiDispensas.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // console.log(`Chamando o endpoint DE FOLGA: ${url}`);
    // console.log("O RE é " + re);
    // console.log(`Resultado é DISPENSAS ${JSON.stringify(resultado.data.reornoDaSaida[0])}`);
    return resultado.data.reornoDaSaida;
  } catch (error) {
    console.log(error);
    return null;
  }
}


