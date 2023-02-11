import { Text, VStack, Select as NativeBaseSelect, ISelectProps, ISelectItemProps } from 'native-base';
import { ReactElement } from 'react';

type Props = ISelectProps & {
  bg?: string;
  label?: string;
  children: ReactElement | ReactElement[];
};

export function Select({ children, label, bg = 'gray.700', ...rest }: Props) {
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
      <NativeBaseSelect
        bgColor={bg}
        h={14}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="white"
        fontFamily="body"
        mb={4}
        placeholderTextColor="gray.300"
        {...rest}
      >
        {children}
      </NativeBaseSelect>
    </VStack>
  );
};
