import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { GoogleAuthButton } from '@components/GoogleAuthButton';
import { Alert } from 'react-native';
import { tagUserStatus } from '@services/notificationsTags';

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  async function handleGoogleSignIn() {
    try {
      const haveGooglePlay = await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      if (!haveGooglePlay)
        return Alert.alert('Google Auth', 'O dispositivo não possui os requisitos para usar esse recurso.')

      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '227222959991-his5imtoipqb172gbvef4enijeje1uqf.apps.googleusercontent.com',
    });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Sinais Forex
          </Text>
        </Center>

        <Center mt={64}>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>

          <GoogleAuthButton
            title="Acessar com o Google"
            mb={4}
            onPress={handleGoogleSignIn}
          />
        </Center>

        <Center mt={16}>
          <Button
            title="Acessar conta com e-mail e senha"
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
};
