import {
  getScanErrorMessage,
  getScanFailureMessage
} from '@data/modules/scan/constants/scanErrorMessages';
import type { IConfirmedScan } from '@data/modules/scan/types/Scan';
import type { ScanContentType } from '@data/modules/scan/types/ScanTypes';
import { useConfirmScan } from '@data/modules/scan/useCases/confirmScan/useConfirmScan';
import { useGetScan } from '@data/modules/scan/useCases/getScan/useGetScan';
import { useSendScanPhoto } from '@data/modules/scan/useCases/sendScanPhoto/useSendScanPhoto';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import type { AppStackNavigationProps } from '@shared/navigation/AppStack';
import { useCameraPermissions } from 'expo-camera';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Linking } from 'react-native';
import type { IScanCamera } from './components/ScanCamera/interfaces';
import type { IScanAction, ScanPermissionStatus, ScanPhase } from './interfaces';
import { getScanPhase, getScanStep, isCameraPhase, SCAN_PHASE_CAPTION } from './utils';

/** A câmera nativa entrega JPEG; `imageType` só vale na web. */
const PHOTO_CONTENT_TYPE: ScanContentType = 'image/jpeg';

/**
 * Uma tentativa da lambda `processScan` tem timeout de 180s na poupar-api, e
 * ela pode tentar até 3 vezes — esperar o pior caso seria esperar 9 minutos.
 * O teto cobre uma tentativa inteira e então a tela desiste: o scan segue vivo
 * no backend, mas segurar o usuário numa tela que só gira é pior do que
 * oferecer tentar de novo.
 */
const PROCESSING_TIMEOUT_IN_MS = 180000;

