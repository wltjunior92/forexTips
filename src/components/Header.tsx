import { TouchableOpacity } from "react-native";
import { HStack, Heading, Icon } from "native-base";

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type Props = {
  title?: string
  showBackButton?: boolean;
}

export function Header({ title, showBackButton = false }: Props) {
  const navigator = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigator.navigate('tools');
  }
  return (
    <HStack
      flex={1}
      pt={16}
      maxH={130}
      px={6}
      {...(showBackButton && { justifyContent: 'space-between' })}
    >
      {showBackButton &&
        <TouchableOpacity
          onPress={handleGoBack}
        >
          <Icon
            as={MaterialIcons}
            name="arrow-back"
            color="gray.200"
            size={7}
          />
        </TouchableOpacity>
      }

      <Heading
        color="white"
        pb={5}
        {...(!showBackButton && { flex: 1 })}
      >
        {!!title ? title : ' '}
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
