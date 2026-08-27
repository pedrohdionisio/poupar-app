---
name: feature-ui
description: Constrói a interface de uma tela ou componente do poupar app a partir de um print anexado, de um link do Figma (via MCP) ou de uma descrição em texto. Gera a árvore de componentes, os arquivos com os padrões visuais do projeto, mocks temporários e o registro da rota. Não implementa lógica de negócio nem camada de dados. Use quando o pedido for "monte a tela X", "faça a interface disso" ou quando só a UI for solicitada.
---

# Interface

Constrói só a camada visual. Ao final a tela renderiza sozinha, com dados falsos,
e o `TODO` que a fase de lógica vai consumir.

Leia antes de gerar: `.claude/rules/components.md`, `design-system.md`,
`core.md`, e `navigation.md` se for tela nova. O molde de formatação real é
`src/presentation/screens/Merchants/` — leia a screen, o `MerchantsList`, o
`MerchantListItem` e o `MerchantsListEmpty` antes de escrever o primeiro arquivo.

## Fase 1 — Obter o design

Três entradas possíveis. Identifique qual você tem.

**Print anexado.** Trabalhe direto da imagem. Antes de codar, descreva em texto o
que você está vendo — hierarquia, agrupamentos, espaçamentos relativos, estados
visíveis. É essa descrição que o usuário corrige se você leu errado; corrigir
depois do código pronto custa muito mais.

**Link do Figma.** Use o MCP do Figma (ferramentas `mcp__figma__*`). O fluxo:

1. `get_metadata` (ou equivalente) no nó do link, para a estrutura e as medidas.
2. `get_variable_defs` para os tokens — e **traduza cada um para o vocabulário do
   projeto** (`.claude/rules/design-system.md`). Cor do Figma que não casa com
   `brand`/`grays`/`danger` e tamanho de fonte fora da escala do `AppText` são
   pontos de parada: pergunte, não aproxime em silêncio.
3. `get_screenshot` para conferir o resultado contra o desenho.
4. `get_code` só como referência de estrutura — ele devolve web/React, e o alvo
   aqui é React Native com NativeWind. Nunca cole a saída dele.

Se o MCP não responder: o servidor é local e exige o Figma Desktop aberto com o
Dev Mode MCP ligado (Preferences → Enable local MCP server). Diga isso ao usuário e
ofereça seguir por print ou descrição.

**Descrição em texto.** Liste o que você vai construir e com quais primitivos,
peça confirmação, e só então gere.

## Fase 2 — Inventário de reuso

Se o `feature-scout` já rodou (fase 1 do `/feature`), use o inventário dele. Se
você foi chamado direto, faça o mínimo você mesmo: leia
`src/presentation/components/` inteiro e varra `screens/*/components/` procurando
peça que resolva o mesmo problema visual.

Componente que já existe **não** é recriado com outro nome. Se o existente quase
serve, prefira estender as variantes dele a criar um irmão.

## Fase 3 — Árvore de componentes

Antes de escrever arquivo, mostre a árvore e o veredito de cada nó:

```
Merchants/                          screen
├── MerchantsHeader/                novo
├── MerchantsSearchInput/           novo — embrulha Input (existe)
├── RecentMerchants/                novo
│   └── RecentMerchantCard/         novo
└── MerchantsList/                  novo
    ├── MerchantListItem/           novo — AppText + lucide Store/Pencil
    └── MerchantsListEmpty/         novo
```

Regras de corte:

- Nó vira componente quando repete (item de lista, card, pill) ou quando tem
  estado próprio. Bloco de layout que aparece uma vez e não tem estado fica no JSX
  da screen.
- Um nível de aninhamento por vez. Não crie `components/` dentro de `components/`.
- Componente que a tela usa sozinha nasce em `screens/<Screen>/components/`.
  Só sobe para `presentation/components/` quando uma segunda tela precisar.

## Fase 4 — Gerar, nesta ordem

**1. `interfaces.ts` da screen** — o tipo do domínio que a tela manipula
(`IMerchant`). Escreva-o como o dado **deveria** chegar da API, com comentário nos
campos que não são óbvios. A fase de dados vai confrontar isso com o contrato real.

**2. `mocks.ts`** — 5 a 8 itens plausíveis, em pt-BR, com dados brasileiros de
verdade (razão social em caixa alta como vem na nota, CNPJ com 14 dígitos, valores
em reais coerentes). Cabeçalho:
`/** Temporário: substituir pelos dados vindos do módulo de dados. */`

Mock ruim esconde bug de layout: inclua o nome longo que quebra linha, o valor
grande, o campo opcional ausente.

**3. Componentes folha → tronco** — cada um na sua pasta, com `interfaces.ts`.

**4. `use<Screen>Controller.ts`** — nesta fase ele só faz o que é de UI: estado de
busca, filtro sobre o mock, refs de bottom sheet, padding de tab bar. Marque a
fronteira:
`// TODO: trocar os mocks pelos dados reais (módulo de dados de <domínio>).`

**5. A screen** — `ScreenLayout` + composição, desestruturando o controller numa
chamada só. Zero lógica.

**6. Navegação** — registre a rota seguindo `.claude/rules/navigation.md`. Tela não
registrada não existe.

## Fase 5 — Os três estados

Antes de dizer que terminou, responda por escrito o que a tela faz em cada um:

- **carregando** — skeleton, spinner ou nada?
- **vazio** — componente próprio, e a distinção entre "não há nada" e "a busca não
  achou";
- **erro** — o que aparece e como o usuário tenta de novo.

O design quase nunca traz os três. Resolva pelo padrão da tela mais próxima e
**diga que você resolveu e como**. Nesta fase os estados podem ser controlados por
flag no controller — a fase de lógica pluga no `isLoading`/`isError` reais.

## Fase 6 — Verificar

```
yarn typecheck
yarn lint
node .claude/scripts/check-classes.mjs
```

O terceiro é o que pega classe inexistente — NativeWind não reclama sozinho, a
classe só não pinta.

Depois passe o olho no checklist de acessibilidade de
`.claude/rules/design-system.md`: todo clicável com `accessibilityRole`, label
quando o texto visível não descreve a ação, `hitSlop` em alvo pequeno.

## Fase 7 — Revisar

Invoque `/feature-review` com escopo `interface` e a lista de arquivos gerados.

## Armadilhas

- `contentContainerStyle` para padding de `FlatList` — padding em `className` não
  chega no conteúdo.
- `ScreenLayout` já resolve safe area e `KeyboardAvoidingView`; tela dentro de
  stack já recebe ele pelo `screenLayout` do navigator. Não empilhe outro.
- Lista sob a tab bar flutuante precisa do `useBottomTabBarHeight()` no padding.
- `ref` é prop normal (React 19). Nada de `forwardRef`.
- Biome ordena as classes do `className` sozinho — não brigue com a ordem.
