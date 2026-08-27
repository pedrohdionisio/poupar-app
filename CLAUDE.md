# poupar app

App React Native (Expo) do poupar. Consome a `poupar-api`, que fica no repositório
irmão `../poupar-api`.

## Stack

- Expo 57 + React Native 0.86 + React 19 + TypeScript strict
- NativeWind 4 (Tailwind 3) + `class-variance-authority` + `tailwind-merge`
- React Query 5 para dados remotos, Context para sessão
- axios com interceptor de refresh token · Zod 4 · react-hook-form
- React Navigation 7 (native stack + bottom tabs) · `@gorhom/bottom-sheet`
- `lucide-react-native` para ícones · `react-native-gifted-charts` para gráficos
- Biome para lint e formatação · yarn 1

Não há framework de teste no projeto. A verificação é typecheck + lint + o checker
de classes.

## Arquitetura

```
src/presentation/   screens, components, layouts — só UI
src/data/           config, libs, contexts, modules (types, services, keys, useCases)
src/shared/         navigation, utils, constants, hooks, assets
```

Direção permitida: `presentation → data → shared`. Nunca o contrário. Uma screen
não importa de outra screen.

## Padrões globais

- Named export sempre; `export default` só em `App.tsx`.
- `interface` prefixada com `I`; `type` sem prefixo para union e tipo inferido.
- Props de componente em `interfaces.ts` ao lado; lógica em `use<Nome>Controller.ts`
  ao lado. O `.tsx` fica com JSX.
- Path aliases: `@/*`, `@data/*`, `@presentation/*`, `@shared/*`. Dentro da própria
  screen ou do próprio módulo de dados, import relativo.
- Texto só via `AppText`; cor só via `className` ou `COLORS`. Nada de hex literal,
  `StyleSheet.create` ou tamanho de fonte fora da escala.
- Comentário em pt-BR e só para explicar **por quê**. Nada que repita o código.
- `axios`, `useQuery` e `useMutation` vivem exclusivamente em `src/data/`.
- Não crie abstração antecipando requisito hipotético.
- Sem `console.log`, sem `any`, sem `as` para calar o compilador.

## Verificação

Nenhuma tarefa termina sem os três:

```
yarn typecheck
yarn lint
node .claude/scripts/check-classes.mjs
```

O terceiro existe porque o NativeWind **não** reclama de classe inexistente:
`bg-brand-mainn` passa no typecheck e no Biome, e simplesmente não pinta nada.

## Regras (`.claude/rules/`)

Leia a rule antes de editar arquivo que casa com o `globs` dela. Não são carregadas
sozinhas.

| Rule | Vale para |
|---|---|
| `core.md` | `src/**` — camadas, imports, nomenclatura, tipos, estilo |
| `components.md` | `src/presentation/**` — anatomia de componente, cva, listas |
| `design-system.md` | `src/presentation/**` — tokens, três estados, acessibilidade |
| `controllers.md` | `use*Controller.ts` — onde a lógica de tela mora |
| `data-layer.md` | `src/data/**` — módulo, service, keys, useCase, erros |
| `navigation.md` | `src/shared/navigation/**` — registrar rota e navegar |

## Fluxos (`.claude/skills/`)

| Comando | Faz |
|---|---|
| `/feature` | Ponta a ponta: reconhecimento → plano aprovado → interface → dados → lógica → verificação → revisão |
| `/feature-ui` | Só a interface, a partir de print, link do Figma (MCP) ou descrição |
| `/feature-data` | Só a camada de dados de um endpoint |
| `/feature-logic` | Só a lógica: troca mock por useCase, estados, formulários |
| `/feature-review` | Só a revisão imparcial do que já foi feito |

Cada um roda sozinho. `/feature` apenas os encadeia.

## Subagents (`.claude/agents/`)

- `feature-scout` (Sonnet, read-only) — inventário do que já existe e é reusável,
  antes de implementar.
- `api-contract-scout` (Sonnet, read-only) — extrai o contrato exato de um endpoint
  da `../poupar-api`. O contrato que vem no pedido do usuário tem prioridade sobre
  ele.
- `feature-reviewer` (Opus, read-only) — revisa a feature pronta contra as rules e
  a API. Não corrige; reporta com trecho de código.

## Figma

`.mcp.json` aponta para o Dev Mode MCP local do Figma
(`http://127.0.0.1:3845/mcp`). Exige o Figma Desktop aberto com o servidor MCP
ligado em Preferences. Sem ele, o fluxo de interface segue por print ou descrição.
