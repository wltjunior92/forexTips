import { useEffect, useState } from "react";
import { Box, FlatList, Icon, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';

import { SignalCard, SignalCardProps } from "@components/SignalCard";
import { Header } from "@components/Header";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ISignal } from "src/interfaces/ISignal";
import { useAuth } from "@hooks/useAuth";
import { ListEmpty } from "@components/ListEmpty";
import { ScreenActions } from "@components/ScreenActions";

export function Home() {
  const [signals, setSignals] = useState<ISignal[]>([]);

  const { isAdmin } = useAuth();

  const navigator = useNavigation<AppNavigatorRoutesProps>()

  function handleAddSignalPress() {
    navigator.navigate('addSignal');
  };

  useEffect(() => {
    const currentDay = new Date();
    const dayBefore = new Date(new Date().setDate(currentDay.getDate() - 1));

    const startDate = firestore.Timestamp.fromDate(dayBefore)
    const subscribe = firestore()
      .collection('signals')
      .orderBy('createdAt', 'desc')
      .where('createdAt', '>', startDate)
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as ISignal[];

        setSignals(data);
      });

    return () => subscribe();
  }, []);

  return (
    <VStack flex={1} >
      <Header title="Home" />

      <ScreenActions onActionPress={handleAddSignalPress} />

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
            expired={item.expired}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty
            message="Nenhum sinal ainda"
          />
        )}
        flex={1}
        showsVerticalScrollIndicator={false}
        px={6}
      />
    </VStack>
  );
};
