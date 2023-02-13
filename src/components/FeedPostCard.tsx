// import { useCallback, useState } from 'react';
// import { useWindowDimensions } from "react-native";

import { Image, Text, VStack, useTheme, HStack, Center, Box } from "native-base";
// import YoutubeIframe from 'react-native-youtube-iframe';
// import * as ScreenOrientation from 'expo-screen-orientation';

// import { Loading } from './Loading';
import { IPost } from 'src/interfaces/IPost';

export function FeedPostCard({ userName, createdAt, message, videoUrl, imageUrl, userAvatarUrl }: IPost) {
  // const [videoReady, setVideoReady] = useState(false)

  // const { width } = useWindowDimensions();

  // const { colors } = useTheme();

  // const onFullScreenChange = useCallback((isFullScreen: boolean) => {
  //   if (isFullScreen) {
  //     ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  //   } else {
  //     ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  //   }
  // }, []);

  return (
    <VStack
      bg="gray.600"
      p={4}
      mx={6}
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
          source={{ uri: userAvatarUrl }}
          alt="Avatar do usuário"
          mr={2}
        />
        <VStack>
          <Text
            color="gray.100"
            fontSize="xs"
          >
            {userName}
          </Text>
          <Text
            color="gray.300"
            fontSize="xs"
          >
            {createdAt}
          </Text>

        </VStack>
      </HStack>

      {!!message &&
        <Box
          width="100%"
          my={2}
        >
          <Text
            color="gray.100"
            fontSize="xs"
          >
            {message}
          </Text>
        </Box>
      }

      {/* {!!videoUrl &&
        <VStack
          height={180}
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          {!videoReady && <Loading bg={colors.gray[600]} />}
          <YoutubeIframe
            videoId={videoUrl.split('v=')[1]}
            height={videoReady ? 180 : 0}
            width={width - (16 * 4)}
            onReady={() => setVideoReady(true)}
            onFullScreenChange={onFullScreenChange}
          />
        </VStack>
      } */}

      {!!imageUrl &&
        <Box
          flex={1}
          mt={4}
        >
          <Image
            source={{ uri: imageUrl }}
            alt="Imagem do post"
            flex={1}
            w="100%"
            h={350}
            borderRadius={6}
          />
        </Box>
      }
    </VStack>
  );
};
