import api from "./api";



export async function agendarFolgas(data: Date, gradId:string, reId: string, nomeId: string, motivoId:string, quantidadeId:string){
  try {
    const resultado = await api.post('/folgas', {
      grad: gradId,
      re: reId,
      data: data,
      nome: nomeId,
      motivo: motivoId,
      quantidade: quantidadeId
    })
    return resultado.data
  }
  catch(error){
    console.log(error)
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
