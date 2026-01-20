import { useState } from "react";
import { useInventoryContext } from "../context/InventoryContext";
import { useAssetFilter } from "../hooks/useAssetFilter";
import { AssetCard } from "../components/assets/AssetCard";
import { InventoryFilters } from "../components/assets/InventoryFilters";

export const Inventory = () => {
  const { assets } = useInventoryContext();
  const [filters, setFilters] = useState({ search: "", category: "all" });

  const filteredAssets = useAssetFilter(assets, filters);

  const handleSearchChange = (val: string) =>
    setFilters((prev) => ({ ...prev, search: val }));
  const handleCategoryChange = (val: string) =>
    setFilters((prev) => ({ ...prev, category: val }));

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold text-white">Inventory List</h2>
        <span className="text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full text-sm border border-sky-500/20">
          {filteredAssets.length} items found
        </span>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl border border-slate-700 shadow-lg sticky top-20 z-40">
        <InventoryFilters
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {filteredAssets.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-slate-800/20 rounded-2xl border-2 border-dashed border-slate-700">
          <p className="text-lg text-slate-500">
            No assets found matching your criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-sky-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative h-full">
                <AssetCard asset={asset} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
