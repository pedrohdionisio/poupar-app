import type { Ref } from 'react';

export interface ISignUpBottomSheet {
  open: () => void;
}

export interface ISignUpBottomSheetProps {
  ref: Ref<ISignUpBottomSheet>;
}

export interface IUseSignUpBottomSheetController {
  ref: Ref<ISignUpBottomSheet>;
}
