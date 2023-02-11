import { useState, useRef } from 'react';
import { Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import auth from '@react-native-firebase/auth';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

export function SignUp() {
  const [email, setEmail] = useState('');
  const emailInputRef = useRef<TextInput>(null);

  const [password, setPassword] = useState('');
  const passwordInputRef = useRef<TextInput>(null);

  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleEmailAuth() {
    if (email === '') {
      emailInputRef.current?.focus();
      return Alert.alert('Criar conta', 'O campo "E-mail" é obrigatório');
    }

    if (password === '') {
      passwordInputRef.current?.focus();
      return Alert.alert('Criar conta', 'O campo "Senha" é obrigatório');
    }

    if (password !== passwordConfirmation) {
      passwordConfirmationInputRef.current?.focus();
      return Alert.alert('Criar conta', 'A senha precisa ser igual à confirmação.');
    }

    const result = await auth().createUserWithEmailAndPassword(email, password);
    console.log(result);

  }
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
            Treine sua mente e seu o corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crie sua conta
          </Heading>

          <Input
            inputRef={emailInputRef}
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
          />

          <Input
            inputRef={passwordInputRef}
            placeholder="Senha"
            secureTextEntry
            onChangeText={setPassword}
          />

          <Input
            inputRef={passwordConfirmationInputRef}
            placeholder="Confirmação da senha"
            secureTextEntry
            onChangeText={setPasswordConfirmation}
          />

          <Button
            title="Criar e acessar"
            mb={4}
            onPress={handleEmailAuth}
          />
        </Center>

        <Button
          title="Voltar para o login"
          variant="outline"
          mt={24}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
};
