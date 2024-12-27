import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SearchFilter } from "./SearchFilter";
import { UseFormReturn } from "react-hook-form";

describe("SearchFilter component", () => {
  const mockCleanFields = vi.fn();
  const mockHandleSubmit = vi.fn();
  const mockMethods = {};

  it("should render and call cleanFields when the clean button is clicked", () => {
    render(
      <SearchFilter
        cleanFields={mockCleanFields}
        handleSubmit={mockHandleSubmit}
        isLoading={false}
        methods={mockMethods as UseFormReturn}
      >
        <div>Child Content</div>
      </SearchFilter>
    );

    const cleanButton = screen.getByText(/limpiar filtros/i);
    fireEvent.click(cleanButton);

    expect(mockCleanFields).toHaveBeenCalled();
  });

  it("should call handleSubmit when the search button is clicked", () => {
    render(
      <SearchFilter
        cleanFields={mockCleanFields}
        handleSubmit={mockHandleSubmit}
        isLoading={false}
        methods={mockMethods as UseFormReturn}
      >
        <div>Child Content</div>
      </SearchFilter>
    );

    const searchButton = screen.getByText(/buscar/i);
    fireEvent.click(searchButton);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
