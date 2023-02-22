import { useCallback, useMemo, useState } from "react";
import { VStack } from "native-base";

import { Header } from "@components/Header";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ISignal } from "src/interfaces/ISignal";
import { useAuth } from "@hooks/useAuth";
import { ScreenActions } from "@components/ScreenActions";
import { EditSignalModal } from "@components/EditSignalModal";
import { fetchDefaultUserSignals } from "@services/fetchDefaultUserSignals";
import { fetchSubscribedUserSignals } from "@services/fetchSubscribedUserSignals";
import { checkUserSubscriptionStatus } from "@services/checkUserSubscriptionStatus";
import { Alert } from "react-native";
import { SignalsList } from "@components/SignalsList";

export function Home() {
  const [signals, setSignals] = useState<ISignal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSignal, setSelectedSignal] = useState<ISignal | null>(null);

  const { isAdmin, user, setCustomerInfoAction, setValidSubscriptionAction, customerInfo } = useAuth();

  const navigator = useNavigation<AppNavigatorRoutesProps>();

  function handleAddSignalPress() {
    navigator.navigate('addSignal');
  };

  function handleOpenEditModal(signal: ISignal) {
    console.log('Abriu modal')
    setShowEditModal(true);
    setSelectedSignal(signal)
  }

  function handleCloseEditModal() {
    console.log('Fechou modal')
    setShowEditModal(false);
    setSelectedSignal(null)
  }

  function setSignalsAction(value: ISignal[]) {
    setSignals(value);
  }

  function setIsLoadingAction(value: boolean) {
    setIsLoading(value);
  }

  const signalsList = useMemo(() => signals, [signals]);
  const loadedCustomer = useMemo(() => customerInfo, [customerInfo]);

  useFocusEffect(useCallback(() => {
    if ((loadedCustomer !== null && typeof loadedCustomer?.entitlements.active.premium === "undefined") && !isAdmin) {
      fetchDefaultUserSignals({ setSignalsAction, setIsLoadingAction });
    } else {
      setIsLoading(true);
      fetchSubscribedUserSignals({ setSignalsAction, setIsLoadingAction });
    }
  }, [loadedCustomer, isAdmin]));

  useFocusEffect(useCallback(() => {
    try {
      checkUserSubscriptionStatus(setCustomerInfoAction, user?.uid as string, setValidSubscriptionAction, loadedCustomer)
    } catch (error) {
      const err = error as unknown as Error;
      Alert.alert('Usuário', err.message);
    }
  }, []));

  const homeScreen = useMemo(() => (
    <VStack flex={1} >
      <Header title="Sala de sinais" />

      <ScreenActions
        onActionPress={handleAddSignalPress}
      />

      <SignalsList signals={signalsList} onEditClick={handleOpenEditModal} isLoading={isLoading} />

      {isAdmin &&
        <EditSignalModal
          isOpen={showEditModal}
          onClose={handleCloseEditModal}
          selectedSignal={selectedSignal}
        />
      }
    </VStack>
  ), [signalsList, showEditModal, isAdmin])

  return (homeScreen);
};
