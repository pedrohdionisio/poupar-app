import { useState } from 'react';

export function useInputController() {
  const [isFocused, setIsFocused] = useState(false);

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  return {
    handleFocus,
    handleBlur,
    isFocused
  };
}
