import { AppText } from '@presentation/components/AppText/AppText';
import { COLORS } from '@shared/constants/colors';
import { SearchX, Store } from 'lucide-react-native';
import { View } from 'react-native';
import type { IMerchantsListEmptyProps } from './interfaces';

export function MerchantsListEmpty({ searchTerm }: IMerchantsListEmptyProps) {
  const isSearching = !!searchTerm.trim();

  const Icon = isSearching ? SearchX : Store;

  const title = isSearching
    ? 'Nenhum estabelecimento encontrado'
    : 'Nenhum estabelecimento ainda';

  const description = isSearching
    ? `Não achamos nada para "${searchTerm.trim()}". Tente outro nome.`
    : 'Escaneie uma nota para os lugares onde você compra aparecerem aqui.';

  return (
    <View className='items-center gap-3 py-12'>
      <View className='h-14 w-14 items-center justify-center rounded-2xl bg-grays-100'>
        <Icon size={26} color={COLORS.grays[400]} strokeWidth={1.8} />
      </View>

      <View className='gap-1'>
        <AppText size='md' weight='semibold' color='strong' align='center'>
          {title}
        </AppText>

        <AppText size='sm' color='muted' align='center'>
          {description}
        </AppText>
      </View>
    </View>
  );
}
