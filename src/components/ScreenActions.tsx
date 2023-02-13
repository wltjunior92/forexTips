import { Box, HStack, Icon, Text } from "native-base";
import { TouchableOpacity } from "react-native";

import { MaterialIcons } from '@expo/vector-icons';

import { useAuth } from "@hooks/useAuth";

type Props = {
  onActionPress: () => void;
  itensCount?: string;
}

export function ScreenActions({ onActionPress, itensCount }: Props) {
  const { isAdmin } = useAuth();

  return (
    <HStack
      w="100%"
      mb={4}
      px={6}
      alignItems="center"
      justifyContent="center"
    >
      <Text
        flex={1}
        color="gray.300"
      >
        {itensCount}
      </Text>

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
