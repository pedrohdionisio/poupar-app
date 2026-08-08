import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
  type NativeStackScreenProps
} from '@react-navigation/native-stack';
import { AppText } from '@/presentation/components/AppText/AppText';
import { ScreenLayout } from '@/presentation/layouts/ScreenLayout/ScreenLayout';
import { Login } from '@/presentation/screens/Login/Login';

type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  ResetPassword: { email: string };
  Home: undefined;
};

export type AuthStackNavigationProps = NativeStackNavigationProp<AuthStackParamList>;

export type AuthStackScreenProps<TRouteName extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, TRouteName>;

export type AuthStackRouteProps<TRouteName extends keyof AuthStackParamList> = RouteProp<
  AuthStackParamList,
  TRouteName
>;

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='Login'
      screenLayout={({ children }) => <ScreenLayout>{children}</ScreenLayout>}
    >
      <Stack.Screen
        name='Login'
        component={Login}
        layout={({ children }) => (
          <ScreenLayout edges={[]} className='bg-transparent'>
            {children}
          </ScreenLayout>
        )}
      />
      <Stack.Screen
        name='ForgotPassword'
        component={() => <AppText>ForgotPassword</AppText>}
      />
      <Stack.Screen
        name='ResetPassword'
        component={() => <AppText>ResetPassword</AppText>}
      />
      <Stack.Screen name='Home' component={() => <AppText>Home</AppText>} />
    </Stack.Navigator>
  );
}
