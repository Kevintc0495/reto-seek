export interface IConfirmationModal {
  actionButtonConfirm: () => void;
  handleClose: () => void;
  isLoading?: boolean; 
  open: boolean;
}