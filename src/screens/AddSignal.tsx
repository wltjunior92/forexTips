import { useState } from "react";
import { ScrollView, VStack, Select as NativeBaseSelect } from "native-base";
import firestore from '@react-native-firebase/firestore';

import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { Select } from "@components/Select";
import { Button } from "@components/Button";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";


export function AddSignal() {
  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState('');
  const [symbol, setSymbol] = useState('');
  const [limit, setLimit] = useState(0);
  const [take1, setTake1] = useState(0);
  const [take2, setTake2] = useState(0);
  const [take3, setTake3] = useState(0);
  const [stopLoss, setStopLoss] = useState(0);

  const navigator = useNavigation<AppNavigatorRoutesProps>();

  async function handleAddSignal() {
    setIsLoading(true)
    firestore()
      .collection('signals')
      .add({
        side: type,
        symbol,
        limit,
        take1,
        take2,
        take3,
        stopLoss,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert('Sinal enviado com sucesso');
        navigator.navigate('home');
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack
        flex={1}
      >
        <Header title="Adicionar sinal" showBackButton from="home" />

        <VStack
          flex={1}
          mx={4}
          pb={16}
        >
          <Select
            label="Tipo"
            bg="gray.800"
            placeholder="ex.: Compra"
            onValueChange={itemValue => setType(itemValue)}
          >
            <NativeBaseSelect.Item label="Compra" value="buy" />
            <NativeBaseSelect.Item label="Venda" value="sell" />
          </Select>
          <Input
            label="Symbol"
            placeholder="ex.: GBPUSD"
            autoCapitalize="characters"
            bg="gray.800"
            onChangeText={setSymbol}
          />
          <Input
            label="Buy stop / Sell limit"
            keyboardType="decimal-pad"
            bg="gray.800"
            onChangeText={value => setLimit(parseFloat(value))}
          />
          <Input
            label="Take 1"
            keyboardType="decimal-pad"
            bg="gray.800"
            onChangeText={value => setTake1(parseFloat(value))}
          />
          <Input
            label="Take 2"
            keyboardType="decimal-pad"
            bg="gray.800"
            onChangeText={value => setTake2(parseFloat(value))}
          />
          <Input
            label="Take 3"
            keyboardType="decimal-pad"
            bg="gray.800"
            onChangeText={value => setTake3(parseFloat(value))}
          />
          <Input
            label="Stop loss"
            keyboardType="decimal-pad"
            bg="gray.800"
            onChangeText={value => setStopLoss(parseFloat(value))}
          />

          <Button
            title="Enviar sinal"
            onPress={handleAddSignal}
            isLoading={isLoading}
          />
        </VStack>
      </VStack>
    </ScrollView>
  );
};
