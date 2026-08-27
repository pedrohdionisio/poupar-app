---
name: feature
description: Orquestra a criação de uma feature inteira do poupar app de ponta a ponta — reconhecimento, plano aprovado, interface, camada de dados, lógica, verificação e revisão imparcial. Use quando o pedido for "implemente a feature X" com contexto de tela (print, Figma ou descrição) e de dados. Para uma fase isolada, use /feature-ui, /feature-data, /feature-logic ou /feature-review.
---

# Feature ponta a ponta

Encadeia as fases. Cada uma também roda sozinha pelo seu próprio comando — este
skill só as coordena e mantém o contexto entre elas.

Rules que valem em todas as fases: `.claude/rules/core.md`.

## Fase 0 — Entender o pedido

Antes de tudo, decida **quais fases rodam**. O pedido nem sempre é ponta a ponta:

| Situação | Fases |
|---|---|
| Tela e dados novos | 1 → 2 → 3 → 4 → 5 → 6 |
| Tela já existe com mock | 1 → 3 → 4 → 5 → 6 |
| Endpoint novo para tela pronta | 1 → 3 → 5 → 6 |
| Só a interface, por enquanto | 1 → 2 → 5 → 6 |

Diga qual caminho você escolheu e por quê. Se o usuário pediu explicitamente uma
fase só, respeite — não "aproveite para" fazer a seguinte.

Confirme o que ainda estiver em aberto **agora**, não no meio da implementação:
qual a entrada de design (print, Figma, descrição), em que stack a tela entra, e se
o contrato do endpoint vem no pedido ou deve ser buscado na `../poupar-api`.

## Fase 1 — Reconhecimento

Despache o subagent `feature-scout` com a descrição da feature. Ele devolve o que
já existe e é reusável, o molde mais próximo, o que falta, e as armadilhas.

Rode isso mesmo em feature pequena. É barato e evita o erro caro: recriar
componente, util ou useCase que já está no projeto com outro nome.

## Fase 1.5 — Plano, aprovado antes de codar

Apresente, em no máximo 15 linhas:

- **Árvore de componentes** — cada nó marcado `novo` ou `reuso: <caminho>`.
- **Camada de dados** — módulo, endpoints, useCases, e o que já existe.
- **Estados** — o que a tela faz em carregando, vazio e erro.
- **Navegação** — stack, nome da rota, params.
- **Em aberto** — toda decisão que você tomou por conta própria e que o usuário
  pode querer diferente.

Peça aprovação. Um plano corrigido aqui custa uma mensagem; corrigido depois custa
a feature inteira.

## Fase 2 — Interface

Invoque o skill `feature-ui`. Passe adiante o inventário do scout — ele já fez a
fase 2 daquele skill.

## Fase 3 — Camada de dados

Invoque o skill `feature-data`. Se o contrato veio no pedido do usuário, passe-o
adiante: o input tem prioridade sobre a `../poupar-api`.

Confronte o `interfaces.ts` que a fase 2 escreveu com o contrato real e **relate as
divergências** antes de resolvê-las. Divergência costuma significar que a tela
mostra algo que a API não devolve — é assunto do usuário, não detalhe de
implementação.

## Fase 4 — Lógica

Invoque o skill `feature-logic`. Ao final, `src/presentation/screens/<Screen>/`
não pode mais conter `mocks.ts`.

## Fase 5 — Verificação

```
yarn typecheck
yarn lint
node .claude/scripts/check-classes.mjs
```

Os três passam antes do review. Mandar código quebrado para o reviewer gasta a
rodada dele com o que o compilador já sabia.

## Fase 6 — Revisão

Invoque o skill `feature-review` com o escopo correspondente às fases que rodaram
(`geral` quando foi ponta a ponta).

Siga a ordem dele: **mostre os findings com o código antes de corrigir ou
perguntar**.

## Fase 7 — Fechamento

Entregue, em texto curto:

- os arquivos criados e alterados, agrupados por camada;
- o que ficou de fora e por quê — endpoint que não existe na API, estado que o
  design não cobria, decisão adiada;
- o resultado das três verificações;
- os findings do review que você descartou, com o motivo.

Não faça commit sem o usuário pedir.
