import { ReactNode, useEffect, useState } from "react";
import { HStack, Icon, Text } from "native-base";
import { TouchableOpacity } from "react-native";

import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type Props = {
  onActionPress?: () => void;
  itensCount?: string;
  component?: () => JSX.Element;
}

export function ScreenActions({ onActionPress, itensCount, component: Component }: Props) {
  const { isAdmin, validSubscription } = useAuth();

  const navigator = useNavigation<AppNavigatorRoutesProps>();

  function handleNavigateSubscription() {
    navigator.navigate('subscription');
  }

  return (
    <HStack
      w="100%"
      px={6}
      pb={4}
      alignItems="center"
      justifyContent="center"
      bg="gray.600"
    >
      {!!!Component &&
        <Text
          flex={1}
          color="gray.300"
        >
          {itensCount}
        </Text>
      }

      {!!Component &&
        <Component />
      }

      {isAdmin ?
        <TouchableOpacity
          onPress={onActionPress}
          style={{ width: 40, height: 40, alignItems: 'flex-end', justifyContent: 'center' }}
        >
          <Icon
            as={MaterialIcons}
            name="add"
            color="gray.200"
            size={7}
          />
        </TouchableOpacity>
        :
        <>
          {!validSubscription &&
            <TouchableOpacity
              onPress={handleNavigateSubscription}
              style={{ width: 40, height: 40, alignItems: 'flex-end', justifyContent: 'center' }}
            >
              <Icon
                as={MaterialCommunityIcons}
                name="crown-outline"
                color="yellow.600"
                size={7}
              />
            </TouchableOpacity>
          }
        </>
      }
    </HStack>
  );
};
