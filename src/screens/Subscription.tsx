import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Purchases, { PurchasesPackage } from 'react-native-purchases';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { Button, Center, Divider, Heading, HStack, Icon, Image, ScrollView, Spinner, Text, useTheme, useToast, VStack } from "native-base";
import { IProduct } from "src/interfaces/IProduct";

import BackgroundImg from '@assets/background-subscription.png';

export function Subscription() {
  const [isLoadingSubscriptions, setIsLoadingSubscriptions] = useState(true);
  const [annualSubscription, setAnnualSubscription] = useState<IProduct | null>(null);
  const [monthlySubscription, setMonthlySubscription] = useState<IProduct | null>(null);
  const [discount, setDiscount] = useState('');
  const [perMonthAnnualPrice, setPerMonthAnnualPrice] = useState('');

  const { colors } = useTheme();

  const toast = useToast();

  async function fetchProductsAvailable() {
    setIsLoadingSubscriptions(true)
    try {
      const offerings = await Purchases.getOfferings();

      if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
        const annual = offerings.current.availablePackages.find((availablePackages) => {
          return availablePackages.identifier === '$rc_annual';
        })
        const monthly = offerings.current.availablePackages.find((availablePackages) => {
          return availablePackages.identifier === '$rc_monthly';
        })

        setAnnualSubscription({
          title: annual?.product.title || '',
          price: annual?.product.price || 0,
          priceString: annual?.product.priceString || '',
          identifier: annual?.product.identifier || '',
          currencyCode: annual?.product.currencyCode || 'BRL',
          description: annual?.product.description || '',
          package: annual as PurchasesPackage,
        })
        setMonthlySubscription({
          title: monthly?.product.title || '',
          price: monthly?.product.price || 0,
          priceString: monthly?.product.priceString || '',
          identifier: monthly?.product.identifier || '',
          currencyCode: monthly?.product.currencyCode || 'BRL',
          description: monthly?.product.description || '',
          package: monthly as PurchasesPackage,
        })
      }
    } catch (error) {
      toast.show({
        title: 'Não foi possível carregar as nossas ofertas. Por favor, tente novamente..',
        placement: 'top',
        bg: 'red.500'
      })
      console.log(error);
    } finally {
      setIsLoadingSubscriptions(false)
    }
  }

  function getDiscount() {
    let calcDiscount = 0;
    const annualPrice = annualSubscription?.price || 0;
    const monthlyPrice = monthlySubscription?.price || 0;

    if (annualPrice !== 0) {
      calcDiscount = ((monthlyPrice - (annualPrice / 12)) * 100) / monthlyPrice;
      return `${calcDiscount.toFixed(2)}`.replace('.', ',')
    }
    return `${calcDiscount}`
  }

  function getPerMonthAnualPrice() {
    const annualPrice = annualSubscription?.price || 0;
    return `R$ ${(annualPrice / 12).toFixed(2).replace('.', ',')}`
  }

  async function handleAnnualSubscribe() {
    try {
      const purchaseMade = await Purchases.purchasePackage(annualSubscription?.package as PurchasesPackage);

      console.log(JSON.stringify(purchaseMade, null, 2))
      if (typeof purchaseMade.customerInfo.entitlements.active.my_entitlement_identifier !== "undefined") {
        // Activate subscription
      }
    } catch (error) {

    }
  }

  async function handleMonthlySubscribe() {
    try {
      const purchaseMade = await Purchases.purchasePackage(monthlySubscription?.package as PurchasesPackage);

      console.log(JSON.stringify(purchaseMade, null, 2))
      if (typeof purchaseMade.customerInfo.entitlements.active.my_entitlement_identifier !== "undefined") {
        // Activate subscription
      }
    } catch (error) {

    }
  }

  useFocusEffect(useCallback(() => {
    fetchProductsAvailable();
  }, []));

  useEffect(() => {
    setDiscount(getDiscount())
    setPerMonthAnnualPrice(getPerMonthAnualPrice())
  }, [annualSubscription, monthlySubscription]);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} alignItems="center" pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Logo Copy Cash Premium"
          resizeMode="contain"
          position="absolute"
          top={0}
        />

        <Center mt={150}>
          <Text color="gray.100" fontSize="sm">
            Tenha acesso a benefícios exclusivos!
          </Text>
        </Center>

        {isLoadingSubscriptions ?
          <Center
            mt={20}
            w="90%"
            h={291}
            mx={6}
            bg="gray.500"
            borderRadius={8}
            overflow="hidden"
          >
            <Spinner color="primary.600" />
          </Center> :

          <VStack
            mt={20}
            w="90%"
            mx={6}
            bg="gray.500"
            borderRadius={8}
            overflow="hidden"
          >
            <LinearGradient
              style={{ width: '100%', paddingHorizontal: 6, paddingVertical: 10, alignItems: 'center', justifyContent: 'center' }}
              colors={[colors.orange[500], colors.orange[600]]}
              start={[0, 1]} end={[1, 0]}
            >
              <Heading color="gray.100" fontSize="xl" fontFamily="heading">
                Compre com {discount}% de desconto!
              </Heading>
            </LinearGradient>

            <VStack
              px={3}
              py={4}
              w="100%"
            >
              <HStack
                flex={1}
              >
                <Heading
                  flex={1}
                  fontSize="md"
                  color="gray.100"
                >
                  Plano anual ⭐
                </Heading>

                <Heading
                  fontSize="md"
                  color="primary.500"
                >
                  {perMonthAnnualPrice}/m
                </Heading>
              </HStack>

              <Center
                width="100%"
                p={2}
              >
                <Text
                  color="gray.200"
                  fontSize="xs"
                >
                  {annualSubscription?.priceString} por ano - {discount}% de desconto
                </Text>
              </Center>
              <Button
                bg="green.500"
                mt={2}
                _pressed={{
                  bg: 'green.700'
                }}
                onPress={handleAnnualSubscribe}
              >
                Assinar Plano Anual
              </Button>
            </VStack>
            <Divider
              bg="gray.300"
              thickness={2}
            />
            <VStack
              px={3}
              py={4}
              w="100%"
            >
              <HStack
                flex={1}
              >
                <Heading
                  flex={1}
                  fontSize="md"
                  color="gray.100"
                >
                  Plano mensal
                </Heading>

                <Heading
                  fontSize="md"
                  color="primary.500"
                >
                  {monthlySubscription?.priceString.replace('R$', 'R$ ')}/m
                </Heading>
              </HStack>

              <Button
                bg="green.500"
                mt={4}
                _pressed={{
                  bg: 'green.700'
                }}
                onPress={handleMonthlySubscribe}
              >
                Assinar Plano Mensal
              </Button>
            </VStack>
          </VStack>
        }


        <HStack
          space={6}
          alignItems="center"
          my={8}
        >
          <Divider
            bg="gray.400"
            thickness={2}
          />
          <Heading
            color="gray.200"
            fontSize="sm"
          >
            Benefícios
          </Heading>
          <Divider
            bg="gray.400"
            thickness={2}
          />
        </HStack>

        <VStack
          w="90%"
        >
          <HStack space={8}>
            <Icon
              as={MaterialCommunityIcons}
              name="web-clock"
              color="primary.600"
              size={7}
            />

            <VStack>
              <Heading
                fontSize="sm"
                color="gray.100"
              >
                Tempo real!
              </Heading>
              <Text
                fontSize="xs"
                color="gray.200"
              >
                Tenha acesso à sinais de mercado {'\n'}
                assertivos em tempo real {'\n'}
                e em primeira mão!
              </Text>
            </VStack>
          </HStack>

          <HStack space={8} mt={8}>
            <Icon
              as={MaterialIcons}
              name="notifications-active"
              color="primary.600"
              size={7}
            />

            <VStack>
              <Heading
                fontSize="sm"
                color="gray.100"
              >
                Seja avisado!
              </Heading>
              <Text
                fontSize="xs"
                color="gray.200"
              >
                Receba notificações em seu {'\n'}
                dispositivo sempre que for enviado {'\n'}
                um novo sinal de entrada.
              </Text>
            </VStack>
          </HStack>

          <HStack space={8} mt={8}>
            <Icon
              as={MaterialCommunityIcons}
              name="finance"
              color="primary.600"
              size={7}
            />

            <VStack>
              <Heading
                fontSize="sm"
                color="gray.100"
              >
                Fique por dentro!
              </Heading>
              <Text
                fontSize="xs"
                color="gray.200"
              >
                Tenha acesso a aulas, conteúdos {'\n'}
                exlusivos e notícias que podem impactar {'\n'}
                sobre o mercado Forex.
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
};
