import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputAdornment, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Alert, FormController, FormWrapper } from "@/components";
import { homeRoutes } from "@/routes";
import { IApiResponse, IFormWrapperRef } from "@/interface";
import { ILogin, IUserLogin } from "../../interfaces";
import { pipe } from "@/util";
import { schemaLogin } from "../../schema";
import { useAlert } from "@/hooks";
import { useAuth } from "../../hooks";
import "./styles.scss";

const prefix = "m-form-module";

const FormModule = () => {
  const { alertType, handleClose, generateAlert, messageAlert, openSnackbar } =
    useAlert();
  const { isLoading, login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const refForm = useRef<IFormWrapperRef<ILogin>>(null);
  const form = useForm();
  const schema = schemaLogin();

  const handleAlert = (data: IApiResponse<IUserLogin>) => {
    generateAlert({ ...data });
    return data;
  };

  const getNavigate = (data: IApiResponse<IUserLogin>) => {
    navigate(homeRoutes.home);
    return data;
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = () => {
    refForm.current!.submit(onSubmitSuccess);
  };

  const onSubmitSuccess = async (data: ILogin) => {
    await login(data).then(pipe(handleAlert, getNavigate));
  };

  return (
    <FormWrapper methods={form} ref={refForm}>
      <div className={prefix} data-testid="form-module">
        <h2 className={`${prefix}__title`}>Iniciar sesión</h2>
        <Grid container rowSpacing={2}>
          <Grid size={12}>
            <FormController schema={schema.email} label="Correo" />
          </Grid>
          <Grid size={12}>
            <FormController
              schema={schema.password}
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <LoadingButton
          sx={{ mt: 2 }}
          loading={isLoading}
          onClick={handleSubmit}
          variant="contained"
          endIcon={<LoginIcon />}
          fullWidth
        >
          Ingresar
        </LoadingButton>
      </div>
      <Alert open={openSnackbar} onClose={handleClose} type={alertType}>
        {messageAlert}
      </Alert>
    </FormWrapper>
  );
};

export default FormModule;
