import { TouchableOpacity } from 'react-native';
import { VStack, Heading, HStack, useTheme, Text, Icon, Box } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

import TrendUpSvg from '@assets/trendUp.svg';
import TrendDownSvg from '@assets/trendDown.svg';
import { ISignal } from 'src/interfaces/ISignal';
import { useAuth } from '@hooks/useAuth';
import { LinearGradient } from 'expo-linear-gradient';

export type Props = ISignal & {
  onEditClick: () => void;
};

export function SignalCard({ side, symbol, limit, take1, take2, take3, stopLoss, result, status, onEditClick }: Props) {
  const { colors, sizes } = useTheme();

  const { isAdmin } = useAuth();

  function getBgColor(status: 'ativo' | 'expirado' | 'cancelado', side: 'buy' | 'sell') {
    if (status !== 'ativo') {
      return [colors.gray[600], colors.gray[400]]
    } else {
      if (side === 'buy') {
        return [colors.green[700], colors.gray[400]];
      }
      return [colors.red[700], colors.gray[400]];
    }
  }

  return (
    <VStack
      flex={1}
      p={4}
      overflow="hidden"
      mb={'2px'}
    >
      <LinearGradient
        style={{
          position: 'absolute',
          width: '125%',
          height: '125%',
          opacity: 0.4
        }}
        colors={getBgColor(status, side)}
        start={[1, -0.5]}
        end={[1, 1.5]}
      />

      <HStack width="100%">
        <HStack flex={1}>
          <Heading
            color={status !== 'ativo' ? 'gray.300' : "white"}
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
          status !== 'ativo' &&
          <VStack alignItems="flex-end">
            <>
              {status !== 'cancelado' &&
                <HStack>
                  <Text color="gray.300" fontSize="xs" mr={2}>
                    Resultado:
                  </Text>
                  <Text color={!!result && parseFloat(result) > 0 ? 'green.700' : 'red.600'} fontSize="xs">
                    {result} pontos
                  </Text>
                </HStack>
              }
            </>
            <Text color="gray.300" fontSize="xs" fontWeight="bold">
              {status?.toUpperCase()}
            </Text>
          </VStack>
        }

        {isAdmin &&
          <TouchableOpacity
            onPress={onEditClick}
            style={{ marginLeft: 8, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
          >
            <Icon
              as={MaterialIcons}
              name="edit"
              color="gray.200"
              size={4}
            />
          </TouchableOpacity>
        }
      </HStack>

      <VStack flex={1} mt={5} justifyContent="space-around" space={2}>
        <HStack alignItems="flex-end">
          <Text
            color={status !== 'ativo' ? 'gray.300' : "white"}
            fontSize="xs"
            fontWeight="bold"
          >
            {side === 'buy' ? 'BUY STOP' : 'SELL LIMIT'}
          </Text>
          <Box flex={1} h={'1px'} mx={2} mb={'4px'} borderBottomWidth="1" borderColor="gray.300" borderStyle="dashed" />
          <Text
            color={status !== 'ativo' ? 'gray.300' : "white"}
            fontWeight="bold"
          >
            {limit}
          </Text>
        </HStack>

        <HStack alignItems="flex-end">
          <Text
            color={status !== 'ativo' ? 'gray.300' : "white"}
            fontSize="xs"
            fontWeight="bold"
          >
            TAKE 1
          </Text>
          <Box flex={1} h={'1px'} mx={2} mb={'4px'} borderBottomWidth="1" borderColor="gray.300" borderStyle="dashed" />
          <Text
            color={status !== 'ativo' ? 'gray.300' : "white"}
            fontWeight="bold"
          >
            {take1}
          </Text>
        </HStack>

        {!!take2 &&
          <HStack alignItems="flex-end">
            <Text
              color={status !== 'ativo' ? 'gray.300' : "white"}
              fontSize="xs"
              fontWeight="bold"
            >
              TAKE 2
            </Text>
            <Box flex={1} h={'1px'} mx={2} mb={'4px'} borderBottomWidth="1" borderColor="gray.300" borderStyle="dashed" />
            <Text
              color={status !== 'ativo' ? 'gray.300' : "white"}
              fontWeight="bold"
            >
              {take2}
            </Text>
          </HStack>
        }
        {!!take3 &&
          <HStack alignItems="flex-end">
            <Text
              color={status !== 'ativo' ? 'gray.300' : "white"}
              fontSize="xs"
              fontWeight="bold"
            >
              TAKE 3
            </Text>
            <Box flex={1} h={'1px'} mx={2} mb={'4px'} borderBottomWidth="1" borderColor="gray.300" borderStyle="dashed" />
            <Text
              color={status !== 'ativo' ? 'gray.300' : "white"}
              fontWeight="bold"
            >
              {take3}
            </Text>
          </HStack>
        }

        <HStack alignItems="flex-end">
          <Text
            color={status !== 'ativo' ? 'gray.300' : "white"}
            fontSize="xs"
            fontWeight="bold"
          >
            STOP
          </Text>
          <Box flex={1} h={'1px'} mx={2} mb={'4px'} borderBottomWidth="1" borderColor="gray.300" borderStyle="dashed" />
          <Text
            color={status !== 'ativo' ? 'gray.300' : "white"}
            fontWeight="bold"
          >
            {stopLoss}
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
};
