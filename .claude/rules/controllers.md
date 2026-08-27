---
globs: src/presentation/**/use*Controller.ts
---

# Controllers

O controller é onde mora a lógica de uma tela ou de um componente com estado. O
`.tsx` fica com JSX e nada mais.

## Forma

```ts
export function useMerchantsController() {
  const [searchTerm, setSearchTerm] = useState('');

  const { merchants, isLoadingMerchants } = useListMerchants();

  const filteredMerchants = useMemo(() => ..., [merchants, searchTerm]);

  function handleSearchChange(value: string) {
    setSearchTerm(value);
  }

  return { searchTerm, filteredMerchants, isLoadingMerchants, handleSearchChange };
}
```

- Um arquivo `use<Nome>Controller.ts` ao lado do componente.
- Retorna **objeto plano**, sem aninhar. O componente desestrutura tudo numa
  chamada só.
- Ordem interna: refs → hooks de navegação/insets → hooks de dados → estado →
  derivações (`useMemo`) → efeitos → handlers → `useImperativeHandle` → return.
- Handler é `function handleX()` declarada, não arrow guardada em const.
- Parâmetros do controller (props que ele precisa, como `ref` e callbacks) são
  tipados por `IUse<Nome>Controller` em `interfaces.ts`.

## O que sobe para o controller

Tudo que não é markup: `useState`, `useEffect`, `useMemo`, `useRef`,
`useNavigation`, `useSafeAreaInsets`, `useBottomTabBarHeight`, `useForm`,
chamadas de useCase, cálculo de padding, ordenação, filtro.

O componente pode fazer derivação de uma linha para leitura (`const label =
count === 1 ? 'compra' : 'compras'`). Condição composta ou qualquer coisa
testável vai para o controller ou para `utils.ts`.

## Dados

- O controller consome **useCase** (`useListMerchants`), nunca service nem axios.
- Estado de carregamento vem do useCase, não de `useState` paralelo.
- Enquanto a camada de dados não existe, `mocks.ts` alimenta o controller com um
  `// TODO: trocar os mocks pelos dados reais (módulo de dados de X).` — é o
  contrato entre a fase de interface e a fase de lógica.

## Formulários

`react-hook-form` + `zodResolver`, schema vindo do módulo de dados (ou de
`schema.ts` local quando é só daquela tela):

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

return { form, handleSubmit: form.handleSubmit(onSubmit) };
```

- Devolva `form` inteiro e o `handleSubmit` **já embrulhado** — o componente não
  chama `form.handleSubmit(onSubmit)` no JSX.
- `defaultValues` sempre preenchido; campo controlado não começa `undefined`.

## Erro

Erro de mutation é tratado no controller, com `try/catch` em volta do
`mutateAsync`, e traduzido por `get<Módulo>ErrorMessage(error, fallback)`. O
fallback é a frase específica daquela ação, em pt-BR.

Erro de query é exposto no retorno para a tela decidir o que mostrar — não vira
`Alert` silencioso dentro do controller.

## Proibido

- Controller que devolve JSX.
- `useState` espelhando dado que já está no cache do React Query.
- Lógica duplicada entre controller e componente.
- Controller de screen importando controller de outra screen.
