import type { IPurchase } from '@data/modules/purchase/types/Purchase';
import { ScreenLayout } from '@presentation/layouts/ScreenLayout/ScreenLayout';
import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
  type NativeStackScreenProps
} from '@react-navigation/native-stack';
import { ManualPurchase } from '@/presentation/screens/ManualPurchase/ManualPurchase';
import { PurchaseDetail } from '@/presentation/screens/PurchaseDetail/PurchaseDetail';
import { Scan } from '@/presentation/screens/Scan/Scan';
import { AppTabNavigator } from './AppTabNavigator';

type AppStackParamList = {
  AppTabs: undefined;
  Scan: undefined;
  ManualPurchase: undefined;
  /**
   * A compra viaja inteira no param porque a API não tem `GET /purchases/{id}`:
   * só a listagem devolve esses campos. O detalhe busca apenas os itens.
   */
  PurchaseDetail: { purchase: IPurchase };
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
      <Stack.Screen
        name='AppTabs'
        component={AppTabNavigator}
        layout={({ children }) => <ScreenLayout edges={['top']}>{children}</ScreenLayout>}
      />
      <Stack.Screen name='PurchaseDetail' component={PurchaseDetail} />
      <Stack.Screen
        name='ManualPurchase'
        component={ManualPurchase}
        options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }}
        layout={({ children }) => <>{children}</>}
      />
      <Stack.Screen
        name='Scan'
        component={Scan}
        options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }}
        layout={({ children }) => <>{children}</>}
      />
    </Stack.Navigator>
  );
}
