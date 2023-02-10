import { Spinner, Center } from 'native-base';

type Props = {
  bg?: string;
}

export function Loading({ bg = 'gray.700' }: Props) {
  return (
    <Center flex={1} bg={bg}>
      <Spinner color="yellow.500" />
    </Center>
  );
};
