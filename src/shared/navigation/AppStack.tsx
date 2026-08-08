import { ScreenLayout } from '@presentation/layouts/ScreenLayout/ScreenLayout';
import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
  type NativeStackScreenProps
} from '@react-navigation/native-stack';
import { AppText } from '@/presentation/components/AppText/AppText';
import { AppTabNavigator } from './AppTabNavigator';

type AppStackParamList = {
  AppTabs: undefined;
  Product: undefined;
  OrderCreated: undefined;
};

export type AppStackNavigationProps = NativeStackNavigationProp<AppStackParamList>;

export type AppStackScreenProps<TRouteName extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, TRouteName>;

export type AppStackRouteProps<TRouteName extends keyof AppStackParamList> = RouteProp<
  AppStackParamList,
  TRouteName
>;

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='AppTabs'
      screenLayout={({ children }) => <ScreenLayout>{children}</ScreenLayout>}
    >
      <Stack.Screen name='AppTabs' component={AppTabNavigator} />
      <Stack.Screen name='Product' component={() => <AppText>Product</AppText>} />
      <Stack.Screen
        name='OrderCreated'
        component={() => <AppText>OrderCreated</AppText>}
      />
    </Stack.Navigator>
  );
}
