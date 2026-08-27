---
name: feature-data
description: Cria a camada de dados de um endpoint no poupar app — types, service, keys, useCase do React Query, schema Zod e tradução de erros. Busca o contrato exato no repositório irmão ../poupar-api quando ele não vem no pedido. Use quando o pedido for "crie o service de X", "integre o endpoint Y" ou na fase de dados de uma feature.
---

# Camada de dados

Gera o vertical slice de `src/data/` para um ou mais endpoints. Não toca em
`presentation/` — quem consome o useCase é a fase de lógica.

Leia antes de gerar: `.claude/rules/data-layer.md` e `core.md`. O molde de
formatação real é `src/data/modules/auth/` — leia `AuthTypes.ts`,
`AuthService.ts`, `AuthKeys.ts`, `useSignIn.ts` e `authErrorMessages.ts` antes de
escrever o primeiro arquivo.

## Fase 1 — Contrato

**O input manda.** Se o pedido já traz método, path, payload e resposta, use o que
veio e siga para a fase 2. Não vá à API confirmar o que o usuário já afirmou.

Se o contrato não veio completo, despache o subagent `api-contract-scout` com os
endpoints em questão. Ele lê `../poupar-api` e devolve método, path, autenticação,
schema de body/params/query, shape da resposta, códigos de erro e o `arquivo:linha`
de cada peça.

Se o endpoint **não existe** na API, pare e diga. A camada de dados do app não
inventa rota — ou o endpoint é criado lá primeiro (o `poupar-api` tem o skill
`/new-endpoint` para isso), ou a tela segue com mock.

Confronte o contrato com o `interfaces.ts` que a fase de interface escreveu. Onde
divergir, a **API vence** e o `interfaces.ts` da screen morre — o tipo passa a vir
do módulo de dados. Liste as divergências antes de mudar; elas costumam significar
que a tela está exibindo algo que a API não devolve.

## Fase 2 — Módulo

Um módulo por domínio, singular e minúsculo: `auth`, `merchant`, `receipt`,
`purchase`, `scan`. Reuse o módulo se ele já existe; só crie pasta nova quando o
domínio for novo de fato.

## Fase 3 — Gerar, nesta ordem

**1. Types** — `types/<Módulo>Types.ts`

`I<Ação>Payload` e `I<Ação>Response`, espelhando a API sem tradução. Resposta
repetida vira alias (`export type ISignInResponse = IAuthTokensResponse`). Data é
`string`. Campo `...Cents` é inteiro em centavos — mantenha o nome e a unidade, a
conversão é problema da apresentação.

**2. Keys** — `keys/<Módulo>Keys.ts`

`<Módulo>QueryKeys` e `<Módulo>MutationKeys`, valor igual à chave.

**3. Service** — `services/<Módulo>Service.ts`

Uma função por endpoint, sem `export` individual, agrupadas no objeto final. Só
`api.<verbo>` e `return data`. Sem try/catch, sem lógica. `204` devolve
`Promise<void>`.

**4. Use case** — `useCases/<ação>/use<Ação>.ts`

Wrapper do React Query que **renomeia tudo** para o vocabulário do domínio:
`mutateAsync` → verbo, `isPending` → `is<Verbo>ing`, `data` → nome do dado,
`refetch` → `load<Dado>`. Opção controlada pelo chamador vira parâmetro tipado em
`interfaces.ts` na mesma pasta.

**5. Erros** — `constants/<módulo>ErrorMessages.ts`

`Partial<Record<ApiErrorCode, string>>` com as mensagens pt-BR que **este** módulo
usa, mais `get<Módulo>ErrorMessage(error, fallback)`. Código de erro que não está
em `ApiErrorCode` (`src/data/config/apiError.ts`) precisa ser conferido no
`ErrorCode.ts` da API e adicionado ao enum — avise antes de editar esse arquivo.

**6. Schema** — `schemas/<ação>Schema.ts`, só se houver formulário

Zod v4 (`z.email()`), mensagem em pt-BR, tipo inferido exportado. Formulário de uma
tela só fica em `schema.ts` ao lado da tela, não aqui.

## Fase 4 — Invalidação

Toda mutation que muda algo que uma query lê precisa invalidar, dentro do próprio
useCase:

```ts
const queryClient = useQueryClient();

useMutation({
  mutationKey: [MerchantMutationKeys.UPDATE_MERCHANT_ALIAS],
  mutationFn: ...,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: [MerchantQueryKeys.LIST_MERCHANTS] });
  }
});
```

Escreva explicitamente quais chaves cada mutation invalida. Esquecer isso não
quebra nada em desenvolvimento e produz "salvei e a lista não atualizou" em uso
real — é o bug mais comum desta camada.

## Fase 5 — Verificar e revisar

```
yarn typecheck
yarn lint
```

Depois invoque `/feature-review` com escopo `dados`, passando também o contrato que
você usou — o reviewer confere campo a campo contra a API.

## Armadilhas

- Campo opcional no Zod da API tem que ser opcional no `Types` do app. `campo:
  string` onde a API manda `campo?: string` compila e explode em runtime.
- Query com parâmetro precisa do parâmetro na `queryKey`, senão duas buscas
  diferentes leem o mesmo cache.
- `staleTime` só quando o dado justifica; o default global (5s, sem retry) está em
  `data/config/queryClient.ts`.
- Não mexa no interceptor de refresh de `data/config/api.ts` sem ler o comentário
  sobre rotação de token com grace period 0.
- Variável de ambiente nova entra em `data/config/env.ts` por referência estática
  **e** no `.env.example`.
