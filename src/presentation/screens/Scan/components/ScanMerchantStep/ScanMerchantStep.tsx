import { AppText } from '@presentation/components/AppText/AppText';
import { MerchantPicker } from '@presentation/components/MerchantPicker/MerchantPicker';
import { View } from 'react-native';
import type { IScanMerchantStepProps } from './interfaces';

/**
 * O estabelecimento é escolhido antes da foto porque o `POST /scans` já o exige:
 * a extração não adivinha mais o lugar a partir do CNPJ impresso na nota.
 */
export function ScanMerchantStep({
  selectedMerchantId,
  onSelect,
  onCreatePress
}: IScanMerchantStepProps) {
  return (
    <View className='flex-1 gap-4'>
      <View className='gap-1'>
        <AppText variant='title' size='lg' color='strong'>
          Onde foi a compra?
        </AppText>

        <AppText size='sm' color='muted'>
          Escolha o estabelecimento antes de fotografar a nota.
        </AppText>
      </View>

      <MerchantPicker
        selectedMerchantId={selectedMerchantId}
        onSelect={onSelect}
        onCreatePress={onCreatePress}
      />
    </View>
  );
}
