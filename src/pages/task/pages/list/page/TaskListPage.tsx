import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Breadcrumbs, Loading } from "@/components";
import { taskRoutes, homeRoutes } from "@/routes";
import { FilterModule, ListTableModule } from "../modules";
import { TaskListContext } from "../context";
import { IPayloadToken } from "@/interface";
import { useProtectedRouter } from "@/hooks";

const links = [
  { name: "Menu", href: homeRoutes.home },
  { name: "Listar tareas" },
];

const TaskListPage = () => {
  const { dataTable, isLoadingList } = useContext(TaskListContext);
  const { isAdmin } = useLoaderData() as IPayloadToken;
  useProtectedRouter(isAdmin);
  const navigate = useNavigate();

  const addRegister = () => navigate(taskRoutes.create);

  return (
    <>
      <Breadcrumbs breadcrumbsProps={{ sx: { mb: 2 } }} links={links} />
      <FilterModule />
      <Stack
        display="flex"
        direction="row"
        justifyContent="flex-end"
        gap={2}
        mb={2}
      >
        <Button variant="contained" endIcon={<AddIcon />} onClick={addRegister}>
          Agregar
        </Button>
      </Stack>
      <ListTableModule dataTable={dataTable} />
      {isLoadingList && <Loading />}
    </>
  );
};

export default TaskListPage;
