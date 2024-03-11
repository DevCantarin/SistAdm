import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function  pegaTodoEfetivo (){
    const token = AsyncStorage.getItem('token')
    if (!token) {
        console.log('Token não encontrado no armazenamento local.');
        return null;
    }

    try {
        const resultado = await api.get("/efetivo",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resultado.data
        
    } catch (error) {
        console.log(error);
        return null;
    }
}