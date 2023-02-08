import { Dimensions } from 'react-native';
import { VStack, Image, Heading, HStack, useTheme, Text } from "native-base";

import BullImg from '@assets/bull.png';
import BearImg from '@assets/bear.png';

import TrendUpSvg from '@assets/trendUp.svg';
import TrendDownSvg from '@assets/trendDown.svg';

type Props = {
  type: 'buy' | 'sell';
  pair: string;
  limit: number;
  take1: number;
  take2: number;
  stopLoss: number;
  result: number;
  expired: boolean;
}

export function SignalCard({ type, pair, limit, take1, take2, stopLoss, result, expired }: Props) {
  const { colors, sizes } = useTheme();

  const win = Dimensions.get('window')

  return (
    <VStack
      flex={1}
      bg={expired ? 'gray.900' : "gray.800"}
      h={140}
      borderRadius={8}
      mb={4}
      p={4}
      overflow="hidden"
    >
      <Image
        source={type === 'buy' ? BullImg : BearImg}
        alt={type === 'buy' ? 'Touro representando Bull Market' : 'Urso representando Bear Market'}
        resizeMode="contain"
        position="absolute"
        h={40}
        width={win.width - 40}
      />

      <HStack justifyContent="space-between">
        <HStack>
          <Heading
            color={expired ? 'gray.300' : "white"}
            fontSize="md"
            mr={2}
          >
            {pair}
          </Heading>
          {type === 'buy' ?
            <TrendUpSvg
              stroke={colors.green[700]}
              strokeWidth='20'
              width={sizes[6]}
              height={sizes[6]}
            /> :
            <TrendDownSvg
              stroke={colors.red[400]}
              strokeWidth='20'
              width={sizes[6]}
              height={sizes[6]}
            />
          }
        </HStack>

        {
          expired &&
          <VStack>
            <Text color="gray.300" fontSize="xs">
              Resultado: {result} pontos
            </Text>
            <Text color="gray.300" fontSize="xs">
              EXPIRADO
            </Text>
          </VStack>
        }
      </HStack>

      <HStack flex={1} mt={10} justifyContent="space-around">
        <VStack alignItems="center">
          <Text
            color={expired ? 'gray.300' : "white"}
            fontSize="xs"
          >
            {type === 'buy' ? 'BUY STOP' : 'SELL LIMIT'}
          </Text>
          <Text
            color={expired ? 'gray.300' : "white"}
            fontWeight="bold"
          >
            {limit}
          </Text>
        </VStack>

        <VStack alignItems="center">
          <Text
            color={expired ? 'gray.300' : "white"}
            fontSize="xs"
          >
            TAKE 1
          </Text>
          <Text
            color={expired ? 'gray.300' : "white"}
            fontWeight="bold"
          >
            {take1}
          </Text>
        </VStack>

        <VStack alignItems="center">
          <Text
            color={expired ? 'gray.300' : "white"}
            fontSize="xs"
          >
            TAKE 2
          </Text>
          <Text
            color={expired ? 'gray.300' : "white"}
            fontWeight="bold"
          >
            {take2}
          </Text>
        </VStack>

        <VStack alignItems="center">
          <Text
            color={expired ? 'gray.300' : "white"}
            fontSize="xs"
          >
            STOP
          </Text>
          <Text
            color={expired ? 'gray.300' : "white"}
            fontWeight="bold"
          >
            {stopLoss}
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
};
