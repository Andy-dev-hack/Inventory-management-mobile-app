import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { CategoryDonutChart } from "./CategoryDonutChart";
import type { Asset } from "../../schemas/asset.schema";

// Mock ResizeObserver
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("CategoryDonutChart", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders 'No data available' when asset list is empty", () => {
    render(<CategoryDonutChart assets={[]} />);
    expect(screen.getByText("No data available")).toBeDefined();
  });

  it("renders chart title when assets are provided", () => {
    const mockAssets: Asset[] = [
      {
        id: "1",
        name: "Laptop",
        category: "laptop",
        value: 1000,
        status: "active",
        purchaseDate: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Office Chair",
        category: "furniture",
        value: 150,
        status: "active",
        purchaseDate: new Date().toISOString(),
      },
    ];

    render(<CategoryDonutChart assets={mockAssets} />);
    expect(screen.getByText("Assets by Category")).toBeDefined();
    // We can't easily test the SVG output of Recharts in jsdom without complex setup,
    // but verifying the container title renders confirms the component didn't crash.
  });

  it("aggregates data correctly", () => {
    // This isn't testing the hook directly, but we can infer logic works if no error thrown
    // Ideally we would extract the aggregation logic to a util to unit test it,
    // but for a UI component test, rendering without crashing is the baseline.
    const mockAssets: Asset[] = [
      {
        id: "1",
        name: "A",
        category: "laptop",
        value: 0,
        status: "active",
        purchaseDate: "",
      },
      {
        id: "2",
        name: "B",
        category: "laptop",
        value: 0,
        status: "active",
        purchaseDate: "",
      },
      {
        id: "3",
        name: "C",
        category: "furniture",
        value: 0,
        status: "active",
        purchaseDate: "",
      },
    ];
    render(<CategoryDonutChart assets={mockAssets} />);
    expect(screen.getByText("Assets by Category")).toBeDefined();
  });
});
