import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import { ListRegister } from "@/components";
import { TaskListContext } from "../context";
import { taskRoutes } from "@/routes";
import { Itask } from "@/pages/task/interfaces";

const headTable = [
  { name: "TITULO" },
  { name: "DESCRIPCIÓN" },
  { name: "ESTADO" },
  { name: "ACCIONES" },
];

const ListTableModule = ({ dataTable }: { dataTable: Itask[] }) => {
  const {
    count,
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
  } = useContext(TaskListContext);
  const navigate = useNavigate();
  const editRegister = (id: number) => navigate(`${taskRoutes.get}/${id}`);

  return (
    <>
      <ListRegister
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        dataRegister={dataTable}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        headTable={headTable}
      >
        {dataTable?.length > 0 ? (
          dataTable.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">{row?.title}</TableCell>
              <TableCell align="center">{row?.description}</TableCell>
              <TableCell align="center">{row?.state}</TableCell>
              <TableCell align="center">
                <Tooltip title="Editar">
                  <IconButton onClick={() => editRegister(row.id)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              sx={{ padding: 1 }}
              colSpan={headTable?.length + 1}
              align="center"
            >
              No hay registros
            </TableCell>
          </TableRow>
        )}
      </ListRegister>
    </>
  );
};

export default ListTableModule;
