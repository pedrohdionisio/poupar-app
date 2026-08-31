import { AppText } from '@presentation/components/AppText/AppText';
import { MerchantFormBottomSheet } from '@presentation/components/MerchantFormBottomSheet/MerchantFormBottomSheet';
import { ScreenLayout } from '@presentation/layouts/ScreenLayout/ScreenLayout';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
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

const CONTENT_GAP = 24;
const HORIZONTAL_PADDING = 20;

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
    isGalleryVisible,
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
    handlePickFromGalleryPress,
    handleMerchantSelect,
    handleCreateMerchantPress,
    handleMerchantSaved
  } = useScanController();

  return (
    <ScreenLayout className='bg-grays-50'>
      <StatusBar style='dark' />

      <ScanStepper currentStep={currentStep} />

      {/*
       * A escolha do estabelecimento fica fora do ScrollView: o `MerchantPicker`
       * é uma `FlatList`, e lista virtualizada dentro de scroll da mesma direção
       * perde a virtualização. Ela já rola sozinha e quer o topo, não o meio.
       */}
      {permissionStatus === 'granted' && isMerchantPhase ? (
        <View className='flex-1 gap-6 px-5'>
          <ScanMerchantStep
            selectedMerchantId={selectedMerchantId}
            onSelect={handleMerchantSelect}
            onCreatePress={handleCreateMerchantPress}
          />
        </View>
      ) : (
        /*
         * A câmera fica num card centralizado em vez de sangrar a tela: mantém o
         * alvo óbvio e libera o rodapé para os controles, ao alcance do polegar.
         * O card é quadrado e não encolhe, então em tela baixa ele passava por
         * cima do rodapé — `flexGrow` centraliza enquanto sobra espaço e deixa
         * rolar quando falta.
         */
        <ScrollView
          className='flex-1'
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            gap: CONTENT_GAP,
            paddingHorizontal: HORIZONTAL_PADDING
          }}
          showsVerticalScrollIndicator={false}
        >
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
        </ScrollView>
      )}

      <ScanActions
        isTorchVisible={isTorchVisible}
        isTorchOn={isTorchOn}
        onToggleTorchPress={handleToggleTorchPress}
        isGalleryVisible={isGalleryVisible}
        onPickFromGalleryPress={handlePickFromGalleryPress}
        primaryAction={primaryAction}
        secondaryActions={secondaryActions}
        isPrimaryLoading={isPrimaryLoading}
      />

      <MerchantFormBottomSheet ref={merchantFormRef} onSaved={handleMerchantSaved} />
    </ScreenLayout>
  );
}
