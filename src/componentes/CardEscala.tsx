import { Text, Avatar, VStack } from 'native-base'
import { Botao } from './Botao'

interface CardProps {
  nome: string;
  foto?: string;
  data?: string;
  foiAtendido?: boolean;
  foiAgendado?: boolean;
  onPress?: () => void;
}

export function CardEscala({
  nome,
  data,
  foiAgendado,
  foiAtendido,
  onPress
}: CardProps){
  return(
    <VStack w="100%" bg={foiAtendido ? 'blue.100': 'white'} p="5" borderRadius="lg" shadow="2" mb={5}>
      <VStack flexDir="row">
        <VStack pl="4">
          <Text fontSize="md" bold>{nome}</Text>
          <Text>{data}</Text>
        </VStack>
      </VStack>
      {/* <Botao mt={4} onPress={onPress}>
        {foiAgendado ? 'Cancelar' : ''}
      </Botao> */}
    </VStack>
  )
}