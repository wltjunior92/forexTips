import { Button, FormControl, Heading, HStack, Input, Modal, Radio, Text, useTheme } from "native-base";
import { ISignal } from "src/interfaces/ISignal";
import firestore from '@react-native-firebase/firestore';

import TrendUpSvg from '@assets/trendUp.svg';
import TrendDownSvg from '@assets/trendDown.svg';
import { useState } from "react";
import { Alert } from "react-native";
import { postNewSignalNotification } from "@services/notifications";

type Props = {
  selectedSignal: ISignal | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EditSignalModal({ selectedSignal, isOpen, onClose }: Props) {
  const [status, setStatus] = useState('');
  const [result, setResult] = useState('');

  const { colors, sizes } = useTheme();

  async function handleSaveSignalEdition() {
    firestore()
      .collection('signals')
      .doc(selectedSignal?.id)
      .update({
        status,
        result
      })

    onClose();
  }

  function handleResendNotifications() {
    Alert.alert(
      'Sinal',
      'Deseja notificar os usuários novamente?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            postNewSignalNotification(selectedSignal?.symbol || '', parseFloat(selectedSignal?.limit || ''), selectedSignal?.side || '')
          },
        },
      ]
    )
  }

  async function handleDeleteSignal() {
    Alert.alert(
      'Sinal',
      'Deseja realmente excluir esse sinal?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            firestore()
              .collection('signals')
              .doc(selectedSignal?.id)
              .delete();

            onClose();
          },
        },
      ]
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      colorScheme="gray"
    >
      <Modal.Content maxWidth="400px" bg="gray.100">
        <Modal.CloseButton />
        <Modal.Header bg="gray.100">
          <HStack>
            <Heading
              color="gray.800"
              fontSize="md"
              mr={2}
            >
              {selectedSignal?.symbol}
            </Heading>
            {selectedSignal?.side === 'buy' ?
              <TrendUpSvg
                stroke={colors.green[700]}
                strokeWidth='20'
                width={sizes[6]}
                height={sizes[6]}
              /> :
              <TrendDownSvg
                stroke={colors.red[400]}
                strokeWidth='20'
                width={sizes[6]}
                height={sizes[6]}
              />
            }
          </HStack>
        </Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>
              <Text color="gray.500">
                Status do sinal:
              </Text>
            </FormControl.Label>
            <Radio.Group name="status" defaultValue={selectedSignal?.status} onChange={setStatus}>
              <HStack space={2}>
                <Radio value="ativo" size="sm" colorScheme="yellow">Ativo</Radio>
                <Radio value="expirado" size="sm" colorScheme="yellow">Expirado</Radio>
                <Radio value="cancelado" size="sm" colorScheme="yellow">Cancelado</Radio>
              </HStack>
            </Radio.Group>
          </FormControl>

          <FormControl mt={4}>
            <FormControl.Label>
              <Text color="gray.500">
                Resultado:
              </Text>
            </FormControl.Label>
            <Input
              bg="gray.200"
              color="gray.800"
              keyboardType="decimal-pad"
              fontSize="md"
              defaultValue={selectedSignal?.result}
              onChangeText={setResult}
            />
          </FormControl>

          <Button colorScheme="blueGray" onPress={handleResendNotifications} mt={4}>
            Reenviar notificação?
          </Button>
        </Modal.Body>
        <Modal.Footer bg="gray.100">
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="danger" onPress={handleDeleteSignal}>
              Excluir
            </Button>
            <Button onPress={handleSaveSignalEdition}>
              Salvar
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
