---
name: feature-logic
description: Liga uma interface já construída à camada de dados do poupar app — troca mocks por useCases, move lógica do JSX para o controller, resolve loading/vazio/erro e trata formulários e erros de mutation. Use quando a tela já existe e falta a lógica, ou na fase de lógica de uma feature.
---

# Lógica

Conecta o que a fase de interface montou ao que a fase de dados criou. Nenhum
arquivo novo em `src/data/`; nenhum componente visual novo, exceto o que os três
estados exigirem.

Leia antes de gerar: `.claude/rules/controllers.md`, `core.md` e
`data-layer.md`. O molde de formatação real é
`src/presentation/screens/Login/components/SignInBottomSheet/useSignInBottomSheetController.ts`
(formulário + mutation + erro) e
`src/presentation/screens/Merchants/useMerchantsController.ts` (estado de tela +
derivações).

## Fase 1 — Levantar o que está pendente

Nos arquivos da feature, procure:

- `mocks.ts` e todo `MOCK_` importado;
- `TODO` deixado pela fase de interface;
- `useState` que existe só porque não havia dado real;
- lógica que ficou no `.tsx` — `useMemo`, condição composta, cálculo.

Liste isso antes de mexer. É o escopo desta fase, e o que o review vai conferir.

Se o useCase que a tela precisa não existe em `src/data/modules/`, pare e rode
`/feature-data` antes. Esta fase não cria camada de dados.

## Fase 2 — Trocar mock por useCase

Um mock por vez. Para cada um:

1. Importe o useCase no controller e desestruture com o nome do domínio.
2. Substitua a fonte nas derivações — `useMemo` que lia `MOCK_X` passa a ler o
   dado do useCase, com ele nas dependências.
3. Trate `undefined`: query ainda não resolvida devolve `undefined`, e
   `noUncheckedIndexedAccess` está ligado. Use `?? []` na lista, não `!`.
4. **Delete o `mocks.ts`** e o `TODO`. Mock que sobrevive é o finding mais comum
   desta fase — a tela parece funcionar exibindo dado falso.

Se o tipo do dado real diverge do `interfaces.ts` que a tela escreveu, o tipo do
módulo de dados vence: importe dele e apague o local. Ajuste os componentes que
liam o campo antigo, um por um.

## Fase 3 — Os três estados, agora de verdade

O que a fase de interface resolveu com flag passa a vir do useCase:

- **carregando** — `isLoading<Dado>` do useCase. Distinga primeira carga de
  refetch: mostrar spinner de tela cheia em todo refetch pisca a interface.
- **vazio** — `ListEmptyComponent` já existe; garanta que ele **não** aparece
  durante o carregamento inicial (lista vazia + carregando = tela mentindo).
- **erro** — exponha o erro da query no retorno do controller e deixe a tela
  decidir. Erro de query não vira `Alert` dentro do controller.

## Fase 4 — Formulários e mutations

```ts
const form = useForm<SignInFormType>({
  resolver: zodResolver(signInSchema),
  defaultValues: { email: '', password: '' }
});

async function onSubmit(data: SignInFormType) {
  try {
    await signIn(data);
    bottomSheetModalRef.current?.dismiss();
  } catch (error) {
    Alert.alert('Oops!', getAuthErrorMessage(error, 'Não foi possível entrar'));
  }
}
```

- `defaultValues` sempre preenchido.
- `handleSubmit` sai do controller já embrulhado.
- Todo `mutateAsync` dentro de `try/catch`, com
  `get<Módulo>ErrorMessage(error, fallback)` e um fallback específico daquela ação.
- Botão de submit recebe o `is<Verbo>ing` do useCase em `isLoading` — o `Button`
  já troca o conteúdo por `ActivityIndicator`.
- Sucesso: feche o bottom sheet, navegue ou limpe o form — deixe explícito o que
  acontece.

## Fase 5 — Limpar o JSX

Depois de ligar tudo, releia cada `.tsx` da feature. Toda lógica remanescente sobe
para o controller ou vai para `utils.ts` (se for função pura). O componente fica
com JSX e derivação de uma linha.

Confira a ordem interna do controller: refs → navegação/insets → useCases → estado
→ derivações → efeitos → handlers → `useImperativeHandle` → return.

## Fase 6 — Verificar e revisar

```
yarn typecheck
yarn lint
node .claude/scripts/check-classes.mjs
```

Grep final: `grep -rn "MOCK_\|from './mocks'" src/presentation/screens/<Screen>` —
tem que voltar vazio.

Depois invoque `/feature-review` com escopo `lógica`.

## Armadilhas

- `useState` espelhando dado do cache dessincroniza na primeira invalidação.
- Dependência faltando no `useMemo` congela o valor derivado; sobrando, recalcula
  a cada render.
- Mutation que salva mas não invalida: a tela anterior continua com dado velho.
  Isso se resolve no useCase (`/feature-data`), não no controller.
- Contexto (`useAuth`) já expõe ações prontas — não chame o useCase de sessão
  direto do controller de tela.
