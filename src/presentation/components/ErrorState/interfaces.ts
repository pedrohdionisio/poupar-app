export interface IErrorStateProps {
  title: string;
  message: string;
  isRetrying: boolean;
  onRetry: () => void;
}
