import { AppText } from '@presentation/components/AppText/AppText';
import { Button } from '@presentation/components/Button/Button';
import { COLORS } from '@shared/constants/colors';
import type { LucideIcon } from 'lucide-react-native';
import { CloudOff, ReceiptText } from 'lucide-react-native';
import { View } from 'react-native';
import { PurchaseItemsSkeleton } from '../PurchaseItemsSkeleton/PurchaseItemsSkeleton';
import type { IPurchaseItemsPlaceholderProps } from './interfaces';

function PlaceholderIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <View className='h-14 w-14 items-center justify-center rounded-2xl bg-grays-100'>
      <Icon size={26} color={COLORS.grays[400]} strokeWidth={1.8} />
    </View>
  );
}

/**
 * O que aparece no lugar dos itens. Separa recibo inexistente — permanente, sem
 * retry — de falha de rede, que vale tentar de novo.
 */
export function PurchaseItemsPlaceholder({
  isLoading,
  isRetrying,
  hasError,
  isReceiptNotFound,
  errorMessage,
  onRetry
}: IPurchaseItemsPlaceholderProps) {
  if (isLoading) {
    return <PurchaseItemsSkeleton />;
  }

  if (hasError) {
    return (
      <View className='items-center gap-4 py-10'>
        <PlaceholderIcon icon={CloudOff} />

        <AppText size='sm' color='muted' align='center'>
          {errorMessage}
        </AppText>

        <Button onPress={onRetry} isLoading={isRetrying} disabled={isRetrying}>
          Tentar de novo
        </Button>
      </View>
    );
  }

  return (
    <View className='items-center gap-3 py-10'>
      <PlaceholderIcon icon={ReceiptText} />

      <View className='gap-1'>
        <AppText size='md' weight='semibold' color='strong' align='center'>
          {isReceiptNotFound ? 'Recibo indisponível' : 'Compra sem itens'}
        </AppText>

        <AppText size='sm' color='muted' align='center'>
          {isReceiptNotFound
            ? 'Esta compra foi registrada sem o detalhamento da nota.'
            : 'A nota chegou sem nenhum item detalhado.'}
        </AppText>
      </View>
    </View>
  );
}
