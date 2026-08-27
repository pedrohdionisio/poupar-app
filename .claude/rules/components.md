---
globs: src/presentation/**
---

# Componentes

## Anatomia da pasta

```
MerchantListItem/
├── MerchantListItem.tsx      componente, export nomeado
├── interfaces.ts             props e tipos públicos
└── useMerchantListItemController.ts   só se a lógica justificar
```

Screen segue a mesma forma, com o que a tela precisar em volta:

```
Merchants/
├── Merchants.tsx
├── useMerchantsController.ts
├── interfaces.ts             tipos do domínio da tela
├── utils.ts                  helpers puros da tela
├── mocks.ts                  temporário, some quando a camada de dados chega
└── components/               componentes que só esta tela usa
    └── MerchantsList/
```

Componente usado por **duas ou mais** screens sobe para
`src/presentation/components/`. Enquanto for de uma só, fica em
`screens/<Screen>/components/`.

## Onde cada peça mora

- `presentation/components/` — primitivo reutilizável (`AppText`, `Button`, `Input`).
- `presentation/layouts/` — moldura de tela (`ScreenLayout`).
- `presentation/screens/<Screen>/components/` — peça daquela tela.

## O componente

- Recebe props desestruturadas na assinatura, tipadas por `interfaces.ts`.
- Só JSX e derivação trivial (formatar label, montar string). Condição composta,
  `useState`, `useEffect`, `useMemo` e efeito colateral vão para o controller —
  ver `.claude/rules/controllers.md`.
- Constante de layout em `SCREAMING_SNAKE` no topo do arquivo, fora do componente:
  `const EDIT_HIT_SLOP = 8;`, `const HORIZONTAL_PADDING = 20;`.
- Sub-componente pequeno usado só ali (separador de lista) pode ficar no mesmo
  arquivo, acima do principal, sem `export`.

## Variantes com cva

Primitivo com variação visual usa `class-variance-authority`. O molde é `Button`:

```tsx
export const buttonVariants = cva('items-center justify-center', {
  variants: {
    variant: { primary: 'bg-brand-main', ghost: 'bg-transparent' },
    size: { default: 'px-6 py-[14px]', icon: 'h-12 w-12' }
  },
  defaultVariants: { variant: 'primary', size: 'default' }
});
```

- `cva` exportado do arquivo do componente; `interfaces.ts` deriva as props com
  `VariantProps<typeof buttonVariants>`.
- Aplique sempre com `cn(...)` de `@shared/utils/cn` — é o que resolve conflito de
  classe e deixa `className` do consumidor sobrescrever. `cn` por último.
- Combinação que depende de duas variantes vai em `compoundVariants`, não em
  ternário no JSX. `AppText` é o exemplo (variant × weight → família da fonte).

## Props

- `className?: string` em todo componente que embrulha um nó estilizável.
- Componente que espelha um nativo estende o tipo dele:
  `extends ComponentProps<typeof Pressable>`, e repassa `{...rest}`.
- Imperativo (bottom sheet, input focável) expõe `ref` tipada por uma interface
  própria em `interfaces.ts` e implementa com `useImperativeHandle`:

```ts
export interface IEditMerchantBottomSheet {
  open: (merchant: IMerchant) => void;
}

export interface IEditMerchantBottomSheetProps {
  ref: Ref<IEditMerchantBottomSheet>;
  onSave: (merchantId: string, nickname: string) => void;
}
```

  `ref` é prop normal (React 19) — nada de `forwardRef`.

## Listas

`FlatList` com `keyExtractor`, `ItemSeparatorComponent`, `ListEmptyComponent` e
`contentContainerStyle` para padding (padding em `className` não chega no conteúdo
da lista). O vazio é um componente próprio — `MerchantsListEmpty` — e recebe o
contexto para diferenciar "sem nada" de "sem resultado de busca".

Lista atrás de tab bar flutuante usa `useBottomTabBarHeight()` no controller e
recebe o valor como `bottomPadding`.

## Proibido

- `export default`.
- `StyleSheet.create` — o projeto é NativeWind. `style={{}}` só onde `className`
  não alcança (`contentContainerStyle`, animação do Reanimated).
- Lógica de negócio ou chamada de API dentro do componente.
- Prop drilling de três níveis: passe o dado ao filho direto ou leve ao contexto.
