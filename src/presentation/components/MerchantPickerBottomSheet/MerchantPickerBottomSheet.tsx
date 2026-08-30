import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import { AppText } from '@presentation/components/AppText/AppText';
import { MerchantPicker } from '@presentation/components/MerchantPicker/MerchantPicker';
import { View } from 'react-native';
import type { IMerchantPickerBottomSheetProps } from './interfaces';
import { useMerchantPickerBottomSheetController } from './useMerchantPickerBottomSheetController';

const CONTENT_BOTTOM_SPACING = 24;

const CONTENT_HORIZONTAL_PADDING = 24;

/** Altura fixa: o conteúdo é uma lista, e sem teto ela cresce sem parar. */
const SHEET_HEIGHT = '75%';

export function MerchantPickerBottomSheet({
  ref,
  selectedMerchantId,
  onSelect,
  onCreatePress
}: IMerchantPickerBottomSheetProps) {
  const { bottomSheetModalRef, bottom } = useMerchantPickerBottomSheetController({ ref });

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={[SHEET_HEIGHT]}
      keyboardBehavior='interactive'
      keyboardBlurBehavior='restore'
      android_keyboardInputMode='adjustResize'
    >
      <BottomSheetView
        style={{
          flex: 1,
          paddingBottom: bottom + CONTENT_BOTTOM_SPACING,
          paddingHorizontal: CONTENT_HORIZONTAL_PADDING
        }}
      >
        <View className='gap-1 pb-4'>
          <AppText variant='title' size='lg' color='strong'>
            Onde foi a compra?
          </AppText>

          <AppText size='sm' color='muted'>
            Escolha um dos seus estabelecimentos ou cadastre um novo.
          </AppText>
        </View>

        <MerchantPicker
          selectedMerchantId={selectedMerchantId}
          onSelect={onSelect}
          onCreatePress={onCreatePress}
          InputComponent={BottomSheetTextInput}
          ListComponent={BottomSheetFlatList}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
}
