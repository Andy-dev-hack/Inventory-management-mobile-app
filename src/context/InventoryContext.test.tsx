import { renderHook, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { InventoryProvider, useInventoryContext } from "./InventoryContext";
import { AssetService } from "../api/asset.service";
import { type Asset } from "../schemas/asset.schema";

// Mock the Service
vi.mock("../api/asset.service", () => ({
  AssetService: {
    getAssets: vi.fn(),
    saveAsset: vi.fn(),
  },
}));

const mockAssets: Asset[] = [
  {
    id: "1",
    name: "Context Asset",
    category: "laptop",
    value: 100,
    status: "active",
    purchaseDate: "2024-01-01",
  },
];

describe("InventoryContext", () => {
  const mockedAssetService = vi.mocked(AssetService);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws error if used outside provider", () => {
    // Suppress console.error for this specific test as React will log an error for the boundary
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      renderHook(() => useInventoryContext());
    }).toThrow("useInventoryContext must be used within an InventoryProvider");

    consoleSpy.mockRestore();
  });

  it("provides inventory state", async () => {
    mockedAssetService.getAssets.mockResolvedValue([null, mockAssets]);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <InventoryProvider>{children}</InventoryProvider>
    );

    const { result } = renderHook(() => useInventoryContext(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.assets).toEqual(mockAssets);
  });

  it("allows adding assets via context", async () => {
    mockedAssetService.getAssets.mockResolvedValue([null, []]);
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <InventoryProvider>{children}</InventoryProvider>
    );

    const { result } = renderHook(() => useInventoryContext(), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));

    const newAsset = { ...mockAssets[0], id: "new-id" };
    mockedAssetService.saveAsset.mockResolvedValue([null, newAsset]);

    await act(async () => {
      await result.current.addAsset({
        name: "Context Asset",
        category: "laptop",
        value: 100,
        status: "active",
      });
    });

    expect(result.current.assets).toHaveLength(1);
    expect(result.current.assets[0]).toEqual(newAsset);
  });
});
