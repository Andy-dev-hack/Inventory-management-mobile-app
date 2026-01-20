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
        <span className="text-[#f3bc77] bg-[#402a23]/50 px-3 py-1 rounded-full text-sm border border-[#a55233]/20">
          {filteredAssets.length} items found
        </span>
      </div>

      <div className="bg-[#402a23]/80 backdrop-blur-sm p-4 rounded-xl border border-[#a55233]/20 shadow-lg sticky top-20 z-40">
        <InventoryFilters
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {filteredAssets.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-[#402a23]/20 rounded-2xl border-2 border-dashed border-[#a55233]/30">
          <p className="text-lg text-[#f3bc77]/50">
            No assets found matching your criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#a55233] to-[#f3bc77] rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
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
