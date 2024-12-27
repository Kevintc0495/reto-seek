import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { IConfirmationModal } from "@/interface";
import warningIcon from "@/assets/icon/warning-icon.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 3,
};

const ConfirmationModal = ({
  actionButtonConfirm,
  handleClose,
  isLoading,
  open,
}: IConfirmationModal) => (
  <Modal open={open} closeAfterTransition>
    <Box sx={{ ...style, width: { xs: 360, sm: 400 } }}>
      <Box
        sx={{
          margin: "auto",
          width: "max-content",
        }}
      >
        <img src={warningIcon} alt="Icono de warning" />
      </Box>
      <Typography
        component="p"
        variant="h6"
        align="center"
        fontSize={{ xs: "1.125rem", sm: "1.25rem" }}
      >
        <strong>¿Está seguro de que desea proceder con esta acción?</strong>
      </Typography>
      <Typography
        mt={1}
        align="center"
        fontSize={{ xs: "0.688rem", sm: "0.75rem" }}
      >
        Para guardar pulsa ACEPTAR, caso contrario CANCELAR
      </Typography>
      <Stack justifyContent="center" direction="row" alignItems="center" mt={3}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <Button fullWidth variant="outlined" onClick={handleClose}>
              Cancelar
            </Button>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              onClick={actionButtonConfirm}
              startIcon={<SaveIcon />}
            >
              Aceptar
            </LoadingButton>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  </Modal>
);

export default ConfirmationModal;
