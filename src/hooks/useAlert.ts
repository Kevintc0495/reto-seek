import { useState } from "react";
import { AlertTypes, IAlert } from "@/interface";

export const useAlert = () => {

  const [openSnackbar, setOpenSnackBar] = useState(false);
  const [alertType, setAlertType] = useState<AlertTypes>('success');
  const [messageAlert, setMessageAlert] = useState('');
  
  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpenSnackBar(false);
  };
  
  const generateAlert = ({ status, message }: IAlert ) => {
    if(status >= 500) setAlertType('error');
    if(status === 200 || status === 201) setAlertType('success');
    if(status >= 400 && status < 500) setAlertType('warning');

    setOpenSnackBar(true);
    setMessageAlert(message);
  };
  
  return {
    alertType,
    handleClose,
    generateAlert,
    messageAlert,
    openSnackbar,
  }
};