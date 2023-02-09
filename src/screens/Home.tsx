import { Header } from "@components/Header";
import { SignalCard, SignalCardProps } from "@components/SignalCard";
import { FlatList, VStack } from "native-base";



const tips: SignalCardProps[] = [
  {
    type: 'buy',
    pair: 'GBPUSD',
    limit: 143.862,
    take1: 147.871,
    take2: 147.885,
    stopLoss: 147.842,
    expired: false
  },
  {
    type: 'sell',
    pair: 'GBPUSD',
    limit: 143.862,
    take1: 147.871,
    take2: 147.885,
    stopLoss: 147.842,
    expired: false
  },
  {
    type: 'sell',
    pair: 'GBPUSD',
    limit: 143.862,
    take1: 147.871,
    take2: 147.885,
    stopLoss: 147.842,
    result: -14,
    expired: true
  },
  {
    type: 'buy',
    pair: 'GBPUSD',
    limit: 143.862,
    take1: 147.871,
    take2: 147.885,
    stopLoss: 147.842,
    result: 24,
    expired: true
  },
]

export function Home() {
  return (
    <VStack flex={1} >
      <Header title="Home" />

      <FlatList
        data={tips}
        renderItem={({ item }) => (
          <SignalCard
            type={item.type}
            pair={item.pair}
            limit={item.limit}
            take1={item.take1}
            take2={item.take2}
            stopLoss={item.stopLoss}
            result={item.result}
            expired={item.expired}
          />
        )}
        flex={1}
        showsVerticalScrollIndicator={false}
        px={6}
      />
    </VStack>
  );
};
