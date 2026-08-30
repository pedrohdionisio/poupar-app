import { useMutation } from '@tanstack/react-query';
import { ScanMutationKeys } from '../../keys/ScanKeys';
import { ScanService } from '../../services/ScanService';
import type { ISendScanPhotoPayload } from './interfaces';

/**
 * Criar o scan e subir a foto são um gesto só para o usuário — a API separa em
 * duas chamadas apenas porque o upload vai assinado, direto para o S3. O POST
 * no bucket dispara o processamento sozinho, por evento; não há terceira
 * chamada para acionar a extração.
 */
export function useSendScanPhoto() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: [ScanMutationKeys.SEND_SCAN_PHOTO],
    mutationFn: async ({ merchantId, photoUri, contentType }: ISendScanPhotoPayload) => {
      const { scanId, uploadSignature } = await ScanService.createScan({
        merchantId,
        contentType
      });

      await ScanService.uploadScanPhoto({ uploadSignature, photoUri, contentType });

      return scanId;
    }
  });

  return {
    sendScanPhoto: mutateAsync,
    isSendingScanPhoto: isPending
  };
}
