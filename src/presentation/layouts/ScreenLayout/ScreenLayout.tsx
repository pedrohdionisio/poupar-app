import { cn } from '@shared/utils/cn';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { IScreenLayoutProps } from './interfaces';

export function ScreenLayout({
  children,
  edges = ['top', 'bottom'],
  className
}: IScreenLayoutProps) {
  return (
    <SafeAreaView edges={edges} className={cn('flex-1 bg-white', className)}>
      <KeyboardAvoidingView
        className='flex-1'
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
