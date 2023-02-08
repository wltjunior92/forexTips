import { TouchableOpacity } from "react-native";
import { HStack, Heading, Icon } from "native-base";

import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  title: string
}

export function Header({ title }: Props) {
  return (
    <HStack flex={1} pt={16} maxH={130}>
      <Heading
        flex={1}
        color="white"
        pb={5}
      >
        {title}
      </Heading>

      <TouchableOpacity>
        <Icon
          as={MaterialIcons}
          name="person"
          color="gray.200"
          size={7}
        />
      </TouchableOpacity>
    </HStack>
  );
};
