import {
  type BottomTabNavigationProp,
  type BottomTabScreenProps,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';
import { CustomTabBar } from '@/presentation/components/CustomTabBar/CustomTabBar';
import { Merchants } from '@/presentation/screens/Merchants/Merchants';
import { Profile } from '@/presentation/screens/Profile/Profile';
import { Receipts } from '@/presentation/screens/Receipts/Receipts';
import { Scan } from '@/presentation/screens/Scan/Scan';
import { Statistics } from '@/presentation/screens/Statistics/Statistics';

/**
 * A ordem das rotas define a posição na tab bar: a rota do meio (`Scan`) é
 * renderizada como o botão central elevado pelo `CustomTabBar`.
 */
type AppTabParamList = {
  Receipts: undefined;
  Statistics: undefined;
  Scan: undefined;
  Merchants: undefined;
  Profile: undefined;
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
      initialRouteName='Receipts'
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name='Receipts' component={Receipts} />
      <Tab.Screen name='Statistics' component={Statistics} />
      <Tab.Screen name='Scan' component={Scan} />
      <Tab.Screen name='Merchants' component={Merchants} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  );
}
