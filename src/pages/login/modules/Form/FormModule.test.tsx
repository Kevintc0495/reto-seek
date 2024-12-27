import { describe, it, expect, vi, afterEach, beforeEach, Mock } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import FormModule from "./FormModule.tsx";
import { MemoryRouter } from "react-router-dom";
import { useAuth } from "@/pages/login/hooks";
import { useAlert } from "@/hooks";

vi.mock("@/hooks", () => ({
  useAlert: vi.fn(),
}));

vi.mock("@/pages/login/hooks", () => ({
  useAuth: vi.fn(),
}));

describe("FormModule", () => {
  const mockLogin = vi.fn();
  const mockGenerateAlert = vi.fn();
  const mockHandleClose = vi.fn();

  beforeEach(() => {
    (useAuth as Mock).mockReturnValue({ isLoading: false, login: mockLogin });
    (useAlert as Mock).mockReturnValue({
      alertType: "success",
      handleClose: mockHandleClose,
      generateAlert: mockGenerateAlert,
      messageAlert: "Success",
      openSnackbar: false,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the form", () => {
    const { getByTestId, getByLabelText } = render(
      <MemoryRouter>
        <FormModule />
      </MemoryRouter>
    );

    expect(getByTestId("form-module")).toBeTruthy();
    expect(getByLabelText("Correo")).toBeTruthy();
    expect(getByLabelText("Contraseña")).toBeTruthy();
  });

  it("should call the login function and redirect on successful login", async () => {
    const mockLogin = vi.fn().mockResolvedValue({ status: 200, message: "Login successful" });
    const mockGenerateAlert = vi.fn();
    const mockHandleClose = vi.fn();

    (useAuth as Mock).mockReturnValue({ isLoading: false, login: mockLogin });
    (useAlert as Mock).mockReturnValue({
      alertType: "success",
      handleClose: mockHandleClose,
      generateAlert: mockGenerateAlert,
      messageAlert: "Login successful",
      openSnackbar: false,
    });

    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <FormModule />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText("Correo"), { target: { value: "user@test.com" } });
    fireEvent.change(getByLabelText("Contraseña"), { target: { value: "password" } });

    fireEvent.click(getByText("Ingresar"));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({ email: "user@test.com", password: "password" });
      expect(mockGenerateAlert).toHaveBeenCalledWith({
        status: 200,
        message: "Login successful",
      });
    });
  });

  it("should toggle password visibility on icon click", () => {
    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <FormModule />
      </MemoryRouter>
    );

    const passwordInput = getByLabelText("Contraseña") as HTMLInputElement;
    const visibilityButton = getByRole("button", { name: /toggle password visibility/i });

    expect(passwordInput.type).toBe("password");

    fireEvent.click(visibilityButton);
    expect(passwordInput.type).toBe("text");

    fireEvent.click(visibilityButton);
    expect(passwordInput.type).toBe("password");
  });
});
