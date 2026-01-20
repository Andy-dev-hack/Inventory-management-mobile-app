import React from "react";

interface InventoryFiltersProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export const InventoryFilters: React.FC<InventoryFiltersProps> = ({
  onSearchChange,
  onCategoryChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4">
      {/* Search Input */}
      <div className="flex-1">
        <label htmlFor="search" className="sr-only">
          Search Assets
        </label>
        <input
          type="text"
          id="search"
          placeholder="Search assets..."
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="w-full sm:w-48">
        <label htmlFor="category-filter" className="sr-only">
          Filter by Category
        </label>
        <select
          id="category-filter"
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => onCategoryChange(e.target.value)}
          defaultValue="all"
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
          <option value="vehicles">Vehicles</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );
};
