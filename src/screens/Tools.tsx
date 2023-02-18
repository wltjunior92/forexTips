import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { ScreenActions } from "@components/ScreenActions";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { VStack } from "native-base";


export function Tools() {
  const navigator = useNavigation<AppNavigatorRoutesProps>();

  function handleCalculatorPress() {
    navigator.navigate('calculator')
  }
  return (
    <VStack flex={1}>
      <Header title="Ferramentas" />
      <ScreenActions />

      <VStack
        mx={4}
      >
        <Button
          title="Calculadora"
          mb={4}
          onPress={handleCalculatorPress}
        />
      </VStack>
    </VStack>
  );
};
