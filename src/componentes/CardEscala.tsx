import React, { useState } from 'react';
import { Text, VStack, Spinner, Center } from 'native-base';
import { Botao } from './Botao';
import { avaliaFolgas, cancelarFolgas } from '../servicos/FolgasServico';
import { Folga } from '../interfaces/Folga';
import { useNavigation } from '@react-navigation/native'; // Importe useNavigation
import { NavigationProps } from '../@types/navigation';

interface CardProps {
  nome: string;
  foto?: string;
  data?: string;
  status?: string;
  foiPedido?: boolean;
  foiAtendido?: boolean;
  foiAgendado?: boolean;
  foiNegado?: boolean;
  onPress?: () => void;
  folga?: Folga;
  funcao?: string
}

export function CardEscala({
  nome,
  data,
  status,
  foiPedido,
  foiAgendado,
  foiAtendido,
  foiNegado,
  onPress,
  folga,
  funcao
}: CardProps) {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation(); // Use o hook useNavigation para obter a referência de navegação


  const handleAprovaFolga = async () => {
    setSuccessMessage('');
    setErrorMessage('');

    try {
      setLoading(true);
      const resultado = await avaliaFolgas(folga?.id || '', "SIM");
      console.log(`folga.id eh ${folga?.id}`)
      

      if (resultado) {
        setSuccessMessage('Folga APROVADA com sucesso');


      } else {
        setErrorMessage('Erro ao APROVAR folga');
      }
    } catch (error) {
      console.error('Erro ao APROVAR folga:', error);
      setErrorMessage('Erro ao APROVAR folga. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleReprovaFolga = async () => {
    setSuccessMessage('');
    setErrorMessage('');

    try {
      setLoading(true);
      const resultado = await avaliaFolgas(folga?.id || '', "NÃO");
      console.log(`folga.id eh ${folga?.id}`)
      

      if (resultado) {
        setSuccessMessage('Folga REPROVADA com sucesso');


      } else {
        setErrorMessage('Erro ao REPORVAR folga');
      }
    } catch (error) {
      console.error('Erro ao REPORVAR folga:', error);
      setErrorMessage('Erro ao REPORVAR folga. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelarFolga = async () => {
    setSuccessMessage('');
    setErrorMessage('');

    try {
      setLoading(true);
      const resultado = await cancelarFolgas(folga?.id || '');

      if (resultado) {
        setSuccessMessage('Folga cancelada com sucesso');


      } else {
        setErrorMessage('Erro ao cancelar folga');
      }
    } catch (error) {
      console.error('Erro ao cancelar folga:', error);
      setErrorMessage('Erro ao cancelar folga. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack w="100%" bg={
      foiAtendido ? 'green.500' :
      foiAgendado ? 'yellow.500' :
      foiNegado ? 'red.500' :
      foiPedido? 'blue.300':
      'white'
    } p="5" borderRadius="lg" shadow="2" mb={5}>
      <VStack flexDir="row">
        <VStack pl="4">
          <Text fontSize="md" bold>{nome}</Text>
          <Text>{data}</Text>
          <Text bold>{status}</Text>
          {funcao && <Text>{funcao}</Text>}
        </VStack>
      </VStack>
      {foiAgendado && (
        <>
          <Botao mt={4} onPress={handleAprovaFolga} disabled={loading}>
            {loading ? <Spinner color="white" size="sm" /> : 'Aprovar'}
          </Botao>
          <Botao mt={4} onPress={handleReprovaFolga} disabled={loading}>
            {loading ? <Spinner color="white" size="sm" /> : 'Negar'}
          </Botao>
          {successMessage && (
            <Text mt={2} color="green.500">
              {successMessage}
            </Text>
          )}
          {errorMessage && (
            <Text mt={2} color="red.500">
              {errorMessage}
            </Text>
          )}
        </>
      )}
      {foiPedido && (
        <>
          <Botao mt={4} onPress={handleCancelarFolga} disabled={loading}>
            {loading ? <Spinner color="white" size="sm" /> : 'Cancela'}
          </Botao>
          {successMessage && (
            <Text mt={2} color="green.500">
              {successMessage}
            </Text>
          )}
          {errorMessage && (
            <Text mt={2} color="red.500">
              {errorMessage}
            </Text>
          )}
        </>
      )
      
      
      }
    </VStack>
  );
}
