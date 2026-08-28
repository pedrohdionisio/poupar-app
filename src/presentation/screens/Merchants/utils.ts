import type { IMerchant } from '@data/modules/merchant/types/Merchant';

/** O apelido do usuário ganha do nome da nota sempre que existir. */
export function getMerchantDisplayName({ name, alias }: IMerchant): string {
  return alias?.trim() ? alias.trim() : name;
}
