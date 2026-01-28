import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useInventory } from "./useInventory";
import { AssetService } from "../api/asset.service";
import { type Asset } from "../schemas/asset.schema";

// Mock the Service module
vi.mock("../api/asset.service", () => ({
  AssetService: {
    getAssets: vi.fn(),
    saveAsset: vi.fn(),
    updateAsset: vi.fn(),
    deleteAsset: vi.fn(),
  },
}));

describe("useInventory", () => {
  const mockAssets: Asset[] = [
    {
      id: "1",
      name: "Test Asset",
      category: "laptop",
      value: 100,
      status: "active",
      purchaseDate: "2024-01-01",
    },
  ];

  // Helper to access mocked functions with correct types
  const mockedAssetService = vi.mocked(AssetService);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads assets on mount", async () => {
    // Mock successful response
    mockedAssetService.getAssets.mockResolvedValue([null, mockAssets]);

    const { result } = renderHook(() => useInventory());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.assets).toEqual(mockAssets);
    expect(result.current.error).toBeNull();
    expect(mockedAssetService.getAssets).toHaveBeenCalledTimes(1);
  });

  it("handles loading error", async () => {
    mockedAssetService.getAssets.mockResolvedValue([
      new Error("Failed to load"),
      null,
    ]);

    const { result } = renderHook(() => useInventory());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.assets).toEqual([]);
    expect(result.current.error).toBe("Failed to load");
  });

  it("adds an asset successfully", async () => {
    mockedAssetService.getAssets.mockResolvedValue([null, []]);
    const { result } = renderHook(() => useInventory());

    await waitFor(() => expect(result.current.loading).toBe(false));

    const newAsset = { ...mockAssets[0], id: "new-id" };
    mockedAssetService.saveAsset.mockResolvedValue([null, newAsset]);

    await act(async () => {
      await result.current.addAsset({
        name: "Test Asset",
        category: "laptop",
        value: 100,
        status: "active",
      });
    });

    expect(result.current.assets).toHaveLength(1);
    expect(result.current.assets[0]).toEqual(newAsset);
    expect(result.current.error).toBeNull();
  });

  it("handles add asset error", async () => {
    mockedAssetService.getAssets.mockResolvedValue([null, []]);
    const { result } = renderHook(() => useInventory());
    await waitFor(() => expect(result.current.loading).toBe(false));

    mockedAssetService.saveAsset.mockResolvedValue([
      new Error("Validation Error"),
      null,
    ]);

    await act(async () => {
      await result.current.addAsset({
        name: "Bad Asset",
        value: 100,
        category: "laptop",
      });
    });

    expect(result.current.assets).toHaveLength(0);
    expect(result.current.error).toBe("Validation Error");
  });
  it("updates an asset successfully", async () => {
    mockedAssetService.getAssets.mockResolvedValue([null, mockAssets]);
    const { result } = renderHook(() => useInventory());
    await waitFor(() => expect(result.current.loading).toBe(false));

    mockedAssetService.updateAsset.mockResolvedValue([
      null,
      { ...mockAssets[0], value: 999 },
    ]);

    await act(async () => {
      await result.current.updateAsset("1", { value: 999 });
    });

    expect(result.current.assets[0].value).toBe(999);
    expect(mockedAssetService.updateAsset).toHaveBeenCalledWith("1", {
      value: 999,
    });
  });

  it("handles update error", async () => {
    mockedAssetService.getAssets.mockResolvedValue([null, mockAssets]);
    const { result } = renderHook(() => useInventory());
    await waitFor(() => expect(result.current.loading).toBe(false));

    mockedAssetService.updateAsset.mockResolvedValue([
      new Error("Update failed"),
      null,
    ]);

    await act(async () => {
      const success = await result.current.updateAsset("1", { value: 999 });
      expect(success).toBe(false);
    });

    expect(result.current.error).toBe("Update failed");
    // Ensure optimistic update didn't persist (or wasn't applied)
    expect(result.current.assets[0].value).toBe(100);
  });

  it("deletes an asset successfully", async () => {
    mockedAssetService.getAssets.mockResolvedValue([null, mockAssets]);
    const { result } = renderHook(() => useInventory());
    await waitFor(() => expect(result.current.loading).toBe(false));

    mockedAssetService.deleteAsset.mockResolvedValue([null, true]);

    await act(async () => {
      await result.current.deleteAsset("1");
    });

    expect(result.current.assets).toHaveLength(0);
    expect(mockedAssetService.deleteAsset).toHaveBeenCalledWith("1");
  });

  it("handles delete error", async () => {
    mockedAssetService.getAssets.mockResolvedValue([null, mockAssets]);
    const { result } = renderHook(() => useInventory());
    await waitFor(() => expect(result.current.loading).toBe(false));

    mockedAssetService.deleteAsset.mockResolvedValue([
      new Error("Delete failed"),
      null,
    ]);

    await act(async () => {
      const success = await result.current.deleteAsset("1");
      expect(success).toBe(false);
    });

    expect(result.current.error).toBe("Delete failed");
    expect(result.current.assets).toHaveLength(1);
  });
});
