---
globs: src/data/**
---

# Camada de dados

`src/data/` é a única parte do app que sabe que existe uma API. Componente nunca
importa `api`, `axios` ou `useQuery` direto.

## Anatomia de um módulo

```
src/data/modules/<módulo>/
├── types/<Módulo>Types.ts             contratos da API: payload e response
├── services/<Módulo>Service.ts        chamadas HTTP, uma função por endpoint
├── keys/<Módulo>Keys.ts               enums de query key e mutation key
├── schemas/<ação>Schema.ts            Zod de formulário + tipo inferido
├── constants/<módulo>ErrorMessages.ts tradução de ErrorCode → pt-BR
└── useCases/<ação>/use<Ação>.ts       wrapper do React Query, o que a UI consome
```

Nome do módulo no singular e minúsculo (`auth`, `merchant`, `receipt`),
prefixo dos arquivos no PascalCase (`AuthService`, `MerchantKeys`).

## Types

Espelham a API **como ela é**, sem tradução. Payload de entrada `I<Ação>Payload`,
resposta `I<Ação>Response`. Resposta idêntica a outra vira alias:

```ts
export type ISignInResponse = IAuthTokensResponse;
```

Datas chegam como `string` ISO — só vire `Date` na hora de formatar.

## Service

Funções soltas sem `export`, agrupadas num objeto no fim do arquivo. Nada além do
`api.<verbo>` e do `return data`:

```ts
async function signIn(payload: ISignInPayload): Promise<ISignInResponse> {
  const { data } = await api.post<ISignInResponse>('/auth/sign-in', payload);

  return data;
}

export const AuthService = { signIn, signUp };
```

Endpoint `204` retorna `Promise<void>` e não desestrutura nada.

Sem try/catch: o erro sobe para o useCase e é traduzido no controller.

## Keys

Dois enums por módulo, valor igual à chave:

```ts
export enum AuthMutationKeys { SIGN_IN = 'SIGN_IN' }
export enum AuthQueryKeys { GET_ME = 'GET_ME' }
```

Query com parâmetro monta o array com a chave e os parâmetros:
`queryKey: [MerchantQueryKeys.LIST_MERCHANTS, { search }]`.

## Use cases

Uma pasta por ação. O hook **renomeia** o que o React Query devolve para o
vocabulário do domínio — é isso que faz a UI não parecer React Query:

```ts
export function useSignIn() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: [AuthMutationKeys.SIGN_IN],
    mutationFn: async (payload: ISignInPayload) => await AuthService.signIn(payload)
  });

  return { signIn: mutateAsync, isSigningIn: isPending };
}
```

- Mutation: `mutateAsync` → verbo da ação; `isPending` → `is<Verbo>ing`.
- Query: `data` → nome do dado (`user`, `merchants`); `refetch` → `load<Dado>`;
  `isLoading`/`isFetching` → `isLoading<Dado>`.
- Opções que o chamador controla (`enabled`, filtros) entram como parâmetro
  tipado em `interfaces.ts` dentro da pasta do useCase, com default explícito.
- `staleTime` só quando o dado justifica (`Number.POSITIVE_INFINITY` em dado de
  sessão). O default global está em `data/config/queryClient.ts`: 5s, sem retry.

Invalidação vive no useCase da mutation, via `onSuccess` + `queryClient
.invalidateQueries({ queryKey: [<Módulo>QueryKeys.X] })` — nunca espalhada pelos
controllers.

## Erros

`data/config/apiError.ts` tem o enum `ApiErrorCode`, espelho do `ErrorCode.ts` da
poupar-api, e `getApiErrorCode(error)` que devolve `null` quando o erro não veio da
API (rede, timeout, bug).

Cada módulo traduz o que interessa a ele:

```ts
const AUTH_ERROR_MESSAGES: Partial<Record<ApiErrorCode, string>> = { ... };

export function getAuthErrorMessage(error: unknown, fallback: string): string {
  const code = getApiErrorCode(error);

  return code ? (AUTH_ERROR_MESSAGES[code] ?? fallback) : fallback;
}
```

Código de erro novo entra no enum `ApiErrorCode` **e** foi conferido no
`src/application/errors/ErrorCode.ts` da poupar-api. Avise antes de editar o enum.

## Schemas

Zod v4 (`z.email()`, não `z.string().email()`), mensagem em pt-BR, tipo inferido
exportado junto:

```ts
export const signInSchema = z.object({ email: z.email('Formato de e-mail inválido') });

export type SignInFormType = z.infer<typeof signInSchema>;
```

Schema de formulário reusado por mais de uma tela mora no módulo de dados; schema
de um formulário só daquela tela mora em `schema.ts` ao lado da tela.

## Config e contexts

- `config/api.ts` — instância axios, `setAccessToken`, interceptor de refresh.
  Não mexa sem entender o comentário sobre rotação de token.
- `config/env.ts` — leitura estática de `process.env.EXPO_PUBLIC_*`. Variável nova
  se lê por referência estática e entra também no `.env.example`.
- `contexts/` — estado global de sessão/UI. Provider + `interfaces.ts`, consumido
  por hook (`useAuth`). Contexto não faz fetch: consome useCase.

## Proibido

- `axios` fora de `data/config/api.ts`.
- `useQuery`/`useMutation` fora de `data/modules/**/useCases/`.
- Mapear/renomear campo da API dentro do componente — se precisa transformar,
  transforme no useCase e devolva pronto.
- `fetch` nativo.
