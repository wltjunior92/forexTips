import { Center, Text } from "native-base";

type Props = {
  message: string;
}

export function ListEmpty({ message }: Props) {
  return (
    <Center
      flex={1}
      pt={24}
    >
      <Text
        color="gray.300"
        fontWeight="bold"
      >
        {message}
      </Text>
    </Center>
  );
};
