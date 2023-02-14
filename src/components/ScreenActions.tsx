import { ReactNode } from "react";
import { HStack, Icon, Text } from "native-base";
import { TouchableOpacity } from "react-native";

import { MaterialIcons } from '@expo/vector-icons';

import { useAuth } from "@hooks/useAuth";

type Props = {
  onActionPress: () => void;
  itensCount?: string;
  component?: () => JSX.Element;
}

export function ScreenActions({ onActionPress, itensCount, component: Component }: Props) {
  const { isAdmin } = useAuth();

  return (
    <HStack
      w="100%"
      mb={4}
      px={6}
      alignItems="center"
      justifyContent="center"
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

      {isAdmin &&
        <TouchableOpacity
          onPress={onActionPress}
        >
          <Icon
            as={MaterialIcons}
            name="add"
            color="gray.200"
            size={7}
          />
        </TouchableOpacity>
      }
    </HStack>
  );
};
