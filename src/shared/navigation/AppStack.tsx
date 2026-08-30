import type { IPurchase } from '@data/modules/purchase/types/Purchase';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ScreenLayout } from '@presentation/layouts/ScreenLayout/ScreenLayout';
import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
  type NativeStackScreenProps
} from '@react-navigation/native-stack';
import type { PropsWithChildren } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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

/**
 * Uma tela `fullScreenModal` vira um container nativo próprio, apresentado por
 * cima da view raiz do RN. O `BottomSheetModal` faz portal para o host do
 * `BottomSheetModalProvider` mais próximo — e o do `App.tsx` está justamente
 * naquela raiz, ou seja, atrás do modal: o sheet abre, mas ninguém vê nem
 * consegue tocar. O provider aninhado põe o host dentro do modal, e o
 * `GestureHandlerRootView` é o que faz o arrastar do sheet ser reconhecido lá
 * dentro. Vale para toda tela empilhada como modal.
 */
function ModalScreenLayout({ children }: PropsWithChildren) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

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
        layout={ModalScreenLayout}
      />
      <Stack.Screen
        name='Scan'
        component={Scan}
        options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }}
        layout={ModalScreenLayout}
      />
    </Stack.Navigator>
  );
}
