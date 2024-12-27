import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useForm, FormProvider } from "react-hook-form";
import SelectController from "./SelectController";

vi.mock("@/components", () => ({
  Select: vi.fn(({ label, handleChange, data, value, error, helperText }) => (
    <div>
      <label>{label}</label>
      <select
        onChange={(e) => handleChange(e.target.value)}
        value={value}
        data-testid="select"
      >
        <option value="">Seleccione...</option>
        {data.map((item: { id: string; label: string }) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
      {error && <span>{helperText}</span>}
    </div>
  )),
}));

describe("SelectController component", () => {
  const mockSchema = {
    name: "testField",
    validations: { required: "Campo requerido" },
  };

  const mockData = [
    { id: "1", label: "Opción 1" },
    { id: "2", label: "Opción 2" },
  ];

  const renderWithForm = (props = {}) => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => {
      const methods = useForm();
      return <FormProvider {...methods}>{children}</FormProvider>;
    };

    return render(
      <Wrapper>
        <SelectController
          label="Test Label"
          schema={mockSchema}
          data={mockData}
          {...props}
        />
      </Wrapper>
    );
  };

  it("should render the Select component with the provided options", () => {
    renderWithForm();

    expect(screen.getByText("Test Label")).toBeTruthy();
    expect(screen.getByTestId("select")).toBeTruthy();
    expect(screen.getByText("Seleccione...")).toBeTruthy();
    mockData.forEach((item) => {
      expect(screen.getByText(item.label)).toBeTruthy();
    });
  });

  it("should call handleChange and validate the field", async () => {
    renderWithForm();

    const select = screen.getByTestId("select") as HTMLSelectElement;
    fireEvent.change(select, { target: { value: mockData[0].id } });

    expect(select.value).toBe(mockData[0].id);
  });
});
