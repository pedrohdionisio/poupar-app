export interface IReceiptsErrorProps {
  message: string;
  isRetrying: boolean;
  onRetry: () => void;
}
