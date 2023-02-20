import { useState, useCallback } from "react";
import { Alert, TouchableOpacity } from "react-native";

import { Center, Image, ScrollView, VStack, Skeleton, Text, useToast, Link } from "native-base";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { Header } from "@components/Header";
import { useFocusEffect } from "@react-navigation/native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import DefaultAvatarImg from '@assets/userPhotoDefault.png';
import { useAuth } from "@hooks/useAuth";

const PHOTO_SIZE = 33;

export function UserSettings() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null | undefined>('https://github.com/wltjunior92.png');

  const [displayName, setDisplayName] = useState<string | null | undefined>('');
  const [email, setEmail] = useState<string | null | undefined>('');

  const [currentSubscription, setCurrentSubscription] = useState<string | null | undefined>('');

  const { user, setUserContext, customerInfo } = useAuth();

  const toast = useToast();

  async function handleSaveChanges() {
    user?.updateProfile({
      displayName: displayName
    }).then(() => Alert.alert('Usuário', 'Alterações salvas com sucesso!'))
      .catch(error => console.log(error));
  }

  async function handleUserPhotoSelect() {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status === 'granted') {
        setPhotoIsLoading(true);
        const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
          allowsMultipleSelection: false,
          aspect: [4, 4],
          allowsEditing: true,
        });

        if (selectedPhoto.canceled) {
          return;
        }

        if (selectedPhoto.assets[0].uri) {
          const fileInfo = await FileSystem.getInfoAsync(selectedPhoto.assets[0].uri);

          if (fileInfo.size && (fileInfo.size / 1024 / 1024) > 5) {
            return toast.show({
              title: 'Essa imagem é muito grande. Escolha uma com até 5MB.',
              placement: 'top',
              bg: 'red.500'
            })
          }

          setUserPhoto(selectedPhoto.assets[0].uri);
          await uploadNewUserAvatar(selectedPhoto.assets[0].uri);
        }
      }

    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false);
    }
  }

  async function uploadNewUserAvatar(fileUri: string) {
    try {
      const fileName = `${user?.uid}-avatar`;
      const reference = storage().ref(`/avatars/${fileName}.png`);

      await reference.putFile(fileUri);
      const url = await reference.getDownloadURL();

      await user?.updateProfile({
        photoURL: url,
      })
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(useCallback(() => {
    const loadedUser = auth().currentUser;
    setDisplayName(loadedUser?.displayName);
    setEmail(loadedUser?.email);
    setUserPhoto(loadedUser?.photoURL);

    setUserContext(loadedUser);
  }, []))

  useFocusEffect(useCallback(() => {
    const assinatura = customerInfo?.entitlements.active.premium;
    if (typeof assinatura !== "undefined") {
      switch (assinatura.productIdentifier) {
        case '1copy_cash_premium':
          setCurrentSubscription('Premium mensal ⭐')
          break;
        case 'copy_cash_premium_anual':
          setCurrentSubscription('Premium anual ⭐')
          break;
        default:
          setCurrentSubscription('Nenhuma')
          break;
      }
    } else {
      setCurrentSubscription('Nenhuma')
    }
  }, [customerInfo]))


  return (
    <VStack flex={1}>
      <Header title="Usuário" showBackButton from={'home'} />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        px={4}
      >
        <Center>
          {
            photoIsLoading ?
              <Skeleton
                rounded="full"
                width={PHOTO_SIZE}
                height={PHOTO_SIZE}
                startColor="gray.600"
                endColor="gray.500"
              />
              :
              <Image
                rounded="full"
                borderWidth={1}
                width={PHOTO_SIZE}
                height={PHOTO_SIZE}
                borderColor="gray.400"
                source={userPhoto ? { uri: userPhoto } : DefaultAvatarImg}
                alt="Avatar do usuário"
                mr={2}
              />
          }
          <TouchableOpacity
            onPress={handleUserPhotoSelect}
          >
            <Text
              color="yellow.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input
            bg="gray.800"
            placeholder="Nome"
            defaultValue={displayName || ''}
            onChangeText={setDisplayName}
          />

          <Input
            bg="gray.900"
            placeholder="Email"
            isReadOnly
            defaultValue={email || ''}
          />

          <Input
            label="Assinatura:"
            bg="gray.900"
            isReadOnly
            defaultValue={currentSubscription || 'Nenhuma'}
            _readOnly={{
              color: 'gray.100'
            }}
          />

          {!!customerInfo?.managementURL &&
            <Link
              href={customerInfo?.managementURL || ''}
              isExternal
              _text={{
                color: 'gray.100'
              }}
              mb={6}
            >
              Gerenciar Assinatura
            </Link>
          }

          <Button
            title="Salvar alterações"
            onPress={handleSaveChanges}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
};
