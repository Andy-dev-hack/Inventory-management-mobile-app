import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Inventory } from "./Inventory";
import * as InventoryContext from "../context/InventoryContext";

// Mock child components to isolate Inventory logic
vi.mock("../components/assets/AssetCard", () => ({
  AssetCard: ({ asset }: { asset: { name: string } }) => (
    <div data-testid="asset-card">{asset.name}</div>
  ),
}));

vi.mock("../components/assets/InventoryFilters", () => ({
  InventoryFilters: () => <div data-testid="inventory-filters" />,
}));

describe("Inventory Page Logic", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders loading skeleton when loading is true", () => {
    vi.spyOn(InventoryContext, "useInventoryContext").mockReturnValue({
      assets: [],
      loading: true,
      error: null,
      addAsset: vi.fn(),
      updateAsset: vi.fn(),
      deleteAsset: vi.fn(),
      refreshAssets: vi.fn(),
    });

    render(<Inventory />);
    // Check for pulsating skeleton items (we render 8 by default)
    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders error alert when error is present", () => {
    vi.spyOn(InventoryContext, "useInventoryContext").mockReturnValue({
      assets: [],
      loading: false,
      error: "Failed to fetch assets",
      addAsset: vi.fn(),
      updateAsset: vi.fn(),
      deleteAsset: vi.fn(),
      refreshAssets: vi.fn(),
    });

    render(<Inventory />);
    expect(screen.getByText("Failed to fetch assets")).toBeDefined();
    // Check for shake animation class
    const alert = screen.getByText("Failed to fetch assets").parentElement;
    expect(alert?.className).toContain("animate-shake");
  });

  it("toggles between grid and list views", () => {
    vi.spyOn(InventoryContext, "useInventoryContext").mockReturnValue({
      assets: [], // Empty for this test, focusing on toggle button interaction
      loading: false,
      error: null,
      addAsset: vi.fn(),
      updateAsset: vi.fn(),
      deleteAsset: vi.fn(),
      refreshAssets: vi.fn(),
    });

    render(<Inventory />);

    const gridBtn = screen.getByLabelText("Grid View");
    const listBtn = screen.getByLabelText("List View");

    // Default is grid (checked via class or state implication)
    expect(gridBtn.className).toContain("bg-slate-700");

    // Switch to List
    fireEvent.click(listBtn);
    expect(listBtn.className).toContain("bg-slate-700");
    expect(gridBtn.className).not.toContain("bg-slate-700");
    expect(localStorage.getItem("inventory-view")).toBe("list");

    // Switch back to Grid
    fireEvent.click(gridBtn);
    expect(gridBtn.className).toContain("bg-slate-700");
    expect(localStorage.getItem("inventory-view")).toBe("grid");
  });

  it("persists view preference from localStorage", () => {
    localStorage.setItem("inventory-view", "list");

    vi.spyOn(InventoryContext, "useInventoryContext").mockReturnValue({
      assets: [],
      loading: false,
      error: null,
      addAsset: vi.fn(),
      updateAsset: vi.fn(),
      deleteAsset: vi.fn(),
      refreshAssets: vi.fn(),
    });

    render(<Inventory />);
    const listBtn = screen.getByLabelText("List View");
    expect(listBtn.className).toContain("bg-slate-700");
  });
});
