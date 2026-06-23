export type CopyFieldProps = {
  label: string;
  value: string;
  icon?: React.ElementType;
};

export type ShareDialogProps = {
  open: boolean;
  onClose?: () => void;
  shareUrl: string;
  deleteUrl: string;
};
