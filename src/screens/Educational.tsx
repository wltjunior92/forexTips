import { useCallback, useMemo, useRef, useState } from "react";
import { Alert, TouchableOpacity, useWindowDimensions } from "react-native";
import { Box, Center, Heading, HStack, Image, ScrollView, Text, VStack } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';

import { Header } from "@components/Header";
import { ScreenActions } from "@components/ScreenActions";

import { checkUserSubscriptionStatus } from "@services/checkUserSubscriptionStatus";
import { useAuth } from "@hooks/useAuth";
import { VideoPlayer } from "@components/VideoPlayer"

import videos from '../utils/tutorials.json';


export function Educational() {
  const video = useRef<any>(null);
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  const [status, setStatus] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  const { setCustomerInfoAction, user, setValidSubscriptionAction, customerInfo, isAdmin } = useAuth();

  const { width } = useWindowDimensions();

  const loadedCustomer = useMemo(() => customerInfo, [customerInfo]);

  function setIsLoadingAction(value: boolean) {
    setIsLoading(value);
  }

  function handleChangeVideo(item: typeof videos[0]) {
    setIsLoadingAction(true);
    setCurrentVideo(item);
  }

  useFocusEffect(useCallback(() => {
    try {
      if (isAdmin) return;
      checkUserSubscriptionStatus(setCustomerInfoAction, user?.uid as string, setValidSubscriptionAction, loadedCustomer)
    } catch (error) {
      const err = error as unknown as Error;
      Alert.alert('Usuário', err.message);
    }
  }, []));

  return (
    <VStack flex={1}>
      <Header title="Estudos" />
      <ScreenActions onActionPress={() => {}} />

      <Center
        width="100%"
        h={200}
        mt={4}
      >
        <VideoPlayer videoUrl={currentVideo.videoUrl} setIsLoadingAction={setIsLoadingAction} isLoading={isLoading} />
      </Center>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 16,
          paddingHorizontal: 20
        }}
        showsVerticalScrollIndicator={false}
        my={8}
      >
        {videos.map(item => (
          <TouchableOpacity
            key={item.name}
            onPress={() => handleChangeVideo(item)}
            activeOpacity={0.6}
            style={{
              overflow: 'hidden',
              borderRadius: 6,
            }}
          >
            <HStack
              w="100%"
              mb={4}
              p={2}
              borderTopRadius={6}
              borderBottomRadius={6}
              space={4}
              {...(item === currentVideo && { bg: 'gray.500' })}
            >
              <Image
                width={'70px'}
                height={'70px'}
                borderRadius={6}
                source={{ uri: item.imageUrl }}
                alt={item.name}
              />

              <VStack
                overflow="hidden"
                width={width - 160}
              >
                <Heading
                  fontSize="sm"
                  color={'gray.100'}
                >
                  {item.name}
                </Heading>
                <Text
                  fontSize="xs"
                  color={'gray.200'}
                >
                  {item.description}
                </Text>
              </VStack>
            </HStack>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </VStack>
  );
};
