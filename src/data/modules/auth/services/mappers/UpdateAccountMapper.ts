import type { IUpdateAccountBody, IUpdateAccountPayload } from '../../types/AuthTypes';

/**
 * O `accountId` fica de fora do body de propósito: ele é param de path. A rota é
 * `@AdminOnly()` na poupar-api e exige `role` junto do `name`, mesmo quando só o
 * nome muda.
 */
function toPersistence(payload: IUpdateAccountPayload): IUpdateAccountBody {
  return {
    name: payload.name,
    role: payload.role
  };
}

export const UpdateAccountMapper = {
  toPersistence
};
