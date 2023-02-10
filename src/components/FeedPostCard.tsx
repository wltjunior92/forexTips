import { useCallback, useState } from 'react';
import { useWindowDimensions } from "react-native";

import { Image, Text, VStack, useTheme, HStack, Center, Box } from "native-base";
import YoutubeIframe from 'react-native-youtube-iframe';
import * as ScreenOrientation from 'expo-screen-orientation';

import { Loading } from './Loading';

type User = {
  name: string;
  avatar: string;
}

export type FeedPostProps = {
  user: User;
  createdAt: Date;
  message?: string;
  video?: string;
  image?: string;
}

export function FeedPostCard({ user, createdAt, message, video, image }: FeedPostProps) {
  const [videoReady, setVideoReady] = useState(false)

  const { width } = useWindowDimensions();

  const { colors } = useTheme();

  const onFullScreenChange = useCallback((isFullScreen: boolean) => {
    if (isFullScreen) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, []);

  return (
    <VStack
      bg="gray.600"
      p={4}
      mx={4}
      mb={6}
      borderRadius={8}
    >
      <HStack alignItems="center">
        <Image
          rounded="full"
          borderWidth={1}
          width={12}
          height={12}
          borderColor="gray.200"
          source={{ uri: user.avatar }}
          alt="Avatar do usuário"
          mr={2}
        />
        <VStack>
          <Text
            color="gray.100"
            fontSize="xs"
          >
            {user.name}
          </Text>
          <Text
            color="gray.300"
            fontSize="xs"
          >
            {
              createdAt.toLocaleDateString('pt-BR', { year: 'numeric' })
            }
          </Text>

        </VStack>
      </HStack>

      {!!message &&
        <Center
          width="100%"
          my={2}
        >
          <Text
            color="gray.100"
            fontSize="xs"
          >
            {message}
          </Text>
        </Center>
      }

      {!!video &&
        <VStack
          height={180}
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          {!videoReady && <Loading bg={colors.gray[600]} />}
          <YoutubeIframe
            videoId={video}
            height={videoReady ? 180 : 0}
            width={width - (16 * 4)}
            onReady={() => setVideoReady(true)}
            onFullScreenChange={onFullScreenChange}
          />
        </VStack>
      }

      {!!image &&
        <Box
          flex={1}
          mt={4}
        >
          <Image
            source={{ uri: image }}
            alt="Imagem do post"
            flex={1}
            w="100%"
            h={350}
          />
        </Box>
      }
    </VStack>
  );
};
