import type { Ref } from 'react';

export interface IEditNameBottomSheet {
  open: () => void;
}

export interface IEditNameBottomSheetProps {
  ref: Ref<IEditNameBottomSheet>;
}

export interface IUseEditNameBottomSheetController {
  ref: Ref<IEditNameBottomSheet>;
}
