---
globs: src/**
---

# Núcleo

Vale para todo arquivo em `src/`. As demais rules só acrescentam.

## Camadas

```
src/presentation/  → screens, components, layouts. Só UI e orquestração de UI.
src/data/          → config, libs, contexts, modules (types, services, keys, useCases, schemas).
src/shared/        → navigation, utils, constants, hooks, assets. Não conhece nem UI nem dados.
```

Direção permitida: `presentation → data → shared`. Nunca o contrário.

- `data/` **não** importa nada de `presentation/`.
- `shared/` **não** importa de `presentation/` nem de `data/`.
- Uma screen **não** importa de outra screen. O que duas precisam vai para
  `presentation/components/` (UI) ou `shared/utils/` (função pura).

## Imports

Aliases (`tsconfig.json`): `@/*`, `@data/*`, `@presentation/*`, `@shared/*`.

- Cruzou fronteira de pasta de topo → alias.
- Ficou dentro da própria screen ou do próprio módulo de dados → relativo
  (`./components/Foo/Foo`, `../../types/AuthTypes`).
- `import type` obrigatório para import só de tipo (`useImportType: error`).
- Não organize imports na mão — o Biome faz (`organizeImports: on`).

## Nomenclatura de arquivos

| O quê | Onde | Nome |
|---|---|---|
| Componente | `Pasta/PascalCase.tsx` | pasta e arquivo com o mesmo nome |
| Props e tipos do componente | irmão | `interfaces.ts` |
| Lógica de screen/componente | irmão | `use<Nome>Controller.ts` |
| Dados falsos temporários | irmão | `mocks.ts` |
| Helper puro da screen | irmão | `utils.ts` |
| Schema de form local | irmão | `schema.ts` |
| Serviço HTTP | `data/modules/<módulo>/services/` | `<Módulo>Service.ts` |
| Chaves do React Query | `data/modules/<módulo>/keys/` | `<Módulo>Keys.ts` |
| Contratos da API | `data/modules/<módulo>/types/` | `<Módulo>Types.ts` |

## Tipos

- `interface` prefixada com `I`: `IButtonProps`, `IMerchant`, `ISignInPayload`.
- `type` sem prefixo para union, alias e tipo inferido: `AccountRoleType`,
  `SignInFormType`. Union de literais termina em `Type`.
- `enum` só para chave de cache e código de erro; valores em `SCREAMING_SNAKE`
  iguais ao nome da chave.
- Props de componente sempre em `interfaces.ts`, nunca inline na assinatura.
- `strict` e `noUncheckedIndexedAccess` estão ligados: acesso por índice devolve
  `T | undefined` — trate, não use `!`.

## Exports

- Named export sempre. **Nunca** `export default` (exceto `App.tsx`).
- Módulo de funções soltas vira objeto no fim do arquivo: `AuthService`,
  `AuthTokensManager`, `DateFormat`, `TextMatch`. As funções internas ficam sem
  `export`.
- Constante de módulo em `SCREAMING_SNAKE` no topo do arquivo, acima do componente.

## Estilo

- `function` declaration para componente, hook e handler. Nada de
  `const Foo = () => {}`.
- Handler de UI: `handle<Evento>` (`handleSearchChange`). Prop que recebe handler:
  `on<Evento>` (`onEditPress`).
- Early return em vez de `else`.
- Uma linha em branco entre blocos lógicos dentro da função — o código do projeto
  respira, não empilha.

## Comentários

Em pt-BR, `/** */` acima do que explicam, e só quando dizem **por quê**. O molde é
`src/data/config/api.ts` e `src/shared/utils/date.ts`: comentário existe ali porque
o código sozinho não revela a armadilha (rotação de refresh token, `YYYY-MM-DD`
interpretado como UTC).

Não escreva comentário que repete o que o código já diz.

## Verificação

Nenhuma tarefa termina sem os três:

```
yarn typecheck
yarn lint
node .claude/scripts/check-classes.mjs
```

## Proibido

- `console.log`.
- `any` e `as` para calar o compilador. `as const` é permitido.
- Cor, fonte ou espaçamento hardcoded fora de `COLORS` / `className` — ver
  `.claude/rules/design-system.md`.
- Abstração criada para requisito hipotético.
- Dependência nova sem avisar antes.
