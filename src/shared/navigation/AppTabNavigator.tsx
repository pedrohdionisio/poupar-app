import {
  type BottomTabNavigationProp,
  type BottomTabScreenProps,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';
import { AppText } from '@/presentation/components/AppText/AppText';
import { CustomTabBar } from '@/presentation/components/CustomTabBar/CustomTabBar';

type AppTabParamList = {
  Orders: undefined;
  Home: undefined;
  Notifications: undefined;
};

export type AppTabNavigationProps = BottomTabNavigationProp<AppTabParamList>;

export type AppTabScreenProps<TRouteName extends keyof AppTabParamList> =
  BottomTabScreenProps<AppTabParamList, TRouteName>;

export type AppTabRouteProps<TRouteName extends keyof AppTabParamList> = RouteProp<
  AppTabParamList,
  TRouteName
>;

const Tab = createBottomTabNavigator<AppTabParamList>();

export function AppTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='Home'
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name='Orders' component={() => <AppText>OrderCreated</AppText>} />
      <Tab.Screen name='Home' component={() => <AppText>OrderCreated</AppText>} />
      <Tab.Screen
        name='Notifications'
        component={() => <AppText>OrderCreated</AppText>}
      />
    </Tab.Navigator>
  );
}
