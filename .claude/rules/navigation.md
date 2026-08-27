---
globs: src/shared/navigation/**
---

# Navegação

```
Navigation.tsx      NavigationContainer
└── RootStack       decide entre autenticado e não autenticado
    ├── AuthStack   Login, ForgotPassword, ResetPassword
    └── AppStack    AppTabs (AppTabNavigator), Scan, ...
```

Tela nova **precisa** entrar num stack. Tela criada e não registrada não existe.

## Onde registrar

- Fluxo de entrada (sem sessão) → `AuthStack`.
- Aba do menu inferior → `AppTabNavigator`.
- Tela empilhada sobre as abas (detalhe, modal, fluxo) → `AppStack`.

## Como registrar

1. Adicione a rota no `ParamList` do stack, com os params ou `undefined`:

```ts
type AppStackParamList = {
  AppTabs: undefined;
  Scan: undefined;
  Merchant: { merchantId: string };
};
```

   Os tipos `<Stack>NavigationProps`, `<Stack>ScreenProps` e `<Stack>RouteProps`
   já derivam do `ParamList` — não crie tipo novo.

2. Adicione o `<Stack.Screen>` com `name` idêntico à chave do `ParamList`.

3. Decida o layout. O `screenOptions` do navigator já aplica `ScreenLayout` a
   todas as telas; sobrescreva por tela com `layout` quando precisar:

```tsx
<Stack.Screen
  name='AppTabs'
  component={AppTabNavigator}
  layout={({ children }) => <ScreenLayout edges={['top']}>{children}</ScreenLayout>}
/>
```

   Tela em tela cheia que gerencia a própria safe area (a `Scan`) usa
   `layout={({ children }) => <>{children}</>}`.

4. Modal usa `options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }}`.

## Navegar

No controller, nunca no componente:

```ts
const navigation = useNavigation<AuthStackNavigationProps>();

function handleGoToForgotPassword() {
  navigation.navigate('ForgotPassword');
}
```

Ler param: `useRoute<AuthStackRouteProps<'ResetPassword'>>()`.

`headerShown: false` é o padrão do projeto — o cabeçalho é um componente da tela
(`MerchantsHeader`, `ReceiptsHeader`), não do navigator.
