import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useAssetFilter } from "./useAssetFilter";
import { type Asset } from "../schemas/asset.schema";

const mockAssets: Asset[] = [
  {
    id: "1",
    name: "MacBook Pro",
    category: "laptop",
    value: 2000,
    status: "active",
    purchaseDate: "2024-01-01",
  },
  {
    id: "2",
    name: "Office Chair",
    category: "furniture",
    value: 150,
    status: "active",
    purchaseDate: "2024-01-01",
  },
  {
    id: "3",
    name: "iPhone",
    category: "laptop",
    value: 1000,
    status: "active",
    purchaseDate: "2024-01-01",
  },
];

describe("useAssetFilter", () => {
  it("returns all assets when no filters key provided", () => {
    const { result } = renderHook(() =>
      useAssetFilter(mockAssets, { search: "", category: "all" }),
    );
    expect(result.current).toEqual(mockAssets);
  });

  it("filters by name (case insensitive)", () => {
    const { result } = renderHook(() =>
      useAssetFilter(mockAssets, { search: "macbook", category: "all" }),
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe("MacBook Pro");
  });

  it("filters by category", () => {
    const { result } = renderHook(() =>
      useAssetFilter(mockAssets, { search: "", category: "laptop" }),
    );
    expect(result.current).toHaveLength(2);
    expect(result.current.every((a) => a.category === "laptop")).toBe(true);
  });

  it("combines search and category filters", () => {
    const { result } = renderHook(() =>
      useAssetFilter(mockAssets, { search: "phone", category: "laptop" }),
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe("iPhone");
  });

  it("returns empty array if no matches", () => {
    const { result } = renderHook(() =>
      useAssetFilter(mockAssets, { search: "xyz", category: "all" }),
    );
    expect(result.current).toHaveLength(0);
  });
});
