import { useIsFocused, useNavigation } from '@react-navigation/native';
import { type BarcodeScanningResult, useCameraPermissions } from 'expo-camera';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Linking } from 'react-native';
import type { AppStackNavigationProps } from '@/shared/navigation/AppStack';
import type { ScanPermissionStatus, ScanStep } from './interfaces';

export function useScanController() {
  const navigation = useNavigation<AppStackNavigationProps>();
  const isFocused = useIsFocused();

  const [permission, requestPermission] = useCameraPermissions();
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);

  // `onBarcodeScanned` dispara várias vezes por segundo enquanto o QR estiver no
  // enquadramento: sem o guard, a mesma nota seria processada N vezes.
  const hasScannedRef = useRef(false);
  const hasRequestedPermissionRef = useRef(false);

  const askForPermission = useCallback(async () => {
    setIsRequestingPermission(true);
    await requestPermission();
    setIsRequestingPermission(false);
  }, [requestPermission]);

  // O usuário chegou aqui tocando em "Escanear nota", então a intenção já está
  // clara — pedir a permissão de cara evita uma tela intermediária redundante.
  useEffect(() => {
    if (!permission || permission.granted || !permission.canAskAgain) return;
    if (hasRequestedPermissionRef.current) return;

    hasRequestedPermissionRef.current = true;
    askForPermission();
  }, [permission, askForPermission]);

  let permissionStatus: ScanPermissionStatus = 'denied';
  if (!permission || isRequestingPermission) permissionStatus = 'checking';
  else if (permission.granted) permissionStatus = 'granted';

  // TODO: avançar para `process` e `done` quando a nota for enviada ao backend.
  const currentStep: ScanStep = 'scan';

  function handleBarcodeScanned({ data }: BarcodeScanningResult) {
    if (hasScannedRef.current) return;
    hasScannedRef.current = true;

    // TODO: extrair a chave de acesso da URL, validar e enviar para o backend.
    console.log('[Scan] URL da nota:', data);

    navigation.goBack();
  }

  function handleManualPress() {
    navigation.navigate('ManualPurchase');
  }

  function handleClosePress() {
    navigation.goBack();
  }

  function handleToggleTorchPress() {
    setIsTorchOn((current) => !current);
  }

  function handleOpenSettingsPress() {
    // Depois de um "não" definitivo, o sistema não exibe mais o prompt.
    Linking.openSettings();
  }

  return {
    currentStep,
    permissionStatus,
    canAskAgain: permission?.canAskAgain ?? false,
    isCameraActive: isFocused && permissionStatus === 'granted',
    isTorchOn,
    handleBarcodeScanned,
    handleClosePress,
    handleManualPress,
    handleToggleTorchPress,
    handleAllowPress: askForPermission,
    handleOpenSettingsPress
  };
}
