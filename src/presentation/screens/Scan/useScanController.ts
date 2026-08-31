import type { IMerchant } from '@data/modules/merchant/types/Merchant';
import { useListMerchants } from '@data/modules/merchant/useCases/listMerchants/useListMerchants';
import {
  getScanErrorMessage,
  getScanFailureMessage
} from '@data/modules/scan/constants/scanErrorMessages';
import type { IConfirmedScan } from '@data/modules/scan/types/Scan';
import type { ScanContentType } from '@data/modules/scan/types/ScanTypes';
import { useConfirmScan } from '@data/modules/scan/useCases/confirmScan/useConfirmScan';
import { useGetScan } from '@data/modules/scan/useCases/getScan/useGetScan';
import { useSendScanPhoto } from '@data/modules/scan/useCases/sendScanPhoto/useSendScanPhoto';
import type { IMerchantFormBottomSheet } from '@presentation/components/MerchantFormBottomSheet/interfaces';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import type { AppStackNavigationProps } from '@shared/navigation/AppStack';
import { useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Linking } from 'react-native';
import type { IScanCamera } from './components/ScanCamera/interfaces';
import type { IScanAction, ScanPermissionStatus, ScanPhase } from './interfaces';
import {
  getScanContentType,
  getScanPhase,
  getScanStep,
  isCameraPhase,
  SCAN_PHASE_CAPTION
} from './utils';

/** A câmera nativa entrega JPEG; `imageType` só vale na web. */
const PHOTO_CONTENT_TYPE: ScanContentType = 'image/jpeg';

/**
 * `compatible` faz o iOS transcodificar o HEIC da galeria para JPEG. Sem isso a
 * foto sobe no formato original, que a API não assina — e o upload é recusado
 * pelo S3 depois do usuário já ter escolhido a imagem.
 */
