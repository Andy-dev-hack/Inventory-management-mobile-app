import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, within } from "@testing-library/react";
import { Dashboard } from "./Dashboard";
import { useInventoryContext } from "../context/InventoryContext";
import { MemoryRouter } from "react-router-dom";

// Mock the Context
vi.mock("../context/InventoryContext", () => ({
  useInventoryContext: vi.fn(),
}));

// Mock the Chart to avoid Recharts/ResizeObserver complexity
vi.mock("../components/charts/CategoryDonutChart", () => ({
  CategoryDonutChart: ({ assets }: { assets: any[] }) => (
    <div data-testid="mock-chart">Chart with {assets.length} items</div>
  ),
}));

describe("Dashboard Page", () => {
  const mockAssets = [
    {
      id: "1",
      name: "Laptop",
      value: 1000,
      status: "active",
      category: "laptop",
    },
    {
      id: "2",
      name: "Phone",
      value: 500,
      status: "active",
      category: "smartphone",
    },
    {
      id: "3",
      name: "Old PC",
      value: 200,
      status: "retired",
      category: "desktop",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (useInventoryContext as any).mockReturnValue({
      assets: mockAssets,
    });
  });

  afterEach(() => {
    cleanup();
  });

  const renderDashboard = () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );
  };

  it("should display correct 'Total Assets' count", () => {
    renderDashboard();
    // Look for the label then the value, or just the value if unique
    // The code structure:
    // <p>Total Assets</p>
    // <p>3</p>
    expect(screen.getByText("Total Assets")).not.toBeNull();
    const card = screen.getByText("Total Assets").parentElement!; // closest div is parent of p
    expect(within(card).getByText("3")).not.toBeNull();
  });

  it("should display correct 'Active Assets' count", () => {
    renderDashboard();
    // Active assets in mock: 2 (Laptop, Phone)
    expect(screen.getByText("Active Assets")).not.toBeNull();
    const card = screen.getByText("Active Assets").parentElement!;
    expect(within(card).getByText("2")).not.toBeNull();
  });

  it("should display correct 'Total Value' sum formatted as currency", () => {
    renderDashboard();
    // Total value: 1000 + 500 + 200 = 1700
    // Formatting: EUR, compact? "€1.7K" or similar depending on locale/implementation
    // The component uses: notation: "compact", currency: "EUR"

    // We can use a regex to be flexible with locale spaces
    // Expected: €1.7K or 1.7K €
    expect(screen.getByText("Total Value")).not.toBeNull();

    // Check for 1.7K
    const card = screen.getByText("Total Value").parentElement!;
    expect(within(card).getByText(/1\.7K/)).not.toBeNull();
  });

  it("should pass assets to CategoryDonutChart", () => {
    renderDashboard();
    expect(screen.getByTestId("mock-chart").textContent).toContain(
      "Chart with 3 items",
    );
  });

  it("should handle empty state", () => {
    (useInventoryContext as any).mockReturnValue({
      assets: [],
    });

    renderDashboard();

    const totalCard = screen.getByText("Total Assets").parentElement!;
    expect(within(totalCard).getByText("0")).not.toBeNull();

    const activeCard = screen.getByText("Active Assets").parentElement!;
    expect(within(activeCard).getByText("0")).not.toBeNull();
  });
});
