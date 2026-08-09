import { AppText } from '@presentation/components/AppText/AppText';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { cn } from '@shared/utils/cn';
import type { LucideIcon } from 'lucide-react-native';
import { Bell, Home, SquareMenu } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TAB_ICONS: Record<string, LucideIcon> = {
  Orders: SquareMenu,
  Home,
  Notifications: Bell
};

const TAB_LABELS: Record<string, string> = {
  Orders: 'Pedidos',
  Home: 'Início',
  Notifications: 'Notificações'
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

  return (
    <View
      className={cn('flex-row bg-white shadow-sm', className)}
      style={{ paddingBottom: bottom }}
    >
      {state.routes.map((route, index) => {
        const options = descriptors[route.key]?.options;
        const isFocused = state.index === index;

        const Icon = TAB_ICONS[route.name];
        const label = TAB_LABELS[route.name] ?? options?.title ?? route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          });
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options?.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            className='flex-1 items-center justify-center pt-3'
          >
            {Icon && <Icon size={22} color={isFocused ? '#2CBA80' : '#7A7A80'} />}

            <AppText
              className={cn(
                isFocused ? 'font-semibold text-brand-main' : 'text-grays-500'
              )}
            >
              {label}
            </AppText>

            <View
              className={cn(
                'w-4 border-brand-main border-b',
                !isFocused && 'border-transparent'
              )}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
