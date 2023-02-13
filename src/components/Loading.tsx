import { Spinner, Center, ICenterProps } from 'native-base';

type Props = ICenterProps & {
  bg?: string;
}

export function Loading({ bg = 'gray.700', ...rest }: Props) {
  return (
    <Center flex={1} bg={bg} {...rest}>
      <Spinner color="yellow.500" />
    </Center>
  );
};
