import { type Asset } from "../../schemas/asset.schema";
import { AssetStatusBadge } from "./AssetStatusBadge";

interface AssetCardProps {
  asset: Asset;
}

export const AssetCard = ({ asset }: AssetCardProps) => {
  // Helpers for formatting
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justifying-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {asset.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {asset.serialNumber || "No Serial Number"}
          </p>
        </div>
        <AssetStatusBadge status={asset.status} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500 dark:text-gray-400">Category</p>
          <p className="font-medium capitalize text-gray-900 dark:text-gray-100">
            {asset.category}
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Value</p>
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {formatCurrency(asset.value)}
          </p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-500 dark:text-gray-400">Purchased</p>
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {formatDate(asset.purchaseDate)}
          </p>
        </div>
      </div>
    </div>
  );
};
