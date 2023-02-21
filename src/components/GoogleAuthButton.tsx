import { Button as NativeBaseButton, HStack, IButtonProps, Spinner, Text } from 'native-base';

import GoogleLogoSvg from '@assets/googleLogo.svg';

type Props = IButtonProps & {
  title: string;
  variant?: 'solid' | 'outline';
}

export function GoogleAuthButton({ title, isLoading, ...rest }: Props) {
  return (
    <NativeBaseButton
      w="full"
      h={14}
      bg="gray.100"
      rounded="sm"
      _pressed={{
        bg: 'gray.200'
      }}
      _disabled={{
        bg: 'gray.500',
      }}
      {...rest}
    >
      <HStack
        alignItems="center"
        justifyContent="center"
      >
        {
          isLoading ?
            <Spinner
              color="primary.900"
            /> :
            <>
              <Text
                color="gray.809"
                fontFamily="heading"
                fontSize="sm"
                mr={4}
              >
                {title}
              </Text>
              <GoogleLogoSvg
                width={22}
                height={22}
              />
            </>
        }
      </HStack>
    </NativeBaseButton>
  );
};
