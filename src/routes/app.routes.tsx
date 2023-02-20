import { useCallback } from 'react';
import { Alert, Platform, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Circle, useTheme } from 'native-base';
import Purchases from 'react-native-purchases';
import firestore from '@react-native-firebase/firestore';

import { Educational } from '@screens/Educational';
import { Feed } from '@screens/Feed';
import { Home } from '@screens/Home';
import { Tools } from '@screens/Tools';
import { TradeChart } from '@screens/TradeChart';

import HomeSvg from '@assets/home.svg';
import BookSvg from '@assets/book.svg';
import LogoSvg from '@assets/logoImg.svg';
import ChartSvg from '@assets/chart.svg';
import ToolsSvg from '@assets/tools.svg';

import { Calculator } from '@screens/Calculator';
import { AddSignal } from '@screens/AddSignal';
import { UserSettings } from '@screens/UserSettings';
import { AddPost } from '@screens/AddPost';
import { tagUserStatus } from '@services/notificationsTags';
import { Subscription } from '@screens/Subscription';
import { useAuth } from '@hooks/useAuth';
import { checkUserSubscriptionStatus } from '@services/checkUserSubscriptionStatus';

type AppRoutes = {
  feed: undefined;
  educational: undefined;
  home: undefined;
  tradeChart: undefined;
  tools: undefined;
  calculator: undefined;
  addSignal: undefined;
  userSettings: undefined;
  addPost: undefined;
  subscription: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const { setValidSubscriptionAction, user, setCustomerInfoAction } = useAuth();

  const iconSize = sizes[6];

  useFocusEffect(useCallback(() => {
    tagUserStatus('user_logged_in');
  }, [user]));

  useFocusEffect(useCallback(() => {
    checkUserSubscriptionStatus(setCustomerInfoAction, user?.uid as string, setValidSubscriptionAction);
  }, []));

  return (
    <Navigator
      initialRouteName='home'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingBottom: sizes[10],
          paddingTop: sizes[6],
          elevation: 10,
          shadowColor: '#fff',
        },
        tabBarHideOnKeyboard: true,
      }} >
      <Screen
        name="feed"
        component={Feed}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg
              stroke={color}
              strokeWidth='20'
              width={iconSize}
              height={iconSize}
            />
          ),
          tabBarAccessibilityLabel: 'Feed',
          tabBarButton: (props) => <TouchableOpacity activeOpacity={0.6} style={{ width: 72, height: 72 }} {...props} />
        }}
      />
      <Screen
        name="educational"
        component={Educational}
        options={{
          tabBarIcon: ({ color }) => (
            <BookSvg
              stroke={color}
              strokeWidth='20'
              width={iconSize}
              height={iconSize}
            />
          ),
          tabBarAccessibilityLabel: 'Educacional',
          tabBarButton: (props) => <TouchableOpacity activeOpacity={0.6} style={{ width: 72, height: 72 }} {...props} />
        }}
      />
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Circle
              size={20}
              bg="gray.600"
              alignItems="center"
              justifyContent="center"
            >
              <LogoSvg
                fill={color}
                width={iconSize + 20}
                height={iconSize + 20}
              />
            </Circle>
          ),
          tabBarAccessibilityLabel: 'Home',
          tabBarButton: (props) => <TouchableOpacity activeOpacity={1} style={{ width: 72, height: 72 }} {...props} />
        }}
      />
      <Screen
        name="tradeChart"
        component={TradeChart}
        options={{
          tabBarIcon: ({ color }) => (
            <ChartSvg
              stroke={color}
              strokeWidth='20'
              width={iconSize}
              height={iconSize}
            />
          ),
          tabBarAccessibilityLabel: 'Cart Trading',
          tabBarButton: (props) => <TouchableOpacity activeOpacity={0.6} style={{ width: 72, height: 72 }} {...props} />
        }}
      />
      <Screen
        name="tools"
        component={Tools}
        options={{
          tabBarIcon: ({ color }) => (
            <ToolsSvg
              stroke={color}
              strokeWidth='20'
              width={iconSize}
              height={iconSize}
            />
          ),
          tabBarAccessibilityLabel: 'Ferramentas',
          tabBarButton: (props) => <TouchableOpacity activeOpacity={0.1} style={{ width: 72, height: 72 }} {...props} />
        }}
      />

      <Screen
        name="calculator"
        component={Calculator}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Screen
        name="addSignal"
        component={AddSignal}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Screen
        name="userSettings"
        component={UserSettings}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Screen
        name="addPost"
        component={AddPost}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Screen
        name="subscription"
        component={Subscription}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
};
