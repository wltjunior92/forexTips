import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';
import { Button } from '@components/Button';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { GoogleAuthButton } from '@components/GoogleAuthButton';
import { Alert } from 'react-native';
import { useAuth } from '@hooks/useAuth';
import { createNewUserRegister } from '@services/createUserRegister';

export function SignIn() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { setUserContext } = useAuth();

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  async function handleGoogleSignIn() {
    setIsLoggingIn(true);
    try {
      const haveGooglePlay = await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      if (!haveGooglePlay)
        return Alert.alert('Google Auth', 'O dispositivo não possui os requisitos para usar esse recurso.')

      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const result = await auth().signInWithCredential(googleCredential);
      if (result.additionalUserInfo?.isNewUser) {
        await createNewUserRegister(result.user.uid, result.user.displayName || '', result.user.email || '');
      }
      setUserContext(result.user)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoggingIn(false);
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
      <VStack flex={1} px={10}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />
        </Center>

        <Center mt={64}>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>

          <GoogleAuthButton
            title="Acessar com o Google"
            mb={4}
            onPress={handleGoogleSignIn}
            isLoading={isLoggingIn}
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
