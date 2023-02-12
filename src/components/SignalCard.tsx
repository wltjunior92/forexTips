import { Dimensions } from 'react-native';
import { VStack, Image, Heading, HStack, useTheme, Text } from "native-base";

import BullImg from '@assets/bull.png';
import BearImg from '@assets/bear.png';

import TrendUpSvg from '@assets/trendUp.svg';
import TrendDownSvg from '@assets/trendDown.svg';
import { ISignal } from 'src/interfaces/ISignal';

export type SignalCardProps = ISignal;

export function SignalCard({ side, symbol, limit, take1, take2, take3, stopLoss, result, expired }: SignalCardProps) {
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
        source={side === 'buy' ? BullImg : BearImg}
        alt={side === 'buy' ? 'Touro representando Bull Market' : 'Urso representando Bear Market'}
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
            {symbol}
          </Heading>
          {side === 'buy' ?
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
            <HStack>
              <Text color="gray.300" fontSize="xs" mr={2}>
                Resultado:
              </Text>
              <Text color={!!result && result > 0 ? 'green.700' : 'red.600'} fontSize="xs">
                {result} pontos
              </Text>
            </HStack>
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
            {side === 'buy' ? 'BUY STOP' : 'SELL LIMIT'}
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

        {!!take2 &&
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
        }
        {!!take3 &&
          <VStack alignItems="center">
            <Text
              color={expired ? 'gray.300' : "white"}
              fontSize="xs"
            >
              TAKE 3
            </Text>
            <Text
              color={expired ? 'gray.300' : "white"}
              fontWeight="bold"
            >
              {take3}
            </Text>
          </VStack>
        }

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
