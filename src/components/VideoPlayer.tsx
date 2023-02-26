import { useCallback, useMemo, useRef, useState } from "react"
import { Box, Skeleton } from "native-base"
import { useWindowDimensions } from "react-native";
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';

type Props = {
  videoPlayerRef?: React.RefObject<Video>;
  videoUrl: string;
  setIsLoadingAction: (value: boolean) => void;
  isLoading: boolean;
}

export function VideoPlayer({ videoPlayerRef, videoUrl, setIsLoadingAction, isLoading }: Props) {
  const video = useRef<any>(null);
  const [status, setStatus] = useState<any>({});

  const { width } = useWindowDimensions();

  const onFullScreenChange = useCallback((isFullScreen: number) => {
    if (isFullScreen === 0 || isFullScreen === 1) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, []);

  const videoPlayer = useMemo(() => (
    <>
      {
        isLoading &&
        <Skeleton
          h="204px"
          w={width - (16 * 2)}
          startColor="gray.400"
          endColor="gray.900"
          borderRadius={8}
          position="absolute"
          zIndex={20}
        />
      }
      <Box
        width={width - (16 * 2)}
        h={204}
        overflow="hidden"
        borderRadius={8}
        bg="black"
      >
        <Video
          ref={video}
          source={{
            uri: videoUrl,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
          onFullscreenUpdate={event => onFullScreenChange(event.fullscreenUpdate)}
          onReadyForDisplay={() => setIsLoadingAction(false)}
          style={{
            alignSelf: 'center',
            width: width - (16 * 2),
            height: 204,
          }}
        />
      </Box>
    </>
  ), [videoUrl, isLoading])

  return (videoPlayer)
}