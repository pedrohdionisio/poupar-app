import { getMerchantCategoryLabel } from '@data/modules/merchant/constants/merchantCategories';
import { AppText } from '@presentation/components/AppText/AppText';
import { COLORS } from '@shared/constants/colors';
import { Currency } from '@shared/utils/currency';
import { DateFormat } from '@shared/utils/date';
import { Pencil, Store, Trash2 } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import type { IMerchantListItemProps } from './interfaces';

const ACTION_HIT_SLOP = 8;

export function MerchantListItem({
  merchant,
  onEditPress,
  onDeletePress
}: IMerchantListItemProps) {
  const { name, category, purchasesCount, totalSpent, lastPurchaseAt } = merchant;

  const purchasesLabel = `${purchasesCount} ${purchasesCount === 1 ? 'compra' : 'compras'}`;

  /**
   * A API responde 409 no delete de quem já tem compras: oferecer a ação seria
   * prometer o que não vai acontecer.
   */
  const canDelete = purchasesCount === 0;

  return (
    <View className='flex-row items-center gap-3 py-4'>
      <View className='h-11 w-11 items-center justify-center rounded-xl bg-grays-100'>
        <Store size={20} color={COLORS.grays[700]} strokeWidth={1.8} />
      </View>

      <View className='flex-1 gap-1'>
        <AppText size='sm' weight='semibold' color='strong' numberOfLines={1}>
          {name}
        </AppText>

        <AppText size='xs' color='subtle' numberOfLines={1}>
          {getMerchantCategoryLabel(category)}
        </AppText>

        <AppText size='xs' color='muted' numberOfLines={1}>
          {lastPurchaseAt
            ? `${purchasesLabel} · ${Currency.format(totalSpent)} · última em ${DateFormat.toDayMonth(lastPurchaseAt)}`
            : 'Nenhuma compra ainda'}
        </AppText>
      </View>

      <Pressable
        onPress={() => onEditPress(merchant)}
        hitSlop={ACTION_HIT_SLOP}
        accessibilityRole='button'
        accessibilityLabel={`Editar ${name}`}
        className='h-9 w-9 items-center justify-center rounded-lg bg-grays-100 active:opacity-60'
      >
        <Pencil size={16} color={COLORS.grays[600]} strokeWidth={2} />
      </Pressable>

      {canDelete && (
        <Pressable
          onPress={() => onDeletePress(merchant)}
          hitSlop={ACTION_HIT_SLOP}
          accessibilityRole='button'
          accessibilityLabel={`Excluir ${name}`}
          className='h-9 w-9 items-center justify-center rounded-lg bg-grays-100 active:opacity-60'
        >
          <Trash2 size={16} color={COLORS.danger} strokeWidth={2} />
        </Pressable>
      )}
    </View>
  );
}
