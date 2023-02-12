import { useState, useRef } from 'react';
import { Alert, TextInput, Switch, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { VStack, Image, Text, Center, Heading, ScrollView, Box, HStack, useTheme } from 'native-base';
import auth from '@react-native-firebase/auth';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';
import { useAuth } from '@hooks/useAuth';

export function SignUp() {
  const [isNewUser, setIsNewUser] = useState(false);
  const toggleIsNewUser = () => setIsNewUser(!isNewUser);

  const [email, setEmail] = useState('');
  const emailInputRef = useRef<TextInput>(null);

  const [password, setPassword] = useState('');
  const passwordInputRef = useRef<TextInput>(null);

  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  const { setUserContext } = useAuth();

  const navigation = useNavigation();

  const { colors } = useTheme();

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleCreateUserWithEmailAndPassword() {
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

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert('Criar conta', 'Usuário criado com sucesso'))
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          emailInputRef.current?.focus();
          return Alert.alert('Criar conta', 'Este e-mail já está em uso. Tente usar outro e-mail.')
        }
        if (error.code === 'auth/invalid-email') {
          emailInputRef.current?.focus();
          return Alert.alert('Criar conta', 'E-mail inválido.')
        }
        if (error.code === 'auth/weak-password') {
          passwordInputRef.current?.focus();
          return Alert.alert('Criar conta', 'A senha deve ter ao menos 6 caracteres.')
        }
      });
  }

  async function handleSigninWithEmailAndPassword() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        setUserContext(result.user);
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          return Alert.alert('Login', 'Usuário não encontrado! E-mail e/ou senha errados.')
        }
      });
  }

  async function handleForgotPassword() {
    if (email === '') {
      emailInputRef.current?.focus();
      return Alert.alert('Recuperar senha', 'O campo "E-mail" é obrigatório');
    }
    auth().sendPasswordResetEmail(email)
      .then(() => Alert.alert('Recuperar senha', 'Enviamos um link no seu e-mail para você redefinir a sinha senha.'));
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
            {isNewUser ? 'Crie' : 'Acesse'} sua conta
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

          {isNewUser &&
            <Input
              inputRef={passwordConfirmationInputRef}
              placeholder="Confirmação da senha"
              secureTextEntry
              onChangeText={setPasswordConfirmation}
            />
          }


          <Button
            title={isNewUser ? 'Criar e acessar' : 'Fazer login'}
            mb={4}
            onPress={isNewUser ? handleCreateUserWithEmailAndPassword : handleSigninWithEmailAndPassword}
          />

          <Box
            width="100%"
            alignItems="center"
          >
            <HStack>
              <Text
                color="white"
                mr={2}
              >
                Novo usuário?
              </Text>
              <Switch
                trackColor={{ false: colors.gray[200], true: colors.yellow[200] }}
                thumbColor={isNewUser ? colors.yellow[600] : colors.gray[300]}
                value={isNewUser}
                onValueChange={toggleIsNewUser}
              />
            </HStack>
          </Box>

          {!isNewUser &&
            <TouchableOpacity
              onPress={handleForgotPassword}
            >
              <Text color="gray.100" fontSize="sm" mt={4}>
                Recuperar senha
              </Text>
            </TouchableOpacity>
          }
        </Center>

        <Button
          title="Voltar para o login"
          variant="outline"
          mt={20}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
};
