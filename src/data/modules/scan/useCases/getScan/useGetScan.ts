import { useQuery } from '@tanstack/react-query';
import { ScanQueryKeys } from '../../keys/ScanKeys';
import { ScanService } from '../../services/ScanService';
import type { IScan } from '../../types/Scan';
import type { IUseGetScanOptions } from './interfaces';

/** A extração roda numa fila: o resultado chega por polling, não por resposta. */
const POLL_INTERVAL_IN_MS = 2000;

/**
 * Uma falha isolada de rede no meio do polling não significa que o scan
 * morreu — vale insistir antes de derrubar a tela para o estado de erro.
 */
const POLL_RETRIES = 2;

function isProcessing(scan: IScan | undefined): boolean {
  return scan?.status === 'PENDING' || scan?.status === 'PROCESSING';
}

export function useGetScan({ scanId, enabled = true }: IUseGetScanOptions) {
  const { data, refetch, isLoading, isError, error } = useQuery({
    queryKey: [ScanQueryKeys.GET_SCAN, { scanId }],
    enabled: Boolean(scanId) && enabled,
    queryFn: async () => {
      /** `enabled` já barra o `null`; a guarda existe para o tipo, não para o fluxo. */
      if (!scanId) {
        throw new Error('scanId é obrigatório para consultar o scan');
      }

      return await ScanService.getScan(scanId);
    },
    retry: POLL_RETRIES,
    /**
     * `state.data` guarda o último `PENDING` bem-sucedido mesmo depois de a
     * query falhar: sem olhar o `status`, o polling continuaria em cima de um
     * erro e a tela pularia sozinha de volta para o spinner quando a rede
     * voltasse.
     */
    refetchInterval: ({ state }) =>
      state.status !== 'error' && isProcessing(state.data) ? POLL_INTERVAL_IN_MS : false
  });

  return {
    scan: data,
    loadScan: refetch,
    isLoadingScan: isLoading,
    hasScanError: isError,
    scanError: error
  };
}
