import { Text, VStack, Box, Icon, TextArea as TextAreaNativeBase, ITextAreaProps } from 'native-base';
import { TouchableOpacity, TextInput } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

type Props = ITextAreaProps & {
  bg?: string;
  h?: number;
  label?: string;
  handlePress?: () => void;
  inputRef?: React.RefObject<TextInput>;
};

export function TextArea({ label, bg = 'gray.700', h = 14, handlePress, inputRef, ...rest }: Props) {
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
        h={h}
        borderRadius={6}
        bgColor={bg}
      >
        <TextAreaNativeBase
          autoCompleteType=""
          ref={inputRef}
          flex={1}
          bgColor={bg}
          h={h}
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
          _readOnly={{
            color: 'gray.300'
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
