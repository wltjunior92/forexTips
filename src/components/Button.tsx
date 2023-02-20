import { Button as NativeBaseButton, IButtonProps, Text, Spinner } from 'native-base';

type Props = IButtonProps & {
  title: string;
  variant?: 'solid' | 'outline';
}

export function Button({ title, variant = 'solid', isLoading, ...rest }: Props) {
  return (
    <NativeBaseButton
      w="full"
      h={14}
      bg={variant === 'outline' ? 'transparent' : 'primary.700'}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor="primary.600"
      isDisabled={isLoading}
      rounded="sm"
      _pressed={{
        bg: variant === 'outline' ? 'gray.500' : 'primary.800'
      }}
      _disabled={{
        bg: 'primary.800',
      }}
      {...rest}
    >
      {
        isLoading ?
          <Spinner
            color="gray.200"
          /> :
          <Text
            color={variant === 'outline' ? 'primary.600' : 'white'}
            fontFamily="heading"
            fontSize="sm"
          >
            {title}
          </Text>
      }
    </NativeBaseButton>
  );
};
