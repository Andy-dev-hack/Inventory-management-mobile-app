import { useState } from "react";
import { useInventoryContext } from "../context/InventoryContext";
import { useAssetFilter } from "../hooks/useAssetFilter";
import { AssetCard } from "../components/assets/AssetCard";
import { InventoryFilters } from "../components/assets/InventoryFilters";

export const Inventory = () => {
  const { assets, loading, error } = useInventoryContext();
  const [filters, setFilters] = useState({ search: "", category: "all" });
  const [view, setView] = useState<"grid" | "list">(() => {
    return (
      (localStorage.getItem("inventory-view") as "grid" | "list") || "grid"
    );
  });

  const toggleView = (newView: "grid" | "list") => {
    setView(newView);
    localStorage.setItem("inventory-view", newView);
  };

  const filteredAssets = useAssetFilter(assets, filters);

  const handleSearchChange = (val: string) =>
    setFilters((prev) => ({ ...prev, search: val }));
  const handleCategoryChange = (val: string) =>
    setFilters((prev) => ({ ...prev, category: val }));

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-white">Inventory List</h2>
          <span className="text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full text-sm border border-sky-500/20">
            {filteredAssets.length} items found
          </span>
        </div>

        {/* View Toggle */}
        <div className="flex bg-slate-800/80 backdrop-blur-sm p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => toggleView("grid")}
            className={`p-2 rounded-md transition-all ${
              view === "grid"
                ? "bg-slate-700 text-sky-400 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
            aria-label="Grid View"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
              />
            </svg>
          </button>
          <button
            onClick={() => toggleView("list")}
            className={`p-2 rounded-md transition-all ${
              view === "list"
                ? "bg-slate-700 text-sky-400 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
            aria-label="List View"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl border border-slate-700 shadow-lg sticky top-20 z-40">
        <InventoryFilters
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Error State */}
      {error && (
        <div className="animate-shake bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-lg flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Loading State Skeleton */}
      {loading ? (
        <div
          className={`grid gap-6 ${
            view === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1 max-w-3xl mx-auto"
          }`}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-lg bg-slate-800/50 border border-slate-700/50 animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <>
          {filteredAssets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 bg-slate-800/20 rounded-2xl border-2 border-dashed border-slate-700">
              <p className="text-lg text-slate-500">
                No assets found matching your criteria
              </p>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                view === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1 max-w-3xl mx-auto"
              }`}
            >
              {filteredAssets.map((asset) => (
                <div key={asset.id} className="relative group">
                  <div className="absolute inset-0 bg-linear-to-r from-sky-600 to-sky-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                  <div className="relative h-full">
                    <AssetCard asset={asset} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