export function useScanController() {
  const navigation = useNavigation<AppStackNavigationProps>();
  const isFocused = useIsFocused();

  const cameraRef = useRef<IScanCamera>(null);
  const hasRequestedPermissionRef = useRef(false);

  const [permission, requestPermission] = useCameraPermissions();
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [scanId, setScanId] = useState<string | null>(null);
  const [isSendingPhoto, setIsSendingPhoto] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [confirmedScan, setConfirmedScan] = useState<IConfirmedScan | null>(null);

  const { sendScanPhoto } = useSendScanPhoto();
  const { confirmScan, isConfirmingScan } = useConfirmScan();
  const { scan, hasScanError } = useGetScan({
    scanId,
    /** Para o polling assim que a nota é confirmada ou a espera estoura. */
    enabled: !confirmedScan && !hasTimedOut
  });

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

  const phase: ScanPhase = getScanPhase({
    hasConfirmedScan: Boolean(confirmedScan),
    isConfirmingScan,
    isSendingPhoto,
    hasTimedOut,
    hasScanError,
    scan,
    scanId
  });

  useEffect(() => {
    if (phase !== 'processing') return;

    const timeoutId = setTimeout(() => setHasTimedOut(true), PROCESSING_TIMEOUT_IN_MS);

    return () => clearTimeout(timeoutId);
  }, [phase]);

  function handleRetryPress() {
    setPhotoUri(null);
    setScanId(null);
    setHasTimedOut(false);
    setConfirmedScan(null);
  }

  async function handleTakePhotoPress() {
    setIsSendingPhoto(true);

    try {
      const uri = await cameraRef.current?.takePhoto();

      if (!uri) {
        Alert.alert('Oops!', 'Não foi possível tirar a foto. Tente de novo.');

        return;
      }

      setPhotoUri(uri);
      /** Lanterna acesa com a câmera já desmontada só esquenta o aparelho. */
      setIsTorchOn(false);

      const createdScanId = await sendScanPhoto({
        photoUri: uri,
        contentType: PHOTO_CONTENT_TYPE
      });

      setScanId(createdScanId);
    } catch (error) {
      setPhotoUri(null);

      Alert.alert(
        'Oops!',
        getScanErrorMessage(error, 'Não foi possível enviar a foto da nota')
      );
    } finally {
      setIsSendingPhoto(false);
    }
  }

  async function handleConfirmPress() {
    /** O botão só existe na fase de revisão; a guarda é para o tipo. */
    if (!scanId || !scan?.draft) return;

    try {
      const confirmed = await confirmScan({ scanId, draft: scan.draft });

      setConfirmedScan(confirmed);
    } catch (error) {
      Alert.alert(
        'Oops!',
        getScanErrorMessage(error, 'Não foi possível confirmar a nota')
      );
    }
  }

  function handleManualPress() {
    navigation.navigate('ManualPurchase');
  }

  function handleClosePress() {
    navigation.goBack();
  }

  /**
   * `popToTop` desempilha a Scan e devolve o usuário às abas, na aba de onde
   * ele saiu; `navigate` empilharia uma segunda AppTabs por cima do modal.
   */
  function handleFinishPress() {
    navigation.popToTop();
  }

  function handleToggleTorchPress() {
    setIsTorchOn((current) => !current);
  }

  function handleOpenSettingsPress() {
    // Depois de um "não" definitivo, o sistema não exibe mais o prompt.
    Linking.openSettings();
  }

  const failureMessage = getScanFailureMessage({
    errorCode: scan?.errorCode ?? null,
    hasTimedOut
  });

  const takePhotoAction: IScanAction = {
    label: 'Tirar foto da nota',
    onPress: handleTakePhotoPress
  };
  const retryAction: IScanAction = {
    label: 'Tentar de novo',
    onPress: handleRetryPress
  };
  const confirmAction: IScanAction = {
    label: 'Confirmar nota',
    onPress: handleConfirmPress
  };
  const finishAction: IScanAction = { label: 'Concluir', onPress: handleFinishPress };
  const backAction: IScanAction = { label: 'Voltar', onPress: handleClosePress };
  const manualAction: IScanAction = {
    label: 'Cadastrar sem escanear',
    onPress: handleManualPress
  };
  const cancelAction: IScanAction = { label: 'Cancelar', onPress: handleClosePress };
  const discardAction: IScanAction = { label: 'Descartar', onPress: handleClosePress };

  const primaryActionByPhase: Record<ScanPhase, IScanAction | null> = {
    capture: takePhotoAction,
    /** Mantém o botão no lugar, agora girando: some-lo faria a tela pular. */
    sending: takePhotoAction,
    processing: null,
    review: confirmAction,
    confirming: confirmAction,
    done: finishAction,
    failure: failureMessage.canRetry ? retryAction : backAction
  };

  const secondaryActionsByPhase: Record<ScanPhase, IScanAction[]> = {
    capture: [manualAction, cancelAction],
    sending: [cancelAction],
    processing: [cancelAction],
    review: [discardAction],
    confirming: [],
    done: [],
    failure: failureMessage.canRetry ? [manualAction, cancelAction] : []
  };

  return {
    cameraRef,
    phase,
    photoUri,
    currentStep: getScanStep(phase),
    permissionStatus,
    canAskAgain: permission?.canAskAgain ?? false,
    isCameraActive: isFocused && permissionStatus === 'granted' && !photoUri,
    isCameraPhase: isCameraPhase(phase),
    /**
     * A foto é o que está sendo lido: a linha de leitura sobre a câmera ao vivo
     * — entre o toque no obturador e o retorno da captura — diria que estamos
     * lendo algo que ainda não existe.
     */
    isProcessingPhoto: Boolean(photoUri) && phase === 'processing',
    isSummaryPhase: phase === 'review' || phase === 'confirming',
    isTorchVisible: permissionStatus === 'granted' && phase === 'capture',
    isTorchOn,
    caption: SCAN_PHASE_CAPTION[phase],
    draft: scan?.draft ?? null,
    confirmedScan,
    failureMessage,
    /** Sem permissão a tela não tem fluxo: a única saída é fechar o modal. */
    primaryAction: permissionStatus === 'granted' ? primaryActionByPhase[phase] : null,
    secondaryActions:
      permissionStatus === 'granted' ? secondaryActionsByPhase[phase] : [cancelAction],
    isPrimaryLoading: isSendingPhoto || isConfirmingScan,
    handleAllowPress: askForPermission,
    handleOpenSettingsPress,
    handleToggleTorchPress
  };
}
