import { AppText } from '@presentation/components/AppText/AppText';
import { Button } from '@presentation/components/Button/Button';
import { COLORS } from '@shared/constants/colors';
import { CloudOff } from 'lucide-react-native';
import { View } from 'react-native';
import type { IErrorStateProps } from './interfaces';

/** Falha de carregamento que ocupa a tela inteira, com o caminho de volta. */
export function ErrorState({ title, message, isRetrying, onRetry }: IErrorStateProps) {
  return (
    <View className='flex-1 items-center justify-center gap-4 px-5'>
      <View className='h-14 w-14 items-center justify-center rounded-2xl bg-grays-100'>
        <CloudOff size={26} color={COLORS.grays[400]} strokeWidth={1.8} />
      </View>

      <View className='gap-1'>
        <AppText size='md' weight='semibold' color='strong' align='center'>
          {title}
        </AppText>

        <AppText size='sm' color='muted' align='center'>
          {message}
        </AppText>
      </View>

      <Button onPress={onRetry} isLoading={isRetrying} disabled={isRetrying}>
        Tentar de novo
      </Button>
    </View>
  );
}
