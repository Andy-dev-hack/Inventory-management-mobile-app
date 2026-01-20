import { useMemo } from "react";
import { type Asset } from "../schemas/asset.schema";

interface FilterState {
  search: string;
  category: string;
}

export const useAssetFilter = (assets: Asset[], filters: FilterState) => {
  return useMemo(() => {
    return assets.filter((asset) => {
      // 1. Search Filter (Case Insensitive)
      const matchesSearch = asset.name
        .toLowerCase()
        .includes(filters.search.toLowerCase());

      // 2. Category Filter
      // "all" or empty string matches everything
      const matchesCategory =
        filters.category === "all" ||
        filters.category === "" ||
        asset.category === filters.category;

      return matchesSearch && matchesCategory;
    });
  }, [assets, filters.search, filters.category]);
};
