import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { cleanup } from "@testing-library/react";

describe("App Integration", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the dashboard by default", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
    // Dashboard header
    expect(screen.getAllByText(/Nexus/i).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Premium Asset Management/i).length,
    ).toBeGreaterThan(0);

    // Stats cards
    expect(screen.getByText(/Total Assets/i)).toBeDefined();
    expect(screen.getAllByText("0").length).toBeGreaterThan(0);
  });

  it("navigates to the add asset page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    // Click 'Register New Asset' link
    const link = screen.getByRole("link", { name: /Register New Asset/i });
    fireEvent.click(link);

    // Check we are on the form page
    expect(
      screen.getByRole("heading", { name: /Register Asset/i }),
    ).toBeDefined();
    expect(screen.getByLabelText(/Asset Name/i)).toBeDefined();
  });

  it("navigates to the inventory list", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", { name: /View Inventory/i });
    fireEvent.click(link);

    expect(screen.getByText(/Inventory List/i)).toBeDefined();
    expect(screen.getByText(/No assets found/i)).toBeDefined();
  });
});
