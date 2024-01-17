import React, { useState } from 'react';
import { Text, VStack, Spinner } from 'native-base';
import { Botao } from './Botao';
import { cancelarFolgas } from '../servicos/FolgasServico';
import { Folga } from '../interfaces/Folga';
import { useNavigation } from '@react-navigation/native'; // Importe useNavigation
import { NavigationProps } from '../@types/navigation';

interface CardProps {
  nome: string;
  foto?: string;
  data?: string;
  foiAtendido?: boolean;
  foiAgendado?: boolean;
  onPress?: () => void;
  folga?: Folga;
  funcao?: string
}

export function CardEscala({
  nome,
  data,
  foiAgendado,
  foiAtendido,
  onPress,
  folga,
  funcao
}: CardProps) {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation(); // Use o hook useNavigation para obter a referência de navegação

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
    <VStack w="100%" bg={foiAtendido ? 'blue.100' : 'white'} p="5" borderRadius="lg" shadow="2" mb={5}>
      <VStack flexDir="row">
        <VStack pl="4">
          <Text fontSize="md" bold>{nome}</Text>
          <Text>{data}</Text>
          {funcao && <Text>{funcao}</Text>}
        </VStack>
      </VStack>
      {foiAgendado && (
        <>
          <Botao mt={4} onPress={handleCancelarFolga} disabled={loading}>
            {loading ? <Spinner color="white" size="sm" /> : 'Cancelar'}
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
    </VStack>
  );
}
