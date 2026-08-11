import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomTabBarHeightCallbackContext } from '@react-navigation/bottom-tabs';
import { cn } from '@shared/utils/cn';
import type { LucideIcon } from 'lucide-react-native';
import { ChartColumn, ReceiptText, ScanLine, Store, User } from 'lucide-react-native';
import { useContext } from 'react';
import { Pressable, type StyleProp, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TAB_ICONS: Record<string, LucideIcon> = {
  Receipts: ReceiptText,
  Statistics: ChartColumn,
  Scan: ScanLine,
  Merchants: Store,
  Profile: User
};

const TAB_LABELS: Record<string, string> = {
  Receipts: 'Notas',
  Statistics: 'Estatísticas',
  Scan: 'Escanear nota',
  Merchants: 'Estabelecimentos',
  Profile: 'Perfil'
};

const ACTIVE_COLOR = '#2CBA80';
const INACTIVE_COLOR = '#94A3B8';

const BAR_HEIGHT = 64;
const CENTER_BUTTON_SIZE = 62;
/** Quanto o botão central sobressai acima da pílula. */
const CENTER_BUTTON_OFFSET = 24;

const barShadow: StyleProp<ViewStyle> = {
  shadowColor: '#0F172A',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.12,
  shadowRadius: 16,
  elevation: 12
};

const centerButtonShadow: StyleProp<ViewStyle> = {
  shadowColor: '#13915D',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.35,
  shadowRadius: 12,
  elevation: 14
};

interface ICustomTabBarProps extends BottomTabBarProps {
  className?: string;
}

export function CustomTabBar({
  state,
  descriptors,
  navigation,
  className
}: ICustomTabBarProps) {
  const { bottom } = useSafeAreaInsets();
  // A barra é absoluta (flutua sobre o conteúdo), então reportamos a altura
  // manualmente para `useBottomTabBarHeight` funcionar nas telas.
  const reportTabBarHeight = useContext(BottomTabBarHeightCallbackContext);

  /** Rota renderizada como botão central elevado. */
  const centerIndex = Math.floor(state.routes.length / 2);
  const centerRoute = state.routes[centerIndex];
  const CenterIcon = centerRoute ? TAB_ICONS[centerRoute.name] : undefined;
  const isCenterFocused = state.index === centerIndex;

  const getTabProps = (route: (typeof state.routes)[number], isFocused: boolean) => ({
    accessibilityRole: 'button' as const,
    accessibilityState: isFocused ? { selected: true } : {},
    accessibilityLabel:
      descriptors[route.key]?.options?.tabBarAccessibilityLabel ??
      TAB_LABELS[route.name] ??
      route.name,
    onPress: () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name, route.params);
      }
    },
    onLongPress: () => {
      navigation.emit({ type: 'tabLongPress', target: route.key });
    }
  });

  return (
    <View
      pointerEvents='box-none'
      className={cn('absolute right-0 bottom-0 left-0 px-5', className)}
      style={{
        paddingTop: CENTER_BUTTON_OFFSET,
        paddingBottom: bottom > 0 ? bottom : 16
      }}
      onLayout={({ nativeEvent }) => reportTabBarHeight?.(nativeEvent.layout.height)}
    >
      <View
        className='w-full flex-row items-center rounded-full bg-white px-2'
        style={[barShadow, { height: BAR_HEIGHT }]}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const Icon = TAB_ICONS[route.name];

          // Espaço reservado do botão central, que é renderizado fora da pílula.
          if (index === centerIndex) {
            return <View key={route.key} className='flex-1' />;
          }

          return (
            <Pressable
              key={route.key}
              {...getTabProps(route, isFocused)}
              className='h-full flex-1 items-center justify-center gap-1'
            >
              {Icon && (
                <Icon
                  size={24}
                  color={isFocused ? ACTIVE_COLOR : INACTIVE_COLOR}
                  strokeWidth={isFocused ? 2.2 : 1.8}
                />
              )}

              <View
                className={cn(
                  'h-1 w-1 rounded-full bg-brand-main',
                  !isFocused && 'bg-transparent'
                )}
              />
            </Pressable>
          );
        })}
      </View>

      {centerRoute && (
        <View
          pointerEvents='box-none'
          className='absolute top-0 right-0 left-0 items-center'
        >
          <Pressable
            {...getTabProps(centerRoute, isCenterFocused)}
            className={cn(
              'items-center justify-center rounded-full border-4 border-white',
              // Ação primária: sempre destacado, escurece quando é a tela ativa.
              isCenterFocused ? 'bg-brand-dark' : 'bg-brand-main'
            )}
            style={[
              centerButtonShadow,
              { width: CENTER_BUTTON_SIZE, height: CENTER_BUTTON_SIZE }
            ]}
          >
            {CenterIcon && <CenterIcon size={26} color='#FFFFFF' strokeWidth={2.2} />}
          </Pressable>
        </View>
      )}
    </View>
  );
}
