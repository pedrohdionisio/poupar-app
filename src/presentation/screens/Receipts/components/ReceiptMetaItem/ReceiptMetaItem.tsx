import { AppText } from '@presentation/components/AppText/AppText';
import { COLORS } from '@shared/constants/colors';
import { View } from 'react-native';
import type { IReceiptMetaItemProps } from './interfaces';

/** Par ícone + texto da linha de detalhes de uma nota (data, itens, valor). */
export function ReceiptMetaItem({ icon: Icon, label }: IReceiptMetaItemProps) {
  return (
    <View className='flex-row items-center gap-1'>
      <Icon size={12} color={COLORS.grays[400]} strokeWidth={2} />

      <AppText size='xs' color='muted' numberOfLines={1}>
        {label}
      </AppText>
    </View>
  );
}
