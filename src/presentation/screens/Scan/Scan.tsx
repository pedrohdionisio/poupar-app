import { AppText } from '@presentation/components/AppText/AppText';
import { MerchantFormBottomSheet } from '@presentation/components/MerchantFormBottomSheet/MerchantFormBottomSheet';
import { ScreenLayout } from '@presentation/layouts/ScreenLayout/ScreenLayout';
import { cn } from '@shared/utils/cn';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { ScanActions } from './components/ScanActions/ScanActions';
import { ScanCameraCard } from './components/ScanCameraCard/ScanCameraCard';
import { ScanDraftSummary } from './components/ScanDraftSummary/ScanDraftSummary';
import { ScanFailure } from './components/ScanFailure/ScanFailure';
import { ScanLoading } from './components/ScanLoading/ScanLoading';
import { ScanMerchantStep } from './components/ScanMerchantStep/ScanMerchantStep';
import { ScanPermissionNotice } from './components/ScanPermissionNotice/ScanPermissionNotice';
import { ScanStepper } from './components/ScanStepper/ScanStepper';
import { ScanSuccess } from './components/ScanSuccess/ScanSuccess';
import { useScanController } from './useScanController';

export function Scan() {
  const {
    cameraRef,
    merchantFormRef,
    phase,
    photoUri,
    currentStep,
    permissionStatus,
    canAskAgain,
    selectedMerchantId,
    isCameraActive,
    isMerchantPhase,
    isCameraPhase,
    isProcessingPhoto,
    isSummaryPhase,
    isTorchVisible,
    isTorchOn,
    caption,
    draft,
    merchantName,
    confirmedScan,
    failureMessage,
    primaryAction,
    secondaryActions,
    isPrimaryLoading,
    handleAllowPress,
    handleOpenSettingsPress,
    handleToggleTorchPress,
    handleMerchantSelect,
    handleCreateMerchantPress,
    handleMerchantSaved
  } = useScanController();

  return (
    <ScreenLayout className='bg-grays-50'>
      <StatusBar style='dark' />

      <ScanStepper currentStep={currentStep} />

      {/*
       * A câmera fica num card centralizado em vez de sangrar a tela: mantém o
       * alvo óbvio e libera o rodapé para os controles, ao alcance do polegar.
       * A escolha do estabelecimento é uma lista e precisa do topo, não do meio.
       */}
      <View className={cn('flex-1 gap-6 px-5', !isMerchantPhase && 'justify-center')}>
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
            {isMerchantPhase && (
              <ScanMerchantStep
                selectedMerchantId={selectedMerchantId}
                onSelect={handleMerchantSelect}
                onCreatePress={handleCreateMerchantPress}
              />
            )}

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
            {isSummaryPhase && draft && (
              <ScanDraftSummary draft={draft} merchantName={merchantName} />
            )}

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

      <MerchantFormBottomSheet ref={merchantFormRef} onSaved={handleMerchantSaved} />
    </ScreenLayout>
  );
}
