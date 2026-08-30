import { api, uploadClient } from '@data/config/api';
import type {
  IConfirmedScan,
  IConfirmScanPayload,
  ICreatedScan,
  IScan,
  IUploadScanPhotoPayload
} from '../types/Scan';
import type {
  IConfirmScanResponse,
  ICreateScanPayload,
  ICreateScanResponse,
  IGetScanResponse
} from '../types/ScanTypes';
import { ConfirmScanMapper } from './mappers/ConfirmScanMapper';
import { GetScanMapper } from './mappers/GetScanMapper';

const PHOTO_FILE_NAME = 'receipt.jpg';

async function createScan(payload: ICreateScanPayload): Promise<ICreatedScan> {
  const { data } = await api.post<ICreateScanResponse>('/scans', payload);

  return data;
}

/**
 * Sobe direto para o S3 com a assinatura que a API devolveu. Os `fields` vêm
 * primeiro e o arquivo por último porque o presigned POST ignora tudo que vier
 * depois do campo `file`.
 */
async function uploadScanPhoto({
  uploadSignature,
  photoUri,
  contentType
}: IUploadScanPhotoPayload): Promise<void> {
  const form = new FormData();

  for (const [field, value] of Object.entries(uploadSignature.fields)) {
    form.append(field, value);
  }

  form.append('file', { uri: photoUri, name: PHOTO_FILE_NAME, type: contentType });

  await uploadClient.post(uploadSignature.url, form);
}

async function getScan(scanId: string): Promise<IScan> {
  const { data } = await api.get<IGetScanResponse>(`/scans/${scanId}`);

  return GetScanMapper.toDomain(data);
}

async function confirmScan({
  scanId,
  draft
}: IConfirmScanPayload): Promise<IConfirmedScan> {
  const { data } = await api.post<IConfirmScanResponse>(
    `/scans/${scanId}/confirm`,
    ConfirmScanMapper.toPersistence(draft)
  );

  return ConfirmScanMapper.toDomain(data);
}

export const ScanService = { createScan, uploadScanPhoto, getScan, confirmScan };
