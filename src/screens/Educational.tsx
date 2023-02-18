import { Header } from "@components/Header";
import { ScreenActions } from "@components/ScreenActions";
import { VStack } from "native-base";


export function Educational() {
  return (
    <VStack flex={1}>
      <Header title="Estudos" />
      <ScreenActions />
    </VStack>
  );
};
