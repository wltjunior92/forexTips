import { Alert, TouchableOpacity } from "react-native";
import { HStack, Heading, Icon } from "native-base";
import auth from '@react-native-firebase/auth';

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useAuth } from "@hooks/useAuth";

type Props = {
  title?: string
  showBackButton?: boolean;
  from?: any;
}

export function Header({ title, showBackButton = false, from }: Props) {
  const { resetIsAdmin } = useAuth();
  const navigator = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigator.navigate(from);
  }

  function handleUserSettingsPress() {
    navigator.navigate('userSettings')
  }

  async function handleSignOut() {
    Alert.alert(
      'LogOut',
      'Deseja realmente fazer logout?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            await auth().signOut();
            resetIsAdmin();
          },
        },
      ]
    )

  }

  return (
    <HStack
      flex={1}
      pt={12}
      minH={105}
      maxH={105}
      px={6}
      bg="gray.600"
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

      <TouchableOpacity
        onPress={title === 'Usuário' ? handleSignOut : handleUserSettingsPress}
      >
        <Icon
          as={MaterialIcons}
          name={title === 'Usuário' ? 'logout' : 'person'}
          color="gray.200"
          size={7}
        />
      </TouchableOpacity>
    </HStack>
  );
};
