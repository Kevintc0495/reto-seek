import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Paper, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Alert,
  Breadcrumbs,
  ConfirmationModal,
  FormController,
  FormWrapper,
  Loading,
  SelectController,
} from "@/components";
import { state } from "@/data";
import { homeRoutes, taskRoutes } from "@/routes";
import {
  IApiResponse,
  IFormWrapperRef,
  Ilink,
} from "@/interface";
import { useAlert } from "@/hooks";
import { pipe, updateFormValues } from "@/util";
import { useTask } from "@/pages/task/hooks";
import { ItaskCreateUpdate } from "@/pages/task/interfaces";
import { schemaCreateUpdate } from "@/pages/task/schemas";

const TaskCreateUpdatePage = () => {
  const { createTask, isLoadingCreate, isLoadingUpdate, updateTask, taskById } =
    useTask();
  const { alertType, handleClose, generateAlert, messageAlert, openSnackbar } =
    useAlert();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef<IFormWrapperRef<ItaskCreateUpdate>>(null);
  const form = useForm();
  const { setValue } = form;
  const schema = schemaCreateUpdate();

  const links: Ilink[] = [
    { name: "Menu", href: homeRoutes.home },
    { name: "Listar tarea", href: taskRoutes.get },
    { name: id ? "Actualizar tarea" : "Crear tarea" },
  ];

  const handleAlert = (data: IApiResponse<ItaskCreateUpdate>) => {
    generateAlert({ ...data });
    return data;
  };

  const onSubmitSuccess = async (dataSend: ItaskCreateUpdate) => {
    if (id) await updateTask(id, dataSend).then(pipe(handleAlert));
    else await createTask(dataSend).then(pipe(handleAlert));
    setOpen(false);
  };

  const confirmSave = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const handleSubmit = () =>
    ref.current!.submit(onSubmitSuccess, handleCloseModal);

  const getDataById = async (id: string) => {
    const { data } = await taskById(id);
    updateFormValues(data, setValue);
  };

  useEffect(() => {
    if (id) getDataById(id!);
    else setValue("state", "1");
  }, []);

  return (
    <>
      <Breadcrumbs breadcrumbsProps={{ sx: { mb: 2 } }} links={links} />
      <Paper sx={{ p: 2, mb: 3 }}>
        <FormWrapper methods={form} ref={ref}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <FormController schema={schema.title} label="Titulo" />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <FormController schema={schema.description} label="Descripción" />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <SelectController
                data={state}
                schema={schema.state}
                label="Estado"
                disabled={!id}
              />
            </Grid>
          </Grid>
        </FormWrapper>
      </Paper>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        gap={2}
        justifyContent="flex-end"
        mt={2}
      >
        <Button
          onClick={confirmSave}
          variant="contained"
          sx={{ order: { xs: 1, sm: 2 } }}
        >
          {id ? "Actualizar" : "Crear"}
        </Button>
        <Button
          variant="outlined"
          sx={{ order: { xs: 2, sm: 1 } }}
          onClick={() => navigate(taskRoutes.get)}
          startIcon={<ArrowBackIosIcon fontSize="small" />}
        >
          Regresar
        </Button>
      </Stack>
      <ConfirmationModal
        open={open}
        handleClose={handleCloseModal}
        actionButtonConfirm={handleSubmit}
        isLoading={isLoadingCreate}
      />
      <Alert open={openSnackbar} onClose={handleClose} type={alertType}>
        {messageAlert}
      </Alert>
      {isLoadingUpdate && <Loading />}
    </>
  );
};

export default TaskCreateUpdatePage;
