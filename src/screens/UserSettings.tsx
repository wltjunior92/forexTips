import { Header } from "@components/Header";
import { VStack } from "native-base";


export function UserSettings() {
  return (
    <VStack flex={1}>
      <Header title="Usuário" showBackButton from={'home'} />
    </VStack>
  );
};
