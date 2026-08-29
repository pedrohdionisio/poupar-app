import { cn } from '@shared/utils/cn';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { IScreenLayoutProps } from './interfaces';

/**
 * O padding vem do `useSafeAreaInsets`, não do `SafeAreaView` nativo: numa tela
 * com `presentation: 'fullScreenModal'` o componente nativo mede a própria
 * hierarquia de views, que na apresentação modal não herda a safe area da
 * janela e devolve zero — o conteúdo passava por baixo da status bar. O hook lê
 * do `SafeAreaProvider` da raiz por contexto, que atravessa essa fronteira.
 */
export function ScreenLayout({
  children,
  edges = ['top', 'bottom'],
  className
}: IScreenLayoutProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={cn('flex-1 bg-white', className)}
      style={{
        paddingTop: edges.includes('top') ? insets.top : 0,
        paddingBottom: edges.includes('bottom') ? insets.bottom : 0,
        paddingLeft: edges.includes('left') ? insets.left : 0,
        paddingRight: edges.includes('right') ? insets.right : 0
      }}
    >
      <KeyboardAvoidingView
        className='flex-1'
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {children}
      </KeyboardAvoidingView>
    </View>
  );
}
