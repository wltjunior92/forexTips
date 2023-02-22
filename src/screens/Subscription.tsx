import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button, Center, Divider, Heading, HStack, Icon, Image, ScrollView, Spinner, Text, useTheme, useToast, VStack } from "native-base";
import Purchases, { PurchasesPackage } from 'react-native-purchases';
import firestore from '@react-native-firebase/firestore';

import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { IProduct } from "src/interfaces/IProduct";

import BackgroundImg from '@assets/background-subscription.png';
import { useAuth } from "@hooks/useAuth";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { updateUserSubscriptionStatus } from "@services/updateUserSubscriptionStatus";
import { tagActiveSubscription } from "@services/notificationsTags";

export function Subscription() {
  const [isLoadingSubscriptions, setIsLoadingSubscriptions] = useState(true);
  const [isRequestingSubscription, setIsRequestingSubscription] = useState(false);
  const [annualSubscription, setAnnualSubscription] = useState<IProduct | null>(null);
  const [monthlySubscription, setMonthlySubscription] = useState<IProduct | null>(null);
  const [discount, setDiscount] = useState('');
  const [perMonthAnnualPrice, setPerMonthAnnualPrice] = useState('');

  const { colors } = useTheme();
  const { user, setValidSubscriptionAction, setCustomerInfoAction } = useAuth();

  const toast = useToast();

  const navigator = useNavigation<AppNavigatorRoutesProps>();

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
        title: 'Não foi possível carregar as nossas ofertas. Por favor, tente novamente.',
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

  async function activateSubscription() {
    await updateUserSubscriptionStatus(user?.uid as string, true, setValidSubscriptionAction);
    tagActiveSubscription('true');

    navigator.navigate('home');
  }

  async function handleAnnualSubscribe() {
    setIsRequestingSubscription(true);
    try {
      if (!annualSubscription?.package) throw new Error()
      const purchaseMade = await Purchases.purchasePackage(annualSubscription?.package as PurchasesPackage);

      if (typeof purchaseMade.customerInfo.entitlements.active.premium !== "undefined") {
        await activateSubscription();
        setCustomerInfoAction(purchaseMade.customerInfo);
      }
    } catch (error) {
      const err = error as unknown as Error;
      if (err.message === 'The device or user is not allowed to make the purchase.') {
        toast.show({
          title: 'Não foi possível concluir a compra. Por favor, verifique a forma de pagamento selecionada e tente novamente.',
          placement: 'top',
          bg: 'red.500'
        })
      } else if (err.message !== 'This product is already active for the user.'
        && err.message !== 'Purchase was cancelled.') {
        toast.show({
          title: 'Não foi possível solicitar a compra. Por favor, tente novamente mais tarde.',
          placement: 'top',
          bg: 'red.500'
        })
      }
    } finally {
      setIsRequestingSubscription(false);
    }
  }

  async function handleMonthlySubscribe() {
    setIsRequestingSubscription(true)
    try {
      if (!monthlySubscription?.package) throw new Error()
      const purchaseMade = await Purchases.purchasePackage(monthlySubscription?.package as PurchasesPackage);

      if (typeof purchaseMade.customerInfo.entitlements.active.premium !== "undefined") {
        await activateSubscription();
        setCustomerInfoAction(purchaseMade.customerInfo);
      }
    } catch (error) {
      const err = error as unknown as Error;
      if (err.message === 'The device or user is not allowed to make the purchase.') {
        toast.show({
          title: 'Não foi possível concluir a compra. Por favor, verifique a forma de pagamento selecionada e tente novamente.',
          placement: 'top',
          bg: 'red.500'
        })
      } else if (err.message !== 'This product is already active for the user.'
        && err.message !== 'Purchase was cancelled.') {
        toast.show({
          title: 'Não foi possível solicitar a compra. Por favor, tente novamente mais tarde.',
          placement: 'top',
          bg: 'red.500'
        })
      }
    } finally {
      setIsRequestingSubscription(false);
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
                isDisabled={isRequestingSubscription}
              >
                {
                  isRequestingSubscription ?
                    <Spinner
                      color="gray.100"
                    /> :
                    <Text
                      color='white'
                      fontSize="sm"
                    >
                      Assinar Plano Anual
                    </Text>
                }
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
                isDisabled={isRequestingSubscription}
              >
                {
                  isRequestingSubscription ?
                    <Spinner
                      color="gray.100"
                    /> :
                    <Text
                      color='white'
                      fontSize="sm"
                    >
                      Assinar Plano Mensal
                    </Text>
                }
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
