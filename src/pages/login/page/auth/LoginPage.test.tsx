import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render } from "@testing-library/react";
import LoginPage from "./LoginPage";
import { MemoryRouter } from 'react-router-dom';

describe("LoginPage", () => {
  afterEach(cleanup);

  it("should contain the FormModule component", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    expect(getByTestId("form-module")).toBeTruthy();
  });
});
