import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ListRegister } from "./ListRegister";

describe("ListRegister component", () => {
  const mockHandleChangePage = vi.fn();
  const mockHandleChangeRowsPerPage = vi.fn();

  const headTable = [{ name: "Columna 1" }, { name: "Columna 2" }];
  const dataRegister = [{ id: 1, value: "Test 1" }, { id: 2, value: "Test 2" }];

  it("should render the table headers correctly", () => {
    render(
      <ListRegister
        alignHeader="center"
        dataRegister={dataRegister}
        headTable={headTable}
        count={dataRegister.length}
        rowsPerPage={10}
        page={0}
        handleChangePage={mockHandleChangePage}
        handleChangeRowsPerPage={mockHandleChangeRowsPerPage}
      >
        {dataRegister.map((item) => (
          <tr key={item.id}>
            <td>{item.value}</td>
          </tr>
        ))}
      </ListRegister>
    );

    headTable.forEach(({ name }) => {
      expect(screen.getByText(name)).not.toBeNull();
    });
  });

  it("should render the correct number of rows", () => {
    render(
      <ListRegister
        alignHeader="center"
        dataRegister={dataRegister}
        headTable={headTable}
        count={dataRegister.length}
        rowsPerPage={10}
        page={0}
        handleChangePage={mockHandleChangePage}
        handleChangeRowsPerPage={mockHandleChangeRowsPerPage}
      >
        {dataRegister.map((item) => (
          <tr key={item.id}>
            <td>{item.value}</td>
          </tr>
        ))}
      </ListRegister>
    );

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(dataRegister.length + 1);
  });
});
