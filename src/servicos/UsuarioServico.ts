import { Usuario } from "../interfaces/Usuario";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "./api";


export async function cadastrarUsuario(usuario: Usuario){
  if(!usuario) return null;

  try {
    const resultado = await api.post('/usuarios', usuario)
    console.log(resultado.data)
    return resultado.data
  }
  catch(error){
    console.log(error)
    return null
  }

}

export async function pegarDadosUsuarios(id: string) {
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    console.log('Token não encontrado no armazenamento local.');
    return null;
  }

  try {
    const resultado = await api.get(`/usuarios/id/${id}`, {
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

export async function pegarConsultasPaciente(id: string){
  try {
    const resultado = await api.get(`/usuario/${id}/consultas`)
    return resultado.data
  }
  catch(error){
    console.log(error)
    return null
  }
}