import { PropsWithChildren } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

type align = "center" | "left" | "right" | "justify" | "inherit" | undefined;

export interface IHeadTable {
  name: string;
}

export interface IListRegister<T extends object> extends PropsWithChildren {
  alignHeader?: align;
  dataRegister: Array<T>;
  headTable: IHeadTable[];
  count: number;
  minWidth?: number;
  rowsPerPage: number;
  page: number;
  handleChangePage: (_: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ListRegister = <T extends object>({
  alignHeader = "center",
  children,
  dataRegister,
  headTable,
  count,
  minWidth = 650,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}: IListRegister<T>) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth }} size="small">
          <TableHead className={"header-table"}>
            <TableRow>
              {headTable.map(({ name }) => (
                <TableCell align={alignHeader} key={name}>
                  {name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
      {dataRegister?.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[10, 15, 20]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Registros por página"
          labelDisplayedRows={(page) =>
            `${page.from}-${page.to === -1 ? page.count : page.to} de ${
              page.count
            }`
          }
        />
      )}
    </>
  );
};
