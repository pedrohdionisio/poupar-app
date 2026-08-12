import type { IMerchant } from './interfaces';

/** O apelido do usuário ganha da razão social sempre que existir. */
export function getMerchantDisplayName({ legalName, nickname }: IMerchant): string {
  return nickname?.trim() ? nickname.trim() : legalName;
}
