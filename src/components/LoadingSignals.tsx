import { Skeleton, ScrollView } from 'native-base';

export function LoadingSignals() {
  return (
    <ScrollView flex={1} pt={1} showsVerticalScrollIndicator={false}>
      <Skeleton
        h="180px"
        startColor="gray.400"
        endColor="gray.900"
        mb={1}
      />
      <Skeleton
        h="190px"
        startColor="gray.400"
        endColor="gray.900"
        mb={1}
      />
      <Skeleton
        h="180px"
        startColor="gray.400"
        endColor="gray.900"
        mb={1}
      />
      <Skeleton
        h="200px"
        startColor="gray.400"
        endColor="gray.900"
        mb={1}
      />
    </ScrollView>
  );
};
