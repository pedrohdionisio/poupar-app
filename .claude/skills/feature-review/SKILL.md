---
name: feature-review
description: Revisa uma feature recém-implementada no poupar app despachando o subagent feature-reviewer (read-only, imparcial) e apresenta os findings com o código que os sustenta antes de corrigir qualquer coisa. Aceita um escopo — interface, dados, lógica ou geral. Use ao fim de qualquer fase de implementação, ou quando o pedido for "revise o que você fez".
---

# Revisão

Quem escreveu o código não revisa o próprio código. Esta fase existe para tirar a
parcialidade do caminho: o `feature-reviewer` roda em Opus, read-only, sem ter
participado da implementação, e relê tudo do disco.

## Fase 1 — Montar o escopo

Determine o escopo a partir do pedido: `interface`, `dados`, `lógica` ou `geral`.
Sem indicação, use `geral`.

Levante a lista **exata** de arquivos criados ou alterados:

```
git status --short
git diff --name-only
```

Inclua arquivo não rastreado. Feature nova costuma ser quase toda `??`, e o
reviewer não adivinha o que não está na lista.

## Fase 2 — Despachar

Invoque o subagent `feature-reviewer` passando:

1. o pedido original da feature, como o usuário formulou;
2. o escopo;
3. a lista de arquivos, com caminho completo;
4. o contrato da API usado, quando o escopo inclui `dados`.

Não resuma o código para ele e não diga o que você acha que está certo — ele lê o
disco, e a sua leitura contamina a dele.

## Fase 3 — Apresentar antes de agir

Ao receber o resultado, **mostre o resumo antes de perguntar ou corrigir qualquer
coisa**:

1. Repasse o resumo — uma linha por finding com `arquivo:linha`, agrupado por
   severidade. Inclua os que você mesmo vai corrigir; o usuário precisa saber o que
   mudou no código dele.
2. Para todo finding que muda comportamento, mostre o **trecho de código** que o
   reviewer citou e a sequência concreta que produz a falha. É a diferença entre o
   usuário decidir e o usuário chutar.
3. Só então corrija os de severidade ALTA e pergunte sobre o resto.

`AskUserQuestion` **não substitui o resumo**: numa opção cabe uma descrição curta,
não o código nem o porquê. Perguntar sem ter mostrado os findings é o erro a evitar
aqui.

Descarte finding que você verificou ser falso — mas diga que descartou e por quê,
em vez de omitir.

## Fase 4 — Corrigir e reverificar

Aplique as correções e rode de novo:

```
yarn typecheck
yarn lint
node .claude/scripts/check-classes.mjs
```

Correção que muda mais de dois arquivos ou que mexe em algo fora do escopo do
review volta para o reviewer numa segunda rodada. Correção pontual não precisa.
