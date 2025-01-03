import React, { useState, useEffect } from 'react';
import { ScrollView, Box, Button, useToast, Text, Select } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Botao } from './componentes/Botao';
import { agendarFolgas, pegarFolgasUsuario } from './servicos/FolgasServico';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Titulo } from './componentes/Titulo';
import { EntradaTexto } from './componentes/EntradaTexto';
import { pegarDadosUsuarios } from './servicos/UsuarioServico';
import { useFocusEffect } from '@react-navigation/native';
import { Usuario } from './interfaces/Usuario';
import { Folga } from './interfaces/Folga';

export default function Agendamento({ route, navigation }: any) {
  const [dadosUsuarios, setDadosUsuarios] = useState({} as Usuario);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [grad, setGrad] = useState('');
  const [re, setRe] = useState('');
  const [qra, setQra] = useState('');
  const [motivo, setMotivo] = useState('');
  const [Quantidade, setQuantidade] = useState('')
  const [motivoTratado, setMotivoTratado] = useState('')
  const [folgasAgendadas, setFolgasAgendadas] = useState<Folga[]>([])
  const [folgasAgendadasDoMes, setfolgasAgendadasDoMes] = useState<Folga[]>([])

  const motivoOpcoes = ["JUNÇÃO DE MEIOS", "DISPENSA DO SERVIÇO", "FOLGA MENSAL", "LUTO", "PATERNIDADE", "NUPCIAS", "OUTROS"];
  const [motivoSelecionado, setMotivoSelecionado] = useState('');

  

  useEffect(() => {
    async function dadosUsuarios() {
      const mikeId = await AsyncStorage.getItem('mikeId');
      if (!mikeId) return null;

      const resultadoMike = await pegarDadosUsuarios(mikeId);
      if (resultadoMike) {
        setDadosUsuarios(resultadoMike);
        setGrad(resultadoMike.grad);
        setRe(`${resultadoMike.re}-${resultadoMike.dig}`);
        setQra(resultadoMike.nome);
        setLoading(false);
      }
    }

    dadosUsuarios();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      async function folgaData() {
        const resultado = await pegarFolgasUsuario(`${dadosUsuarios.re}-${dadosUsuarios.dig}`);
        if (resultado) {
          setFolgasAgendadas(resultado);
          
        }
      }
      folgaData();
    }, [dadosUsuarios.re, dadosUsuarios.dig])
  );

  const toast = useToast();

  const onChange = (event: any, selectedDate: any) => {
    setShow(false);
    if (selectedDate !== null) {
      const localDate = new Date(selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000);
      setDate(localDate);
      
      const folgasDoMes = folgasAgendadas.filter((folga) => {
        const dataFolga = new Date(folga.DATA);
        console.log(dataFolga)
        console.log(`dataFolga.getMonth() é ${dataFolga.getMonth()}`)
        console.log(`date.getMonth() é ${date.getMonth()}`)

        return dataFolga.getMonth() === date.getMonth();
      });
      setfolgasAgendadasDoMes(folgasDoMes)

    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  useEffect(() => {
    setMotivoTratado(motivoSelecionado === "OUTROS" ? motivo : motivoSelecionado);
  }, [motivo, motivoSelecionado]);

  async function agendar() {
    if (isNaN(parseFloat(Quantidade))) {
      toast.show({
        title: 'Erro ao agendar consulta',
        description: 'A quantidade deve ser um número válido',
        backgroundColor: 'red.500',
      });
      return;
    }

    if (date.setDate(date.getDate()) <= new Date().setDate(new Date().getDate() + 4)) {
      toast.show({
        title: 'Quem vive de passado é museu!!!!',
        description: 'Stive, as Folgas devem ser agendas com ao menos 5 dias de antecedência!!!',
        backgroundColor: 'red.500',
      });
      console.log(`${date.setDate(date.getDate())} <= ${new Date().setDate(new Date().getDate() + 4)}`)
      return;
    }

    const folgasMensaisNoMes = folgasAgendadasDoMes.filter((folga) => folga.MOTIVO === 'FOLGA MENSAL' && new Date(folga.DATA).getMonth() === date.getMonth());
    console.log(`o valor de date é ${date}`)
    console.log(`o valor de date.getMonth é ${date.getMonth()}`)

    console.log(`folgaMensaisNoMes eh ${ JSON.stringify(folgasMensaisNoMes) }`)
    console.log(`folgasAgendadasDoMes eh ${ JSON.stringify(folgasAgendadasDoMes) }`)
    console.log(`folgasAgendadasDoMes.length: ${folgasAgendadasDoMes.length}`)
    if (folgasMensaisNoMes.length >= 2  && motivoSelecionado === 'FOLGA MENSAL' ) {
      toast.show({
        title: 'Duplicidade',
        description: 'Você só pode agendar uma folga mensal por mês',
        backgroundColor: 'red.500',
      });
      console.log("pq esta dando esse erro?")
      return;
    }

    if (!date || !grad || !re || !qra || !motivoTratado || !Quantidade) {
      toast.show({
        title: 'Erro ao agendar consulta',
        description: 'Preencha todos os campos',
        backgroundColor: 'red.500',
      });
      return;
    }

    try {
      const resultado = await agendarFolgas(date, grad, re, qra, motivoTratado, Quantidade);
      if (resultado) {
        toast.show({
          title: 'Folga agendada com sucesso',
          backgroundColor: 'green.500',
        });
        navigation.goBack();
      } else {
        toast.show({
          title: 'Erro ao agendar Folga',
          description: 'Horário indisponível',
          backgroundColor: 'red.500',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center', padding: 10 }}>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <Titulo marginBottom={50} fontWeight={'black'}>Agendamento de Folgas</Titulo>
      <Button onPress={showDatepicker} marginBottom={2}>Dia da Folga</Button>
      <Text fontSize={'lg'} >{date.toLocaleDateString('pt-BR')}</Text>
      <Box>
        <EntradaTexto
          label="Posto ou Graduação"
          placeholder="Insira seu Posto ou Graduação"
          value={grad}
        />
        <EntradaTexto
          label="Registro Estatistico"
          placeholder="Insira o RE"
          value={re}
        />
        <EntradaTexto
          label="Nome de Guerra"
          placeholder="Insira o QRA"
          value={qra}
        />
        <EntradaTexto
          label="Quantidade"
          placeholder="Quantos dias de Afastamento"
          value={Quantidade}
          onChangeText={setQuantidade}
        />
        <Select
          marginTop={10}
          selectedValue={motivoSelecionado}
          minWidth={200}
          accessibilityLabel="Selecione o Motivo"
          placeholder="Selecione o Motivo"
          onValueChange={(itemValue) => setMotivoSelecionado(itemValue)}
        >
          {motivoOpcoes.map((opcao, index) => (
            <Select.Item key={index} label={opcao} value={opcao} />
          ))}
        </Select>
        {motivoSelecionado === "OUTROS" && (
          <EntradaTexto
            label="Outro Motivo"
            placeholder="Insira outro Motivo"
            value={motivo}
            onChangeText={setMotivo}
          />
        )}
      </Box>
      <Botao onPress={agendar}>Agendar</Botao>
    </ScrollView>
  );
}
