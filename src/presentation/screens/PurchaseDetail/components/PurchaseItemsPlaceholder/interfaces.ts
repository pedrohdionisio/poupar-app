export interface IPurchaseItemsPlaceholderProps {
  isLoading: boolean;
  isRetrying: boolean;
  hasError: boolean;
  isReceiptNotFound: boolean;
  errorMessage: string;
  onRetry: () => void;
}
