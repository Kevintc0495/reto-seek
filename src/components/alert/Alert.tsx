import { PropsWithChildren, SyntheticEvent } from "react";
import { Alert, Snackbar } from "@mui/material";
import { AlertTypes } from "@/interface";

export interface IAlert extends PropsWithChildren {
  type: AlertTypes;
  autoHideDuration?: number;
  onClose: (_: SyntheticEvent | Event, reason?: string) => void;
  open: boolean;
}

const AlertComponent = ({
  type,
  autoHideDuration = 6000,
  children,
  onClose,
  open,
}: IAlert) => (
  <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
    <Alert severity={type} variant="filled" sx={{ width: "100%" }}>
      {children}
    </Alert>
  </Snackbar>
);

export default AlertComponent;
