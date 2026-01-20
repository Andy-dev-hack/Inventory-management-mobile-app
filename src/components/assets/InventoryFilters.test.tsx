import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { InventoryFilters } from "./InventoryFilters";

describe("InventoryFilters", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders inputs correctly", () => {
    render(
      <InventoryFilters onSearchChange={vi.fn()} onCategoryChange={vi.fn()} />,
    );

    expect(screen.getByPlaceholderText(/search assets/i)).toBeDefined();
    expect(screen.getByRole("combobox")).toBeDefined();
  });

  it("calls onSearchChange when typing", () => {
    const handleSearch = vi.fn();
    render(
      <InventoryFilters
        onSearchChange={handleSearch}
        onCategoryChange={vi.fn()}
      />,
    );

    const searchInput = screen.getByPlaceholderText(/search assets/i);
    fireEvent.change(searchInput, { target: { value: "macbook" } });

    expect(handleSearch).toHaveBeenCalledWith("macbook");
  });

  it("calls onCategoryChange when selecting category", () => {
    const handleCategory = vi.fn();
    render(
      <InventoryFilters
        onSearchChange={vi.fn()}
        onCategoryChange={handleCategory}
      />,
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "laptop" } });

    expect(handleCategory).toHaveBeenCalledWith("laptop");
  });
});
