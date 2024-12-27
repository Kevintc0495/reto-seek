import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SelectComponent from "./Select";

describe("SelectComponent", () => {
  const mockHandleChange = vi.fn();
  const mockData = [
    { id: "1", label: "Opción 1" },
    { id: "2", label: "Opción 2" },
  ];

  it("should display helper text when error is true", () => {
    const errorMessage = "Campo requerido";
    render(
      <SelectComponent
        data={mockData}
        disabled={false}
        handleChange={mockHandleChange}
        label="Etiqueta"
        name="select"
        value=""
        error={true}
        helperText={errorMessage}
      />
    );

    expect(screen.getByText(errorMessage)).toBeTruthy();
  });
});
