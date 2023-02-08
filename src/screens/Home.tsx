import { Header } from "@components/Header";
import { SignalCard } from "@components/SignalCard";
import { FlatList, VStack } from "native-base";


export function Home() {
  const cards: Array<'buy' | 'sell'> = ['buy', 'sell', 'sell', 'buy', 'buy', 'sell']
  return (
    <VStack flex={1} px={6} >
      <Header title="Home" />

      <FlatList
        data={cards}
        renderItem={({ item }) => (
          <SignalCard
            type={item}
            pair={'GBPUSD'}
            limit={143.862}
            take1={147.871}
            take2={147.885}
            stopLoss={147.842}
            result={24}
            expired={false}
          />
        )}
        flex={1}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
};
