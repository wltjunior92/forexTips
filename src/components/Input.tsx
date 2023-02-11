import { Text, VStack, Input as NativeBaseInput, IInputProps, Box, Icon } from 'native-base';
import { TouchableOpacity, TextInput } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

type Props = IInputProps & {
  bg?: string;
  label?: string;
  handlePress?: () => void;
  inputRef?: React.RefObject<TextInput>;
};

export function Input({ label, bg = 'gray.700', handlePress, inputRef, ...rest }: Props) {
  return (
    <VStack
      width="100%"
    >
      {!!label &&
        <Text
          color="gray.200"
          fontSize="xs"
          mb={2}
        >
          {label}
        </Text>
      }

      <Box
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        mb={4}
        h={14}
        borderRadius={6}
        bgColor={bg}
      >
        <NativeBaseInput
          ref={inputRef}
          flex={1}
          bgColor={bg}
          px={4}
          h={14}
          borderWidth={0}
          fontSize="md"
          color="white"
          fontFamily="body"
          placeholderTextColor="gray.300"
          _focus={{
            bg: 'gray.700',
            borderWidth: 1,
            borderColor: 'yellow.500',
          }}
          {...rest}
        />
        {!!handlePress &&
          <TouchableOpacity
            onPress={handlePress}
          >
            <Icon
              as={MaterialIcons}
              name="content-copy"
              color="gray.300"
              size={6}
              mx={2}
            />
          </TouchableOpacity>
        }
      </Box>
    </VStack>
  );
};
