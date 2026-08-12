import { AppText } from '@presentation/components/AppText/AppText';
import { ScreenLayout } from '@presentation/layouts/ScreenLayout/ScreenLayout';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { ScanActions } from './components/ScanActions/ScanActions';
import { ScanCameraCard } from './components/ScanCameraCard/ScanCameraCard';
import { ScanLoading } from './components/ScanLoading/ScanLoading';
import { ScanPermissionNotice } from './components/ScanPermissionNotice/ScanPermissionNotice';
import { ScanStepper } from './components/ScanStepper/ScanStepper';
import { useScanController } from './useScanController';

export function Scan() {
  const {
    currentStep,
    permissionStatus,
    canAskAgain,
    isCameraActive,
    isTorchOn,
    handleBarcodeScanned,
    handleClosePress,
    handleToggleTorchPress,
    handleAllowPress,
    handleOpenSettingsPress
  } = useScanController();

  return (
    <ScreenLayout className='bg-grays-50'>
      <StatusBar style='dark' />

      <ScanStepper currentStep={currentStep} />

      {/*
       * A câmera fica num card centralizado em vez de sangrar a tela: mantém o
       * alvo óbvio e libera o rodapé para os controles, ao alcance do polegar.
       */}
      <View className='flex-1 justify-center gap-6 px-5'>
        {permissionStatus === 'checking' && <ScanLoading />}

        {permissionStatus === 'granted' && (
          <>
            <ScanCameraCard
              isCameraActive={isCameraActive}
              isTorchOn={isTorchOn}
              onBarcodeScanned={handleBarcodeScanned}
            />

            <AppText size='sm' color='muted' align='center'>
              Posicione o QR code da sua nota fiscal dentro do quadro para escanear.
            </AppText>
          </>
        )}

        {permissionStatus === 'denied' && (
          <ScanPermissionNotice
            canAskAgain={canAskAgain}
            onAllowPress={handleAllowPress}
            onOpenSettingsPress={handleOpenSettingsPress}
          />
        )}
      </View>

      <ScanActions
        isTorchVisible={permissionStatus === 'granted'}
        isTorchOn={isTorchOn}
        onToggleTorchPress={handleToggleTorchPress}
        onCancelPress={handleClosePress}
      />
    </ScreenLayout>
  );
}
