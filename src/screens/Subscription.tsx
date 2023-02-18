import { Button } from "@components/Button";
import { Heading, Text, VStack } from "native-base";


export function Subscription() {
  async function handleSubscription() {
    console.log('Se inscrever')
  }
  return (
    <VStack flex={1} alignItems="center" justifyContent="center" p={6}>
      <Heading
        color="gray.100"
        mb={12}
      >
        Assine nosso plano!
      </Heading>
      <Text
        color="gray.100"
        width="100%"
        mb={4}
      >
        Você terá acesso aos nossos sinais de entrada em tempo real!
      </Text>
      <Text
        color="gray.100"
        width="100%"
        mb={4}
      >
        Além de outros bônus como:
      </Text>
      <Text
        color="gray.100"
        width="100%"
        mb={4}
      >
        🔹 Acesso à aulas exclusivas sobre o mercado e estratégias para lucrar!
      </Text>
      <Text
        color="gray.100"
        width="100%"
        mb={4}
      >
        🔹 Feed de notícias, promoções e oportunidades com o nosso time!
      </Text>

      <Button title="Assinar" onPress={handleSubscription} />
    </VStack>
  );
};
