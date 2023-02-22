import { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import Purchases, { LOG_LEVEL } from 'react-native-purchases'
import codePush from 'react-native-code-push';

import { Loading } from '@components/Loading';
import { Routes } from '@routes/index';

import { theme } from './src/theme';
import { AuthContextProvider } from '@contexts/AuthContext';
import { GOOGLE_SDK_PUBLIC_API_REVENUE_KEY } from '@utils/contants';

OneSignal.setAppId('e5f5e4f7-17a3-461e-ad33-0a664663f045')

function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  useEffect(() => {
    codePush.sync({
      installMode: codePush.InstallMode.IMMEDIATE,
    })

    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

    if (Platform.OS === 'android') {
      Purchases.configure({ apiKey: GOOGLE_SDK_PUBLIC_API_REVENUE_KEY });
      console.log('Configure revenue');
    }
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        {fontsLoaded ?
          <Routes /> :
          <Loading />
        }
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);