import { Cnpj } from '@shared/utils/cnpj';
import { DateFormat } from '@shared/utils/date';
import { Decimal } from '@shared/utils/decimal';
import { Quantity } from '@shared/utils/quantity';
import z from 'zod';

/** Fonte única dos limites: os `maxLength` dos inputs leem daqui. */
export const MERCHANT_NAME_MAX_LENGTH = 60;

export const MERCHANT_ADDRESS_MAX_LENGTH = 120;

export const ITEM_DESCRIPTION_MAX_LENGTH = 80;

/** A API só aceita estas três unidades (`Receipt.Unit`). */
export const RECEIPT_UNITS = ['UN', 'KG', 'L'] as const;

/**
 * Valores monetários e de quantidade ficam como texto até o controller montar o
 * payload: transformar aqui daria ao form uma saída diferente da entrada, e o
 * `Input` compartilhado não aceita `Control` transformado.
 */
const decimalField = (message: string) =>
  z
    .string()
    .min(1, 'Campo obrigatório')
    .refine((value) => Decimal.parse(value) > 0, message);

export const importPurchaseItemSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, 'Campo obrigatório')
    .max(
      ITEM_DESCRIPTION_MAX_LENGTH,
      `Use no máximo ${ITEM_DESCRIPTION_MAX_LENGTH} caracteres`
    ),
  /** A API exige `quantityMilli` inteiro positivo: `0,0004` arredondaria para 0. */
  quantity: z
    .string()
    .min(1, 'Campo obrigatório')
    .refine(
      (value) => Quantity.toMilli(Decimal.parse(value)) > 0,
      'A quantidade precisa ser maior que zero'
    ),
  unit: z.enum(RECEIPT_UNITS),
  unitPrice: decimalField('O preço precisa ser maior que zero')
});

export const importPurchaseSchema = z.object({
  purchasedAt: z
    .string()
    .min(1, 'Campo obrigatório')
    .refine(DateFormat.isValidDayMonthYear, 'Informe uma data válida, no passado'),
  merchantCnpj: z
    .string()
    .min(1, 'Campo obrigatório')
    /** A API recusa a nota inteira por causa do CNPJ, sem dizer qual campo. */
    .refine(Cnpj.isValid, 'CNPJ inválido'),
  merchantName: z
    .string()
    .trim()
    .min(1, 'Campo obrigatório')
    .max(
      MERCHANT_NAME_MAX_LENGTH,
      `Use no máximo ${MERCHANT_NAME_MAX_LENGTH} caracteres`
    ),
  merchantAddress: z
    .string()
    .trim()
    .min(1, 'Campo obrigatório')
    .max(
      MERCHANT_ADDRESS_MAX_LENGTH,
      `Use no máximo ${MERCHANT_ADDRESS_MAX_LENGTH} caracteres`
    ),
  items: z.array(importPurchaseItemSchema).min(1, 'Adicione pelo menos um item')
});

export type ImportPurchaseFormType = z.infer<typeof importPurchaseSchema>;
