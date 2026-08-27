import { AppText } from '@presentation/components/AppText/AppText';
import { Button } from '@presentation/components/Button/Button';
import { COLORS } from '@shared/constants/colors';
import { CloudOff } from 'lucide-react-native';
import { View } from 'react-native';
import type { IReceiptsErrorProps } from './interfaces';

export function ReceiptsError({ message, isRetrying, onRetry }: IReceiptsErrorProps) {
  return (
    <View className='flex-1 items-center justify-center gap-4 px-5'>
      <View className='h-14 w-14 items-center justify-center rounded-2xl bg-grays-100'>
        <CloudOff size={26} color={COLORS.grays[400]} strokeWidth={1.8} />
      </View>

      <View className='gap-1'>
        <AppText size='md' weight='semibold' color='strong' align='center'>
          Não conseguimos carregar suas compras
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
