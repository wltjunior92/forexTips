import { useEffect, useState } from 'react';
import { ScrollView, Select as NativeBaseSelect, VStack } from "native-base";
import { setStringAsync } from 'expo-clipboard';

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Select } from "@components/Select";
import { Input } from '@components/Input';


export function Calculator() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [tamanhoConta, setTamanhoConta] = useState('');
  const [riscoRetorno, setRiscoRetorno] = useState('');
  const [stopLoss, setStopLoss] = useState('');

  const [stopLossFinanceiro, setStopLossFinanceiro] = useState('');
  const [tamanhoPosicao, setTamanhoPosicao] = useState('');

  useEffect(() => {
    if (tamanhoConta !== '' && riscoRetorno !== '' && stopLoss !== '') {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [tamanhoConta, riscoRetorno, stopLoss]);

  function handleCalc() {
    const stopFinanceiro = parseFloat(tamanhoConta) * (parseFloat(riscoRetorno) / 100);
    const posicao = stopFinanceiro / parseFloat(stopLoss);
    setStopLossFinanceiro(`$${stopFinanceiro.toFixed(2)}`);
    setTamanhoPosicao(`${posicao.toFixed(2)}`);
  }

  function handleCopy() {
    setStringAsync(tamanhoPosicao);
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack
        flex={1}
      >
        <Header title="Calculadora" showBackButton from="tools" />

        <VStack
          flex={1}
          mx={4}
          pb={16}
        >
          <Input
            label="Tamanho da conta ($)"
            placeholder="Capital disponível"
            keyboardType="decimal-pad"
            bg="gray.800"
            onChangeText={setTamanhoConta}
          />
          <Select
            label="Risco retorno"
            bg="gray.800"
            placeholder="Selecione a porcentagem"
            onValueChange={itemValue => setRiscoRetorno(itemValue)}
          >
            <NativeBaseSelect.Item label="1%" value="1" />
            <NativeBaseSelect.Item label="3%" value="3" />
            <NativeBaseSelect.Item label="5%" value="5" />
            <NativeBaseSelect.Item label="10%" value="10" />
          </Select>
          <Input
            label="Stop loss"
            placeholder="Pontos de stop loss"
            keyboardType="decimal-pad"
            bg="gray.800"
            onChangeText={setStopLoss}
          />
          <Input
            label="Stop loss financeiro"
            placeholder="Calcule para exibir"
            keyboardType="decimal-pad"
            bg="gray.800"
            defaultValue={stopLossFinanceiro}
            isReadOnly
          />
          <Input
            label="Tamanho da posição"
            placeholder="Calcule para exibir"
            keyboardType="decimal-pad"
            bg="gray.800"
            defaultValue={tamanhoPosicao}
            handlePress={handleCopy}
            isReadOnly
          />
          <Button
            title="Calcular"
            isDisabled={isDisabled}
            onPress={handleCalc}
          />
        </VStack>
      </VStack>
    </ScrollView>
  );
};
