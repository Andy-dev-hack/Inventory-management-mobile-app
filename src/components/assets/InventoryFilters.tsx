import React, { useState, useRef } from "react";
import { ScanModal } from "../ui/ScanModal";
import { toast } from "sonner";

interface InventoryFiltersProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export const InventoryFilters: React.FC<InventoryFiltersProps> = ({
  onSearchChange,
  onCategoryChange,
}) => {
  const [isScanOpen, setIsScanOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleScan = (result: string) => {
    if (searchInputRef.current) {
      searchInputRef.current.value = result;
    }
    onSearchChange(result);
    setIsScanOpen(false);
    toast.success(`Scanned: ${result}`);
  };

  const handleScanError = (error: unknown) => {
    console.error(error);
    toast.error("Failed to access camera");
    setIsScanOpen(false);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 flex gap-2">
          <label htmlFor="search" className="sr-only">
            Search Assets
          </label>
          <div className="relative grow">
            <input
              ref={searchInputRef}
              type="text"
              id="search"
              placeholder="Search assets..."
              className="peer block w-full appearance-none rounded-lg border bg-slate-800/50 px-4 py-3 text-sm text-slate-200 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 border-slate-700 placeholder-slate-500"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={() => setIsScanOpen(true)}
            className="p-3 bg-slate-800 border border-slate-700 rounded-lg text-sky-500 hover:bg-slate-700 hover:text-sky-400 transition-colors focus:ring-2 focus:ring-sky-500 focus:outline-none"
            title="Scan Code"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 17h.01M9 20h.01M12 14h.01M15 11h.01M12 12h.01M9 17h.01M4 17h6m4 0h2M9 10h.01M15 21v-4m-6 4v-4m-6-1v1a3 3 0 003 3h1a3 3 0 003-3v-1m0-1v1a3 3 0 003 3h1a3 3 0 003-3v-1m-10 6v-7a2 2 0 012-2h10a2 2 0 012 2v7"
              />
            </svg>
          </button>
        </div>

        {/* Category Filter */}
        <div className="w-full sm:w-48">
          <label htmlFor="category-filter" className="sr-only">
            Filter by Category
          </label>
          <select
            id="category-filter"
            className="peer block w-full appearance-none rounded-lg border bg-slate-800/50 px-4 py-3 text-sm text-slate-200 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 border-slate-700"
            onChange={(e) => onCategoryChange(e.target.value)}
            defaultValue="all"
          >
            <option value="all" className="bg-slate-800">
              All Categories
            </option>
            <option value="laptop" className="bg-slate-800">
              Laptops
            </option>
            <option value="desktop" className="bg-slate-800">
              Desktops
            </option>
            <option value="smartphone" className="bg-slate-800">
              Smartphones
            </option>
            <option value="tablet" className="bg-slate-800">
              Tablets
            </option>
            <option value="monitor" className="bg-slate-800">
              Monitors
            </option>
            <option value="peripheral" className="bg-slate-800">
              Peripherals
            </option>
            <option value="network" className="bg-slate-800">
              Network
            </option>
            <option value="server" className="bg-slate-800">
              Servers
            </option>
            <option value="furniture" className="bg-slate-800">
              Furniture
            </option>
            <option value="other" className="bg-slate-800">
              Other
            </option>
          </select>
        </div>
      </div>

      <ScanModal
        isOpen={isScanOpen}
        onScan={handleScan}
        onError={handleScanError}
        onClose={() => setIsScanOpen(false)}
      />
    </>
  );
};
