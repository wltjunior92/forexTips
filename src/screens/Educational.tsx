import { useCallback, useMemo } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { VStack } from "native-base";

import { Header } from "@components/Header";
import { ScreenActions } from "@components/ScreenActions";

import { checkUserSubscriptionStatus } from "@services/checkUserSubscriptionStatus";
import { useAuth } from "@hooks/useAuth";


export function Educational() {
  const { setCustomerInfoAction, user, setValidSubscriptionAction, customerInfo } = useAuth();

  const loadedCustomer = useMemo(() => customerInfo, [customerInfo]);

  useFocusEffect(useCallback(() => {
    try {
      checkUserSubscriptionStatus(setCustomerInfoAction, user?.uid as string, setValidSubscriptionAction, loadedCustomer)
    } catch (error) {
      const err = error as unknown as Error;
      Alert.alert('Usuário', err.message);
    }
  }, []));
  return (
    <VStack flex={1}>
      <Header title="Estudos" />
      <ScreenActions onActionPress={() => {}} />
    </VStack>
  );
};
