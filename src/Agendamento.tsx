import React, { useState,useEffect } from 'react';
import { ScrollView, Box, Button, useToast,Text, Select } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Botao } from './componentes/Botao';
import { agendarFolgas } from './servicos/FolgasServico';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { converterStringParaData } from './utils/conversoes';
import { Titulo } from './componentes/Titulo';
import { EntradaTexto } from './componentes/EntradaTexto';
import { pegarDadosUsuarios } from './servicos/UsuarioServico';
import { Usuario } from './interfaces/Usuario';

export default function Agendamento({ route, navigation }: any) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [grad, setGrad] =  useState('');
  const [re, setRe] =  useState('');
  const [qra, setQra] =  useState('');
  const [motivo, setMotivo] = useState('');
  const [Quantidade, setQuantidade] = useState('')
  const [dadosUsuarios, setDadosUsuarios] = useState({} as Usuario)

  const motivoOpcoes = ["JUNÇÃO DE MEIOS", "DISPENSA DO SERVIÇO", "FOLGA MENSAL", "LUTO", "PATERNIDADE", "NUPCIAS", "OUTROS"];
  const [motivoSelecionado, setMotivoSelecionado] = useState('');


  useEffect(() => {
    async function dadosUsuarios() {
      const mikeId = await AsyncStorage.getItem('mikeId');
      if (!mikeId) return null;
  
      const resultado = await pegarDadosUsuarios(mikeId);
      if (resultado) {
        setDadosUsuarios(resultado);
        setGrad(resultado.grad);  // Mova para dentro do useEffect
        setRe(resultado.re);      // Mova para dentro do useEffect
        setQra(resultado.nome);   // Mova para dentro do useEffect
        console.log(resultado);
      }
    }
  
    dadosUsuarios();
  }, []);
  

  const toast = useToast();

  const onChange = (event: any, selectedDate: any) => {
    setShow(false);     
    if (selectedDate !== null) {  
      const localDate = new Date(selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000);
      setDate(localDate);
      console.log(localDate);
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  
  async function agendar() {
    // const pacienteId = await AsyncStorage.getItem('pacienteId');
    // const { especialistaId } = route.params;

    // if (!pacienteId || !especialistaId || !data) {
    //   toast.show({
    //     title: 'Erro ao agendar consulta',
    //     description: 'Preencha todos os campos',
    //     backgroundColor: 'red.500',
    //   });
    //   return;
    // }

    const dataFormatada = date;

    const resultado = await agendarFolgas(dataFormatada, grad, re, qra, motivo, Quantidade);

    if (resultado) {
      toast.show({
        title: 'Folga agendada com sucesso',
        backgroundColor: 'green.500',
      });
      // navigation.goBack();
    } else {
      toast.show({
        title: 'Erro ao agendar Folga',
        description: 'Horário indisponível',
        backgroundColor: 'red.500',
      });
    }
    console.log(motivoSelecionado, dataFormatada)

  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center', padding: 10 }}>
      {/* O conteúdo do ScrollView */}
      

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
          // onChangeText={setSenha}
        />
        <EntradaTexto
          label="Registro Estatistico"
          placeholder="Insira o RE"
          value={re}
          // onChangeText={setSenha}
        />
        <EntradaTexto
          label="Nome de Guerra"
          placeholder="Insira o QRA"
          value={qra}
          // onChangeText={setSenha}
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
