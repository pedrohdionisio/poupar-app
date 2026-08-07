import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import "@/styles/global.css";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 items-center justify-center bg-slate-950">
        <Text className="font-bold text-2xl text-emerald-400">Poupar</Text>
        <Text className="mt-2 text-base text-slate-400">
          Expo + TypeScript + NativeWind
        </Text>
        <StatusBar style="light" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
