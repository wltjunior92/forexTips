import { useState, useRef } from 'react';
import { Pressable, TextInput } from 'react-native';
import { Box, Center, Image, ScrollView, Skeleton, Text, VStack, useToast } from "native-base";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';


import { Header } from "@components/Header";
import { TextArea } from "@components/TextArea";
import { useAuth } from "@hooks/useAuth";
import { Input } from "@components/Input";
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';


export function AddPost() {
  const [isSavingPost, setIsSavingPost] = useState(false)

  const [isLoadingImage, setIsLoadingImage] = useState(false)
  const [imageFromDevice, setImageFromDevice] = useState(false)

  const [postImageUrl, setPostImageUrl] = useState('')
  const [postMessage, setPostMessage] = useState('')

  const imageUrlInputRef = useRef<TextInput>(null);
  const messageInputRef = useRef<TextInput>(null);

  const { user } = useAuth();

  const toast = useToast();

  const navigator = useNavigation<AppNavigatorRoutesProps>();

  function handleInsertImageUrl(imageUrl: any) {
    setPostImageUrl(imageUrl);
    setImageFromDevice(false);
  }

  async function handlePostImageSelect() {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status === 'granted') {
        setIsLoadingImage(true);
        const selectedImage = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
          allowsMultipleSelection: false,
          aspect: [4, 4],
          allowsEditing: true,
        });

        if (selectedImage.canceled) {
          return;
        }

        if (selectedImage.assets[0].uri) {
          const fileInfo = await FileSystem.getInfoAsync(selectedImage.assets[0].uri);

          if (fileInfo.size && (fileInfo.size / 1024 / 1024) > 5) {
            return toast.show({
              title: 'Essa imagem é muito grande. Escolha uma com até 5MB.',
              placement: 'top',
              bg: 'red.500'
            })
          }

          setPostImageUrl(selectedImage.assets[0].uri);
          imageUrlInputRef.current?.setNativeProps({ text: '' })
          setImageFromDevice(true)
        }
      }

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingImage(false);
    }
  }

  async function handleCreatePost() {
    setIsSavingPost(true);
    try {
      if (postMessage === '' && postImageUrl === '') {
        return toast.show({
          title: 'O conteúdo do post não pode estar vazio. Insira uma imagem ou escreva a mensagem do post',
          placement: 'top',
          bg: 'red.500'
        })
      }

      let imageUrl
      if (!imageFromDevice) {
        imageUrl = postImageUrl
      } else {
        try {
          const fileName = `${Date.now()}-post`;
          const reference = storage().ref(`/postsImages/${fileName}.png`);

          await reference.putFile(postImageUrl);
          const url = await reference.getDownloadURL();

          imageUrl = url;
        } catch (error) {
          return toast.show({
            title: 'Não foi possível salvar a imagem do post.',
            placement: 'top',
            bg: 'red.500'
          })
        }
      }

      firestore()
        .collection('posts')
        .add({
          message: postMessage,
          userName: user?.displayName,
          userAvatarUrl: user?.photoURL,
          userUid: user?.uid,
          imageUrl,
          createdAt: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          messageInputRef.current?.setNativeProps({ text: '' });
          imageUrlInputRef.current?.setNativeProps({ text: '' });
          setPostImageUrl('');
          setPostMessage('');

          navigator.navigate('feed');

          toast.show({
            title: 'Post criado!',
            placement: 'top',
            bg: 'green.500'
          });
        })
        .catch(error => {
          toast.show({
            title: 'Não foi possível salvar o post.',
            placement: 'top',
            bg: 'red.500'
          });
        });
    } catch (error) {
      toast.show({
        title: 'Não foi possível salvar o post.',
        placement: 'top',
        bg: 'red.500'
      })
    } finally {
      setIsSavingPost(false);
    }
  }

  return (
    <VStack
      flex={1}
    >
      <Header title="Criar post" showBackButton from={'feed'} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack
          flex={1}
          px={4}
          pb={16}
          alignItems="center"
        >
          <TextArea
            inputRef={messageInputRef}
            label="Mensagem do post"
            bg="gray.800"
            h={40}
            placeholder="Digite aqui o texto do post"
            onChangeText={setPostMessage}
          />

          <Input
            inputRef={imageUrlInputRef}
            label="Url de uma imagem na internet"
            bg="gray.800"
            onEndEditing={event => handleInsertImageUrl(event.nativeEvent.text)}
          />

          <Pressable
            onPress={handlePostImageSelect}
          >
            <Center
              w={'230px'}
              h={'230px'}
              position="relative"
            >
              {postImageUrl === '' ?
                <Box
                  flex={1}
                  borderWidth={2}
                  borderRadius={6}
                  borderStyle="dashed"
                  borderColor="gray.400"
                  p={30}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text
                    textAlign="center"
                    color="gray.300"
                  >
                    Ou clique aqui para selecionar uma imagem em seu dispositivo.
                  </Text>
                </Box> :
                <>
                  {
                    isLoadingImage &&
                    <Skeleton
                      width={'230px'}
                      height={'230px'}
                      borderRadius={6}
                      startColor="gray.600"
                      endColor="gray.500"
                      position="absolute"
                    />
                  }
                  <Box
                    flex={1}
                    borderRadius={6}
                    overflow="hidden"
                  >
                    <Image
                      width={'230px'}
                      height={'230px'}
                      source={{ uri: postImageUrl }}
                      alt="Imagem do post"
                      onLoadStart={() => {
                        setIsLoadingImage(true)
                      }}
                      onLoad={() => {
                        setIsLoadingImage(true)
                      }}
                      onLoadEnd={() => {
                        setIsLoadingImage(true)
                      }}
                    />
                  </Box>
                </>
              }
            </Center>
          </Pressable>

          <Button
            title="Criar post"
            onPress={handleCreatePost}
            isLoading={isSavingPost}
            mt={6}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
};
