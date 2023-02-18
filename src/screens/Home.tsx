import { useEffect, useState } from "react";
import { FlatList, VStack, Select, Box, Icon } from "native-base";

import { MaterialIcons } from '@expo/vector-icons';

import { SignalCard } from "@components/SignalCard";
import { Header } from "@components/Header";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ISignal } from "src/interfaces/ISignal";
import { useAuth } from "@hooks/useAuth";
import { ListEmpty } from "@components/ListEmpty";
import { ScreenActions } from "@components/ScreenActions";
import { EditSignalModal } from "@components/EditSignalModal";
import { Loading } from "@components/Loading";
import { fetchDefaultUserSignals } from "@services/fetchDefaultUserSignals";
import { fetchSubscribedUserSignals } from "@services/fetchSubscribedUserSignals";

export function Home() {
  const [signals, setSignals] = useState<ISignal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSignal, setSelectedSignal] = useState<ISignal | null>(null);
  const [daysToSearch, setDaysToSearch] = useState('1');

  // Status de inscrição provisório
  const [validSubscription] = useState(false);

  const { isAdmin } = useAuth();

  const navigator = useNavigation<AppNavigatorRoutesProps>()

  function handleAddSignalPress() {
    navigator.navigate('addSignal');
  };

  function handleOpenEditModal(signal: ISignal) {
    setShowEditModal(true);
    setSelectedSignal(signal)
  }

  function handleCloseEditModal() {
    setShowEditModal(false);
    setSelectedSignal(null)
  }

  function setSignalsAction(value: ISignal[]) {
    setSignals(value);
  }

  function setIsLoadingAction(value: boolean) {
    setIsLoading(value);
  }

  useEffect(() => {
    setIsLoading(true);

    if (validSubscription || isAdmin) {
      fetchSubscribedUserSignals({ setSignalsAction, setIsLoadingAction, daysToSearch });
    } else {
      fetchDefaultUserSignals({ setSignalsAction, setIsLoadingAction });
    }
  }, [daysToSearch]);

  return (
    <VStack flex={1} >
      <Header title="Home" />

      <ScreenActions
        component={() => (
          <Box
            flex={1}
            alignItems="flex-start"
          >
            <Select
              size="sm"
              defaultValue={daysToSearch}
              width={24}
              bg="gray.800"
              borderWidth={0}
              height={10}
              color="gray.100"
              onValueChange={setDaysToSearch}
              isDisabled={!validSubscription && !isAdmin}
              dropdownIcon={
                <Icon
                  as={MaterialIcons}
                  name="arrow-drop-down"
                  color="gray.200"
                  size={5}
                />
              }
            >
              <Select.Item label="1 dia" value="1" />
              <Select.Item label="3 dias" value="3" />
              <Select.Item label="5 dias" value="5" />
              <Select.Item label="10 dias" value="10" />
            </Select>
          </Box>
        )}
        onActionPress={handleAddSignalPress}
      />

      {
        isLoading ?
          <Loading flex={1} /> :
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
                onEditClick={() => handleOpenEditModal(item)}
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
            contentContainerStyle={{ paddingBottom: 36 }}
          />
      }

      {isAdmin &&
        <EditSignalModal
          isOpen={showEditModal}
          onClose={handleCloseEditModal}
          selectedSignal={selectedSignal}
        />
      }
    </VStack>
  );
};
