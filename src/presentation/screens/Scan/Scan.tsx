import { AppText } from '@presentation/components/AppText/AppText';
import { ScreenLayout } from '@presentation/layouts/ScreenLayout/ScreenLayout';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { ScanActions } from './components/ScanActions/ScanActions';
import { ScanCameraCard } from './components/ScanCameraCard/ScanCameraCard';
import { ScanDraftSummary } from './components/ScanDraftSummary/ScanDraftSummary';
import { ScanFailure } from './components/ScanFailure/ScanFailure';
import { ScanLoading } from './components/ScanLoading/ScanLoading';
import { ScanPermissionNotice } from './components/ScanPermissionNotice/ScanPermissionNotice';
import { ScanStepper } from './components/ScanStepper/ScanStepper';
import { ScanSuccess } from './components/ScanSuccess/ScanSuccess';
import { useScanController } from './useScanController';

export function Scan() {
  const {
    cameraRef,
    phase,
    photoUri,
    currentStep,
    permissionStatus,
    canAskAgain,
    isCameraActive,
    isCameraPhase,
    isProcessingPhoto,
    isSummaryPhase,
    isTorchVisible,
    isTorchOn,
    caption,
    draft,
    confirmedScan,
    failureMessage,
    primaryAction,
    secondaryActions,
    isPrimaryLoading,
    handleAllowPress,
    handleOpenSettingsPress,
    handleToggleTorchPress
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

        {permissionStatus === 'denied' && (
          <ScanPermissionNotice
            canAskAgain={canAskAgain}
            onAllowPress={handleAllowPress}
            onOpenSettingsPress={handleOpenSettingsPress}
          />
        )}

        {permissionStatus === 'granted' && (
          <>
            {isCameraPhase && (
              <>
                <ScanCameraCard
                  cameraRef={cameraRef}
                  photoUri={photoUri}
                  isCameraActive={isCameraActive}
                  isTorchOn={isTorchOn}
                  isProcessing={isProcessingPhoto}
                />

                {caption && (
                  <AppText size='sm' color='muted' align='center'>
                    {caption}
                  </AppText>
                )}
              </>
            )}

            {/* A revisão continua visível durante o confirm: o spinner do
                botão já sinaliza a espera, e trocar o resumo por outra tela
                esconderia justamente o que o usuário acabou de aprovar. */}
            {isSummaryPhase && draft && <ScanDraftSummary draft={draft} />}

            {phase === 'done' && confirmedScan && (
              <ScanSuccess confirmedScan={confirmedScan} />
            )}

            {phase === 'failure' && (
              <ScanFailure
                title={failureMessage.title}
                description={failureMessage.description}
              />
            )}
          </>
        )}
      </View>

      <ScanActions
        isTorchVisible={isTorchVisible}
        isTorchOn={isTorchOn}
        onToggleTorchPress={handleToggleTorchPress}
        primaryAction={primaryAction}
        secondaryActions={secondaryActions}
        isPrimaryLoading={isPrimaryLoading}
      />
    </ScreenLayout>
  );
}
