import { useMemo } from "react";
import { Center, FlatList, Text } from "native-base";
import { ISignal } from "src/interfaces/ISignal";
import { SignalCard } from "./SignalCard";
import { ListEmpty } from "./ListEmpty";
import { LoadingSignals } from "./LoadingSignals";

type Props = {
  signals: ISignal[];
  onEditClick: (value: ISignal) => void;
  isLoading: boolean;
}

export function SignalsList({ signals, onEditClick, isLoading }: Props) {
  const SignalsList = useMemo(() => (
    <>
      {/* {console.log('renderizou lista')} */}
      {isLoading ?
        <LoadingSignals /> :
        <FlatList
          data={signals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SignalCard
              id={item.id}
              side={item.side}
              symbol={item.symbol}
              limit={item.limit}
              take1={item.take1}
              take2={item.take2}
              take3={item.take3}
              stopLoss={item.stopLoss}
              result={item.result}
              status={item.status}
              onEditClick={() => onEditClick(item)}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty
              message="Nenhum sinal ainda"
            />
          )}
          ListFooterComponent={() => (
            <>
              {signals.length !== 0 &&
                <Center w="100%" mt={6}>
                  <Text color="gray.300" textAlign="center">
                    Fim da lista de sinais {'\n'}
                    dos últimos 10 dias
                  </Text>
                </Center>
              }
            </>
          )}
          flex={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 36, marginTop: 4 }}
        />
      }
    </>
  ), [signals]);

  return (SignalsList);
}