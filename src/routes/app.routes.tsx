import { useCallback } from 'react';
import { Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';

import { Educational } from '@screens/Educational';
import { Feed } from '@screens/Feed';
import { Home } from '@screens/Home';
import { Tools } from '@screens/Tools';
import { TradeChart } from '@screens/TradeChart';

import HomeSvg from '@assets/home.svg';
import BookSvg from '@assets/book.svg';
import SignalsSvg from '@assets/signals.svg';
import ChartSvg from '@assets/chart.svg';
import ToolsSvg from '@assets/tools.svg';
import { Calculator } from '@screens/Calculator';
import { AddSignal } from '@screens/AddSignal';
import { UserSettings } from '@screens/UserSettings';
import { AddPost } from '@screens/AddPost';
import { tagUserStatus } from '@services/notificationsTags';

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
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const iconSize = sizes[6];

  useFocusEffect(useCallback(() => {
    tagUserStatus('user_logged_in')
  }, []));

  return (
    <Navigator
      initialRouteName='home'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingBottom: sizes[10],
          paddingTop: sizes[6],
        },
        tabBarIconStyle: {
          flex: 1,
          backgroundColor: 'red',
        }
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
          )
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
          )
        }}
      />
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <SignalsSvg
              stroke={color}
              strokeWidth='20'
              width={iconSize}
              height={iconSize}
            />
          )
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
          )
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
          )
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
    </Navigator>
  );
};
