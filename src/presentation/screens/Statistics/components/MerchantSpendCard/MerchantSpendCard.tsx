import { View } from 'react-native';
import { ChartCard } from '../ChartCard/ChartCard';
import { MerchantSpendBar } from '../MerchantSpendBar/MerchantSpendBar';
import type { IMerchantSpendCardProps } from './interfaces';

/**
 * Barras horizontais, e não o `BarChart` vertical: o nome do estabelecimento
 * ocupa a largura do card, em vez de caber na largura de uma barra, e o valor
 * fica escrito em vez de depender de um toque para aparecer.
 */
export function MerchantSpendCard({ merchantSpends, caption }: IMerchantSpendCardProps) {
  const maxAmount = Math.max(...merchantSpends.map(({ amount }) => amount));

  return (
    <ChartCard title='Onde você mais gasta' caption={caption}>
      <View className='gap-4'>
        {merchantSpends.map(({ id, name, amount }) => (
          <MerchantSpendBar
            key={id}
            name={name}
            amount={amount}
            share={maxAmount > 0 ? amount / maxAmount : 0}
            isHighest={amount === maxAmount}
          />
        ))}
      </View>
    </ChartCard>
  );
}