const GALLERY_PICKER_OPTIONS: ImagePicker.ImagePickerOptions = {
  mediaTypes: 'images',
  preferredAssetRepresentationMode:
    ImagePicker.UIImagePickerPreferredAssetRepresentationMode.Compatible
};

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
  const merchantFormRef = useRef<IMerchantFormBottomSheet>(null);
  const hasRequestedPermissionRef = useRef(false);

  const [permission, requestPermission] = useCameraPermissions();
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);
  /**
   * Dois estados de propósito: `selectedMerchantId` é o que está marcado na
   * lista e `merchantId` é o que o usuário confirmou. Sem a separação, tocar
   * num item já jogaria a tela para a câmera, sem chance de revisar a escolha.
   */
  const [selectedMerchantId, setSelectedMerchantId] = useState<string | null>(null);
  const [merchantId, setMerchantId] = useState<string | null>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [scanId, setScanId] = useState<string | null>(null);
  const [isSendingPhoto, setIsSendingPhoto] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [confirmedScan, setConfirmedScan] = useState<IConfirmedScan | null>(null);

  /**
   * Mesma query que o seletor consome — o React Query serve as duas da mesma
   * entrada de cache. Ela vive aqui para o nome do estabelecimento sobreviver à
   * desmontagem do seletor, já que o resumo da nota precisa exibi-lo.
   */
  const { merchants } = useListMerchants();

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
    hasMerchant: Boolean(merchantId),
    scan,
    scanId
  });

  useEffect(() => {
    if (phase !== 'processing') return;

    const timeoutId = setTimeout(() => setHasTimedOut(true), PROCESSING_TIMEOUT_IN_MS);

    return () => clearTimeout(timeoutId);
  }, [phase]);

  function handleMerchantSelect(merchant: IMerchant) {
    setSelectedMerchantId(merchant.id);
  }

  function handleCreateMerchantPress() {
    merchantFormRef.current?.open();
  }

  /** O recém-cadastrado já entra marcado: foi para usá-lo que o sheet abriu. */
  function handleMerchantSaved(savedMerchantId: string) {
    setSelectedMerchantId(savedMerchantId);
  }

  function handleContinuePress() {
    /** O botão fica desabilitado sem escolha; a guarda é para o tipo. */
    if (!selectedMerchantId) return;

    setMerchantId(selectedMerchantId);
  }

  function handleChangeMerchantPress() {
    setMerchantId(null);
  }

  /** Repetir a foto não pede o estabelecimento de novo: ele continua valendo. */
  function handleRetryPress() {
    setPhotoUri(null);
    setScanId(null);
    setHasTimedOut(false);
    setConfirmedScan(null);
  }

  /**
   * Onde a câmera e a galeria se encontram: de onde a foto veio não muda nada
   * daqui para a frente — ela sobe, vira scan e o polling assume.
   */
  async function uploadPhoto(
    uri: string,
    contentType: ScanContentType,
    photoMerchantId: string
  ) {
    setPhotoUri(uri);
    /** Lanterna acesa com a câmera já desmontada só esquenta o aparelho. */
    setIsTorchOn(false);

    const createdScanId = await sendScanPhoto({
      merchantId: photoMerchantId,
      photoUri: uri,
      contentType
    });

    setScanId(createdScanId);
  }

  async function handleTakePhotoPress() {
    /** A fase de captura só existe com o estabelecimento confirmado. */
    if (!merchantId) return;

    setIsSendingPhoto(true);

    try {
      const uri = await cameraRef.current?.takePhoto();

      if (!uri) {
        Alert.alert('Oops!', 'Não foi possível tirar a foto. Tente de novo.');

        return;
      }

      await uploadPhoto(uri, PHOTO_CONTENT_TYPE, merchantId);
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

  async function handlePickFromGalleryPress() {
    /** Mesma exigência da câmera: o scan nasce preso ao estabelecimento. */
    if (!merchantId) return;

    const result = await ImagePicker.launchImageLibraryAsync(GALLERY_PICKER_OPTIONS);

    /** Desistir da escolha não é erro: a tela fica exatamente como estava. */
    if (result.canceled) return;

    const asset = result.assets.at(0);

    if (!asset) return;

    const contentType = getScanContentType(asset.mimeType);

    if (!contentType) {
      Alert.alert('Oops!', 'Escolha uma imagem em JPG ou PNG.');

      return;
    }

    setIsSendingPhoto(true);

    try {
      await uploadPhoto(asset.uri, contentType, merchantId);
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

  const continueAction: IScanAction = {
    label: 'Continuar',
    onPress: handleContinuePress,
    isDisabled: !selectedMerchantId
  };
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
  const changeMerchantAction: IScanAction = {
    label: 'Trocar estabelecimento',
    onPress: handleChangeMerchantPress
  };
  const cancelAction: IScanAction = { label: 'Cancelar', onPress: handleClosePress };
  const discardAction: IScanAction = { label: 'Descartar', onPress: handleClosePress };

  const primaryActionByPhase: Record<ScanPhase, IScanAction | null> = {
    merchant: continueAction,
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
    merchant: [cancelAction],
    capture: [changeMerchantAction, manualAction, cancelAction],
    sending: [cancelAction],
    processing: [cancelAction],
    review: [discardAction],
    confirming: [],
    done: [],
    failure: failureMessage.canRetry ? [manualAction, cancelAction] : []
  };

  return {
    cameraRef,
    merchantFormRef,
    phase,
    photoUri,
    currentStep: getScanStep(phase),
    permissionStatus,
    canAskAgain: permission?.canAskAgain ?? false,
    selectedMerchantId,
    isCameraActive: isFocused && permissionStatus === 'granted' && !photoUri,
    isMerchantPhase: phase === 'merchant',
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
    isGalleryVisible: permissionStatus === 'granted' && phase === 'capture',
    caption: SCAN_PHASE_CAPTION[phase],
    draft: scan?.draft ?? null,
    merchantName: merchants?.find((merchant) => merchant.id === merchantId)?.name ?? null,
    confirmedScan,
    failureMessage,
    /** Sem permissão a tela não tem fluxo: a única saída é fechar o modal. */
    primaryAction: permissionStatus === 'granted' ? primaryActionByPhase[phase] : null,
    secondaryActions:
      permissionStatus === 'granted' ? secondaryActionsByPhase[phase] : [cancelAction],
    isPrimaryLoading: isSendingPhoto || isConfirmingScan,
    handleAllowPress: askForPermission,
    handleOpenSettingsPress,
    handleToggleTorchPress,
    handlePickFromGalleryPress,
    handleMerchantSelect,
    handleCreateMerchantPress,
    handleMerchantSaved
  };
}
