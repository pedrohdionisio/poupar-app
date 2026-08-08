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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Navigation } from '@/shared/navigation/Navigation';

export default function App() {
  const [isFontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Archivo_700Bold
  });

  if (!isFontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <Navigation />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
