export function converterStringParaData(dateString: string) {
  // 21/04/2023 15:00
  const [dia, mes, anoEHora] = dateString.split("/");
  const [ano, hora] = anoEHora.split(" ");
  const [horas, minutos] = hora.split(":");

  // Os meses em JavaScript são indexados a partir do 0 (janeiro = 0, fevereiro = 1, etc.)
  const dataConvertida = new Date(Number(ano), Number(mes) - 1, Number(dia), Number(horas), Number(minutos));

  return dataConvertida;
}

export function converterDataParaString(data: string): string {
  const dataFormatada = new Date(data).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
  const [date] = dataFormatada.split(" ")
  return date;
}
