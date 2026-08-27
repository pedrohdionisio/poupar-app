import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
  type NativeStackScreenProps
} from '@react-navigation/native-stack';
import { ScreenLayout } from '@/presentation/layouts/ScreenLayout/ScreenLayout';
import { ForgotPassword } from '@/presentation/screens/ForgotPassword/ForgotPassword';
import { Login } from '@/presentation/screens/Login/Login';
import { ResetPassword } from '@/presentation/screens/ResetPassword/ResetPassword';

type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  ResetPassword: { email: string };
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
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
      <Stack.Screen name='ResetPassword' component={ResetPassword} />
    </Stack.Navigator>
  );
}
