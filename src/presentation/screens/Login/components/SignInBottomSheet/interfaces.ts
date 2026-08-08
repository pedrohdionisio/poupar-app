import type { Ref } from 'react';

export interface ISignInBottomSheet {
  open: () => void;
}

export interface ISignInBottomSheetProps {
  ref: Ref<ISignInBottomSheet>;
}

export interface IUseSignInBottomSheetController {
  ref: Ref<ISignInBottomSheet>;
}
