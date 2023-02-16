import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';
import { tagUserStatus } from '@services/notificationsTags';

type AuthRoutes = {
  signIn: undefined;
  signUp: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  useFocusEffect(useCallback(() => {
    tagUserStatus('user_not_logged_in')
  }, []));

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="signIn"
        component={SignIn}
      />

      <Screen
        name="signUp"
        component={SignUp}
      />
    </Navigator>
  );
};
