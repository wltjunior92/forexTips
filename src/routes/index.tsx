import { useState, useEffect } from 'react';
import { useTheme, Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import auth from '@react-native-firebase/auth'

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from './app.routes';

type User = {
  uid: string;
}

export function Routes() {
  const [user, setUser] = useState<User | null>(null);
  const { colors } = useTheme();
  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700]

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });

    return subscriber;
  }, []);
  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {user ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
};
