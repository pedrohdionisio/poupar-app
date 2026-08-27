import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
  Archivo_700Bold
} from '@expo-google-fonts/archivo';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts
} from '@expo-google-fonts/inter';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '@/styles/global.css';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { queryClient } from '@/data/config/queryClient';
import { AuthProvider } from '@/data/contexts/AuthProvider';
import { Navigation } from '@/shared/navigation/Navigation';

export default function App() {
  const [isFontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Archivo_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold
  });

  if (!isFontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <AuthProvider>
              <Navigation />
            </AuthProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
