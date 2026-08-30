import { AppText } from '@presentation/components/AppText/AppText';
import { cn } from '@shared/utils/cn';
import { Currency } from '@shared/utils/currency';
import { View } from 'react-native';
import type { IMerchantSpendBarProps } from './interfaces';

/**
 * Piso da largura: uma fração pequena o bastante renderiza uma barra de zero
 * pixel, e o estabelecimento sumiria do gráfico como se não tivesse gasto
 * nenhum. Com o piso ele aparece como um traço, que é a leitura correta.
 */
const MIN_SHARE = 0.03;

export function MerchantSpendBar({
  name,
  amount,
  share,
  isHighest
}: IMerchantSpendBarProps) {
  return (
    <View accessible className='gap-2'>
      <View className='flex-row items-center gap-3'>
        <AppText size='sm' className='flex-1' numberOfLines={1}>
          {name}
        </AppText>

        <AppText size='sm' weight='semibold' color='strong'>
          {Currency.format(amount)}
        </AppText>
      </View>

      <View className='h-2 w-full overflow-hidden rounded-full bg-grays-100'>
        <View
          className={cn(
            'h-full rounded-full',
            isHighest ? 'bg-brand-dark' : 'bg-brand-light'
          )}
          style={{ width: `${Math.max(share, MIN_SHARE) * 100}%` }}
        />
      </View>
    </View>
  );
}
