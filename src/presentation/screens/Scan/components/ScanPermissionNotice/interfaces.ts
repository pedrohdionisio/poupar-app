export interface IScanPermissionNoticeProps {
  /** `false` depois de um "não" definitivo: só resta abrir as configurações. */
  canAskAgain: boolean;
  onAllowPress: () => void;
  onOpenSettingsPress: () => void;
}
