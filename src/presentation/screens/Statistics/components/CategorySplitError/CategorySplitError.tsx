import { AppText } from '@presentation/components/AppText/AppText';
import { Button } from '@presentation/components/Button/Button';
import { COLORS } from '@shared/constants/colors';
import { CloudOff } from 'lucide-react-native';
import { View } from 'react-native';
import { ChartCard } from '../ChartCard/ChartCard';
import type { ICategorySplitErrorProps } from './interfaces';

/**
 * Falha só deste card: as demais consultas da tela seguem válidas, então
 * derrubar a tela inteira apagaria dado bom. Some do card sem esconder que
 * houve erro — sumir calado é indistinguível de "não há categoria nenhuma".
 */
export function CategorySplitError({
  caption,
  isRetrying,
  onRetry
}: ICategorySplitErrorProps) {
  return (
    <ChartCard title='Gasto por categoria' caption={caption}>
      <View className='items-center gap-3 py-2'>
        <CloudOff size={24} color={COLORS.grays[400]} strokeWidth={1.8} />

        <AppText size='sm' color='muted' align='center'>
          Não conseguimos carregar suas categorias.
        </AppText>

        <Button
          variant='ghost'
          size='fit'
          onPress={onRetry}
          isLoading={isRetrying}
          disabled={isRetrying}
        >
          Tentar de novo
        </Button>
      </View>
    </ChartCard>
  );
}
