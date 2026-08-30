import { AppText } from '@presentation/components/AppText/AppText';
import { COLORS } from '@shared/constants/colors';
import { Cnpj } from '@shared/utils/cnpj';
import { Currency } from '@shared/utils/currency';
import { DateFormat } from '@shared/utils/date';
import { CircleCheck } from 'lucide-react-native';
import { View } from 'react-native';
import type { IScanDraftSummaryProps } from './interfaces';

interface ISummaryRowProps {
  label: string;
  value: string;
}

function SummaryRow({ label, value }: ISummaryRowProps) {
  return (
    <View className='flex-row items-center justify-between gap-4'>
      <AppText size='sm' color='muted'>
        {label}
      </AppText>

      <AppText size='sm' weight='medium' color='strong' align='right' className='flex-1'>
        {value}
      </AppText>
    </View>
  );
}

export function ScanDraftSummary({ draft }: IScanDraftSummaryProps) {
  const itemsLabel = draft.items.length === 1 ? 'item' : 'itens';

  return (
    <View className='gap-6'>
      <View className='items-center gap-3'>
        <CircleCheck size={40} color={COLORS.brand.main} strokeWidth={1.8} />

        <View className='gap-2'>
          <AppText variant='title' size='lg' color='strong' align='center'>
            Confira o que lemos
          </AppText>

          <AppText size='sm' color='muted' align='center'>
            Confirme para adicionar esta nota às suas compras.
          </AppText>
        </View>
      </View>

      <View className='gap-3 rounded-2xl border border-grays-200 p-5'>
        <AppText variant='title' size='md' color='strong'>
          {draft.merchant.fantasyName ?? draft.merchant.name}
        </AppText>

        <View className='h-px bg-grays-200' />

        <SummaryRow label='CNPJ' value={Cnpj.format(draft.merchant.cnpj)} />
        <SummaryRow label='Data' value={DateFormat.toDayMonthYear(draft.purchasedAt)} />
        <SummaryRow label='Itens' value={`${draft.items.length} ${itemsLabel}`} />

        <View className='h-px bg-grays-200' />

        <View className='flex-row items-center justify-between gap-4'>
          <AppText size='sm' color='muted'>
            Total
          </AppText>

          <AppText variant='title' size='xl' color='strong'>
            {Currency.format(draft.totalAmount)}
          </AppText>
        </View>
      </View>
    </View>
  );
}
