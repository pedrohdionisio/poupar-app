---
globs: src/presentation/**
---

# Design system

O app tem um vocabulário fechado de cor, fonte e tamanho. Interface nova compõe o
que já existe; ela não inventa token.

## Texto

Todo texto passa por `AppText` — nunca `<Text>` do React Native direto.

| Prop | Valores |
|---|---|
| `variant` | `text` (Inter, default) · `title` (Archivo) |
| `size` | `xs` 12 · `sm` 14 · `md` 16 · `lg` 18 · `xl` 20 · `2xl` 24 · `3xl` 32 · `4xl` 40 · `5xl` 48 · `6xl` 56 |
| `weight` | `regular` · `medium` · `semibold` · `bold` |
| `color` | `default` (grays-700) · `strong` (900) · `muted` (500) · `subtle` (400) · `inverse` (branco) · `brand` · `brandLight` |
| `align`, `transform`, `decoration` | ver `AppText.tsx` |

Precisou de um tamanho fora da escala → **pare e pergunte**. Não escreva
`text-[15px]` solto.

## Cor

Fonte única: `tailwind.config.js`, espelhado em `@shared/constants/colors`.

```
brand.light #42D59E · brand.main #2CBA80 · brand.dark #13915D
danger #E5484D
grays 50…900
```

- Em JSX: `className='bg-brand-main'`, `text-grays-500`, `border-grays-200`.
- Em prop que exige valor (ícone lucide, `placeholderTextColor`, `shadowColor`):
  `COLORS.grays[600]`.
- Hex literal no meio de um componente é erro. A única exceção já existente é
  `android_ripple`, que precisa de rgba.

Cor nova entra nos **dois** arquivos (`tailwind.config.js` e `colors.ts`) ou em
nenhum — eles não podem divergir.

## Espaçamento e forma

Escala do Tailwind (`gap-3`, `px-5`, `py-4`, `mt-8`). Raio: `rounded-lg` em botão
de ícone, `rounded-xl` em card e botão. Divisor de lista: `h-px bg-grays-200`.

Valor arbitrário (`py-[14px]`) é aceito quando o design pede um número fora da
escala, mas é exceção — não o default.

## Ícones

`lucide-react-native`, com `size` e `color` explícitos e `strokeWidth` entre 1.8 e
2. Ícone decorativo dentro de área clicável não recebe label próprio; quem descreve
a ação é o elemento clicável.

## Toda tela precisa resolver três estados

Antes de considerar uma tela pronta:

1. **Carregando** — o que aparece enquanto o dado não chegou.
2. **Vazio** — componente próprio (`<Nome>ListEmpty`), com a distinção entre "não
   há nada" e "a busca não achou".
3. **Erro** — o que aparece quando a requisição falha, e como o usuário tenta de
   novo.

Se o design não cobre um dos três, resolva com o padrão da tela mais próxima e
**diga que você resolveu**. Não entregue tela que assume caminho feliz.

## Acessibilidade

Todo elemento clicável leva:

- `accessibilityRole` (`button`, `link`, `tab`…);
- `accessibilityLabel` quando o conteúdo visível não descreve a ação — o molde é
  `` accessibilityLabel={`Editar nome de ${displayName}`} ``;
- `hitSlop` quando a área tocável é menor que ~44px;
- feedback de toque: `active:opacity-*` no iOS, `android_ripple` no Android — o
  `Button` já faz os dois.

## O verificador

```
node .claude/scripts/check-classes.mjs
```

NativeWind não reclama de classe inexistente: `bg-brand-mainn` não quebra o
typecheck nem o Biome, só não pinta nada. O script gera o CSS do Tailwind com as
classes achadas em `className`/`cva`/`cn` e aponta as que não produziram regra.

Limitação conhecida: valor arbitrário entre colchetes não é validado por unidade —
`p-[oops]` passa. Confira colchete no olho.
