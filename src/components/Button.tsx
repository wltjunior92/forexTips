import { Button as NativeBaseButton, IButtonProps, Text, Spinner } from 'native-base';

type Props = IButtonProps & {
  title: string;
  variant?: 'solid' | 'outline';
  isLoading?: boolean;
}

export function Button({ title, variant = 'solid', isLoading = false, ...rest }: Props) {
  return (
    <NativeBaseButton
      w="full"
      h={14}
      bg={variant === 'outline' ? 'transparent' : 'yellow.700'}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor="yellow.700"
      isDisabled={isLoading}
      rounded="sm"
      _pressed={{
        bg: variant === 'outline' ? 'gray.500' : 'yellow.800'
      }}
      _disabled={{
        bg: 'yellow.500',
      }}
      {...rest}
    >
      {
        isLoading ?
          <Spinner
            color="gray.200"
          /> :
          <Text
            color={variant === 'outline' ? 'yellow.500' : 'white'}
            fontFamily="heading"
            fontSize="sm"
          >
            {title}
          </Text>
      }
    </NativeBaseButton>
  );
};
