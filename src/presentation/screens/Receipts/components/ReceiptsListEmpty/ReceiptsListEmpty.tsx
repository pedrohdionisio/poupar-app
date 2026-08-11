import { AppText } from '@presentation/components/AppText/AppText';
import { COLORS } from '@shared/constants/colors';
import { ReceiptText } from 'lucide-react-native';
import { View } from 'react-native';

export function ReceiptsListEmpty() {
  return (
    <View className='items-center gap-3 py-12'>
      <View className='h-14 w-14 items-center justify-center rounded-2xl bg-grays-100'>
        <ReceiptText size={26} color={COLORS.grays[400]} strokeWidth={1.8} />
      </View>

      <View className='gap-1'>
        <AppText size='md' weight='semibold' color='strong' align='center'>
          Nenhuma compra por aqui
        </AppText>

        <AppText size='sm' color='muted' align='center'>
          Escaneie sua primeira nota para começar a acompanhar seus gastos.
        </AppText>
      </View>
    </View>
  );
}
